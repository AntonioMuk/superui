# SuperUI Engineering Gates

Use this checklist in planning, implementation, and review. It adapts the local `ai-coding-principles` skill to frontend UI work.

## Eight Gates

| Gate | SuperUI Meaning | Required Evidence |
|------|-----------------|-------------------|
| Evidence first | Do not guess why a UI is broken or why a design direction fits. Trace source, user need, DESIGN.md, screenshots, tests, or browser evidence. | Linked files, screenshots, analysis notes, test output, or explicit user wording |
| Minimum scope | Change the smallest page/component/token surface that satisfies the request. | Impact area, affected routes/components, regression scope |
| Surgical edits | Preserve unrelated user changes and existing conventions. Keep a rollback path. | Clean diff review and rollback note for risky edits |
| Test driven | Specs and tests define expected UI behavior before or alongside implementation. | `specs/*.md`, `test-plan.md`, unit/e2e/visual/a11y checks |
| Useful comments | Add comments only for non-obvious design/compatibility decisions. | Why/boundary comments, not what-the-code-does comments |
| Occam | Prefer the simplest native/project pattern before new abstractions or dependencies. | Reuse decision and rejected alternatives |
| Reuse first | Search existing components, tokens, styles, routes, utilities, and libraries before inventing new ones. | Search notes and reused assets |
| Best compatibility | Confirm browser/runtime/theme/platform support and graceful fallback. | Target matrix, fallback behavior, light/dark and responsive checks |

## Required Checklist for Plans

Every `proposal.md`, `design-proposal.md`, and `test-plan.md` must include:

```markdown
## SuperUI Engineering Gates

| Gate | Status | Evidence |
|------|--------|----------|
| Evidence first | ✅/❌ | |
| Minimum scope | ✅/❌ | |
| Surgical edits | ✅/❌ | |
| Test driven | ✅/❌ | |
| Useful comments | ✅/❌ | |
| Occam | ✅/❌ | |
| Reuse first | ✅/❌ | |
| Best compatibility | ✅/❌ | |
```

No code gate should pass while any row is `❌` unless the exception is explicitly approved by the user and recorded in `review/improvement-plan.md`.
