# Taller — Funciones en TypeScript
Individual · Duración: 90 minutos

---

## Antes de arrancar

Todo el código va en `src/index.ts` del proyecto que ya tienen configurado del taller anterior. Si no lo tienen, levántenlo desde cero siguiendo la guía de configuración.

Ejecuten con:

```bash
npm run dev

Contexto

Trabajan como desarrolladores en una startup que construye una plataforma de seguimiento de bugs y pull requests para equipos de software. El líder técnico les dejó las interfaces definidas y los datos de prueba listos. Su trabajo es implementar todas las funciones que el sistema necesita para operar.

No hay UI. Solo lógica, tipos y consola.

type Rol = "frontend" | "backend" | "fullstack" | "QA" | "DevOps";
type Nivel = "junior" | "mid" | "senior" | "lead";
type EstadoBug = "abierto" | "en revisión" | "resuelto" | "cerrado";
type Prioridad = "baja" | "media" | "alta" | "crítica";
type EstadoPR = "borrador" | "abierto" | "aprobado" | "mergeado" | "rechazado";

interface Desarrollador {
  readonly id: number;
  nombre: string;
  rol: Rol;
  nivel: Nivel;
  stack: string[];
  disponible: boolean;
  email: string;
}

interface Bug {
  readonly id: number;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: EstadoBug;
  idAsignado: number;
  fechaReporte: [number, number, number];
  reproducible: boolean;
  ambiente: "desarrollo" | "staging" | "producción";
}

interface PullRequest {
  readonly id: number;
  titulo: string;
  rama: string;
  estado: EstadoPR;
  idAutor: number;
  lineasAgregadas: number;
  lineasEliminadas: number;
  archivosModificados: number;
  revisores: number[];
}

interface Proyecto {
  readonly id: number;
  nombre: string;
  repositorio: string;
  stack: string[];
  bugs: Bug[];
  pullRequests: PullRequest[];
}

interface ResumenDev {
  nombre: string;
  rol: Rol;
  nivel: Nivel;
  bugsAsignados: number;
  bugsResueltos: number;
  prsAbiertos: number;
  disponible: boolean;
}

Datos de prueba — ya definidos, no los modifiquen

const dev1: Desarrollador = {
  id: 1,
  nombre: "Valentina Torres",
  rol: "fullstack",
  nivel: "senior",
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  disponible: true,
  email: "v.torres@devteam.co"
};

const dev2: Desarrollador = {
  id: 2,
  nombre: "Sebastián Molina",
  rol: "backend",
  nivel: "mid",
  stack: ["Node.js", "Express", "MongoDB", "Docker"],
  disponible: false,
  email: "s.molina@devteam.co"
};

const dev3: Desarrollador = {
  id: 3,
  nombre: "Camila Ríos",
  rol: "frontend",
  nivel: "junior",
  stack: ["TypeScript", "React", "CSS"],
  disponible: true,
  email: "c.rios@devteam.co"
};

const dev4: Desarrollador = {
  id: 4,
  nombre: "Andrés Peña",
  rol: "QA",
  nivel: "lead",
  stack: ["Cypress", "Jest", "Postman", "TypeScript"],
  disponible: true,
  email: "a.pena@devteam.co"
};

const equipo: Desarrollador[] = [dev1, dev2, dev3, dev4];

const bug1: Bug = {
  id: 101,
  titulo: "Login falla en Safari móvil",
  descripcion: "El botón de login no responde en Safari versión 16 en iOS",
  prioridad: "crítica",
  estado: "abierto",
  idAsignado: 1,
  fechaReporte: [12, 3, 2025],
  reproducible: true,
  ambiente: "producción"
};

const bug2: Bug = {
  id: 102,
  titulo: "Tabla de usuarios no pagina correctamente",
  descripcion: "Al pasar de la página 3 en adelante los datos se repiten",
  prioridad: "alta",
  estado: "en revisión",
  idAsignado: 3,
  fechaReporte: [18, 3, 2025],
  reproducible: true,
  ambiente: "staging"
};

const bug3: Bug = {
  id: 103,
  titulo: "Timeout en endpoint /api/reportes",
  descripcion: "El endpoint demora más de 30 segundos con más de 500 registros",
  prioridad: "alta",
  estado: "abierto",
  idAsignado: 2,
  fechaReporte: [20, 3, 2025],
  reproducible: false,
  ambiente: "producción"
};

const bug4: Bug = {
  id: 104,
  titulo: "Typo en mensaje de confirmación",
  descripcion: "Dice 'guardardo' en vez de 'guardado'",
  prioridad: "baja",
  estado: "resuelto",
  idAsignado: 3,
  fechaReporte: [22, 3, 2025],
  reproducible: true,
  ambiente: "desarrollo"
};

const bug5: Bug = {
  id: 105,
  titulo: "Memory leak en dashboard de métricas",
  descripcion: "El componente no libera suscripciones al desmontar",
  prioridad: "crítica",
  estado: "abierto",
  idAsignado: 1,
  fechaReporte: [25, 3, 2025],
  reproducible: true,
  ambiente: "producción"
};

const pr1: PullRequest = {
  id: 201,
  titulo: "feat: autenticación con Google OAuth",
  rama: "feature/google-oauth",
  estado: "abierto",
  idAutor: 1,
  lineasAgregadas: 320,
  lineasEliminadas: 45,
  archivosModificados: 8,
  revisores: [2, 4]
};

const pr2: PullRequest = {
  id: 202,
  titulo: "fix: corregir paginación en tabla de usuarios",
  rama: "fix/paginacion-usuarios",
  estado: "aprobado",
  idAutor: 3,
  lineasAgregadas: 28,
  lineasEliminadas: 15,
  archivosModificados: 2,
  revisores: [1]
};

const pr3: PullRequest = {
  id: 203,
  titulo: "refactor: optimizar queries de reportes",
  rama: "refactor/queries-reportes",
  estado: "borrador",
  idAutor: 2,
  lineasAgregadas: 180,
  lineasEliminadas: 210,
  archivosModificados: 5,
  revisores: []
};

const pr4: PullRequest = {
  id: 204,
  titulo: "chore: actualizar dependencias Q1 2025",
  rama: "chore/deps-q1",
  estado: "rechazado",
  idAutor: 4,
  lineasAgregadas: 12,
  lineasEliminadas: 12,
  archivosModificados: 1,
  revisores: [1, 2]
};

const proyecto: Proyecto = {
  id: 1,
  nombre: "DevTrack Platform",
  repositorio: "https://github.com/devteam/devtrack",
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
  bugs: [bug1, bug2, bug3, bug4, bug5],
  pullRequests: [pr1, pr2, pr3, pr4]
};

Lo que deben implementar

A partir de aquí todo es suyo. Implementen cada función respetando la firma indicada. No pueden cambiar los tipos de los parámetros ni del retorno.

Bloque 1 — Funciones de utilidad

Usar: function declaration

1.1

Recibe una fecha como tupla [día, mes, año] y retorna un string con formato legible.

1.2

Recibe un Desarrollador y retorna un string con su presentación:

Nivel en mayúsculas
Nombre
Rol
Estado de disponibilidad
1.3

Recibe un Bug y retorna true si:

Prioridad es alta o crítica
Estado no es resuelto ni cerrado
Ambiente es staging o producción
1.4

Recibe un PullRequest y clasifica su tamaño:

Pequeño
Mediano
Grande
Bloque 2 — Búsqueda y filtrado

Usar: arrow functions con llaves {}

2.1

Filtrar desarrolladores disponibles.

2.2

Filtrar bugs por estado.

2.3

Obtener bugs asignados a un desarrollador por id.

2.4

Obtener pull requests sin revisores.

2.5

Buscar desarrolladores por tecnología en su stack.

Bloque 3 — Arrow functions de una línea

Sin llaves y sin return

3.1

Retornar true si el desarrollador es senior o lead.

3.2

Retornar título en mayúsculas si el bug es crítico, si no normal.

3.3

Retornar true si el PR está aprobado y tiene revisores.

3.4

Retornar el nombre de un desarrollador por id o un mensaje si no existe.

Bloque 4 — Construcción y cálculo

Libre (justificar elección)

4.1

Construir un ResumenDev con:

Datos básicos
Cantidad de bugs asignados
Bugs resueltos
PRs abiertos
Disponibilidad
4.2

Contar bugs por estado:

abiertos
enRevision
resueltos
cerrados
4.3

Obtener todas las tecnologías del equipo sin repetir.

4.4

Imprimir un reporte del proyecto en consola con:

Información general
Lista de bugs
Lista de pull requests

Debe reutilizar funciones ya creadas.

Bloque 5 — Auditoría
5.1

Generar alertas sobre bugs:

Bugs críticos abiertos en producción
Bugs no reproducibles abiertos
Desarrolladores con muchos bugs abiertos
Bugs en revisión con dev no disponible
5.2

Generar alertas sobre pull requests:

PRs abiertos sin revisores
PRs aprobados muy grandes
PRs cuyo autor no está disponible

Restricciones
No usar any
Todo debe estar tipado
Respetar tipo de función por bloque
Reutilizar lógica existente
Proyecto debe compilar y ejecutar sin errores