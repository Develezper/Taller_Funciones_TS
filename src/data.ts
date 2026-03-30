import type { Bug, Developer, Project, PullRequest } from "./models";

// Test data from the activity statement
export const dev1: Developer = {
  id: 1,
  nombre: "Valentina Torres",
  rol: "fullstack",
  nivel: "senior",
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  disponible: true,
  email: "v.torres@devteam.co"
};

export const dev2: Developer = {
  id: 2,
  nombre: "Sebastián Molina",
  rol: "backend",
  nivel: "mid",
  stack: ["Node.js", "Express", "MongoDB", "Docker"],
  disponible: false,
  email: "s.molina@devteam.co"
};

export const dev3: Developer = {
  id: 3,
  nombre: "Camila Ríos",
  rol: "frontend",
  nivel: "junior",
  stack: ["TypeScript", "React", "CSS"],
  disponible: true,
  email: "c.rios@devteam.co"
};

export const dev4: Developer = {
  id: 4,
  nombre: "Andrés Peña",
  rol: "QA",
  nivel: "lead",
  stack: ["Cypress", "Jest", "Postman", "TypeScript"],
  disponible: true,
  email: "a.pena@devteam.co"
};

export const equipo: Developer[] = [dev1, dev2, dev3, dev4];

export const bug1: Bug = {
  id: 101,
  titulo: "Login falla en Safari móvil",
  descripcion: "El botón de login no responde en Safari versión 16 en iOS",
  prioridad: "crítica",
  estado: "abierto",
  idAsignado: 1,
  fechaReporte: [12, 3, 2025],
  reproducible: true,
  ambiente: "producción"
};

export const bug2: Bug = {
  id: 102,
  titulo: "Tabla de usuarios no pagina correctamente",
  descripcion: "Al pasar de la página 3 en adelante los datos se repiten",
  prioridad: "alta",
  estado: "en revisión",
  idAsignado: 3,
  fechaReporte: [18, 3, 2025],
  reproducible: true,
  ambiente: "staging"
};

export const bug3: Bug = {
  id: 103,
  titulo: "Timeout en endpoint /api/reportes",
  descripcion: "El endpoint demora más de 30 segundos con más de 500 registros",
  prioridad: "alta",
  estado: "abierto",
  idAsignado: 2,
  fechaReporte: [20, 3, 2025],
  reproducible: false,
  ambiente: "producción"
};

export const bug4: Bug = {
  id: 104,
  titulo: "Typo en mensaje de confirmación",
  descripcion: "Dice 'guardardo' en vez de 'guardado'",
  prioridad: "baja",
  estado: "resuelto",
  idAsignado: 3,
  fechaReporte: [22, 3, 2025],
  reproducible: true,
  ambiente: "desarrollo"
};

export const bug5: Bug = {
  id: 105,
  titulo: "Memory leak en dashboard de métricas",
  descripcion: "El componente no libera suscripciones al desmontar",
  prioridad: "crítica",
  estado: "abierto",
  idAsignado: 1,
  fechaReporte: [25, 3, 2025],
  reproducible: true,
  ambiente: "producción"
};

export const pr1: PullRequest = {
  id: 201,
  titulo: "feat: autenticación con Google OAuth",
  rama: "feature/google-oauth",
  estado: "abierto",
  idAutor: 1,
  lineasAgregadas: 320,
  lineasEliminadas: 45,
  archivosModificados: 8,
  revisores: [2, 4]
};

export const pr2: PullRequest = {
  id: 202,
  titulo: "fix: corregir paginación en tabla de usuarios",
  rama: "fix/paginacion-usuarios",
  estado: "aprobado",
  idAutor: 3,
  lineasAgregadas: 28,
  lineasEliminadas: 15,
  archivosModificados: 2,
  revisores: [1]
};

export const pr3: PullRequest = {
  id: 203,
  titulo: "refactor: optimizar queries de reportes",
  rama: "refactor/queries-reportes",
  estado: "borrador",
  idAutor: 2,
  lineasAgregadas: 180,
  lineasEliminadas: 210,
  archivosModificados: 5,
  revisores: []
};

export const pr4: PullRequest = {
  id: 204,
  titulo: "chore: actualizar dependencias Q1 2025",
  rama: "chore/deps-q1",
  estado: "rechazado",
  idAutor: 4,
  lineasAgregadas: 12,
  lineasEliminadas: 12,
  archivosModificados: 1,
  revisores: [1, 2]
};

export const proyecto: Project = {
  id: 1,
  nombre: "DevTrack Platform",
  repositorio: "https://github.com/devteam/devtrack",
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
  bugs: [bug1, bug2, bug3, bug4, bug5],
  pullRequests: [pr1, pr2, pr3, pr4]
};
