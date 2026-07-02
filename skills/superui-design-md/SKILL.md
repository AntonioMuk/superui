---
name: superui-design-md
description: "Use when creating or updating a DESIGN.md design system, design tokens, UI style guide, visual language, component rules, responsive behavior, or light/dark HTML previews from source analysis, user descriptions, brand references, or SuperUI preferences."
---

# DESIGN.md 生成

将设计意图转化为一份 AI 能精确执行的设计规范文件。

## 核心规则

- **格式严格遵循 Google Stitch DESIGN.md 规范**：双层结构——YAML 前言层（机器可读 token）+ Markdown 正文层（人类可读设计理由）。
- **案例驱动**：生成前先浏览 `examples/design-md/`（本 skill 内置案例库，74 个品牌 DESIGN.md）中与目标风格相近的案例作为参照。
- **设计情报先行**：生成 token 前读取 `skills/superui-shared/DESIGN_INTELLIGENCE.md`，先判定产品类型、受众、密度、信任等级、平台和反模式。
- **交互闭环扩展**：Google 原版缺少交互描述，此 skill 强制增加「Interaction Loop」段，覆盖 CRUD 闭环、反馈机制、操作依赖。
- **产物写入** `<ARTIFACT_ROOT>/`：`DESIGN.md`、`preview.html`、`preview-dark.html`。
- **偏好融合**：读取 SuperUI 传入的长期偏好和本次临时偏好。长期偏好是软约束；用户当前明确要求优先。
- **lint 校验**：生成后尝试运行 `npx @google/design.md lint DESIGN.md` 做 WCAG 对比度和格式校验。工具不可用时跳过并标注。

## 流程速览

```
Step 1  输入源加载 → 是分析报告还是用户描述？
Step 2  设计情报 → 产品/受众/密度/信任/反模式
Step 3  案例参照 → 从 74 个品牌案例中找风格参考
Step 4  生成 DESIGN.md → 按模板填充
Step 5  生成预览 HTML → 双色预览
Step 6  Lint 校验 → @google/design.md CLI
```

---

## Step 1：输入源加载

判断输入源类型：

**情况 A：有分析报告**（来自 `superui-source-analyzer`）
- 读取 `<ARTIFACT_ROOT>/analysis/layout.md`
- 读取 `<ARTIFACT_ROOT>/analysis/interaction.md`
- 读取 `<ARTIFACT_ROOT>/analysis/style.md`
- 综合分析报告中的结构，提取可量化的设计 token

**情况 B：用户直接描述**（无源码参考）
- 解析用户描述中的关键词：风格方向、配色偏好、布局要求、交互需求
- 如描述不完整，主动追问缺失维度后再生成

---

## Step 2：设计情报

读取 `skills/superui-shared/DESIGN_INTELLIGENCE.md`，生成一段设计情报摘要，并写入 DESIGN.md 正文。

必须判定：

- Product type
- Audience
- Primary job
- Density
- Trust level
- Platform
- Brand posture
- Recommended pattern
- Style rationale
- Anti-patterns to avoid

需要设计情报时，按 `DESIGN_INTELLIGENCE.md` 的 "Optional External Intelligence: ui-ux-pro-max-skill" 流程明确检查本地是否安装 `ui-ux-pro-max-skill`：

1. 搜索当前 workspace、`~/.claude/skills/`、`~/.agents/skills/`、`~/.codex/skills/`、`E:/MySkills/` 等常见位置。
2. 找到 `search.py` 后，运行 `--design-system -f markdown` 查询。
3. 将返回的 pattern/style/color/typography/anti-patterns 摘要写入 DESIGN.md 的 `Design Intelligence` 段。
4. 明确记录 Adopted / Rejected / Reason，避免无条件照搬。
5. 未安装或运行失败时，使用 `DESIGN_INTELLIGENCE.md` 的矩阵手动推导，并在 DESIGN.md 标注 `External inspiration: not available`。

该外部工具只能作为建议来源，不作为 SuperUI 的必需依赖。

---

## Step 3：案例参照

从案例库中找风格参照：

1. 根据分析报告、用户描述和偏好记忆中的风格特征，用目录列表或 `rg --files examples/design-md` 列出案例库目录
2. 选 2-3 个最接近的案例，读取 `examples/design-md/<案例名>/DESIGN.md`，学习其 YAML token 结构和 Markdown 描述风格
3. 参照案例但不照抄——提取的是格式结构，不是数值

案例风格速查（部分）：

| 风格方向 | 可参考案例 |
|---------|-----------|
| 科技/AI | claude, cursor, lovable, replicate |
| SaaS/工具 | linear.app, notion, figma, vercel |
| 消费品牌 | apple, nike, spotify, starbucks |
| 金融 | stripe, coinbase, revolut, wise |
| 汽车 | bmw, ferrari, lamborghini, tesla |
| 企业 | ibm, hashicorp, mongodb, sentry |

