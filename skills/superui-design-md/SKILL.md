---
name: superui-design-md
description: "Use when the user explicitly mentions superui-design-md, $superui-design-md, DESIGN.md, design tokens, design system, UI style guide, visual language, component rules, responsive behavior, light/dark HTML previews, or asks to create/update a frontend design specification from source analysis, user descriptions, brand references, or SuperUI preferences."
---

# DESIGN.md Generator

Convert design intent, source evidence, and user preferences into an AI-executable `DESIGN.md` plus preview files.

## Core Rules

- Follow the Google Stitch-style `DESIGN.md` structure: machine-readable YAML token frontmatter plus human-readable Markdown rationale.
- Read `skills/superui-shared/DESIGN_INTELLIGENCE.md` before creating tokens.
- Add an `Interaction Loop` section covering CRUD loops, feedback, operation dependencies, and error handling.
- Write artifacts to `<ARTIFACT_ROOT>/`: `DESIGN.md`, `preview.html`, and `preview-dark.html`.
- Treat long-term preferences as soft constraints; current explicit user instructions take priority.
- Try `npx @google/design.md lint DESIGN.md`; if unavailable, continue and record the skipped lint.
- Read `skills/superui-shared/TASK_MANAGEMENT.md`; update `todo.md`, append design decisions and lint evidence to `progress.md`, and update `pipeline-status.md`.

## Workflow

1. Load input source:
   - If analysis exists, read `analysis/layout.md`, `analysis/interaction.md`, and `analysis/style.md`.
   - If the user gave a direct description, extract style, layout, color, and interaction requirements.
2. Run design intelligence:
   - Determine product type, audience, primary job, density, trust level, platform, brand posture, and anti-patterns.
   - When under-specified, check for local `ui-ux-pro-max-skill` and use it as optional advisory input only.
3. Select examples only when needed:
   - Use `rg --files examples/design-md` or example READMEs to find candidates.
   - Read at most 1-2 relevant examples and only relevant sections.
   - Extract structure and expression patterns; never copy brand values or assets.
4. Generate `DESIGN.md` using `templates/DESIGN.md.template.md`.
5. Generate `preview.html` and `preview-dark.html`.
6. Run or skip lint and record evidence.

## DESIGN.md Requirements

YAML token frontmatter must include:

- colors: primary, functional colors, and at least 8 neutral steps
- typography: display, title, body, and caption levels with fallback fonts
- spacing: 4px-based scale from small to large
- borderRadius: none, sm, md, lg, xl, full
- shadows: sm, md, lg, xl
- breakpoints: at least sm, md, lg, xl, 2xl

Markdown body must include:

1. Overview
2. Design Intelligence
3. Colors
4. Typography
5. Layout
6. Elevation & Depth
7. Shapes
8. Components
9. Interaction Loop
10. Do's and Don'ts
11. Responsive Behavior
12. Agent Prompt Guidelines
13. Design Handoff Checklist

## Previews

`preview.html` and `preview-dark.html` must be standalone HTML files with inline CSS and no external dependencies. At minimum, show color swatches, typography samples, and button states. Add inputs, cards, and spacing visualization when complexity justifies it.

## Output

Write:

- `<ARTIFACT_ROOT>/DESIGN.md`
- `<ARTIFACT_ROOT>/preview.html`
- `<ARTIFACT_ROOT>/preview-dark.html`
- `<ARTIFACT_ROOT>/todo.md`
- `<ARTIFACT_ROOT>/progress.md`
- `<ARTIFACT_ROOT>/pipeline-status.md`

## Tools

- `@google/design.md` CLI when available
- `examples/design-md/` only as on-demand references
- `templates/DESIGN.md.template.md`
- `skills/superui-shared/DESIGN_INTELLIGENCE.md`
- `skills/superui-shared/DESIGN_HANDOFF_CHECKLIST.md`
