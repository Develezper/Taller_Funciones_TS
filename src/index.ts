import { bug1, bug2, dev1, equipo, pr1, proyecto } from "./data";
import { trackerFilters } from "./tracker-filters";
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
