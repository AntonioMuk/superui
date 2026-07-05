---
name: superui-planner
description: "Use when the user explicitly mentions superui-planner, $superui-planner, frontend UI planning, proposal.md, design-proposal.md, specs, test-plan, component scope, implementation order, redesign versus new build decisions, risk notes, or SuperUI handoff documents from DESIGN.md."
---

# Frontend Planning

Plan frontend UI work before implementation. This skill decides whether to refactor an existing project or build a new UI, then produces implementation and test artifacts.

## Core Rules

- The three-probe decision cannot be overridden by preference. Probes 1 and 2 are objective; probe 3 is contextual.
- Record all path decisions in `determination-report.md`.
- `DESIGN.md` is the only design truth source. Plans must cite DESIGN.md tokens or rules and must not invent new design values.
- Read `skills/superui-shared/ENGINEERING_GATES.md` and include the checklist in plans and test plans.
- Read `skills/superui-shared/DESIGN_HANDOFF_CHECKLIST.md`; if design handoff is incomplete, return to `superui-design-md` or mark items as pending.
- Write artifacts to `<ARTIFACT_ROOT>/`.
- Preferences may shape tradeoffs, stack choices, density, and component library choices, but cannot override source evidence or DESIGN.md.
- Read `skills/superui-shared/TASK_MANAGEMENT.md`; update `todo.md`, append planning evidence to `progress.md`, and update `pipeline-status.md`.

## Inputs

- `<ARTIFACT_ROOT>/DESIGN.md`; if missing, route to `superui-design-md`.
- Target project directory.
  - Existing-project path: source directory to refactor.
  - New-build path: directory where the new project will be created.

## Workflow

1. Load DESIGN.md and target project information.
2. Run the three probes.
3. Choose the refactor path or new-build path.
4. Produce proposal, specs, and test plan.

## Three Probes

### Probe 1: Source Existence

Scan the target directory:

- Frontend config such as `package.json`, `vite.config.*`, `next.config.*`, or `vue.config.*` means existing-project evidence.
- `src/`, `app/`, `.vue`, `.tsx`, or `.jsx` source files mean existing-project evidence.
- Empty directories or no frontend markers mean new-build evidence.

### Probe 2: Refactor Feasibility

Run only when Probe 1 suggests an existing project.

| Check | Threshold | Result |
|-------|-----------|--------|
| Source size | Fewer than 5 component files | Refactor may not be meaningful |
| Stack compatibility | Not Vue or React | Unsupported; prefer new-build planning |
| Styling evidence | Only inline styles or no structured styling | No reliable design extraction; prefer new build |

If any check forces fallback, choose the new-build path and explain why.

### Probe 3: User Intent

Use intent keywords as contextual evidence only:

| Refactor intent | New-build intent |
|-----------------|------------------|
| refactor, optimize, redesign, migrate, upgrade, align | create, build, design, from scratch, new, blank |

If user intent conflicts with Probes 1 and 2, trust Probes 1 and 2 and explain the mismatch.

## determination-report.md

Write:

- Probe 1 result and evidence.
- Probe 2 result and evidence when applicable.
- Probe 3 intent and mismatch notes.
- Final path: existing-project refactor or new build.
- Rationale.

## Refactor Path Outputs

Produce:

- `similarity-report.md`: compare DESIGN.md with current layout, interaction, and styling.
- `proposal.md`: goals, unchanged scope, changed scope, additions, removals, sequence, risks, rollback, Engineering Gates, Design Handoff Checklist.

Reuse existing `analysis/` artifacts when present instead of re-running source analysis.

## New-Build Path Outputs

Produce:

- `requirements-clarification.md`: pages, core interactions, design requirements, pending questions.
- `design-proposal.md`: stack, directory structure, routing, token landing plan, component tree, page assembly, development order, Engineering Gates, Design Handoff Checklist.

## specs/*.md

Create behavior specs for page-level components, core DESIGN.md components, and user-specified custom components. Use GIVEN/WHEN/THEN. Use `SHALL` for required behavior and `SHOULD` for recommended behavior.

## test-plan.md

Cover:

- visual contract tests
- interaction behavior tests
- accessibility checks
- responsive breakpoints
- SuperUI Engineering Gates

## Output

Write:

- `<ARTIFACT_ROOT>/determination-report.md`
- `<ARTIFACT_ROOT>/similarity-report.md` for refactors
- `<ARTIFACT_ROOT>/proposal.md` for refactors
- `<ARTIFACT_ROOT>/requirements-clarification.md` for new builds
- `<ARTIFACT_ROOT>/design-proposal.md` for new builds
- `<ARTIFACT_ROOT>/specs/*.md`
- `<ARTIFACT_ROOT>/test-plan.md`
- `<ARTIFACT_ROOT>/todo.md`
- `<ARTIFACT_ROOT>/progress.md`
- `<ARTIFACT_ROOT>/pipeline-status.md`

## Tool Dependencies

- `superui-source-analyzer` for existing-project analysis.
- `superui-design-md` when DESIGN.md is missing or incomplete.
- `skills/superui-shared/ENGINEERING_GATES.md`.
- `skills/superui-shared/DESIGN_HANDOFF_CHECKLIST.md`.
- `skills/superui-shared/TASK_MANAGEMENT.md`.
