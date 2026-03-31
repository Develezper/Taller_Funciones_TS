import { bug1, bug2, dev1, equipo, pr1, pr2, proyecto } from "./data";
import * as services from "./services";

const formatList = (items: string[]): string => (items.length ? items.join(", ") : "Sin resultados");
const yesNo = (value: boolean): string => (value ? "Sí" : "No");

const printSection = (title: string): void => {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
};

const printItem = (label: string, value: string): void => {
  console.log(`${label}: ${value}`);
};

const printBulletList = (items: string[]): void => {
  items.forEach((item) => console.log(`- ${item}`));
};

console.clear();
console.log("Taller - Funciones en TypeScript");

printSection("1. Utilidades");
printItem("1.1 Fecha bug1", services.formatDate(bug1.fechaReporte));
printItem("1.2 Perfil dev1", services.formatDeveloperProfile(dev1));
printItem("1.3 ¿Bug2 prioritario y activo?", yesNo(services.isPriorityActiveBug(bug2)));
printItem("1.4 Tamaño PR pr1", services.classifyPullRequestSize(pr1));

printSection("2. Búsqueda y filtrado");
printItem("2.1 Disponibles", formatList(services.filterAvailableDevelopers(equipo).map((dev) => dev.nombre)));
printItem("2.2 Bugs abiertos", formatList(services.filterBugsByStatus(proyecto.bugs, "abierto").map((bug) => bug.titulo)));
printItem("2.3 Bugs del dev 1", formatList(services.getBugsByDeveloperId(proyecto.bugs, 1).map((bug) => bug.titulo)));
printItem(
  "2.4 PRs sin revisores",
  formatList(services.getPullRequestsWithoutReviewers(proyecto.pullRequests).map((pr) => pr.titulo))
);
printItem("2.5 Con TypeScript", formatList(services.findDevelopersByTechnology(equipo, "TypeScript").map((dev) => dev.nombre)));

printSection("3. Arrow de una línea");
printItem("3.1 ¿Dev1 es senior o lead?", yesNo(services.isSeniorOrLead(dev1)));
printItem("3.2 Título bug1", services.getBugTitleByPriority(bug1));
printItem("3.3 ¿PR2 aprobado con revisores?", yesNo(services.isApprovedPullRequestWithReviewers(pr2)));
printItem("3.4 Nombre dev id 3", services.getDeveloperNameById(equipo, 3));
printItem("3.4 Nombre dev id 99", services.getDeveloperNameById(equipo, 99));

const summaryDev1 = services.buildDeveloperSummary(dev1, proyecto);
const bugStatusCount = services.countBugsByStatus(proyecto.bugs);
const uniqueTech = services.getUniqueTeamTechnologies(equipo);

printSection("4. Construcción y cálculo");
printItem(
  "4.1 Resumen dev1",
  `${summaryDev1.nombre} | bugs asignados: ${summaryDev1.bugsAsignados} | bugs resueltos: ${summaryDev1.bugsResueltos} | PRs abiertos: ${summaryDev1.prsAbiertos}`
);
printItem(
  "4.2 Conteo por estado",
  `abiertos: ${bugStatusCount.abiertos}, en revisión: ${bugStatusCount.enRevision}, resueltos: ${bugStatusCount.resueltos}, cerrados: ${bugStatusCount.cerrados}`
);
printItem("4.3 Tecnologías únicas", formatList(uniqueTech));
printItem("4.4 Reporte detallado", "Generado");
const projectReport = services.buildProjectReport(proyecto, equipo);

printSection("4.4 Reporte del proyecto");
console.log("4.4.1 Información general");
console.log(`- Nombre: ${projectReport.generalInfo.nombre}`);
console.log(`- Repositorio: ${projectReport.generalInfo.repositorio}`);
console.log(`- Stack del proyecto: ${projectReport.generalInfo.stackProyecto}`);
console.log(`- Tecnologías del equipo: ${projectReport.generalInfo.tecnologiasEquipo}`);
console.log(`- Bugs por estado: ${projectReport.generalInfo.bugsPorEstado}`);

console.log(`\n4.4.2 Lista de bugs (${projectReport.bugLines.length})`);
printBulletList(projectReport.bugLines);

console.log(`\n4.4.3 Lista de pull requests (${projectReport.pullRequestLines.length})`);
printBulletList(projectReport.pullRequestLines);

const auditAlerts = services.generateAuditAlerts(proyecto, equipo);

printSection("5. Auditoría");
printItem("5.1 Alertas de bugs", auditAlerts.bugAlerts.length === 0 ? "Sin alertas" : String(auditAlerts.bugAlerts.length));
printBulletList(auditAlerts.bugAlerts);
printItem(
  "5.2 Alertas de pull requests",
  auditAlerts.pullRequestAlerts.length === 0 ? "Sin alertas" : String(auditAlerts.pullRequestAlerts.length)
);
printBulletList(auditAlerts.pullRequestAlerts);
