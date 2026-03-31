import type { Bug, Developer, PullRequest, ReportDate } from "../models";

export type PullRequestSize = "Pequeño" | "Mediano" | "Grande";

// 1.1 Receive a date tuple [day, month, year] and return a readable string.
export function formatDate(date: ReportDate): string {
  const [day, month, year] = date;
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}/${mm}/${year}`;
}

// 1.2 Receive a developer and return a profile string.
export function formatDeveloperProfile(developer: Developer): string {
  const availability = developer.disponible ? "Disponible" : "No disponible";
  return `${developer.nivel.toUpperCase()} | ${developer.nombre} | ${developer.rol} | ${availability}`;
}

// 1.3 Return true if bug is high/critical, still active, and in staging/production.
export function isPriorityActiveBug(bug: Bug): boolean {
  const isHighOrCriticalPriority = bug.prioridad === "alta" || bug.prioridad === "crítica";
  const isNotResolvedOrClosed = bug.estado !== "resuelto" && bug.estado !== "cerrado";
  const isStagingOrProduction = bug.ambiente === "staging" || bug.ambiente === "producción";
  return isHighOrCriticalPriority && isNotResolvedOrClosed && isStagingOrProduction;
}

// 1.4 Classify pull request size as small, medium, or large.
export function classifyPullRequestSize(pullRequest: PullRequest): PullRequestSize {
  const totalLinesChanged = pullRequest.lineasAgregadas + pullRequest.lineasEliminadas;
  if (totalLinesChanged <= 80) return "Pequeño";
  if (totalLinesChanged <= 250) return "Mediano";
  return "Grande";
}
