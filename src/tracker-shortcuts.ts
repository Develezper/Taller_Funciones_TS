import type { Bug, Developer, PullRequest } from "./types";

// 3.1 Return true if developer is senior or lead.
export const isSeniorOrLead = (developer: Developer): boolean =>
  developer.nivel === "senior" || developer.nivel === "lead";

// 3.2 Return bug title in uppercase if critical, otherwise keep original.
export const getBugTitleByPriority = (bug: Bug): string =>
  bug.prioridad === "crítica" ? bug.titulo.toUpperCase() : bug.titulo;

// 3.3 Return true if pull request is approved and has reviewers.
export const isApprovedPullRequestWithReviewers = (pullRequest: PullRequest): boolean =>
  pullRequest.estado === "aprobado" && pullRequest.revisores.length > 0;

// 3.4 Return developer name by id, or a message if not found.
export const getDeveloperNameById = (developers: Developer[], developerId: number): string =>
  developers.find((developer) => developer.id === developerId)?.nombre ?? "Desarrollador no encontrado";

export const trackerShortcuts = {
  isSeniorOrLead,
  getBugTitleByPriority,
  isApprovedPullRequestWithReviewers,
  getDeveloperNameById
};
