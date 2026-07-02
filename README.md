# SuperUI

> 让 coding agent 不再“直接开写页面”，而是先理解设计、沉淀规范、规划方案、测试落地、交叉审核。

SuperUI 是一套面向前端 UI 工作流的 agent-agnostic skill suite。它不是单个提示词，也不绑定某一个 agent 平台；它把前端协作拆成一条可恢复、可审计、可持续进化的链路：

```text
分析现有界面 -> 生成 DESIGN.md -> 规划方案与测试 -> TDD 实现 -> Plan / Code Gate 审核
```

适合用来创建、改造和审核网页、管理后台、dashboard、landing page、React/Vue 组件、设计系统和响应式界面。

## 为什么是 SuperUI

通用 coding agent 做前端时，常见问题不是“不会写代码”，而是跳得太快：

- 设计意图没有沉淀，下一轮对话就丢。
- token、间距、字号、状态和响应式规则各写各的。
- 页面看似完成，但 loading、empty、error、权限、极端数据没有闭环。
- 改造存量项目时，缺少证据链，容易大拆大改。
- 审核标准漂移，今天说好、明天又推翻。

SuperUI 把这些隐性工作显式化。它让 agent 先形成可复用产物，再进入实现；让设计、工程和审核都能被后续 agent 继续读取。

## 能做什么

| 能力 | 产物 |
|------|------|
| 分析现有前端项目 | `analysis/layout.md`、`interaction.md`、`style.md` |
| 生成设计规范 | `DESIGN.md`、`preview.html`、`preview-dark.html` |
| 判断改造还是新建 | `determination-report.md` |
| 输出落地方案 | `proposal.md` 或 `design-proposal.md` |
| 拆解行为规格 | `specs/*.md` |
| 制定测试计划 | `test-plan.md` |
| TDD 实现 UI | 代码、测试、`design-adjustments.md` |
| 交叉审核 | `review/*.md`、`review/improvement-plan.md` |
| 记住长期偏好 | `~/.superui/USER_PREFERENCES.md` 或项目本地偏好 |

## 设计效果

SuperUI 追求的不是“生成一个看起来还行的页面”，而是让前端产物进入更稳定的协作状态：

- 视觉一致：颜色、字体、间距、圆角、阴影进入 DESIGN.md，而不是散落在代码里。
- 风格贴合：生成前判断产品类型、受众、信息密度、信任等级、平台和反模式。
- 响应式可靠：显式检查固定宽度、主布局 absolute、移动端溢出、断点行为等问题。
- 交互完整：关注 CRUD 闭环、加载态、成功反馈、错误反馈、乐观更新和状态同步。
- 可访问性可测：覆盖键盘导航、focus、对比度、label、alt、语义结构。
- 改造有证据：先分析存量项目，再决定保留、替换、新增或移除。
- 审核可收敛：Plan Gate / Code Gate 使用锁定 rubric，最多三轮收敛，避免无休止争论。
- 越用越贴合：用户明确表达的长期偏好会沉淀为软约束。

## Skill 结构

```text
skills/
  superui/                    # 总控入口：定路径、读偏好、判阶段、调度子 skill
  superui-source-analyzer/    # 源码分析：布局、交互、样式、证据链
  superui-design-md/          # DESIGN.md：设计 token、组件规则、双色预览
  superui-planner/            # 方案规划：改造/新建判别、proposal、specs、test-plan
  superui-tdd/                # TDD 实现：测试先行、token 约束、响应式落地
  superui-review/             # 交叉审核：Plan Gate、Code Gate、improvement-plan
  superui-shared/             # 共享规则：路径策略、偏好、响应式、工程门禁、审核标准
```

`superui` 是唯一总入口。它会按需读取共享文件，不会把全部规则一次性塞进上下文。

## 多 Agent 生态

SuperUI 的核心能力只维护在 `skills/` 中；不同 agent 生态只做薄适配，负责发现技能、注入入口和映射工具。

| 生态 | 入口 |
|------|------|
| 通用 agent / OpenAI Agents / Codex 风格 | `AGENTS.md` |
| Claude / Claude Code | `CLAUDE.md`、`.claude-plugin/plugin.json` |
| Codex App / Codex CLI | `.codex-plugin/plugin.json`、`AGENTS.md` |
| Cursor | `.cursor-plugin/plugin.json`、`.cursor/rules/superui.mdc` |
| Gemini | `GEMINI.md`、`gemini-extension.json` |
| Kimi Code | `.kimi-plugin/plugin.json` |
| OpenCode | `.opencode/INSTALL.md`、`.opencode/plugins/superui.js` |
| Windsurf | `.windsurf/rules/superui.md` |

兼容性细节见：

- [docs/AGENT_ECOSYSTEMS.md](docs/AGENT_ECOSYSTEMS.md)
- [docs/COMPATIBILITY_MATRIX.md](docs/COMPATIBILITY_MATRIX.md)

## 典型用法

分析现有项目并提取设计系统：

```text
Use SuperUI to analyze this React project and extract its UI design system.
```

根据描述生成 DESIGN.md：

```text
Use SuperUI to create a DESIGN.md for a dense enterprise dashboard with restrained visual styling.
```

从设计规范规划并实现页面：

```text
Use SuperUI to plan and implement this admin page from DESIGN.md with TDD and accessibility checks.
```

只做方案或代码审核：

```text
Use SuperUI review to audit this plan/code for responsive behavior, token compliance, and interaction completeness.
```

支持 `$skill-name` 的平台也可以直接使用：

```text
$superui
$superui-design-md
$superui-review
```

## 产物放在哪里

SuperUI 每次运行都会先确定统一的 `<ARTIFACT_ROOT>`，所有子 skill 共用该目录。

优先级：

1. 用户显式指定的目录。
2. 能识别目标项目时：`<target_project>/.superui/<project>/`。
3. 没有明确目标项目时：`<current_workspace>/outputs/<project>/`。

长期用户偏好建议放在：

```text
~/.superui/USER_PREFERENCES.md
```

平台也可以使用自己的用户级路径，例如：

```text
~/.codex/superui/USER_PREFERENCES.md
~/.claude/superui/USER_PREFERENCES.md
```

用户级位置不可写时，写入项目本地私有文件：

```text
<target_project>/.superui/preferences.local.md
```

## 可选增强

生成 DESIGN.md 时，SuperUI 可以按需检查本地是否安装 `ui-ux-pro-max-skill`，并尝试引用它的设计系统、配色、字体、UX、图表和技术栈建议。

这不是硬依赖。未安装或不可用时，SuperUI 会继续使用内置 `DESIGN_INTELLIGENCE.md` 流程，并提示用户可选安装。

## 安装提示

不同平台的安装方式不同。最小原则是：让目标 agent 能看到本仓库的 `skills/`，并从 `skills/superui/SKILL.md` 作为入口开始。

OpenCode 可参考：

```json
{
  "plugin": ["superui@git+https://github.com/AntonioMuk/superui.git"]
}
```

更多平台请查看对应入口文件：`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursor/rules/superui.mdc`、`.windsurf/rules/superui.md`。

## 示例来源与许可

`skills/superui-design-md/examples/` 包含来自 VoltAgent `awesome-design-md` 的 DESIGN.md 示例，用于帮助 agent 理解高质量设计规范的写法。该目录保留其原始 MIT 许可证：

```text
skills/superui-design-md/examples/LICENSE
```

本仓库使用 MIT License。
