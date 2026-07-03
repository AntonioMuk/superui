# 结构化清单

当 SuperUI 需要跨 agent 记录任务、交接状态、决策证据和交付结果时读取本文件。

## 原则

不要记录私有逐字推理过程。只记录用户可见、可审计的工作产物：任务、决策、证据、假设、阻塞、验证结果和交付状态。

## 统一文件

| 文件 | 用途 | 更新时机 |
|------|------|----------|
| `<ARTIFACT_ROOT>/todo.md` | 跨 agent 任务清单 | 任务开始创建；每个阶段开始和结束更新 |
| `<ARTIFACT_ROOT>/decision-log.md` | 可审计决策链 | 设计、规划、实现或审核决策影响结果时更新 |
| `<ARTIFACT_ROOT>/delivery-checklist.md` | 完成度与交付检查 | 声明阶段或任务完成前更新 |
| `<ARTIFACT_ROOT>/pipeline-status.md` | 当前阶段与下一步 | 阶段切换时更新 |

## todo.md

使用 Markdown checkbox，保证 Codex、Claude、Cursor、Cline、OpenCode、Gemini、Windsurf 和普通编辑器都能读取。

```markdown
# SuperUI Todo

| Active stage | Owner | Last update |
|--------------|-------|-------------|
| [stage] | [agent/tool] | [date/time] |

## Tasks

- [ ] [pending] Determine artifact root
- [ ] [pending] Load preferences
- [ ] [pending] Generate or update DESIGN.md
- [ ] [pending] Plan implementation and tests
- [ ] [pending] Run Plan Gate
- [ ] [pending] Implement with tests
- [ ] [pending] Run Code Gate
- [ ] [pending] Final delivery

## Blockers

- [blocked item] - [needed input or evidence]
```

状态词固定为 `pending`、`in_progress`、`blocked`、`done`。除非当前环境明确支持并行 subagent，否则最多保留一个 `in_progress`。

## decision-log.md

```markdown
# SuperUI Decision Log

## [YYYY-MM-DD HH:mm] [short title]

- Decision: [选择或变更了什么]
- Evidence: [用户请求、文件、DESIGN.md 段落、测试输出、审核发现]
- Alternatives: [拒绝了什么；无则写 none]
- Impact: [影响的文件、阶段或用户可见行为]
- Follow-up: [none / todo item / blocker]
```

该文件用于记录可审计决策，不用于暴露隐藏推理。

## delivery-checklist.md

```markdown
# SuperUI Delivery Checklist

- [ ] Artifact root recorded
- [ ] Required stage artifacts exist
- [ ] DESIGN.md constraints are reflected or deviations recorded
- [ ] Tests or manual validation evidence recorded
- [ ] Responsive and accessibility checks addressed
- [ ] Review findings resolved or explicitly deferred
- [ ] Final user-facing summary prepared
```

没有足够证据时，不要勾选对应交付项，也不要声明该阶段完成。

## 交接规则

- 只在进入 SuperUI、阶段切换、恢复任务或最终交付时读取本文件。
- 启动子 skill 前，把对应任务标为 `in_progress`。
- 子 skill 完成后，把任务标为 `done` 或 `blocked`，再更新 `pipeline-status.md`。
- 如果其他 agent 已创建这些文件，保留原记录并追加更新。
- 如果当前 agent 有原生 TodoWrite、plan、task list、memory 或 issue 工具，可镜像同一批任务；上述 Markdown 文件仍是便携交接基准。
