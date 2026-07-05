# SuperUI Agent Ecosystem Compatibility

SuperUI follows one core principle: **the workflow lives once in `skills/`; each agent ecosystem only provides a thin adapter**.

This mirrors the Superpowers-style organization: root-level entry files guide generic agents, plugin-based platforms provide manifests, and CLI/IDE ecosystems read their own rule or install files.

## Hard Trigger Contract

Every adapter should treat these user phrases as hard triggers and load `skills/superui/SKILL.md` first:

```text
SuperUI
superui
$superui
this skill
call SuperUI
use SuperUI
use this skill
```

When the user names SuperUI explicitly, do not jump directly into a generic frontend workflow and do not bypass the controller entry.

## Supported Entries

| Ecosystem | Entry files | Role |
|-----------|-------------|------|
| Generic agents / OpenAI Agents / Codex-style agents | `AGENTS.md` | Tells the agent to load `skills/superui/SKILL.md` first |
| Claude / Claude Code | `CLAUDE.md`, `.claude-plugin/plugin.json` | Claude project instruction and plugin metadata |
| Codex App / Codex CLI | `.codex-plugin/plugin.json`, `AGENTS.md` | Codex plugin metadata and generic entry |
| Cursor | `.cursor-plugin/plugin.json`, `.cursor/rules/superui.mdc` | Cursor plugin metadata and project rule |
| Gemini | `GEMINI.md`, `gemini-extension.json` | Gemini context entry and extension metadata |
| Kimi Code | `.kimi-plugin/plugin.json` | Kimi plugin metadata and tool mapping hint |
| OpenCode | `.opencode/INSTALL.md`, `.opencode/plugins/superui.js` | Install notes, skill path registration, and bootstrap injection |
| Windsurf | `.windsurf/rules/superui.md` | Windsurf project rule |

## Adapter Responsibilities

Adapters do only three things:

1. Make SuperUI discoverable by the platform.
2. Map platform-specific tool names to SuperUI's platform-neutral actions.
3. Guide the agent to load `skills/superui/SKILL.md` as the controller entry.

Adapters must not duplicate the full SuperUI workflow. Keep the workflow in `skills/` to avoid behavior drift across platforms.

## Tool Mapping Convention

SuperUI instructions use platform-neutral actions whenever possible:

- Search files: `rg` or the platform search tool.
- Read files: the platform file-reading tool.
- Edit files: `apply_patch` or the platform edit tool.
- Run commands: shell, bash, terminal, or equivalent.
- Subagents: use platform subagents when available; otherwise let the main agent run roles sequentially.
- Skill invocation: use the platform native skill mechanism; if none exists, read the relevant `SKILL.md` directly.

## Preference Memory Paths

Default user-level preference path:

```text
~/.superui/USER_PREFERENCES.md
```

Platform-specific user-level paths are also acceptable:

```text
~/.codex/superui/USER_PREFERENCES.md
~/.claude/superui/USER_PREFERENCES.md
```

If user-level storage is unavailable, do not write back to repository templates. Use a project-local private preference file:

```text
<target_project>/.superui/preferences.local.md
```

The repository preference file is a read-only template:

```text
skills/superui-shared/USER_PREFERENCES.md
```

## Minimum Standard For New Ecosystems

When adding a new agent ecosystem, include at least:

1. A platform entry file or plugin manifest.
2. Platform install notes.
3. Tool-name mapping notes.
4. One minimal acceptance test:

```text
Use SuperUI to create a DESIGN.md for a compact admin dashboard.
```

Passing criteria: the agent loads the `superui` controller, determines `<ARTIFACT_ROOT>`, reads preferences, routes to `superui-design-md`, and does not jump straight into page implementation.

Current compatibility status:

```text
docs/COMPATIBILITY_MATRIX.md
```
