# SuperUI Output Policy

All SuperUI skills receive and use one shared `<ARTIFACT_ROOT>`.

## Selection Order

1. User-specified artifact path.
2. `<target_project>/.superui/<project>/` when a target project root is known.
3. `<current_workspace>/outputs/<project>/` when no target project root is known.

## System-Level Memory

Long-lived user preferences are not project artifacts.

Preferred path:

```text
~/.codex/superui/USER_PREFERENCES.md
```

Fallback path:

```text
skills/superui-shared/USER_PREFERENCES.md
```

## Required Behavior

- Report `<ARTIFACT_ROOT>` at the start of each major stage.
- Do not scatter artifacts across project, workspace, and system paths in one run.
- Do not write long-lived preferences into project artifacts.
- If the user overrides the path, use the override for that run and record it in `pipeline-status.md`.
