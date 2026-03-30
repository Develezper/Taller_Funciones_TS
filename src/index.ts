import { bug1, bug2, dev1, equipo, pr1, pr2, proyecto } from "./data";
import { services } from "./services";

const formatList = (items: string[]): string => (items.length ? items.join(" | ") : "Sin resultados");
const yesNo = (value: boolean): string => (value ? "Sí" : "No");

console.log("=== Taller - Funciones en TypeScript ===");

console.log("\n[1] Utilidades");
console.log(`1.1 Fecha bug1: ${services.formatDate(bug1.fechaReporte)}`);
console.log(`1.2 Perfil dev1: ${services.formatDeveloperProfile(dev1)}`);
console.log(`1.3 ¿Bug2 prioritario y activo?: ${yesNo(services.isPriorityActiveBug(bug2))}`);
console.log(`1.4 Tamaño PR pr1: ${services.classifyPullRequestSize(pr1)}`);

console.log("\n[2] Búsqueda y filtrado");
console.log(`2.1 Disponibles: ${formatList(services.filterAvailableDevelopers(equipo).map((dev) => dev.nombre))}`);
console.log(
  `2.2 Bugs abiertos: ${formatList(services.filterBugsByStatus(proyecto.bugs, "abierto").map((bug) => bug.titulo))}`
);
console.log(
  `2.3 Bugs del dev 1: ${formatList(services.getBugsByDeveloperId(proyecto.bugs, 1).map((bug) => bug.titulo))}`
);
console.log(
  `2.4 PRs sin revisores: ${formatList(
    services.getPullRequestsWithoutReviewers(proyecto.pullRequests).map((pr) => pr.titulo)
  )}`
);
console.log(
  `2.5 Con TypeScript: ${formatList(
    services.findDevelopersByTechnology(equipo, "TypeScript").map((dev) => dev.nombre)
  )}`
);

console.log("\n[3] Arrow de una línea");
console.log(`3.1 ¿Dev1 es senior o lead?: ${yesNo(services.isSeniorOrLead(dev1))}`);
console.log(`3.2 Título bug1: ${services.getBugTitleByPriority(bug1)}`);
console.log(`3.3 ¿PR2 aprobado con revisores?: ${yesNo(services.isApprovedPullRequestWithReviewers(pr2))}`);
console.log(`3.4 Nombre dev id 3: ${services.getDeveloperNameById(equipo, 3)}`);
console.log(`3.4 Nombre dev id 99: ${services.getDeveloperNameById(equipo, 99)}`);

console.log("\n[4] Construcción y cálculo");
console.log("4.1 Resumen dev1:", services.buildDeveloperSummary(dev1, proyecto));
console.log("4.2 Conteo por estado:", services.countBugsByStatus(proyecto.bugs));
console.log(`4.3 Tecnologías únicas: ${formatList(services.getUniqueTeamTechnologies(equipo))}`);
services.printProjectReport(proyecto, equipo);

const auditAlerts = services.generateAuditAlerts(proyecto, equipo);

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
