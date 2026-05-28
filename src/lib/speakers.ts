export interface Speaker {
  id: string;
  name: string;
  role: string;
  area: "Backend" | "Design Eng" | "Frontend" | "Infra";
  /** Initials shown as fallback when the photo fails to load */
  initials: string;
  /** Path to the speaker portrait under /public */
  photo?: string;
  /** Section number "01"..."04" used in the talks detail */
  num: string;
  /** Title of the career talk */
  talkTitle: string;
  /** One-sentence pitch under the talk title */
  talkPitch: string;
  /** Bulleted key points the speaker wants to cover */
  keyPoints: string[];
}

export const SPEAKERS: Speaker[] = [
  {
    id: "ignacio-rueda",
    name: "Ignacio Rueda",
    role: "Backend Engineer",
    area: "Backend",
    initials: "IR",
    photo: "/ignacio.png",
    num: "01",
    talkTitle: "Cómo evoluciona realmente el backend en una startup",
    talkPitch:
      "El recorrido honesto de un backend desde el MVP hasta lo que se rompe en producción.",
    keyPoints: [
      "El hype de los microservicios — qué se compra realmente",
      "Empezar simple: MVC y por qué basta más tiempo del que crees",
      "Cuándo MVC ya no alcanza y empieza a dolerte el código",
      "Arquitectura hexagonal: el verdadero salto de calidad",
      "Monolito modular — el sweet spot que casi nadie te cuenta",
      "Sidecar services: extender sin romper lo que funciona",
      "Cuándo subes a la nube de verdad (y cuándo no)",
      "Tips para tu carrera: startup vs. consultora",
    ],
  },
  {
    id: "shiara-arauzo",
    name: "Shiara Arauzo",
    role: "Design Engineer",
    area: "Design Eng",
    initials: "SA",
    photo: "/shiara.png",
    num: "02",
    talkTitle: "Construye con propósito",
    talkPitch:
      "Cuestionar features, entender el negocio y diseñar interfaces que sí funcionan con usuarios reales.",
    keyPoints: [
      "Cuestionar features y el camino del usuario: ¿cuál es el objetivo real?",
      "Tener un checklist propio: entender el core del negocio antes de tocar Figma",
      "Interfaz ‘técnicamente correcta’ vs. interfaz que la gente entiende — caso práctico",
      "Testing con usuarios: lo que dicen vs. lo que hacen",
      "Feedback visual: microinteracciones, accesibilidad y jerarquías",
      "Decisiones de UX que se ven pequeñas y cambian el producto",
      "Tips de carrera: mi primera experiencia laboral y cómo adaptarse a las mejoras con IA",
    ],
  },
  {
    id: "edward-ramos",
    name: "Edward Ramos",
    role: "Frontend Engineer",
    area: "Frontend",
    initials: "ER",
    photo: "/edward.png",
    num: "03",
    talkTitle: "Frontend en la vida real: más allá de hacer pantallas",
    talkPitch:
      "Qué hace un frontend engineer cuando el producto deja de ser una demo y empieza a tener usuarios.",
    keyPoints: [
      "El rol del frontend engineer más allá de la interfaz visual",
      "Diferencias entre proyectos académicos y software con usuarios reales",
      "Trade-offs comunes en desarrollo frontend y producto",
      "Arquitectura, performance y mantenibilidad en frontend moderno",
      "Colaboración entre frontend, backend, diseño y negocio",
      "Errores comunes al iniciar en frontend y los aprendizajes que cuestan",
      "Cómo descubrí mi interés por frontend y cómo elegir un rol dentro de software",
      "El impacto de herramientas modernas y AI en el desarrollo frontend actual",
    ],
  },
  {
    id: "nicolas-vargas",
    name: "Nicolas Vargas",
    role: "Infrastructure · Rappi",
    area: "Infra",
    initials: "NV",
    photo: "/nicolas.png",
    num: "04",
    talkTitle: "Infra más allá de los ‘servidores’ — y AI en producción",
    talkPitch:
      "Construir tranquilidad para todo el equipo: cómo se piensa la infraestructura y cómo se lleva IA a producción con confianza.",
    keyPoints: [
      "IaC — Infraestructura como código, no como tribal knowledge",
      "Costo / eficiencia — escalabilidad inteligente, no a cualquier precio",
      "Pensar productos y features con la infraestructura desde el inicio",
      "AI en producción: construir confianza y valor real (Rappi)",
      "Qué cambia en infra cuando tu producto tiene LLMs adentro",
      "Tips de carrera: del backend a la infra y del on-call al diseño de sistemas",
    ],
  },
];
