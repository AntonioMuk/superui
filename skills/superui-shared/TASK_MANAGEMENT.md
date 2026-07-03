# 结构化清单

当 SuperUI 需要跨 agent 跟踪任务、恢复进度或交接执行时读取本文件。

## 原则

参考 Superpowers 的做法：运行时使用 agent 原生 todo，耐久状态写入文件。不要记录私有逐字推理过程，只记录任务、证据、阻塞、验证结果和必要取舍。

## 统一文件

| 文件 | 用途 | 必要性 |
|------|------|--------|
| `<ARTIFACT_ROOT>/todo.md` | 便携 checkbox 任务清单 | 必需 |
| `<ARTIFACT_ROOT>/progress.md` | 可恢复进度账本 | 必需 |
| `<ARTIFACT_ROOT>/pipeline-status.md` | 当前阶段和下一步 | 必需 |

不要默认创建额外管理文件。重大设计或工程取舍写入 `progress.md` 的短条目；只有用户或项目流程明确要求时，才额外创建专门决策文档。

## todo.md

使用 Markdown checkbox，方便 Codex、Claude、Cursor、Cline、OpenCode、Gemini、Windsurf 和普通编辑器读取。

```markdown
# SuperUI Todo

> REQUIRED: mirror these items into the current agent's native todo/task tool when available.

- [ ] Determine artifact root
- [ ] Load preferences
- [ ] Generate or update DESIGN.md
- [ ] Plan implementation and tests
- [ ] Run Plan Gate
- [ ] Implement with tests
- [ ] Run Code Gate
- [ ] Final delivery
```

规则：
- 每个任务应能独立产生可检查产物。
- 当前任务在原生 todo 中标为 `in_progress`；文件里用 checkbox 记录完成状态。
- 任务阻塞时不要勾选，在 `progress.md` 记录阻塞原因和需要的输入。

## progress.md

`progress.md` 是压缩上下文后恢复工作的账本，优先相信它和 git 记录。

```markdown
# SuperUI Progress

## [YYYY-MM-DD HH:mm] [stage/task]

- Status: pending | in_progress | blocked | done
- Artifacts: [paths created or updated]
- Evidence: [test command, review result, source file, user decision]
- Notes: [brief decision or blocker; omit if none]
- Next: [next task]
```

每个阶段完成时追加一条，不重写历史。条目要短，能让下一个 agent 知道“做到哪、证据在哪、下一步是什么”即可。

## pipeline-status.md

只记录当前阶段，不重复 `progress.md`：

```markdown
# SuperUI Pipeline Status

- Artifact root: `<ARTIFACT_ROOT>`
- Current stage: [analysis/design/planning/plan-gate/tdd/code-gate/done]
- Current task: [task name]
- Next action: [one concrete action]
- Blocked: yes/no
```

## 交接规则

- 进入 SuperUI、阶段切换、恢复任务或最终交付时读取本文件。
- 优先把 `todo.md` 镜像到当前 agent 的原生清单工具；没有原生工具时直接维护 `todo.md`。
- 子 skill 完成后，勾选对应 todo，追加 `progress.md`，再更新 `pipeline-status.md`。
- 不要把整份历史粘进新 agent 上下文；交接时只给当前任务、相关产物路径和 `progress.md` 最新条目。
