---
name: superui-tdd
description: "Use when the user explicitly mentions superui-tdd, $superui-tdd, frontend UI implementation, TDD, tests first, responsive constraints, visual contract tests, interaction tests, accessibility checks, token-based styling, or implementing UI code from DESIGN.md, proposal.md, specs, or test-plan.md."
---

# TDD Frontend Implementation

Implement frontend UI through strict test-driven development. Do not skip RED, and do not silently drift from DESIGN.md.

## Core Rules

- RED cannot be skipped: write a failing test, see it fail, then implement.
- `DESIGN.md` is the only design truth source. Colors, type, spacing, radius, and shadows must use its tokens.
- `RESPONSIVE_RULES.md` is a hard constraint. Code violating a MUST NOT rule must be rewritten.
- Any deviation from DESIGN.md must be recorded in `design-adjustments.md` with reason and fallback.
- Tests and tracking artifacts use `<ARTIFACT_ROOT>`; implementation code goes in the target project.
- Read `skills/superui-shared/TASK_MANAGEMENT.md`; update `todo.md`, append RED/GREEN/REFACTOR evidence to `progress.md`, and update `pipeline-status.md`.

## Required Inputs

| File | Source | Purpose |
|------|--------|---------|
| `DESIGN.md` | superui-design-md | tokens and design rules |
| `specs/*.md` | superui-planner | GIVEN/WHEN/THEN behavior |
| `test-plan.md` | superui-planner | test scope and standards |
| `proposal.md` or `design-proposal.md` | superui-planner | implementation order and component tree |

Read `skills/superui-shared/RESPONSIVE_RULES.md` before coding.

## Workflow

1. Preflight: load required inputs and responsive rules.
2. RED: write one failing test suite for one component or behavior.
3. GREEN: write the smallest implementation that passes the failing test.
4. REFACTOR: improve code while keeping all tests green.
5. Repeat for the next component or behavior.
6. Validate visual, interaction, accessibility, and responsive requirements.
7. Record deviations in `design-adjustments.md`.

## Test Layers

| Layer | Preferred tools | Fallback |
|-------|-----------------|----------|
| Visual contract | Playwright + pixelmatch or screenshot comparison | Manual comparison against DESIGN.md previews |
| Interaction behavior | Playwright + Testing Library | Cypress |
| Accessibility | axe-core + Playwright | pa11y or manual WCAG checklist |

If tools cannot be installed or run, record the fallback and manual validation evidence in `progress.md`.

## RED Rules

- Write tests from `test-plan.md` and `specs/*.md`.
- Tests must fail for the right reason before implementation.
- If a test passes before implementation, fix the test until it is real RED.

## GREEN Rules

- Work one test suite or component at a time.
- Write only the code needed to pass the current test.
- Use tokens: `var(--color-primary)` instead of hardcoded hex, spacing tokens instead of raw values.
- Check `RESPONSIVE_RULES.md` after each component.

## REFACTOR Rules

- Remove duplication, dead imports, unjustified hardcoded values, and avoidable complexity.
- Run the relevant test after each refactor.
- Run a full regression after each component cycle before starting the next component.

## Acceptance Checks

- Visual: color, typography, spacing, radius, and shadow match DESIGN.md within documented tolerances.
- Interaction: CRUD loops, loading, success, error, optimistic updates, and state sync are covered.
- Accessibility: WCAG AA contrast, keyboard reachability, visible focus, labels, alt text, and semantic structure.
- Responsive: breakpoints, touch targets, image scaling, and layout constraints pass.

## design-adjustments.md

Record every deviation:

```markdown
# Design Adjustments

## [ID] - [Date]
- Deviation: [what changed]
- DESIGN.md requirement: [quoted or referenced requirement]
- Actual implementation: [what was done]
- Reason: [why]
- Impact: [components/pages]
- Reversible: yes/no
```

## Output

- Implementation code in the target project.
- Tests under `<ARTIFACT_ROOT>/tests/`.
- `<ARTIFACT_ROOT>/design-adjustments.md` when needed.
- `<ARTIFACT_ROOT>/todo.md`, `progress.md`, and `pipeline-status.md`.
