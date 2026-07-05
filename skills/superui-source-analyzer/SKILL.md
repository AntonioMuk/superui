---
name: superui-source-analyzer
description: "Use when the user explicitly mentions superui-source-analyzer, $superui-source-analyzer, source analysis, extract design system, analyze existing React/Vue/Next/Nuxt/Vite/frontend project, routes, layout structure, responsive behavior, interaction loops, design tokens, colors, typography, component styling, or evidence for DESIGN.md and SuperUI planning."
---

# Frontend Source Analyzer

Extract design and interaction evidence from an existing frontend project. This skill reads source code and writes analysis artifacts; it must not modify product code.

## Core Rules

- Read only. Write analysis artifacts under `<ARTIFACT_ROOT>/analysis/`.
- Use the `<ARTIFACT_ROOT>` passed by `superui`; do not choose a new output path.
- Every conclusion must cite source evidence with file paths and line references when available.
- Scan global structure before deep component details.
- Read `skills/superui-shared/TASK_MANAGEMENT.md`; update `todo.md`, append evidence/blockers to `progress.md`, and update `pipeline-status.md`.

## Inputs

- `project`: project name used by SuperUI to determine `<ARTIFACT_ROOT>`.
- `source_dir`: absolute path to the frontend source directory.
- `preferences`: optional long-term user preferences; they may focus analysis but must not override source evidence.

If `source_dir` is missing, ask for it before analysis.

## Workflow

1. Identify stack, build tool, routes, entry files, global styles, and token/theme files.
2. Produce `analysis/layout.md`.
3. Produce `analysis/interaction.md`.
4. Produce `analysis/style.md`.

For large projects, prioritize route files, app/layout shells, global CSS, theme/tokens, and shared components. Use `rg --files` and `rg` for targeted searches.

## layout.md

Cover:

- framework and directory overview
- route table and page-level components
- shared layout shells
- semantic page regions
- grid/list/layout patterns
- spacing and alignment
- responsive breakpoints and behavior
- dialogs, drawers, overlays, and navigation transitions

## interaction.md

Cover:

- user actions and trigger elements
- event handlers and side effects
- loading, success, error, and optimistic feedback
- CRUD loops per business entity
- operation dependencies and mutually exclusive actions

## style.md

Cover:

- styling approach: CSS variables, Tailwind, CSS Modules, SCSS, CSS-in-JS, or component library
- color tokens and semantic usage
- typography scale, font family, line height, and weights
- spacing, radius, shadow, and z-index conventions
- component styling rules for buttons, inputs, cards, navigation, dialogs, tables, and lists

## Output

Write:

- `<ARTIFACT_ROOT>/analysis/layout.md`
- `<ARTIFACT_ROOT>/analysis/interaction.md`
- `<ARTIFACT_ROOT>/analysis/style.md`
- `<ARTIFACT_ROOT>/todo.md`
- `<ARTIFACT_ROOT>/progress.md`
- `<ARTIFACT_ROOT>/pipeline-status.md`

## Tools

Use `rg --files`, `rg`, directory listings, and precise file reads. Avoid broad file dumps when targeted evidence is enough.
