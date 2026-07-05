---
name: superui-review
description: "Use when the user explicitly mentions superui-review, $superui-review, review, audit, QA, Plan Gate, Code Gate, improvement-plan.md, or asks to check SuperUI plans, DESIGN.md files, frontend code, tests, responsive behavior, accessibility, token compliance, interaction completeness, or visual QA."
---

# Cross Review And Convergence

Run Plan Gate and Code Gate reviews through three independent perspectives and one Chairman. The goal is not to nitpick; it is to make frontend artifacts resilient, evidence-backed, and shippable.

## Core Rules

- Read `skills/superui-shared/rubric-locked.md` at review start and keep the rubric unchanged for the whole review.
- Always load `rubric-locked.md`; load other shared files only when the gate or dispute requires them.
- Run three isolated reviewers when subagents are available. If not, the main agent must perform the three roles separately and avoid cross-contamination.
- The Chairman aggregates, asks questions, and decides. The Chairman must not introduce new review findings.
- Stop after at most three question rounds. Non-core disagreements get a default Chairman decision; core conflicts go to `review-conflicts.json` for human decision.
- Write all review reports, disagreements, repair notes, and decisions under `<ARTIFACT_ROOT>/review/`.
- Read `skills/superui-shared/TASK_MANAGEMENT.md`; update `todo.md`, append gate evidence to `progress.md`, and update `pipeline-status.md`.

## Gate Triggers

| Gate | Trigger | Artifacts to review |
|------|---------|---------------------|
| Plan Gate | `proposal.md` or `design-proposal.md` exists | plan artifact + DESIGN.md |
| Code Gate | implementation and tests are ready | code + tests + DESIGN.md + design-adjustments.md |

Both gates use the same three-role plus Chairman process.

## Load Standards

| Condition | Load |
|-----------|------|
| Always | `rubric-locked.md` |
| Plan Gate | `ENGINEERING_GATES.md`, `DESIGN_HANDOFF_CHECKLIST.md` |
| Code Gate | `ENGINEERING_GATES.md`, `RESPONSIVE_RULES.md` |
| Style, industry, trust, or anti-pattern disputes | `DESIGN_INTELLIGENCE.md` |
| Delivery completeness, states, assets, or error pages | `DESIGN_HANDOFF_CHECKLIST.md` |

Record briefly when an optional shared file is not loaded.

## Reviewer Roles

### Critic

Focus on user requirements and product behavior.

- Check whether user requirements are covered.
- Check complete interaction loops: trigger -> validation -> request -> feedback -> state sync.
- Check edge cases: empty, loading failure, permission, network timeout, extreme data.

Output format:

```text
[location] | [requirement] | [gap/defect] | [severity: blocker/major/minor]
```

Do not review visual style, backend API design, or code style unless it blocks understanding.

### Coordinator

Focus on whether data can flow end to end.

- Check frontend/backend API contract alignment.
- Check error-code translation into user-readable messages.
- Check CRUD flow from UI trigger to API call to response handling to UI update.

Output format:

```text
[call site] | [backend expectation] | [missing link] | [fix]
```

Do not review visual design, requirement validity, or code structure unless data flow breaks.

### Auditor

Focus on evidence and conformance.

- Compare requirements, DESIGN.md, and produced artifacts.
- Check token usage for color, spacing, typography, radius, and shadows.
- Check loaded Design Intelligence, Design Handoff, and Engineering Gates when applicable.

Output format:

```text
[file:line] | DESIGN.md: {value} | actual: {value} | drift: match/minor/major/blocker | fix
```

Do not review requirement validity or backend API design.

## Chairman Process

1. Read the three reports.
2. Build `divergence-map.md`:
   - consensus findings
   - single-reviewer findings
   - conflicts
   - rubric gaps
3. Ask at most three rounds of follow-up questions.
4. For non-core unresolved disagreements, decide using this priority:
   - Auditor when DESIGN.md conformance is involved
   - Coordinator when data flow is involved
   - Critic when requirement coverage is involved
   - stricter finding when priority is equal
5. For core conflicts, write `review-conflicts.json` and pause for human decision.

## improvement-plan.md

Write:

- consensus fixes
- Chairman decisions
- gap completion items
- intentionally deferred items with reasons
- rubric coverage
- loaded Engineering Gate coverage
- loaded Design Handoff coverage

## Optional Fix Pass

If asked to execute fixes:

1. Apply consensus fixes and Chairman decisions.
2. Run an incremental review over the diff only.
3. Pass the gate only when blockers are resolved or explicitly escalated.

## Output

| File | Location |
|------|----------|
| Critic report | `<ARTIFACT_ROOT>/review/critic-report.md` |
| Coordinator report | `<ARTIFACT_ROOT>/review/coordinator-report.md` |
| Auditor report | `<ARTIFACT_ROOT>/review/auditor-report.md` |
| Divergence map | `<ARTIFACT_ROOT>/review/divergence-map.md` |
| Escalated conflicts | `<ARTIFACT_ROOT>/review/review-conflicts.json` when needed |
| Improvement plan | `<ARTIFACT_ROOT>/review/improvement-plan.md` |
| Structured checklist | `<ARTIFACT_ROOT>/todo.md`, `progress.md`, `pipeline-status.md` |

## Tool Dependencies

- subagent or multi-agent tools when available
- `skills/superui-shared/rubric-locked.md`
- `skills/superui-shared/DESIGN_INTELLIGENCE.md`
- `skills/superui-shared/DESIGN_HANDOFF_CHECKLIST.md`
- `skills/superui-shared/ENGINEERING_GATES.md`
- `skills/superui-shared/RESPONSIVE_RULES.md`
- `skills/superui-shared/TASK_MANAGEMENT.md`
