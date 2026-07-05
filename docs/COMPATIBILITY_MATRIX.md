# SuperUI Compatibility Matrix

## Status Meaning

- `Entry provided`: this repository includes a platform entry file or manifest.
- `Skill discovery`: the entry declares `skills/` or an equivalent skill path.
- `Auto guidance`: the adapter guides the agent to read `superui` during session or context loading.
- `End-to-end verified`: the minimal acceptance test has been run in the target runtime.

| Ecosystem | Entry provided | Skill discovery | Auto guidance | End-to-end verified | Notes |
|-----------|----------------|-----------------|---------------|---------------------|-------|
| Codex App / Codex CLI | Yes | Yes | Plugin / `AGENTS.md` | Not verified | `.codex-plugin/plugin.json` declares `skills`; `AGENTS.md` provides generic guidance. |
| Claude / Claude Code | Yes | Platform-dependent | `CLAUDE.md` | Not verified | `.claude-plugin/plugin.json` provides metadata; `CLAUDE.md` points to the controller skill. |
| Cursor | Yes | Yes | Rules-dependent | Not verified | `.cursor-plugin/plugin.json` declares `skills`; `.cursor/rules/superui.mdc` provides the rule entry. |
| Gemini | Yes | Context-file dependent | Yes | Not verified | `GEMINI.md` loads `@./skills/superui/SKILL.md`. |
| Kimi Code | Yes | Yes | Yes | Not verified | `.kimi-plugin/plugin.json` uses `sessionStart.skill = superui`. |
| OpenCode | Yes | Yes | Yes | Not verified | `.opencode/plugins/superui.js` registers `skills/` and injects bootstrap guidance. |
| Windsurf | Yes | Rules-dependent | Rules-dependent | Not verified | `.windsurf/rules/superui.md` provides the rule entry. |
| Generic agents / OpenAI Agents | Yes | Manual or framework adapter | `AGENTS.md` | Not verified | Read `AGENTS.md`, then enter through `skills/superui/SKILL.md`. |

## Minimal Acceptance Test

In a clean session, enter:

```text
Use SuperUI to create a DESIGN.md for a compact admin dashboard.
```

Passing criteria:

1. The agent loads `skills/superui/SKILL.md` first.
2. The agent determines `<ARTIFACT_ROOT>`.
3. The agent reads user preferences; if no user-level preference file exists, it only reads the repository template.
4. The agent routes to `superui-design-md`.
5. The agent does not jump directly to page-code implementation.

After a real runtime test passes for a platform, change `End-to-end verified` to `Verified` and record runtime version, date, and key log location in the notes.
