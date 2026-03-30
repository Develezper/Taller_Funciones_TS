import type { Bug, BugStatus, BugStatusCount, Developer, DeveloperSummary, Project, PullRequest, ReportDate } from "./models";

export type PullRequestSize = "Pequeño" | "Mediano" | "Grande";

const MANY_OPEN_BUGS_THRESHOLD = 2;

// 1.1
export function formatDate(date: ReportDate): string {
  const [day, month, year] = date;
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}/${mm}/${year}`;
}

// 1.2
export function formatDeveloperProfile(developer: Developer): string {
  const availability = developer.disponible ? "Disponible" : "No disponible";
  return `${developer.nivel.toUpperCase()} | ${developer.nombre} | ${developer.rol} | ${availability}`;
}

// 1.3
export function isPriorityActiveBug(bug: Bug): boolean {
  const isHighOrCriticalPriority = bug.prioridad === "alta" || bug.prioridad === "crítica";
  const isNotResolvedOrClosed = bug.estado !== "resuelto" && bug.estado !== "cerrado";
  const isStagingOrProduction = bug.ambiente === "staging" || bug.ambiente === "producción";
  return isHighOrCriticalPriority && isNotResolvedOrClosed && isStagingOrProduction;
}

// 1.4
export function classifyPullRequestSize(pullRequest: PullRequest): PullRequestSize {
  const totalLinesChanged = pullRequest.lineasAgregadas + pullRequest.lineasEliminadas;
  if (totalLinesChanged <= 80) return "Pequeño";
  if (totalLinesChanged <= 250) return "Mediano";
  return "Grande";
}

// 2.1
export const filterAvailableDevelopers = (developers: Developer[]): Developer[] => {
  return developers.filter((developer) => {
    return developer.disponible;
  });
};

// 2.2
export const filterBugsByStatus = (bugs: Bug[], status: BugStatus): Bug[] => {
  return bugs.filter((bug) => {
    return bug.estado === status;
  });
};

// 2.3
export const getBugsByDeveloperId = (bugs: Bug[], developerId: number): Bug[] => {
  return bugs.filter((bug) => {
    return bug.idAsignado === developerId;
  });
};

// 2.4
export const getPullRequestsWithoutReviewers = (pullRequests: PullRequest[]): PullRequest[] => {
  return pullRequests.filter((pullRequest) => {
    return pullRequest.revisores.length === 0;
  });
};

// 2.5
export const findDevelopersByTechnology = (developers: Developer[], technology: string): Developer[] => {
  return developers.filter((developer) => {
    return developer.stack.some((item) => {
      return item.toLowerCase() === technology.toLowerCase();
    });
  });
};

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

// 4.1
export function buildDeveloperSummary(developer: Developer, project: Project): DeveloperSummary {
  const assignedBugs = getBugsByDeveloperId(project.bugs, developer.id);
  const resolvedBugs = assignedBugs.filter((bug) => bug.estado === "resuelto");
  const openPullRequests = project.pullRequests.filter(
    (pullRequest) => pullRequest.idAutor === developer.id && pullRequest.estado === "abierto"
  );

  return {
    nombre: developer.nombre,
    rol: developer.rol,
    nivel: developer.nivel,
    bugsAsignados: assignedBugs.length,
    bugsResueltos: resolvedBugs.length,
    prsAbiertos: openPullRequests.length,
    disponible: developer.disponible
  };
}

// 4.2
export function countBugsByStatus(bugs: Bug[]): BugStatusCount {
  return bugs.reduce<BugStatusCount>(
    (accumulator, bug) => {
      if (bug.estado === "abierto") accumulator.abiertos += 1;
      if (bug.estado === "en revisión") accumulator.enRevision += 1;
      if (bug.estado === "resuelto") accumulator.resueltos += 1;
      if (bug.estado === "cerrado") accumulator.cerrados += 1;
      return accumulator;
    },
    { abiertos: 0, enRevision: 0, resueltos: 0, cerrados: 0 }
  );
}

// 4.3
export function getUniqueTeamTechnologies(developers: Developer[]): string[] {
  return Array.from(new Set(developers.flatMap((developer) => developer.stack))).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

function formatBugLine(bug: Bug, developers: Developer[]): string {
  const assignedDeveloperName = getDeveloperNameById(developers, bug.idAsignado);
  const formattedDate = formatDate(bug.fechaReporte);
  const priorityLabel = isPriorityActiveBug(bug) ? "Prioritario activo" : "Normal";
  return `#${bug.id} | ${bug.titulo} | ${bug.estado} | ${bug.prioridad} | ${priorityLabel} | ${bug.ambiente} | Asignado: ${assignedDeveloperName} | Fecha: ${formattedDate}`;
}

function formatPullRequestLine(pullRequest: PullRequest, developers: Developer[]): string {
  const authorName = getDeveloperNameById(developers, pullRequest.idAutor);
  const prSize = classifyPullRequestSize(pullRequest);
  return `#${pullRequest.id} | ${pullRequest.titulo} | ${pullRequest.estado} | Tamaño: ${prSize} | Autor: ${authorName} | Revisores: ${pullRequest.revisores.length}`;
}

// 4.4
export function printProjectReport(project: Project, developers: Developer[]): void {
  const bugStatusCount = countBugsByStatus(project.bugs);
  const uniqueTechnologies = getUniqueTeamTechnologies(developers);

  console.log("\n=== Reporte del proyecto ===");
  console.log(`Nombre: ${project.nombre}`);
  console.log(`Repositorio: ${project.repositorio}`);
  console.log(`Stack del proyecto: ${project.stack.join(", ")}`);
  console.log(`Tecnologías del equipo: ${uniqueTechnologies.join(", ")}`);
  console.log(
    `Bugs por estado -> abiertos: ${bugStatusCount.abiertos}, en revisión: ${bugStatusCount.enRevision}, resueltos: ${bugStatusCount.resueltos}, cerrados: ${bugStatusCount.cerrados}`
  );

  console.log("\nResumen por desarrollador:");
  developers.forEach((developer) => {
    const summary = buildDeveloperSummary(developer, project);
    const availability = summary.disponible ? "Disponible" : "No disponible";
    console.log(
      `- ${summary.nombre} (${summary.nivel} ${summary.rol}) | Bugs asignados: ${summary.bugsAsignados} | Bugs resueltos: ${summary.bugsResueltos} | PRs abiertos: ${summary.prsAbiertos} | ${availability}`
    );
  });

  console.log("\nLista de bugs:");
  project.bugs.forEach((bug) => console.log(`- ${formatBugLine(bug, developers)}`));

  console.log("\nLista de pull requests:");
  project.pullRequests.forEach((pullRequest) => console.log(`- ${formatPullRequestLine(pullRequest, developers)}`));
}

function totalLinesChanged(pullRequest: PullRequest): number {
  return pullRequest.lineasAgregadas + pullRequest.lineasEliminadas;
}

// 5.1
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

// 5.2
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

export const services = {
  formatDate,
  formatDeveloperProfile,
  isPriorityActiveBug,
  classifyPullRequestSize,
  filterAvailableDevelopers,
  filterBugsByStatus,
  getBugsByDeveloperId,
  getPullRequestsWithoutReviewers,
  findDevelopersByTechnology,
  isSeniorOrLead,
  getBugTitleByPriority,
  isApprovedPullRequestWithReviewers,
  getDeveloperNameById,
  buildDeveloperSummary,
  countBugsByStatus,
  getUniqueTeamTechnologies,
  printProjectReport,
  generateBugAlerts,
  generatePullRequestAlerts,
  generateAuditAlerts
};
