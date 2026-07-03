---
name: superui-tdd
description: "Use when the user explicitly mentions superui-tdd, $superui-tdd, frontend UI implementation, TDD, tests first, responsive constraints, visual contract tests, interaction tests, accessibility checks, token-based styling, or implementing UI code from DESIGN.md, proposal.md, specs, or test-plan.md."
---

# TDD 前端实现

严格的测试驱动开发。不跳过 RED 阶段，不悄悄地偏离设计规范。

## 核心规则

- **RED 阶段不可跳过**：必须先写一个失败的测试，看到它 RED，再写实现代码。不允许在没有失败测试的情况下直接写实现。
- **DESIGN.md 是唯一真相源**：所有颜色、字号、间距、圆角必须引用 DESIGN.md 中的 token，不可硬编码数值。
- **RESPONSIVE_RULES 是硬约束**：违反任何一条 MUST NOT 的代码必须重写，不存在"暂时这样后面再改"。
- **偏离必须记录**：任何对 DESIGN.md 的偏离（无论多小），必须记录到 `design-adjustments.md`，说明原因和替代方案。
- **产物路径统一**：测试、偏离记录和状态文件使用 SuperUI 传入的 `<ARTIFACT_ROOT>`；实现代码写入目标项目目录。

## 流程速览

```
预检   加载输入 → specs/*.md + test-plan.md + DESIGN.md + 方案文档
          ↓
RED    写失败测试 → 确认测试 RED
          ↓
GREEN  写最小实现 → 确认测试 GREEN
          ↓
REFACTOR  重构 → 保持 GREEN → 全量回归
          ↓
验收   三层测试金字塔 → visual + interaction + a11y
          ↓
记录   design-adjustments.md
```

---

## 预检：输入加载与约束校验

### 必须读取的文件

| 文件 | 来源 skill | 用途 |
|------|-----------|------|
| `DESIGN.md` | superui-design-md | 设计 token 和规则 |
| `specs/*.md` | superui-planner | 行为规格（GIVEN/WHEN/THEN） |
| `test-plan.md` | superui-planner | 测试清单和标准 |
| `proposal.md` 或 `design-proposal.md` | superui-planner | 开发顺序和组件树 |

### RESPONSIVE_RULES 宣誓

开始编码前，必须先读取并确认 `skills/superui-shared/RESPONSIVE_RULES.md` 中的硬约束。路径以当前 skill 仓库为准；如被安装到用户级 skill 目录，则使用安装后的 `superui-shared` 相对位置。以下为核心摘要（完整版以共享文件为准）：

**禁止项（违反即不合格）：**
- ❌ `position: absolute` 用于主布局容器
- ❌ 固定像素宽度作为容器宽度（如 `width: 1200px`）
- ❌ 固定像素高度限制内容流（如 `height: 600px`）
- ❌ `!important` 用于响应式覆写
- ❌ 内联样式写布局属性（如 `<div style="width:800px">`）

**强制项（必须满足）：**
- ✅ 主布局使用 Flexbox 或 CSS Grid
- ✅ 容器宽度用 `max-width` + 百分比
- ✅ 字号用 `clamp()` 或 `rem` 单位
- ✅ 间距使用 DESIGN.md 定义的 spacing token
- ✅ 至少定义 sm / md / lg 三个断点
- ✅ 图片 `max-width: 100%; height: auto`
- ✅ 移动端触控目标最小 44×44px

---

## RED：写失败测试

按 `test-plan.md` 中的测试清单和 `specs/*.md` 中的行为规格，逐组件写测试代码。

### 测试框架选型

| 层 | 推荐工具 | 备用工具 |
|----|---------|---------|
| 视觉契约 | Playwright + pixelmatch 或截图对比 | 手动对比 DESIGN.md preview.html |
| 交互行为 | Playwright + Testing Library | Cypress |
| 可访问性 | axe-core + Playwright | pa11y |

工具安装策略：先尝试 `npx playwright install` / `npm install @axe-core/playwright` 等，不可用时降级为手动测试清单。

### 测试代码结构

```
<ARTIFACT_ROOT>/
├── tests/
│   ├── visual/          # 视觉契约测试
│   │   ├── button.test.ts
│   │   ├── card.test.ts
│   │   └── ...
│   ├── interaction/      # 交互行为测试
│   │   ├── crud.test.ts
│   │   ├── responsive.test.ts
│   │   └── ...
│   └── a11y/             # 可访问性测试
│       ├── wcag.test.ts
│       └── keyboard.test.ts
```

