# SuperUI

SuperUI 是一套面向前端 UI 工作流的 AI agent skill / workflow 集合。它不绑定某一个 agent 平台，也不是单个“生成页面”的提示词，而是一套从设计分析、设计规范、方案规划、TDD 实现到交叉审核的完整前端协作流程。

它可以被 Codex、Claude、OpenAI Agents、Cursor、Windsurf 或其他支持 skill / rule / workflow 机制的 coding agent 使用。目标是让 agent 在做前端时不再直接跳到代码，而是先理解设计意图、沉淀可复用产物，再用可验证的方式落地实现。

## SuperUI 可以做什么

SuperUI 覆盖前端 UI 的完整生命周期：

- 分析现有 React、Vue、Next、Nuxt、Vite 等前端项目。
- 提取路由结构、页面布局、响应式策略、交互闭环、颜色、字体、组件样式和源码证据。
- 生成或更新 `DESIGN.md` 设计规范，包括设计 token、组件规则、响应式行为和亮/暗主题预览。
- 判断任务应该走“存量改造”还是“全新设计”。
- 基于 `DESIGN.md` 生成方案文档、行为规格和测试计划。
- 用 TDD 方式实现前端 UI，约束 token 使用、响应式布局、视觉契约、交互行为和可访问性。
- 对方案和代码做 Plan Gate / Code Gate 审核，输出 `improvement-plan.md`。
- 记录用户长期偏好，让后续 UI 工作不断贴近用户审美和工程习惯。

## 技能结构

```text
skills/
  superui/                    # 总控入口：识别意图、选择产物路径、调度子 skill
  superui-source-analyzer/    # 源码分析：提取布局、交互、样式和证据
  superui-design-md/          # DESIGN.md：生成设计规范和可视化预览
  superui-planner/            # 方案规划：生成 proposal、specs、test-plan
  superui-tdd/                # TDD 实现：测试先行、token 约束、响应式落地
  superui-review/             # 交叉审核：方案/代码审核和改进计划
  superui-shared/             # 共享规则：响应式约束、审核标准、产物策略、偏好模板
```

## 多 Agent 生态兼容

SuperUI 参考 Superpowers 的多生态组织方式：核心能力放在统一的 `skills/` 目录，平台适配层只负责发现、安装和工具映射。

当前仓库包含这些入口：

- `AGENTS.md`：通用 agent / OpenAI Agents / Codex 风格入口。
- `CLAUDE.md` 与 `.claude-plugin/plugin.json`：Claude / Claude Code 入口。
- `.codex-plugin/plugin.json`：Codex App / Codex CLI 插件元数据。
- `.cursor-plugin/plugin.json` 与 `.cursor/rules/superui.mdc`：Cursor 入口。
- `GEMINI.md` 与 `gemini-extension.json`：Gemini 入口。
- `.kimi-plugin/plugin.json`：Kimi Code 插件元数据和工具映射。
- `.opencode/INSTALL.md`：OpenCode 安装说明。
- `.windsurf/rules/superui.md`：Windsurf 规则入口。
- `package.json`：为 git-backed package / Pi-style skill 加载保留元数据。

详细说明见：

```text
docs/AGENT_ECOSYSTEMS.md
```

## 能达到什么效果

使用 SuperUI 后，前端产物会更接近“可持续协作”的状态：

- **设计更一致**：颜色、字体、间距、圆角、阴影等规则沉淀到 `DESIGN.md`，减少临时发挥。
- **过程可追溯**：分析、方案、测试、偏离记录、审核意见都会形成文件产物。
- **响应式更稳**：通过 `RESPONSIVE_RULES.md` 明确禁止固定宽度、主布局 absolute、响应式 `!important` 等问题。
- **交互更完整**：关注 CRUD 闭环、加载态、成功反馈、错误反馈、乐观更新和状态同步。
- **可访问性更可靠**：测试和审核覆盖键盘导航、focus、对比度、表单 label、图片 alt 等检查项。
- **跨会话可恢复**：后续 agent 可以从 `.superui/` 或 `outputs/` 中恢复上下文，不必重新猜设计意图。
- **越用越贴近偏好**：用户明确表达的长期偏好会被记录，下次生成 UI 时自动作为软约束参考。

## 产物位置策略

SuperUI 每次运行都会先确定一个统一的 `<ARTIFACT_ROOT>`，所有子 skill 共用这个目录，避免产物散落。

选择顺序：

1. 用户明确指定产物目录。
2. 如果能识别目标项目根目录，默认写入：

```text
<target_project>/.superui/<project>/
```

3. 如果没有明确目标项目，默认写入：

```text
<current_workspace>/outputs/<project>/
```

长期用户偏好不是项目产物，建议写入用户级 SuperUI 目录：

```text
~/.superui/USER_PREFERENCES.md
```

如果运行环境有自己的用户级 skill 目录，也可以使用对应平台路径，例如：

```text
~/.codex/superui/USER_PREFERENCES.md
~/.claude/superui/USER_PREFERENCES.md
```

如果用户级位置不可用，则回退到仓库内模板：

```text
skills/superui-shared/USER_PREFERENCES.md
```

## 典型用法

分析现有项目：

```text
Use $superui to analyze this React project and extract its UI design system.
```

根据描述生成设计规范：

```text
Use $superui to create a DESIGN.md for a dense enterprise dashboard with restrained visual styling.
```

规划并实现页面：

```text
Use $superui to plan and implement this admin page from DESIGN.md with TDD and accessibility checks.
```

审核方案或代码：

```text
Use $superui-review to audit this plan/code for responsive behavior, token compliance, and interaction completeness.
```

## 工作流概览

```text
用户需求
  ↓
superui 总控
  ↓
确定 ARTIFACT_ROOT + 读取用户偏好
  ↓
源码分析 / DESIGN.md / 方案规划 / TDD 实现 / 交叉审核
  ↓
生成可复用产物
  ↓
后续会话继续复用和迭代
```

## 为什么需要 SuperUI

通用 coding agent 很容易把“做一个页面”理解成“立刻写代码”。这样短期看起来很快，但长期会出现几个问题：

- 设计规则没有沉淀。
- 响应式和可访问性容易靠运气。
- 多轮对话后设计意图丢失。
- 修改和审核没有证据链。
- 用户偏好不能持续积累。

SuperUI 的价值在于把这些隐性工作显式化：先分析、再规范、再规划、再测试、再实现、再审核。最终得到的不是一次性的页面，而是一套能被 agent 反复读取、验证和延续的前端 UI 工作流。
