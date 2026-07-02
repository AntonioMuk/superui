---
name: superui
description: "Use when the user asks to create, redesign, analyze, plan, implement, review, or improve frontend UI, web apps, landing pages, dashboards, React/Vue components, DESIGN.md design systems, responsive layouts, visual QA, or Chinese requests involving 前端, 页面, 界面, 组件, 仪表盘, 设计规范, 改造, 重构, 审核."
---

# SuperUI 总控

SuperUI 是前端 UI 工作的入口调度器。先判断用户意图、产物位置、偏好上下文和当前阶段，再加载对应子 skill 执行具体工作。

## 核心规则

- **先定产物根目录**：所有子 skill 统一使用 `<ARTIFACT_ROOT>`，不得各自发明输出路径。
- **先读用户偏好**：开始前读取系统级偏好；没有权限或文件不存在时读取本 skill 的共享偏好模板。
- **只调度，不混做**：总控负责路由和阶段检查；具体分析、生成、规划、实现、审核由子 skill 执行。
- **状态可恢复**：通过检查 `<ARTIFACT_ROOT>/` 下的产物文件判断当前阶段，支持中断后恢复。
- **用户可跳转**：用户可以说"我只要生成 DESIGN.md"或"直接做审核"，总控支持跳过前置阶段直接路由到目标子 skill。
- **偏好持续进化**：用户明确表达稳定 UI 偏好或否定某种做法时，更新偏好记录；一次性项目需求不写入长期偏好。

## 触发词速查

| 用户说法 | 路由 |
|---------|------|
| build/create/make a page, web app, dashboard, landing page | `superui-design-md` → `superui-planner` → `superui-tdd` |
| redesign/refactor/improve this UI, 对齐设计, 改造页面 | `superui-source-analyzer` → `superui-design-md` → `superui-planner` |
| analyze/extract design system, 分析前端项目, 提取设计规范 | `superui-source-analyzer` |
| generate/write DESIGN.md, 设计规范, design tokens | `superui-design-md` |
| plan/spec/test plan, 方案, 规格, 测试计划 | `superui-planner` |
| implement with TDD, 写前端代码, 落地实现 | `superui-tdd` |
| review/audit/QA, 审核, 检查响应式, 视觉走查 | `superui-review` |

## 产物根目录策略

详细规则见 `skills/superui-shared/OUTPUT_POLICY.md`。总控必须先应用这份策略，再调度任何子 skill。

按顺序选择 `<ARTIFACT_ROOT>`：

1. **用户显式指定**：使用用户给出的目录，如 `docs/design/`、`.superui/`、临时目录。
2. **项目工作目录**：如果存在明确目标项目根目录，默认使用 `<target_project>/.superui/<project>/`。
3. **当前 workspace**：如果没有明确目标项目，使用 `<current_workspace>/outputs/<project>/`。
4. **用户级长期偏好**：用户偏好不写入项目产物目录，优先使用 `~/.superui/USER_PREFERENCES.md`；也可按平台使用 `~/.codex/superui/USER_PREFERENCES.md`、`~/.claude/superui/USER_PREFERENCES.md` 等；不可写时使用 `skills/superui-shared/USER_PREFERENCES.md` 作为本地回退。

首次无法判断时只问一个问题确认产物位置。之后在每个阶段开头报告当前 `<ARTIFACT_ROOT>`。

## 用户偏好记忆

开始任何 SuperUI 任务前：

1. 尝试读取 `~/.superui/USER_PREFERENCES.md`。
2. 如果当前 agent 平台有约定的用户级目录，可读取对应平台路径，例如 `~/.codex/superui/USER_PREFERENCES.md` 或 `~/.claude/superui/USER_PREFERENCES.md`。
3. 如果用户级文件不可用，读取 `skills/superui-shared/USER_PREFERENCES.md`。
4. 将稳定偏好作为软约束；与当前用户需求冲突时，以当前请求为准并记录冲突原因。

更新规则：

- 只记录用户明确表达的长期偏好，例如"我不喜欢大圆角"、"以后都优先 Element Plus"、"偏好密集型后台界面"。
- 不记录一次性需求，例如"这个页面用红色"、"这次先不要暗色模式"。
- 每条偏好记录包含日期、来源原话、适用范围、置信度。

## 全链路拓扑

```
① superui-source-analyzer → analysis/layout.md, interaction.md, style.md
         │
         ▼
② superui-design-md        → DESIGN.md, preview.html, preview-dark.html
         │
         ▼
③ superui-planner          → determination-report.md, proposal.md / design-proposal.md,
         │                     specs/*.md, test-plan.md
         ▼
④ superui-tdd              → 代码 + 测试 + design-adjustments.md
         │
         ▼
⑤ superui-review @ Plan Gate   → review/*.md + improvement-plan.md
         │
         ▼
④ superui-tdd              → 代码 + 测试 + design-adjustments.md
         │
         ▼
⑤ superui-review @ Code Gate   → review/*.md + improvement-plan.md
```

## 常用快捷路径

