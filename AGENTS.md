# SuperUI Agent Bootstrap

SuperUI is an agent-agnostic frontend UI workflow. If you are an AI coding agent working in this repository, load and follow:

```text
skills/superui/SKILL.md
```

Hard trigger: if the user explicitly says `SuperUI`, `superui`, `$superui`, `this skill`, `本技能`, `调用这个技能`, `使用这个技能`, `调用 SuperUI`, or `使用 SuperUI`, load `skills/superui/SKILL.md` before answering. Do not treat the request as optional.

Use SuperUI for frontend UI design, redesign, analysis, planning, implementation, review, DESIGN.md work, responsive QA, accessibility checks, and design-system extraction.

Do not treat SuperUI as Codex-only. The same `skills/` directory is intended to be reused by Codex, Claude, Cursor, Gemini, Kimi, OpenCode, Windsurf, and other skill-aware agent runtimes.

For ecosystem-specific install notes, read:

```text
docs/AGENT_ECOSYSTEMS.md
```
