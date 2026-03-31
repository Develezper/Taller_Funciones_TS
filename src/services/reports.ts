import type { Bug, BugStatusCount, Developer, DeveloperSummary, Project, PullRequest } from "../models";
import { getBugsByDeveloperId } from "./filters";
import { getDeveloperNameById } from "./shortcuts";
import { classifyPullRequestSize, formatDate, isPriorityActiveBug } from "./utils";

export interface ProjectReportData {
  generalInfo: {
    nombre: string;
    repositorio: string;
    stackProyecto: string;
    tecnologiasEquipo: string;
    bugsPorEstado: string;
  };
  developerSummaryLines: string[];
  bugLines: string[];
  pullRequestLines: string[];
}

// 4.1 Build a summary for a developer based on project bugs and pull requests.
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

// 4.2 Count bugs grouped by status.
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

// 4.3 Get all unique technologies used by the team.
export function getUniqueTeamTechnologies(developers: Developer[]): string[] {
  return Array.from(new Set(developers.flatMap((developer) => developer.stack))).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

function formatBugLine(bug: Bug, developers: Developer[]): string {
  // Build one compact line per bug for the console report.
  const assignedDeveloperName = getDeveloperNameById(developers, bug.idAsignado);
  const formattedDate = formatDate(bug.fechaReporte);
  const priorityLabel = isPriorityActiveBug(bug) ? "Prioritario activo" : "Normal";
  return `#${bug.id} | ${bug.titulo} | ${bug.estado} | ${bug.prioridad} | ${priorityLabel} | ${bug.ambiente} | Asignado: ${assignedDeveloperName} | Fecha: ${formattedDate}`;
}

function formatPullRequestLine(pullRequest: PullRequest, developers: Developer[]): string {
  // Build one compact line per pull request for the console report.
  const authorName = getDeveloperNameById(developers, pullRequest.idAutor);
  const prSize = classifyPullRequestSize(pullRequest);
  return `#${pullRequest.id} | ${pullRequest.titulo} | ${pullRequest.estado} | Tamaño: ${prSize} | Autor: ${authorName} | Revisores: ${pullRequest.revisores.length}`;
}

// 4.4 Build a full project report structure, reusing existing functions.
export function buildProjectReport(project: Project, developers: Developer[]): ProjectReportData {
  const bugStatusCount = countBugsByStatus(project.bugs);
  const uniqueTechnologies = getUniqueTeamTechnologies(developers);
  const developerSummaryLines = developers.map((developer) => {
    const summary = buildDeveloperSummary(developer, project);
    const availability = summary.disponible ? "Disponible" : "No disponible";
    return `${summary.nombre} (${summary.nivel} ${summary.rol}) | Bugs asignados: ${summary.bugsAsignados} | Bugs resueltos: ${summary.bugsResueltos} | PRs abiertos: ${summary.prsAbiertos} | ${availability}`;
  });
  const bugLines = project.bugs.map((bug) => formatBugLine(bug, developers));
  const pullRequestLines = project.pullRequests.map((pullRequest) => formatPullRequestLine(pullRequest, developers));

  return {
    generalInfo: {
      nombre: project.nombre,
      repositorio: project.repositorio,
      stackProyecto: project.stack.join(", "),
      tecnologiasEquipo: uniqueTechnologies.join(", "),
      bugsPorEstado: `abiertos: ${bugStatusCount.abiertos}, en revisión: ${bugStatusCount.enRevision}, resueltos: ${bugStatusCount.resueltos}, cerrados: ${bugStatusCount.cerrados}`
    },
    developerSummaryLines,
    bugLines,
    pullRequestLines
  };
}