| 用户意图 | 路由 | 说明 |
|---------|------|------|
| "分析这个前端项目" | ① | 只分析，不往后走 |
| "分析项目并生成 DESIGN.md" | ①→② | 标准分析+设计提取 |
| "基于这个描述生成 DESIGN.md" | ② | 跳过分析，直接用描述生成 |
| "给这个项目做改造" | ①→②→③→⑤(Plan)→④→⑤(Code) | 全链路改造 |
| "新建一个项目，给设计规范" | ②→③→⑤(Plan)→④→⑤(Code) | 全新项目全链路 |
| "只做审核" | ⑤ | 跳过前面，直接审核已有产物 |
| "从方案阶段开始" | ③→⑤→④→⑤ | 假设 DESIGN.md 已存在 |
| "从实现阶段开始" | ④→⑤ | 假设方案已存在 |

## 工作流程

### Step 1：上下文解析

收到用户请求后，判断：

1. **目标项目名**：从用户描述中提取或询问，用于确定 `<ARTIFACT_ROOT>`。
2. **目标项目根目录**：如果用户在现有项目中工作，优先定位项目根目录。
3. **产物根目录**：按"产物根目录策略"确定并报告。
4. **用户偏好**：读取长期偏好并识别本次请求中的临时偏好。
5. **目标操作**：用户想做什么？
   - "分析" → sub-skill ①
   - "生成设计/生成 DESIGN.md" → sub-skill ②
   - "出方案/规划" → sub-skill ③
   - "实现/写代码" → sub-skill ④
   - "审核/检查" → sub-skill ⑤
   - "全链路" → 按拓扑顺序调度
6. **起始阶段**：检查 `<ARTIFACT_ROOT>/` 下已有产物，判断从哪个阶段开始。

### Step 2：阶段检测

扫描 `<ARTIFACT_ROOT>/` 目录：

```bash
ls <ARTIFACT_ROOT>/analysis/layout.md
ls <ARTIFACT_ROOT>/DESIGN.md
ls <ARTIFACT_ROOT>/determination-report.md
ls <ARTIFACT_ROOT>/test-plan.md
ls <ARTIFACT_ROOT>/design-adjustments.md
ls <ARTIFACT_ROOT>/review/improvement-plan.md
```

检测结果决定当前阶段。存在关键产物时，简短告知："检测到已有 XX 产物，从 YY 阶段继续。"

### Step 3：路由调度

按用户意图加载对应子 skill。每次加载前传递：`project`、`target_project`、`ARTIFACT_ROOT`、`source_dir`（如有）、长期偏好摘要、本次临时偏好。

```
superui-source-analyzer   # ①
superui-design-md         # ②
superui-planner           # ③
superui-tdd               # ④
superui-review            # ⑤
```

子 skill 执行完毕后回到总控。总控检查产物文件是否已生成，判断是否成功。

### Step 4：Gate 判断

在关键节点做 Gate 判断：

- **Plan Gate**：proposal.md 或 design-proposal.md 产出后 → 触发 `superui-review` @ Plan Gate。
- **Code Gate**：代码和测试产出后 → 触发 `superui-review` @ Code Gate。

Gate 未通过时，根据 improvement-plan.md 决定：回退到 ④ 修改、回退到 ③ 重新规划，或暂停等待人类决策。

### Step 5：流转与交接

每个阶段完成后：

1. 确认产物文件已生成。
2. 汇报当前阶段完成情况和产物路径。
3. 用户要求"全部自动走"时继续推进；否则在高风险阶段前短暂停顿确认。
4. 如发现可沉淀偏好，按"用户偏好记忆"更新。

## 状态追踪

复杂链路维护：

```
<ARTIFACT_ROOT>/pipeline-status.md
```

```markdown
# 管线状态

- 阶段 ① 源码分析: 完成
- 阶段 ② DESIGN.md: 完成
- 阶段 ③ 方案规划: 进行中（改造路径）
- 阶段 ⑤ Plan Gate: 待执行
- 阶段 ④ TDD 实现: 待执行
- 阶段 ⑤ Code Gate: 待执行
```

## 异常处理

| 异常情况 | 处理方式 |
|---------|---------|
| 子 skill 执行失败 | 报告失败原因，给出重试、降级或暂停选项 |
| 前置产物缺失 | 说明缺少哪个产物，并路由到生成该产物的子 skill |
| 用户中途改变方向 | 更新意图，重新规划路由和 `<ARTIFACT_ROOT>` |
| 审核发现阻塞问题 | 暂停流程，输出 `review-conflicts.json` 等待人类决策 |
| 系统级偏好不可写 | 使用 `skills/superui-shared/USER_PREFERENCES.md` 回退，并在汇报中说明 |

## 工具依赖

- 使用当前运行环境提供的 skill 加载机制调度 5 个子 skill。
- 使用 `rg`、`rg --files`、目录列表和 shell 检测产物文件。
- 使用可用文件读写工具维护 `pipeline-status.md` 和偏好记录。
