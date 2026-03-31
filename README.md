# TypeScript Functions Workshop

This project implements the full logic for a bug and pull-request tracking scenario using TypeScript.
It is organized by domain models, test data, and service modules.

## Tech Stack

- TypeScript
- Bun runtime

## Project Structure

```text
src/
  data.ts                 # Fixed workshop test data
  main.ts                 # Entry point / console execution
  models.ts               # Types and interfaces
  services/
    index.ts              # Barrel exports for all services
    utils.ts              # Block 1 (utility functions)
    filters.ts            # Block 2 (search and filtering)
    shortcuts.ts          # Block 3 (one-line arrow functions)
    reports.ts            # Block 4 (building and reporting)
    audits.ts             # Block 5 (audit alerts)
```

## What Is Implemented

- Block 1: Utility functions (function declarations)
- Block 2: Search and filtering (arrow functions with braces)
- Block 3: One-line arrow functions (no braces, no `return`)
- Block 4: Summary building, bug counting, unique technologies, project report
- Block 5: Bug/PR audit alert generation

## Setup

Install dependencies:

```bash
bun install
```

## Run

Standard run:

```bash
bun run src/main.ts
```

Watch mode:

```bash
bun --watch src/main.ts
```

Type-check only:

```bash
bunx tsc --noEmit
```

## Notes

- The business data and status values are kept in Spanish to match the original workshop statement.
- The output format is grouped by block number (`1.1`, `2.2`, `4.4`, etc.) to make rubric validation easier.
