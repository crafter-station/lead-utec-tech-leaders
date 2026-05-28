"""Remove cream/white background from stylized speaker portraits.

Strategy: flood-fill from the 4 corners through "background-colored" pixels
so we only erase the outer background, not skin-tone pixels enclosed by
dark linework inside the illustration.

Edges are softened by giving partial alpha to pixels that are creamy but
not flood-reached (bordering linework, anti-aliased seam).
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


def _flood_from_corners(creamy: np.ndarray) -> np.ndarray:
    """Iterative 4-connected flood fill from each corner through `creamy`."""
    h, w = creamy.shape
    visited = np.zeros_like(creamy)
    for y, x in [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)]:
        if creamy[y, x]:
            visited[y, x] = True

    while True:
        grown = visited.copy()
        grown[1:, :] |= visited[:-1, :]
        grown[:-1, :] |= visited[1:, :]
        grown[:, 1:] |= visited[:, :-1]
        grown[:, :-1] |= visited[:, 1:]
        grown &= creamy
        if np.array_equal(grown, visited):
            return visited
        visited = grown


def remove_bg(src: Path, dst: Path, hard_tol: int = 22, soft_tol: int = 60) -> tuple[int, int]:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.int16)

    corners = np.stack([rgb[0, 0], rgb[0, -1], rgb[-1, 0], rgb[-1, -1]])
    bg = corners.mean(axis=0).astype(np.int16)

    diff = np.max(np.abs(rgb - bg), axis=2)
    creamy_hard = diff <= hard_tol
    visited = _flood_from_corners(creamy_hard)

    alpha = arr[:, :, 3].astype(np.int16)
    alpha[visited] = 0

    border = np.zeros_like(visited)
    border[1:, :] |= visited[:-1, :]
    border[:-1, :] |= visited[1:, :]
    border[:, 1:] |= visited[:, :-1]
    border[:, :-1] |= visited[:, 1:]
    border &= ~visited

    soft_band = np.clip((soft_tol - diff) / (soft_tol - hard_tol), 0.0, 1.0)
    feather_alpha = ((1.0 - soft_band) * 255).astype(np.int16)
    edge = border & (diff <= soft_tol) & (diff > hard_tol)
    alpha[edge] = np.minimum(alpha[edge], feather_alpha[edge])

    arr[:, :, 3] = alpha.astype(np.uint8)
    Image.fromarray(arr, "RGBA").save(dst, optimize=True)
    return int(visited.sum()), h * w


def main(argv: list[str]) -> int:
    if len(argv) < 3:
        print("usage: remove_bg.py <src> <dst>", file=sys.stderr)
        return 2
    src = Path(argv[1])
    dst = Path(argv[2])
    removed, total = remove_bg(src, dst)
    pct = 100 * removed / total
    print(f"{src.name}: removed {removed:,}/{total:,} px ({pct:.1f}%) -> {dst}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
