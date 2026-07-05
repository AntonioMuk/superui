# SuperUI

<p align="center">
  <img alt="SuperUI" src="https://img.shields.io/badge/SuperUI-Agent%20UI%20Workflow-111827?style=for-the-badge&labelColor=111827&color=38bdf8">
  <img alt="DESIGN.md" src="https://img.shields.io/badge/DESIGN.md-Design%20System-7c3aed?style=for-the-badge&labelColor=111827">
  <img alt="Agent Agnostic" src="https://img.shields.io/badge/Agent--Agnostic-Codex%20%7C%20Claude%20%7C%20Cursor%20%7C%20OpenCode-10b981?style=for-the-badge&labelColor=111827">
</p>

<p align="center">
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-UI%20%2F%20UX-0ea5e9?style=flat-square">
  <img alt="Responsive" src="https://img.shields.io/badge/Responsive-Checked-14b8a6?style=flat-square">
  <img alt="Accessibility" src="https://img.shields.io/badge/Accessibility-WCAG%20Aware-f59e0b?style=flat-square">
  <img alt="TDD" src="https://img.shields.io/badge/TDD-First-ef4444?style=flat-square">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-64748b?style=flat-square">
</p>

> SuperUI helps AI coding agents build frontend UI through durable design artifacts, implementation plans, tests, and review gates instead of jumping straight into page code.

SuperUI is an agent-agnostic skill set for frontend UI workflows. It is not a single prompt and it is not tied to one agent platform. It turns UI collaboration into a recoverable, auditable, continuously improving workflow:

```text
Analyze existing UI -> Generate DESIGN.md -> Plan specs and tests -> Implement with TDD -> Run Plan / Code Gates
```

It is designed for creating, refactoring, and reviewing websites, admin systems, dashboards, landing pages, React/Vue components, design systems, and responsive interfaces.

## Why SuperUI

General AI coding agents usually fail at frontend work not because they cannot write code, but because they start coding too soon:

- Design intent is not captured, so the next conversation loses it.
- Colors, spacing, typography, states, and responsive rules are scattered through code.
- Pages look complete while loading, empty, error, permission, and extreme-data states are missing.
- Existing-project refactors lack evidence and become broad rewrites.
- Review standards drift across turns and agents.

SuperUI makes that hidden work explicit: create reusable artifacts first, then implement. Design, engineering, and review evidence can be read by later agents instead of living only in conversation history.

## What It Does

| Area | Capability | Artifacts |
|------|------------|-----------|
| Source analysis | Analyze existing frontend projects | `analysis/layout.md`, `analysis/interaction.md`, `analysis/style.md` |
| Design system | Generate design specifications | `DESIGN.md`, `preview.html`, `preview-dark.html` |
| Path decision | Decide refactor vs new build | `determination-report.md` |
| Planning | Produce implementation plans | `proposal.md` or `design-proposal.md` |
| Specs | Break UI behavior into testable requirements | `specs/*.md` |
| Testing | Define validation strategy | `test-plan.md` |
| Implementation | Build UI with TDD | code, tests, `design-adjustments.md` |
| Review | Run cross-review gates | `review/*.md`, `review/improvement-plan.md` |
| Handoff | Support agent-native structured task lists | `todo.md`, `progress.md`, `pipeline-status.md` |
| Memory | Preserve long-term user preferences | `~/.superui/USER_PREFERENCES.md` or project-local preferences |

## Outcomes

SuperUI aims for frontend artifacts that are stable, consistent, and easy for another agent to continue:

- **Visual consistency**: colors, typography, spacing, radius, and shadows are captured in `DESIGN.md`.
- **Style fit**: product type, audience, density, trust level, platform, and anti-patterns are considered before tokens are generated.
- **Responsive reliability**: fixed widths, primary-layout absolute positioning, mobile overflow, breakpoint behavior, and touch targets are checked explicitly.
- **Interaction completeness**: CRUD loops, loading, success, error, optimistic updates, and state synchronization are covered.
- **Accessibility checks**: keyboard navigation, focus, contrast, labels, alt text, and semantic structure are part of the workflow.
- **Evidence-based refactors**: existing projects are analyzed before deciding what to keep, replace, add, or remove.
- **Convergent review**: Plan Gate and Code Gate use a locked rubric and bounded review rounds.
- **Portable handoff**: Markdown task and progress files let Codex, Claude, Cursor, OpenCode, Cline, Gemini, Windsurf, and plain editors pick up the work.
- **Preference evolution**: stable user preferences can become soft constraints across future UI tasks.

