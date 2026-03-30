// Core domain types
export type Role = "frontend" | "backend" | "fullstack" | "QA" | "DevOps";
export type Level = "junior" | "mid" | "senior" | "lead";
export type BugStatus = "abierto" | "en revisión" | "resuelto" | "cerrado";
export type Priority = "baja" | "media" | "alta" | "crítica";
export type PullRequestStatus = "borrador" | "abierto" | "aprobado" | "mergeado" | "rechazado";
export type ReportDate = [number, number, number];

export interface Developer {
  readonly id: number;
  nombre: string;
  rol: Role;
  nivel: Level;
  stack: string[];
  disponible: boolean;
  email: string;
}

export interface Bug {
  readonly id: number;
  titulo: string;
  descripcion: string;
  prioridad: Priority;
  estado: BugStatus;
  idAsignado: number;
  fechaReporte: ReportDate;
  reproducible: boolean;
  ambiente: "desarrollo" | "staging" | "producción";
}

export interface PullRequest {
  readonly id: number;
  titulo: string;
  rama: string;
  estado: PullRequestStatus;
  idAutor: number;
  lineasAgregadas: number;
  lineasEliminadas: number;
  archivosModificados: number;
  revisores: number[];
}

export interface Project {
  readonly id: number;
  nombre: string;
  repositorio: string;
  stack: string[];
  bugs: Bug[];
  pullRequests: PullRequest[];
}

export interface DeveloperSummary {
  nombre: string;
  rol: Role;
  nivel: Level;
  bugsAsignados: number;
  bugsResueltos: number;
  prsAbiertos: number;
  disponible: boolean;
}
