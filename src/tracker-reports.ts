import { trackerFilters } from "./tracker-filters";
import { trackerShortcuts } from "./tracker-shortcuts";
import { trackerUtils } from "./tracker-utils";
import type { Bug, BugStatusCount, Developer, DeveloperSummary, Project, PullRequest } from "./types";

// 4.1 Build a DeveloperSummary.
export function buildDeveloperSummary(developer: Developer, project: Project): DeveloperSummary {
  const assignedBugs = trackerFilters.getBugsByDeveloperId(project.bugs, developer.id);
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

// 4.2 Count bugs by status.
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

// 4.3 Get every unique technology used by the team.
export function getUniqueTeamTechnologies(developers: Developer[]): string[] {
  return Array.from(new Set(developers.flatMap((developer) => developer.stack))).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

function formatBugLine(bug: Bug, developers: Developer[]): string {
  const assignedDeveloperName = trackerShortcuts.getDeveloperNameById(developers, bug.idAsignado);
  const formattedDate = trackerUtils.formatDate(bug.fechaReporte);
  const priorityLabel = trackerUtils.isPriorityActiveBug(bug) ? "Prioritario activo" : "Normal";
  return `#${bug.id} | ${bug.titulo} | ${bug.estado} | ${bug.prioridad} | ${priorityLabel} | ${bug.ambiente} | Asignado: ${assignedDeveloperName} | Fecha: ${formattedDate}`;
}

function formatPullRequestLine(pullRequest: PullRequest, developers: Developer[]): string {
  const authorName = trackerShortcuts.getDeveloperNameById(developers, pullRequest.idAutor);
  const prSize = trackerUtils.classifyPullRequestSize(pullRequest);
  return `#${pullRequest.id} | ${pullRequest.titulo} | ${pullRequest.estado} | Tamaño: ${prSize} | Autor: ${authorName} | Revisores: ${pullRequest.revisores.length}`;
}

// 4.4 Print a full project report in console.
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

export const trackerReports = {
  buildDeveloperSummary,
  countBugsByStatus,
  getUniqueTeamTechnologies,
  printProjectReport
};