## Skill Layout

```text
skills/
  superui/                    # Controller: paths, preferences, stage detection, routing
  superui-source-analyzer/    # Source analysis: layout, interaction, styling, evidence
  superui-design-md/          # DESIGN.md: tokens, component rules, light/dark previews
  superui-planner/            # Planning: refactor/new-build decision, proposal, specs, test plan
  superui-tdd/                # TDD implementation: tests first, token constraints, responsive checks
  superui-review/             # Cross-review: Plan Gate, Code Gate, improvement plan
  superui-shared/             # Shared rules: output policy, preferences, tasks, responsive, gates, rubric
```

`superui` is the single controller entry point. It loads shared files only when needed, so agents do not have to ingest the whole rule set up front.

## Agent Ecosystems

SuperUI keeps its core capability in `skills/`. Each agent ecosystem gets only a thin adapter for discovery, entry instructions, and tool mapping.

| Ecosystem | Entry |
|-----------|-------|
| Generic agents / OpenAI Agents / Codex-style agents | `AGENTS.md` |
| Claude / Claude Code | `CLAUDE.md`, `.claude-plugin/plugin.json` |
| Codex App / Codex CLI | `.codex-plugin/plugin.json`, `AGENTS.md` |
| Cursor | `.cursor-plugin/plugin.json`, `.cursor/rules/superui.mdc` |
| Gemini | `GEMINI.md`, `gemini-extension.json` |
| Kimi Code | `.kimi-plugin/plugin.json` |
| OpenCode | `.opencode/INSTALL.md`, `.opencode/plugins/superui.js` |
| Windsurf | `.windsurf/rules/superui.md` |

Compatibility details:

- [docs/AGENT_ECOSYSTEMS.md](docs/AGENT_ECOSYSTEMS.md)
- [docs/COMPATIBILITY_MATRIX.md](docs/COMPATIBILITY_MATRIX.md)

## Usage

Strong trigger:

```text
Use $superui for this frontend task.
Use SuperUI to handle this UI refactor.
Use this skill for this frontend page.
```

Analyze an existing project and extract its design system:

```text
Use SuperUI to analyze this React project and extract its UI design system.
```

Generate `DESIGN.md` from a description:

```text
Use SuperUI to create a DESIGN.md for a dense enterprise dashboard with restrained visual styling.
```

Plan and implement from a design specification:

```text
Use SuperUI to plan and implement this admin page from DESIGN.md with TDD and accessibility checks.
```

Review only:

```text
Use SuperUI review to audit this plan/code for responsive behavior, token compliance, and interaction completeness.
```

Platforms that support direct skill names may also use:

```text
$superui
$superui-design-md
$superui-review
```

## Artifact Location

SuperUI determines one shared `<ARTIFACT_ROOT>` for each run, and all child skills use it.

Priority:

1. User-specified artifact directory.
2. `<target_project>/.superui/<project>/` when a target project is known.
3. `<current_workspace>/outputs/<project>/` when no target project is known.

Recommended long-term preference location:

```text
~/.superui/USER_PREFERENCES.md
```

Platform-specific user-level paths are also acceptable:

```text
~/.codex/superui/USER_PREFERENCES.md
~/.claude/superui/USER_PREFERENCES.md
```

When user-level storage is unavailable, use the private project-local fallback:

```text
<target_project>/.superui/preferences.local.md
```

## Optional Enhancement

When generating `DESIGN.md`, SuperUI can check whether `ui-ux-pro-max-skill` is installed locally and optionally use its recommendations for design systems, color, typography, UX, charts, and stack choices.

This is not a hard dependency. If it is missing or unavailable, SuperUI continues with its built-in `DESIGN_INTELLIGENCE.md` workflow and may suggest optional installation.

## Installation Notes

Installation differs by platform. The minimal requirement is that the target agent can see this repository's `skills/` directory and starts from `skills/superui/SKILL.md`.

OpenCode example:

```json
{
  "plugin": ["superui@git+https://github.com/AntonioMuk/superui.git"]
}
```

For more platforms, see `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/superui.mdc`, and `.windsurf/rules/superui.md`.

## Examples And License

`skills/superui-design-md/examples/` contains `DESIGN.md` examples from VoltAgent `awesome-design-md`. They help agents understand high-quality design specification patterns and retain the original MIT license:

```text
skills/superui-design-md/examples/LICENSE
```

This repository uses the MIT License.