### RED 确认

每个测试文件写完后，运行确认 RED（预期全部失败）：

```bash
npx playwright test --reporter=list
```

如测试在未写实现时通过（假绿），说明测试写得有问题——修正测试直到它真正 RED。

---

## GREEN：写最小实现

针对 RED 的测试，写刚好能让测试通过的最小实现。

### 实现规则

1. **每次只针对一个测试套件**：一个组件一个组件来，不要同时写多个组件的实现
2. **最小代码**：只写刚好让测试通过的代码，不做"预判未来需求"的过度设计
3. **Token 引用**：
   - CSS 变量：`var(--color-primary)` 而非 `#cc785c`
   - Tailwind：`bg-primary` 而非 `bg-[#cc785c]`
   - 间距：`var(--space-md)` 或 `gap-4` 而非 `gap: 16px`
4. **RESPONSIVE_RULES 实时检查**：每写一个组件，自查是否触犯任何禁止项

### GREEN 确认

运行对应测试套件，确认 GREEN：

```bash
npx playwright test tests/interaction/button.test.ts --reporter=list
```

---

## REFACTOR：重构

测试全部 GREEN 后，检查代码质量：

- 是否有重复代码可以抽取？
- 是否有硬编码的 token 值？
- 组件是否遵循单一职责？
- 是否有未使用的变量/导入？

每次重构后立即运行全量测试，确保保持 GREEN。重构中任何导致 RED 的修改必须回滚。

**组件间回归**：每完成一个组件的 RED→GREEN→REFACTOR 循环后，运行一次全量测试确认未破坏已有组件。全量 GREEN 后再开始下一个组件。

---

## 验收：三层测试金字塔

### 第 1 层：视觉契约测试

验证组件的实际渲染与 DESIGN.md 的 preview.html 一致：

| 检查项 | 方法 | 允许偏差 |
|--------|------|---------|
| 配色 | 截图取色值对比 DESIGN.md colors | 色差 ≤ 2%（ΔE ≤ 5） |
| 字号 | 元素 computed style 对比 typography token | ≤ 2px |
| 间距 | 元素 bounding rect 对比 spacing token | ≤ 2px |
| 圆角 | border-radius computed value | 完全一致 |

如果 Playwright/pixelmatch 不可用，降级为手动对照 checklist。

### 第 2 层：交互行为测试

按 `specs/*.md` 逐条验证：

- CRUD 完整闭环：触发 → 校验 → 请求 → 反馈 → 状态同步
- 响应式断点切换：各断点下布局正确变化
- 反馈机制：加载态/成功/错误/乐观更新

### 第 3 层：可访问性测试

```bash
npx axe --stdout <page-url>   # axe-core 扫描
```

检查项：
- WCAG 2.1 AA 级别 0 违规
- 键盘 Tab 键可到达所有可交互元素
- 可见的 focus 指示器
- 所有图片有 alt 属性
- 表单有 label 关联

工具不可用时，手工逐项对照 WCAG 清单检查。

---

## 记录：design-adjustments.md

任何对 DESIGN.md 的偏离（无论原因），必须记录：

```markdown
# 设计偏离记录

## [偏离编号] - [日期]
- **偏离项**: [具体偏离了什么]
- **DESIGN.md 要求**: [原文引用]
- **实际实现**: [实际做了什么]
- **原因**: [为什么偏离]
- **影响范围**: [哪些组件/页面受影响]
- **是否可回退**: [将来是否有计划回归 DESIGN.md]
```

不可悄悄修改后不记录。此文件是追溯设计决策的关键。

---

## 产物清单

| 文件 | 位置 |
|------|------|
| 实现代码 | `<target-project>/src/` |
| 测试代码 | `<ARTIFACT_ROOT>/tests/` |
| 偏离记录 | `<ARTIFACT_ROOT>/design-adjustments.md` |

## 工具依赖

- Playwright（首选）或 Cypress：交互 + 视觉测试
- axe-core：可访问性扫描
- pixelmatch（首选）或手动对比：视觉回归
- 所有工具不可用时降级为手动检查清单

