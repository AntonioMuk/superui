# Installing SuperUI for OpenCode

Add SuperUI to the `plugin` array in your `opencode.json`:

```json
{
  "plugin": ["superui@git+https://github.com/AntonioMuk/superui.git"]
}
```

Restart OpenCode after editing the config.

## Usage

Use OpenCode's native skill support to load `superui`, then let it route to child skills:

```text
Use SuperUI to create a DESIGN.md for a compact admin dashboard.
```

If OpenCode cannot resolve the package name, install from the repository URL directly according to your OpenCode version's plugin syntax.

## Tool Mapping

- Skill invocation: OpenCode native skill tool
- Search file contents: grep/search tool
- Find files: glob/list tool
- Read files: read tool
- Edit files: patch/edit tool
- Run commands: shell/bash tool
- Subagents: task/agent tool when available; otherwise run SuperUI review roles sequentially
