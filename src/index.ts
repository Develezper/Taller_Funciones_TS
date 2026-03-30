import { bug1, bug2, dev1, equipo, pr1, pr2, proyecto } from "./data";
import { trackerFilters } from "./tracker-filters";
import { trackerShortcuts } from "./tracker-shortcuts";
import { trackerUtils } from "./tracker-utils";

console.log("=== Utilidades ===");
console.log("\nFecha bug1:", trackerUtils.formatDate(bug1.fechaReporte));
console.log("\nPerfil dev1:", trackerUtils.formatDeveloperProfile(dev1));
console.log("\n¿Bug2 es prioritario y activo?:", trackerUtils.isPriorityActiveBug(bug2) ? "Sí" : "No");
console.log("\nTamaño PR pr1:", trackerUtils.classifyPullRequestSize(pr1));

console.log("\n=== Filtros ===");
console.log(
  "\n2.1 Desarrolladores disponibles:",
  trackerFilters.filterAvailableDevelopers(equipo).map((developer) => developer.nombre)
);
console.log(
  "\n2.2 Bugs abiertos:",
  trackerFilters.filterBugsByStatus(proyecto.bugs, "abierto").map((bug) => bug.titulo)
);
console.log(
  "\n2.3 Bugs asignados al dev id 1:",
  trackerFilters.getBugsByDeveloperId(proyecto.bugs, 1).map((bug) => bug.titulo)
);
console.log(
  "\n2.4 PRs sin revisores:",
  trackerFilters.getPullRequestsWithoutReviewers(proyecto.pullRequests).map((pr) => pr.titulo)
);
console.log(
  "\n2.5 Desarrolladores con TypeScript:",
  trackerFilters.findDevelopersByTechnology(equipo, "TypeScript").map((developer) => developer.nombre)
);

console.log("\n=== Arrow de una línea ===");
console.log("\n3.1 ¿Dev1 es senior o lead?:", trackerShortcuts.isSeniorOrLead(dev1) ? "Sí" : "No");
console.log("\n3.2 Título bug1 según prioridad:", trackerShortcuts.getBugTitleByPriority(bug1));
console.log(
  "\n3.3 ¿PR2 está aprobado y tiene revisores?:",
  trackerShortcuts.isApprovedPullRequestWithReviewers(pr2) ? "Sí" : "No"
);
console.log("\n3.4 Nombre para dev id 3:", trackerShortcuts.getDeveloperNameById(equipo, 3));
console.log("\n3.4 Nombre para dev id 99:", trackerShortcuts.getDeveloperNameById(equipo, 99));
