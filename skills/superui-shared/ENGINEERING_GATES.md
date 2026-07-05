# SuperUI Engineering Gates

Use these gates to keep UI work evidence-based, scoped, testable, reusable, and compatible. They check engineering discipline only; they do not create new design parameters outside `DESIGN.md`.

## Gates

| Gate | Requirement | Evidence |
|------|-------------|----------|
| Evidence first | Claims are backed by source files, DESIGN.md, tests, or user instructions | File paths, line refs, screenshots, test output |
| Minimal scope | Changes stay within the requested UI surface | Changed-file list and excluded areas |
| Surgical edits | Do not rewrite unrelated code or design systems | Diff review |
| Test driven | Behavior and visual contracts are tested before claiming completion | RED/GREEN evidence or documented fallback |
| Useful comments | Comments explain non-obvious constraints only | Code review |
| Simplicity | Prefer the simplest implementation that satisfies specs | Plan notes |
| Reuse first | Prefer existing components, tokens, utilities, and libraries | Reuse notes |
| Compatibility | Preserve framework, routing, styling, accessibility, and responsive expectations | Build/test/manual checks |

## Required Checklist

Add this checklist to plans, test plans, and reviews:

```markdown
## SuperUI Engineering Gates

- [ ] Evidence first: [evidence]
- [ ] Minimal scope: [scope]
- [ ] Surgical edits: [diff boundary]
- [ ] Test driven: [test evidence]
- [ ] Useful comments: [yes/no]
- [ ] Simplicity: [chosen approach]
- [ ] Reuse first: [reused assets/components]
- [ ] Compatibility: [framework/responsive/a11y checks]
```

If any item fails, mark it as a blocker or record a justified exception in `progress.md` and the relevant stage artifact.
