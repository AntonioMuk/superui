# Structured Checklist

Read this file when SuperUI needs cross-agent task tracking, progress recovery, or handoff.

## Principle

Follow the Superpowers-style model: use the agent native todo tool at runtime, and write durable state to files. Do not record private chain-of-thought. Record only tasks, evidence, blockers, validation results, and necessary tradeoffs.

## Standard Files

| File | Purpose | Required |
|------|---------|----------|
| `<ARTIFACT_ROOT>/todo.md` | Portable checkbox task list | Yes |
| `<ARTIFACT_ROOT>/progress.md` | Durable recovery ledger | Yes |
| `<ARTIFACT_ROOT>/pipeline-status.md` | Current stage and next action | Yes |

Do not create extra management files by default. Put major design or engineering tradeoffs into short `progress.md` entries. Create dedicated decision documents only when the user or project process explicitly asks for them.

## todo.md

Use Markdown checkboxes so Codex, Claude, Cursor, Cline, OpenCode, Gemini, Windsurf, and plain editors can read them.

```markdown
# SuperUI Todo

> REQUIRED: mirror these items into the current agent native todo/task tool when available.

- [ ] Determine artifact root
- [ ] Load preferences
- [ ] Generate or update DESIGN.md
- [ ] Plan implementation and tests
- [ ] Run Plan Gate
- [ ] Implement with tests
- [ ] Run Code Gate
- [ ] Final delivery
```

Rules:
- Each task should produce a checkable artifact.
- Mark the active task `in_progress` in the native todo tool; use checkboxes for durable completion state.
- If a task is blocked, do not check it off. Record the blocker and needed input in `progress.md`.

## progress.md

`progress.md` is the recovery ledger after context compaction. Prefer it and git history over conversation memory.

```markdown
# SuperUI Progress

## [YYYY-MM-DD HH:mm] [stage/task]

- Status: pending | in_progress | blocked | done
- Artifacts: [paths created or updated]
- Evidence: [test command, review result, source file, user decision]
- Notes: [brief decision or blocker; omit if none]
- Next: [next task]
```

Append one short entry when each stage completes. Do not rewrite history. The next agent only needs to know where the work stands, where evidence lives, and what to do next.

## pipeline-status.md

Record only the current stage; do not duplicate `progress.md`.

```markdown
# SuperUI Pipeline Status

- Artifact root: `<ARTIFACT_ROOT>`
- Current stage: [analysis/design/planning/plan-gate/tdd/code-gate/done]
- Current task: [task name]
- Next action: [one concrete action]
- Blocked: yes/no
```

## Handoff Rules

- Read this file when entering SuperUI, switching stages, resuming work, or delivering final output.
- Mirror `todo.md` into the current agent native task tool first. If no native tool exists, maintain `todo.md` directly.
- After a child skill finishes, check off the matching todo item, append `progress.md`, then update `pipeline-status.md`.
- Do not paste the whole history into the next agent context. Handoff only the current task, relevant artifact paths, and the latest `progress.md` entry.
