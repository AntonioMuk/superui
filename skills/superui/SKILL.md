---
name: superui
description: "Use when the user explicitly mentions SuperUI, superui, $superui, this skill, or asks to create, redesign, analyze, plan, implement, review, or improve frontend UI, web apps, landing pages, dashboards, React/Vue components, DESIGN.md, design systems, responsive layouts, visual QA, UI refactors, or frontend audits."
---

# SuperUI Controller

SuperUI is the entry-point orchestrator for frontend UI work. The controller only decides artifact paths, reads preferences, detects the current stage, routes to the smallest necessary child skill, and checks completion artifacts. Analysis, design, planning, implementation, and review are delegated to child skills.

## Hard Trigger

If the user explicitly mentions `SuperUI`, `superui`, `$superui`, `this skill`, or asks to call/use SuperUI, load this skill before doing frontend work.

## Startup Order

1. Read `skills/superui-shared/OUTPUT_POLICY.md` and determine `<ARTIFACT_ROOT>`.
2. Read user-level preferences; if unavailable, read `skills/superui-shared/USER_PREFERENCES.md` only as a template.
3. Inspect existing artifacts under `<ARTIFACT_ROOT>/` and resume from the right stage.
4. Route to the smallest necessary child skill.
5. Read `skills/superui-shared/TASK_MANAGEMENT.md`; create or update `<ARTIFACT_ROOT>/todo.md`, `progress.md`, and `pipeline-status.md`.
6. After each child skill finishes, check required artifacts and update the structured checklist plus `pipeline-status.md`.

## Load Shared Files On Demand

Do not preload the whole `skills/superui-shared/` directory.

| File | When to read |
|------|--------------|
| `OUTPUT_POLICY.md` | Start of every SuperUI task |
| `TASK_MANAGEMENT.md` | Start, stage transition, resume, or final handoff |
| `USER_PREFERENCES.md` | Only when user-level preferences are unavailable |
| `DESIGN_INTELLIGENCE.md` | Creating DESIGN.md or reviewing style, industry, trust, or anti-patterns |
| `DESIGN_HANDOFF_CHECKLIST.md` | Planning, Plan Gate, or design handoff completeness disputes |
| `ENGINEERING_GATES.md` | Planning, review, and TDD handoff |
| `RESPONSIVE_RULES.md` | Implementation or Code Gate responsive checks |
| `rubric-locked.md` | Review stage |

`DESIGN_HANDOFF_CHECKLIST.md` and `ENGINEERING_GATES.md` are checks only. They must not invent design parameters outside `DESIGN.md`. If design information is missing, return to `superui-design-md` or mark the gap as pending confirmation.

## Structured Checklist

SuperUI must work across agent ecosystems instead of relying on one platform-specific todo tool.

- Portable files: `<ARTIFACT_ROOT>/todo.md`, `progress.md`, `pipeline-status.md`.
- Native sync: if the current agent has TodoWrite, plan, task list, memory, or issue tools, mirror the same tasks there first. The portable files remain the cross-agent recovery source.
- Status words: `pending`, `in_progress`, `blocked`, `done`; keep at most one `in_progress` unless explicit parallel subagents are available.
- Progress ledger: record auditable task status, evidence, necessary tradeoffs, and blockers in `progress.md`. Do not record or expose private chain-of-thought.
- Completion rule: do not claim a stage or task is complete until the checkbox, `progress.md`, and required validation evidence are updated.

## Routing

| User intent | Route |
|-------------|-------|
| Analyze an existing frontend project or extract a design system | `superui-source-analyzer` |
| Generate or update DESIGN.md, design tokens, or style guide | `superui-design-md` |
| Produce proposal, specs, or test plan | `superui-planner` |
| Implement frontend code with TDD | `superui-tdd` |
| Review, QA, Plan Gate, or Code Gate | `superui-review` |
| New complete UI project | `superui-design-md` -> `superui-planner` -> `superui-review` (Plan Gate) -> `superui-tdd` -> `superui-review` (Code Gate) |
| Existing UI refactor | `superui-source-analyzer` -> `superui-design-md` -> `superui-planner` -> `superui-review` (Plan Gate) -> `superui-tdd` -> `superui-review` (Code Gate) |

If the user explicitly asks to skip a stage, execute the target stage. Backfill missing prerequisites only when truly blocking.

## Stage Recovery

Use artifact existence to infer progress:

| Artifact | Stage |
|----------|-------|
| `analysis/layout.md`, `analysis/interaction.md`, `analysis/style.md` | Source analysis complete |
| `DESIGN.md`, `preview.html`, `preview-dark.html` | Design spec complete |
| `determination-report.md`, `proposal.md` or `design-proposal.md`, `test-plan.md` | Planning complete |
| `design-adjustments.md` or code diff | Implementation complete |
| `review/improvement-plan.md` | Review complete or rework pending |

When resuming, briefly state: `Detected <artifact>; continuing with <stage>`.

## Preference Memory

- Record only stable long-term UI preferences explicitly stated by the user.
- Do not record one-off task requirements.
- Prefer `~/.superui/USER_PREFERENCES.md`; platform-specific paths such as `~/.codex/superui/USER_PREFERENCES.md` or `~/.claude/superui/USER_PREFERENCES.md` are acceptable.
- If user-level paths are not writable, write `<target_project>/.superui/preferences.local.md`.
- Never write personal preferences back into the shared template in this repository.

## Artifact Root

Use `OUTPUT_POLICY.md` as the source of truth. Usual order:

1. User-specified directory.
2. `<target_project>/.superui/<project>/` when a target project exists.
3. `<current_workspace>/outputs/<project>/` when no target project is known.

Report the current `<ARTIFACT_ROOT>` at the start of each major stage.

## Gates

- **Plan Gate**: trigger `superui-review` after `proposal.md` or `design-proposal.md` is produced.
- **Code Gate**: trigger `superui-review` after code and tests are produced.

If a gate fails, use `review/improvement-plan.md` to return to planning or implementation. Core conflicts go to `review/review-conflicts.json` for human decision.

## Failure Handling

| Situation | Handling |
|-----------|----------|
| Child skill fails | Report cause and offer retry, fallback, or pause |
| Missing prerequisite artifact | Route to the child skill that creates it |
| User changes direction | Re-evaluate intent, `<ARTIFACT_ROOT>`, and route |
| User-level preference path is not writable | Write project-local private preferences |

## Tools

Prefer `rg`, `rg --files`, directory listings, and the current runtime skill-loading mechanism. Maintain `<ARTIFACT_ROOT>/pipeline-status.md` for complex workflows.
