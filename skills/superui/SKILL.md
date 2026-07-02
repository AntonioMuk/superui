---
name: superui
description: "Use when the user asks to create, redesign, analyze, plan, implement, review, or improve frontend UI, web apps, landing pages, dashboards, React/Vue components, DESIGN.md design systems, responsive layouts, visual QA, or Chinese requests involving 前端, 页面, 界面, 组件, 仪表盘, 设计规范, 改造, 重构, 审核."
---

# SuperUI 总控

SuperUI 是前端 UI 工作的入口调度器。总控只负责定路径、读偏好、判阶段、调子 skill、检查产物；具体分析、生成、规划、实现和审核都交给子 skill。

## 启动顺序

1. 读取 `skills/superui-shared/OUTPUT_POLICY.md`，确定统一 `<ARTIFACT_ROOT>`。
2. 读取用户级偏好；不可用时仅读取 `skills/superui-shared/USER_PREFERENCES.md` 作为模板默认值。
3. 检查 `<ARTIFACT_ROOT>/` 已有产物，判断从哪个阶段恢复。
4. 按用户意图路由到最小必要子 skill。
5. 子 skill 完成后检查关键产物，并更新 `<ARTIFACT_ROOT>/pipeline-status.md`。

## 按需共享文件

不要预加载整个 `skills/superui-shared/`。按阶段读取：

| 文件 | 何时读取 |
|------|----------|
| `OUTPUT_POLICY.md` | 每次 SuperUI 任务开始 |
| `USER_PREFERENCES.md` | 用户级偏好不可用时 |
| `DESIGN_INTELLIGENCE.md` | 生成 DESIGN.md，或审核风格/行业/信任等级问题 |
| `DESIGN_HANDOFF_CHECKLIST.md` | 规划、Plan Gate、交付完整性争议 |
| `ENGINEERING_GATES.md` | 规划、审核、TDD 交接 |
| `RESPONSIVE_RULES.md` | 实现或 Code Gate 响应式检查 |
| `rubric-locked.md` | 审核阶段 |

`DESIGN_HANDOFF_CHECKLIST.md` 和 `ENGINEERING_GATES.md` 只做完整性/风险检查，不产生 DESIGN.md 之外的新设计参数。发现设计缺口时，回到 `superui-design-md` 更新 DESIGN.md，或列为待确认。

## 路由

| 用户意图 | 路由 |
|----------|------|
| 分析现有前端项目、提取设计系统 | `superui-source-analyzer` |
| 生成或更新 DESIGN.md / design tokens / 设计规范 | `superui-design-md` |
| 输出方案、规格、测试计划 | `superui-planner` |
| 实现前端、按方案落地、TDD | `superui-tdd` |
| 审核、QA、Plan Gate、Code Gate | `superui-review` |
| 新建完整 UI 项目 | `superui-design-md` -> `superui-planner` -> `superui-review`(Plan Gate) -> `superui-tdd` -> `superui-review`(Code Gate) |
| 改造存量 UI 项目 | `superui-source-analyzer` -> `superui-design-md` -> `superui-planner` -> `superui-review`(Plan Gate) -> `superui-tdd` -> `superui-review`(Code Gate) |

用户明确要求跳过阶段时，按目标阶段执行；缺失的前置产物只在确实阻塞时再补。

## 阶段恢复

用文件存在性判断进度：

| 产物 | 阶段 |
|------|------|
| `analysis/layout.md`、`analysis/interaction.md`、`analysis/style.md` | 源码分析完成 |
| `DESIGN.md`、`preview.html`、`preview-dark.html` | 设计规范完成 |
| `determination-report.md`、`proposal.md` 或 `design-proposal.md`、`test-plan.md` | 规划完成 |
| `design-adjustments.md` 或代码 diff | 实现完成 |
| `review/improvement-plan.md` | 审核完成或待返工 |

检测到已有产物时，简短说明“检测到 XX，继续 YY 阶段”。

## 偏好记忆

- 只记录用户明确表达的长期 UI 偏好，例如“以后都优先 Element Plus”“我不喜欢大圆角”。
- 不记录一次性需求，例如“这次用红色”“这个页面先不要暗色模式”。
- 优先写入 `~/.superui/USER_PREFERENCES.md`；平台目录可用时也可用 `~/.codex/superui/USER_PREFERENCES.md`、`~/.claude/superui/USER_PREFERENCES.md`。
- 用户级位置不可写时，写入 `<target_project>/.superui/preferences.local.md`；不得写回仓库内共享模板。

## 产物根目录

路径策略以 `OUTPUT_POLICY.md` 为准。一般顺序：

1. 用户显式指定的目录。
2. 目标项目存在时：`<target_project>/.superui/<project>/`。
3. 无目标项目时：`<current_workspace>/outputs/<project>/`。

每个阶段开头报告当前 `<ARTIFACT_ROOT>`。

## Gate

- **Plan Gate**：`proposal.md` 或 `design-proposal.md` 产出后，触发 `superui-review`。
- **Code Gate**：代码和测试产出后，触发 `superui-review`。

Gate 未通过时，根据 `review/improvement-plan.md` 回到规划或实现阶段；核心冲突写入 `review/review-conflicts.json` 并等待人类决策。

## 异常处理

| 情况 | 处理 |
|------|------|
| 子 skill 失败 | 报告原因，给出重试、降级或暂停选项 |
| 前置产物缺失 | 路由到生成该产物的子 skill |
| 用户改变方向 | 重新确定意图、`<ARTIFACT_ROOT>` 和路由 |
| 用户级偏好不可写 | 写入项目本地私有偏好文件 |

## 工具

优先使用 `rg`、`rg --files`、目录列表和当前环境的 skill 加载机制。复杂链路维护 `<ARTIFACT_ROOT>/pipeline-status.md`。