---

## Step 4：生成 DESIGN.md

按照 `templates/DESIGN.md.template.md` 的结构，逐段生成。

### 3.1 YAML 前言层生成规则

**colors**：
- 从分析报告的"配色方案"中提取或从用户描述中推导
- 必须覆盖：主色（含 hover/disabled）、功能色四色（success/warning/error/info）、中性色至少 8 阶（从 ink 到 canvas）
- 色值使用 hex 格式，不得使用 rgb()/hsl()
- 每个色值标注语义化变量名

**typography**：
- 至少定义 10 个字号层级：display-xl/lg/md/sm、title-lg/md/sm、body-lg/md/sm、caption
- 每层含：fontFamily、fontSize（px）、fontWeight（数字）、lineHeight（纯数字比例）、letterSpacing（px）
- 字体族必须指定 fallback：`"Display Font, system-ui, sans-serif"`

**spacing**：
- 基准单位 4px，从 xs(4px) 到 3xl(64px) 至少 8 档
- 如有分析报告中的间距 token，优先沿用

**borderRadius**：none(0) / sm(2px) / md(4px) / lg(8px) / xl(12px) / full(9999px)

**shadows**：至少 sm/md/lg/xl 四档，含完整 box-shadow 值

**breakpoints**：至少 sm/md/lg/xl/2xl 五个断点

### 3.2 Markdown 正文层生成规则

按以下 12 个段落依次撰写，每段至少 3 个要点：

1. **Overview**：一句话核心特征 + 品牌调性 + 设计哲学
2. **Design Intelligence**：产品类型、受众、密度、信任等级、平台、推荐模式和反模式
3. **Colors**：主色/功能色/中性色的使用场景和对比度声明
4. **Typography**：字体选择理由 + 层级视觉逻辑 + 字重分配
5. **Layout**：栅格 + 分区模式 + 间距系统的使用规则
6. **Elevation & Depth**：阴影使用场景 + z-index 分层
7. **Shapes**：圆角体系 + 图标风格
8. **Components**：按钮、输入框、卡片、导航、弹窗的详细规范（每个组件含变体×状态矩阵）
9. **Interaction Loop** ⭐：CRUD 完整闭环、加载态策略、错误处理、乐观更新
10. **Do's and Don'ts**：每个核心组件至少 1 对正反例
11. **Responsive Behavior**：断点行为、移动端特殊规则
12. **Agent Prompt Guidelines**：给 AI 的指令（禁止项 `MUST NOT` + 强制项 `SHALL`）

---

## Step 5：生成预览 HTML

基于 DESIGN.md 中的 token，生成两个独立的 HTML 文件：

### preview.html（亮色主题）

分两层生成，基础版必须完成，完整版视复杂度可做：

**基础版（MUST）**：
- 配色色板（所有颜色按组排列，附变量名和 hex 值）
- 排版示例（display-xl/lg/md/sm + title-lg/md/sm + body + caption 实际渲染）
- 按钮矩阵（primary/secondary/outline 三个变体，各含 default/hover/disabled 态）

**完整版（SHOULD，基础版完成后追加）**：
- 输入框状态（default/focus/error/disabled）
- 卡片示例
- 间距可视化

技术要求：
- 纯 HTML+内联 CSS，零外部依赖，可直接在浏览器打开
- 所有颜色引用 DESIGN.md 中的 CSS 变量
- 响应式布局，展示断点切换效果

### preview-dark.html（暗色主题）
同上但使用暗色背景，验证 DESIGN.md 在暗色模式下的表现。

---

## Step 6：Lint 校验

执行校验并处理结果：

```bash
npx @google/design.md lint DESIGN.md
```

- 工具可用：读取 lint 输出，修正报告的问题后重新 lint 至通过
- 工具不可用：在 DESIGN.md 末尾标注 `<!-- lint: skipped, @google/design.md CLI not available -->` 并继续
- 如有 WCAG 对比度违规，优先调整色值而非修改设计意图

---

## 产物清单

| 文件 | 位置 | 说明 |
|------|------|------|
| DESIGN.md | `<ARTIFACT_ROOT>/DESIGN.md` | 设计规范主文件 |
| preview.html | `<ARTIFACT_ROOT>/preview.html` | 亮色可视化预览 |
| preview-dark.html | `<ARTIFACT_ROOT>/preview-dark.html` | 暗色可视化预览 |

## 工具依赖

- `@google/design.md` CLI：lint/diff/export（首选，不可用时降级为跳过）
- 案例库：`examples/design-md/`（本 skill 内置，使用相对路径即可）
- 模板：`templates/DESIGN.md.template.md`（本 skill 内置）
- 共享规则：`skills/superui-shared/DESIGN_INTELLIGENCE.md`

