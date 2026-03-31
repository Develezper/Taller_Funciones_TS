import type { Developer, Project, PullRequest } from "../models";
import { filterBugsByStatus, getBugsByDeveloperId, getPullRequestsWithoutReviewers } from "./filters";
import { getDeveloperNameById } from "./shortcuts";
import { classifyPullRequestSize } from "./utils";

// Threshold used to flag developers with too many open bugs.
const MANY_OPEN_BUGS_THRESHOLD = 2;

function totalLinesChanged(pullRequest: PullRequest): number {
  // Added + deleted lines as a simple size metric.
  return pullRequest.lineasAgregadas + pullRequest.lineasEliminadas;
}

// 5.1 Generate bug-related audit alerts.
export function generateBugAlerts(project: Project, developers: Developer[]): string[] {
  const alerts: string[] = [];
  const openBugs = filterBugsByStatus(project.bugs, "abierto");
  const reviewBugs = filterBugsByStatus(project.bugs, "en revisión");

  openBugs
    .filter((bug) => bug.prioridad === "crítica" && bug.ambiente === "producción")
    .forEach((bug) => alerts.push(`Bug crítico abierto en producción: #${bug.id} - ${bug.titulo}`));

  openBugs
    .filter((bug) => !bug.reproducible)
    .forEach((bug) => alerts.push(`Bug abierto no reproducible: #${bug.id} - ${bug.titulo}`));

  developers.forEach((developer) => {
    const openBugsByDeveloper = getBugsByDeveloperId(openBugs, developer.id);
    if (openBugsByDeveloper.length >= MANY_OPEN_BUGS_THRESHOLD) {
      alerts.push(
        `Desarrollador con muchos bugs abiertos (>= ${MANY_OPEN_BUGS_THRESHOLD}): ${developer.nombre} (${openBugsByDeveloper.length})`
      );
    }
  });

  reviewBugs.forEach((bug) => {
    const assignedDeveloper = developers.find((developer) => developer.id === bug.idAsignado);
    if (assignedDeveloper && !assignedDeveloper.disponible) {
      alerts.push(
        `Bug en revisión con desarrollador no disponible: #${bug.id} - ${bug.titulo} (Asignado a ${assignedDeveloper.nombre})`
      );
    }
  });

  return alerts;
}

// 5.2 Generate pull request-related audit alerts.
export function generatePullRequestAlerts(project: Project, developers: Developer[]): string[] {
  const alerts: string[] = [];
  const pullRequestsWithoutReviewers = getPullRequestsWithoutReviewers(project.pullRequests);

  pullRequestsWithoutReviewers
    .filter((pullRequest) => pullRequest.estado === "abierto")
    .forEach((pullRequest) => alerts.push(`PR abierto sin revisores: #${pullRequest.id} - ${pullRequest.titulo}`));

  project.pullRequests
    .filter((pullRequest) => pullRequest.estado === "aprobado")
    .filter((pullRequest) => classifyPullRequestSize(pullRequest) === "Grande")
    .forEach((pullRequest) =>
      alerts.push(
        `PR aprobado muy grande: #${pullRequest.id} - ${pullRequest.titulo} (${totalLinesChanged(pullRequest)} líneas modificadas)`
      )
    );

  project.pullRequests.forEach((pullRequest) => {
    const author = developers.find((developer) => developer.id === pullRequest.idAutor);
    if (author && !author.disponible) {
      alerts.push(
        `PR con autor no disponible: #${pullRequest.id} - ${pullRequest.titulo} (Autor: ${getDeveloperNameById(
          developers,
          pullRequest.idAutor
        )})`
      );
    }
  });

  return alerts;
}

export function generateAuditAlerts(project: Project, developers: Developer[]): {
  bugAlerts: string[];
  pullRequestAlerts: string[];
  allAlerts: string[];
} {
  const bugAlerts = generateBugAlerts(project, developers);
  const pullRequestAlerts = generatePullRequestAlerts(project, developers);
  return {
    bugAlerts,
    pullRequestAlerts,
    allAlerts: [...bugAlerts, ...pullRequestAlerts]
  };
}
