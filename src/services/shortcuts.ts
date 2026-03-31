import type { Bug, Developer, PullRequest } from "../models";

// 3.1
export const isSeniorOrLead = (developer: Developer): boolean => developer.nivel === "senior" || developer.nivel === "lead";

// 3.2
export const getBugTitleByPriority = (bug: Bug): string => (bug.prioridad === "crítica" ? bug.titulo.toUpperCase() : bug.titulo);

// 3.3
export const isApprovedPullRequestWithReviewers = (pullRequest: PullRequest): boolean =>
  pullRequest.estado === "aprobado" && pullRequest.revisores.length > 0;

// 3.4
export const getDeveloperNameById = (developers: Developer[], developerId: number): string =>
  developers.find((developer) => developer.id === developerId)?.nombre ?? "Desarrollador no encontrado";
