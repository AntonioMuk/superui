# RESPONSIVE_RULES — 响应式布局硬约束

本文档是前端实现的不可协商约束。所有产出代码（HTML/CSS/Vue/React）必须通过以下检查，违反即不合格。

---

## 一、禁止项（MUST NOT）

以下写法一旦出现在代码中，必须重写，不存在例外：

| # | 规则 | 示例（违规） | 说明 |
|---|------|-------------|------|
| R1 | `position: absolute` 不得用于主布局容器 | `position: absolute; top: 80px; left: 260px;` | 用于浮层指示器、tooltip 等辅助元素除外 |
| R2 | 不得使用固定像素宽度作为容器宽度 | `width: 1200px;` | 必须使用 `max-width: 1200px; width: 100%;` |
| R3 | 不得使用固定像素高度限制内容流 | `height: 600px; overflow: auto;` | 必须使用 `min-height` 或让高度由内容决定 |
| R4 | 不得在响应式媒体查询中使用 `!important` | `@media (max-width: 768px) { .container { width: 100% !important; } }` | `!important` 破坏级联，响应式需用优先级而非强制 |
| R5 | 不得在 HTML 内联样式中写布局属性 | `<div style="width:800px; display:flex">` | 内联样式仅允许动态值（如通过 JS 计算的 transform），静态布局必须在 CSS/样式文件中 |

---

## 二、强制项（SHALL）

以下规则必须满足，不可省略：

| # | 规则 | 示例（合规） |
|---|------|-------------|
| R6 | 主布局必须使用 Flexbox 或 CSS Grid | `display: grid; grid-template-columns: 260px 1fr;` |
| R7 | 容器宽度必须使用 `max-width` + 百分比 | `max-width: 1200px; width: 100%; margin: 0 auto;` |
| R8 | 字号必须使用 `clamp()` 或 `rem` 单位 | `font-size: clamp(1rem, 2.5vw, 1.5rem);` |
| R9 | 间距必须使用 DESIGN.md 定义的 spacing token | `padding: var(--space-md);` 或 `p-4`（Tailwind spacing 对应 DESIGN.md） |
| R10 | 至少定义 sm / md / lg 三个断点 | `@media (max-width: 640px)`, `@media (max-width: 768px)`, `@media (max-width: 1024px)` |
| R11 | 所有图片必须 `max-width: 100%; height: auto;` | `img { max-width: 100%; height: auto; display: block; }` |
| R12 | 移动端触控目标最小 44×44px | 按钮、链接、表单项的点击区域 ≥ 44×44px |

---

## 三、推荐项（SHOULD）

非强制但强烈建议：

| # | 规则 |
|---|------|
| R13 | 使用 CSS 容器查询（`@container`）替代部分媒体查询 |
| R14 | 移动优先：基础样式为移动端，通过 `min-width` 媒体查询叠加桌面样式 |
| R15 | 使用 `aspect-ratio` 替代 padding-bottom hack |
| R16 | 使用 `gap` 属性替代 margin 间距（Flexbox/Grid 中） |
| R17 | 动画使用 `prefers-reduced-motion` 媒体查询包裹 |

---

## 四、自检清单

编码完成后，逐项自检：

- [ ] 全局搜索 `position: absolute`，确认无一用于主布局
- [ ] 全局搜索 `width: [0-9]+px`，确认无一为容器宽度
- [ ] 全局搜索 `!important`，确认无一在媒体查询中
- [ ] 全局搜索 `font-size: [0-9]+px`，确认已全部替换为 clamp/rem
- [ ] 确认间距值均为 DESIGN.md spacing token
- [ ] 确认定义了至少 3 个断点
- [ ] 确认所有图片有 max-width:100%
- [ ] 确认触控目标 ≥ 44×44px

