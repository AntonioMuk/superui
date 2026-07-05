# SuperUI for Claude

Use SuperUI when the task involves frontend UI creation, redesign, analysis, DESIGN.md, planning, implementation, responsive behavior, accessibility, or review.

Hard trigger: when the user explicitly says `SuperUI`, `superui`, `$superui`, `this skill`, `use this skill`, `call SuperUI`, or `use SuperUI`, load `skills/superui/SKILL.md` before answering.

Primary skill entry:

```text
skills/superui/SKILL.md
```

The skill suite is platform-neutral. Claude should start from `skills/superui/SKILL.md` and let SuperUI route to child skills and shared references by need.

Do not eagerly load every file under `skills/superui-shared/`; those references are intentionally progressive.
