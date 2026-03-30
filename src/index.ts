import { bug1, bug2, dev1, equipo, pr1, pr2, proyecto } from "./data";
import { trackerAudits } from "./tracker-audits";
import { trackerFilters } from "./tracker-filters";
import { trackerReports } from "./tracker-reports";
import { trackerShortcuts } from "./tracker-shortcuts";
import { trackerUtils } from "./tracker-utils";

const formatList = (items: string[]): string => (items.length ? items.join(" | ") : "Sin resultados");
const yesNo = (value: boolean): string => (value ? "Sí" : "No");

console.log("=== Taller - Funciones en TypeScript ===");

console.log("\n[1] Utilidades");
console.log(`1.1 Fecha bug1: ${trackerUtils.formatDate(bug1.fechaReporte)}`);
console.log(`1.2 Perfil dev1: ${trackerUtils.formatDeveloperProfile(dev1)}`);
console.log(`1.3 ¿Bug2 prioritario y activo?: ${yesNo(trackerUtils.isPriorityActiveBug(bug2))}`);
console.log(`1.4 Tamaño PR pr1: ${trackerUtils.classifyPullRequestSize(pr1)}`);

console.log("\n[2] Búsqueda y filtrado");
console.log(`2.1 Disponibles: ${formatList(trackerFilters.filterAvailableDevelopers(equipo).map((dev) => dev.nombre))}`);
console.log(
  `2.2 Bugs abiertos: ${formatList(trackerFilters.filterBugsByStatus(proyecto.bugs, "abierto").map((bug) => bug.titulo))}`
);
console.log(
  `2.3 Bugs del dev 1: ${formatList(trackerFilters.getBugsByDeveloperId(proyecto.bugs, 1).map((bug) => bug.titulo))}`
);
console.log(
  `2.4 PRs sin revisores: ${formatList(
    trackerFilters.getPullRequestsWithoutReviewers(proyecto.pullRequests).map((pr) => pr.titulo)
  )}`
);
console.log(
  `2.5 Con TypeScript: ${formatList(
    trackerFilters.findDevelopersByTechnology(equipo, "TypeScript").map((dev) => dev.nombre)
  )}`
);

console.log("\n[3] Arrow de una línea");
console.log(`3.1 ¿Dev1 es senior o lead?: ${yesNo(trackerShortcuts.isSeniorOrLead(dev1))}`);
console.log(`3.2 Título bug1: ${trackerShortcuts.getBugTitleByPriority(bug1)}`);
console.log(`3.3 ¿PR2 aprobado con revisores?: ${yesNo(trackerShortcuts.isApprovedPullRequestWithReviewers(pr2))}`);
console.log(`3.4 Nombre dev id 3: ${trackerShortcuts.getDeveloperNameById(equipo, 3)}`);
console.log(`3.4 Nombre dev id 99: ${trackerShortcuts.getDeveloperNameById(equipo, 99)}`);

console.log("\n[4] Construcción y cálculo");
console.log("4.1 Resumen dev1:", trackerReports.buildDeveloperSummary(dev1, proyecto));
console.log("4.2 Conteo por estado:", trackerReports.countBugsByStatus(proyecto.bugs));
console.log(`4.3 Tecnologías únicas: ${formatList(trackerReports.getUniqueTeamTechnologies(equipo))}`);
trackerReports.printProjectReport(proyecto, equipo);

const auditAlerts = trackerAudits.generateAuditAlerts(proyecto, equipo);

console.log("\n[5] Auditoría");
console.log("5.1 Alertas de bugs:");
if (auditAlerts.bugAlerts.length === 0) {
  console.log("- Sin alertas de bugs.");
} else {
  auditAlerts.bugAlerts.forEach((alert) => console.log(`- ${alert}`));
}

console.log("5.2 Alertas de pull requests:");
if (auditAlerts.pullRequestAlerts.length === 0) {
  console.log("- Sin alertas de pull requests.");
} else {
  auditAlerts.pullRequestAlerts.forEach((alert) => console.log(`- ${alert}`));
}
