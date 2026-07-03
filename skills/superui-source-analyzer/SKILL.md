---
name: superui-source-analyzer
description: "Use when the user explicitly mentions superui-source-analyzer, $superui-source-analyzer, source analysis, extract design system, analyze existing React/Vue/Next/Nuxt/Vite/frontend project, routes, layout structure, responsive behavior, interaction loops, design tokens, colors, typography, component styling, or evidence for DESIGN.md and SuperUI planning."
---

# 前端源码分析

从现有前端项目源码中提取设计精华，不是罗列代码，而是提炼"这个项目在视觉和交互上做了什么选择、为什么这样做"。

## 核心规则

- **只分析不修改**：此 skill 只读取源码，不做任何写操作。分析产物落到 `<ARTIFACT_ROOT>/analysis/` 下。
- **沿用总控路径**：必须使用 `superui` 传入的 `<ARTIFACT_ROOT>`，不得改写到其他输出目录。
- **证据链**：每条结论必须附源码位置（文件路径+行号范围），不可凭空推测。
- **优先级**：先扫描整体结构再深入细节，避免陷入某个组件而丢失全局视野。
- **结构化清单同步**：读取 `skills/superui-shared/TASK_MANAGEMENT.md`。开始分析前更新 `<ARTIFACT_ROOT>/todo.md`，关键证据、范围裁剪和阻塞追加到 `progress.md`，完成后更新 `pipeline-status.md`。

## 流程速览

```
Step 1  项目识别 → 技术栈、目录结构、构建配置
          ↓
Step 2  布局分析 → layout.md
Step 3  交互分析 → interaction.md
Step 4  样式分析 → style.md（可与 Step 2、3 并行）
```

## 输入参数

- **project**：项目名称，用于确定产物路径 `<ARTIFACT_ROOT>/`。从总控传入，或用户明确指定。
- **source_dir**：源码目录的绝对路径。如用户只说"分析这个项目"但没指路径，先问。
- **preferences**：来自 SuperUI 偏好记忆的软约束，用于识别用户更关心的设计维度，但不得替代源码证据。

## 你的工作方式

- 接到任务后，先确认 `project` 和 `source_dir` 两个参数。
- 分析过程中发现代码量极大时，优先读取路由文件、入口组件、全局样式、设计 token 文件，用 `rg` / `rg --files` 做关键字搜索补充。
- 三个分析报告必须独立完整，可以并行写。

---

## Step 1：项目识别

读取项目根目录的配置文件，识别：

1. **技术栈**：Vue 2/3 还是 React 16/17/18？有无 TypeScript？构建工具（Vite/Webpack/Next/Nuxt）？
2. **目录结构**：`src/` 下的顶层目录及其用途（components、pages、views、layouts、hooks、stores、styles 等）
3. **样式方案**：CSS Modules / Tailwind / SCSS / CSS-in-JS / styled-components？是否使用设计 token/主题变量？
4. **路由文件**：找到路由配置，提取所有页面路由和路由守卫逻辑。对于 Next.js，读取 `app/` 或 `pages/` 目录结构和 layout 文件。
5. **全局入口**：`App.vue` / `_app.tsx` / `layout.tsx` 等，理解全局布局壳。

产物：在分析报告开头附一段项目概览（技术栈、目录结构树、路由表），作为三份报告的共同前缀。

---

## Step 2：布局分析 → `analysis/layout.md`

逐层扫描组件，重点回答以下问题：

### 2.1 页面与路由层
- 从路由配置出发，列出所有页面级组件，标注每个页面对应的路由路径
- 识别哪些页面共享同一个布局壳（Layout）

### 2.2 分区与分层
- 每个页面内部的语义分区（header / sidebar / main / footer / aside）
- 组件嵌套层级：父组件→子组件→孙组件的层级关系
- 弹窗/抽屉/对话框的触发源和渲染位置（是与触发组件同级还是 portal 到 body）

### 2.3 布局模式
- 列表布局：哪些页面使用列表？是横向卡片网格还是纵向列表行？每行列数？响应式变化规则？
- 网格/栅格系统：使用了几列栅格？断点值是多少？列间距（gutter）值？
- 对齐与间距：Flexbox/Grid 的对齐偏好（居中？左对齐？两端对齐？），间距是固定值还是基于设计 token？

### 2.4 响应式策略
- 断点定义（从代码中提取具体 px 值）
- 各断点下的布局变化（隐藏/显示/重排/折叠）
- 使用的流式单位（vw/vh/%、clamp()）

### 2.5 弹窗与页面切换
- 弹窗触发源与目标弹窗组件的对应关系
- 弹窗层级（z-index 值）是否存在层级规范
- 页面跳转方式：路由跳转 / 弹窗内嵌 / 抽屉侧滑 / Tab 切换

输出格式：
```markdown
# 布局分析

## 项目概览
（来自 Step 1 的公共前缀）

## 页面与路由
| 路由 | 页面组件 | 布局壳 | 备注 |
|------|---------|--------|------|

## 分区结构
### [页面名]
- 分区1: [header] — 组件: `XHeader.vue` — 功能: 顶部导航
- 分区2: [main] — 组件: `XList.vue` — 功能: 内容列表
- ...

## 布局模式
- 类型: 列表网格 / 单列 / 双栏 / ...
- 栅格: {列数} 列，断点: {值}，列间距: {值}
- 对齐: ...
- 间距 token: ...

## 响应式
| 断点 | 值 | 布局变化 |
|------|-----|---------|

## 弹窗与切换
| 触发元素 | 弹窗组件 | z-index | 触发方式 |
|----------|---------|---------|---------|
```

---

## Step 3：交互分析 → `analysis/interaction.md`

对每个页面/组件，追踪用户可执行的操作，回答：

### 3.1 操作清单
对每个交互操作记录：
- **触发元素**：按钮/链接/手势/快捷键，附组件名和行号
- **处理函数**：事件处理函数名，是否防抖/节流
- **副作用**：操作触发的状态变更、API 调用、路由跳转

### 3.2 反馈机制
对每个操作，追踪其四态反馈：
- **加载态**：Skeleton 骨架屏 / Spinner 旋转器 / 进度条 / 按钮 disabled+loading
- **成功反馈**：Toast 提示 / Message 消息 / 页面跳转 / 列表刷新
- **错误反馈**：try-catch 处理 / 错误提示组件 / 错误边界
- **乐观更新**：是否有先更新 UI 再等请求的乐观策略

### 3.3 CRUD 与业务闭环
对每个业务实体，梳理完整闭环：

| 操作 | 触发 | API端点 | 请求前校验 | 成功行为 | 失败行为 | 数据同步策略 |
|------|------|---------|-----------|---------|---------|-------------|
| 新增 | 按钮/表单 | POST /api/x | 表单校验 | Toast+刷新列表 | 错误提示 | 重新请求列表 |
| 编辑 | ... | PUT /api/x/:id | ... | ... | ... | 局部更新 |
| 删除 | ... | DELETE /api/x/:id | 二次确认 | ... | ... | 列表移除该项 |

### 3.4 操作间依赖
- 哪些操作有前置条件（如"编辑需先选中一行"）
- 操作是否互斥（如"保存中禁用删除"）

输出格式：
```markdown
# 交互分析

## 操作清单
### [页面/组件名]
| 操作 | 触发元素 | 处理函数 | 防抖/节流 | 副作用 |
|------|---------|---------|----------|--------|

## 反馈机制
| 操作 | 加载态 | 成功反馈 | 错误反馈 | 乐观更新 |
|------|--------|---------|---------|---------|

## CRUD 闭环
### [业务实体名]
| 操作 | 触发 | API | 校验 | 成功 | 失败 | 同步策略 |
|------|------|-----|------|------|------|---------|

## 操作依赖
- ...
```

---

## Step 4：样式分析 → `analysis/style.md`

### 4.1 样式管理方式
- 确认项目使用的样式方案：CSS 变量 / Tailwind / CSS Modules / SCSS / CSS-in-JS / styled-components
- 是否有设计 token 文件（如 `tokens.css`、`theme.ts`、`tailwind.config.js`），如有则完整提取
- 是否有全局样式重置/基础样式文件

### 4.2 配色方案
从设计 token 或全局样式中提取：
- **主色/品牌色**：hex 值、使用场景
- **功能色**：成功绿/警告黄/危险红/信息蓝，各含默认态、hover 态、禁用态
- **中性色**：文本色阶（title/body/placeholder/disabled）、背景色阶（page/bg1/bg2/bg3）、边框色阶
- **语义化命名**：色值的 CSS 变量名或 token 名

### 4.3 排版规则
- **字体族**：body 字体、标题字体、等宽字体
- **字号层级**：h1-h6、body、caption、small 的字号和行高
- **字重**：regular/medium/semibold/bold 的应用规则

### 4.4 组件样式规则
对核心组件提取样式规则：
- **按钮**：尺寸档（sm/md/lg）、变体（primary/secondary/outline/ghost/danger）、各状态的样式
- **输入框**：高度、边框样式、focus 态、error 态、disabled 态
- **卡片**：背景色、圆角、阴影、内边距
- **导航**：高度、激活态样式、展开/折叠行为

### 4.5 阴影与层级
- 阴影等级（shadow-sm/md/lg/xl）及其具体值
- z-index 分层规范（如果存在）

输出格式：
```markdown
# 样式分析

## 样式方案
- 方案: Tailwind + CSS 变量
- Token 文件: `src/styles/tokens.css`

## 配色
### 主色
| Token | 值 | 用途 |
|-------|-----|------|

### 功能色
| Token | 值 | 默认 | Hover | 禁用 |
|-------|-----|------|-------|------|

### 中性色
| Token | 值 | 用途 |
|-------|-----|------|

## 排版
| 层级 | 字号 | 行高 | 字重 | 字体 |
|------|------|------|------|------|

## 组件样式
### 按钮
| 变体 | 尺寸 | 背景 | 文字色 | 边框 | 圆角 | Hover | Disabled |
|------|------|------|--------|------|------|-------|----------|

### [其他组件]
...

## 阴影与层级
| 等级 | 值 | 使用场景 |
|------|-----|---------|
```

---

## 工具使用指引

- 用 `rg --files` 扫描目录结构，定位路由文件、全局样式文件、设计 token 文件
- 用 `rg` 搜索关键模式：`z-index`、`breakpoint`、`@media`、`createRouter`、`BrowserRouter`、`defineComponent`、`export default function`
- 用可用文件读取工具精读关键文件
- 组件量大时，优先分析路由对应的页面组件和共享布局组件，叶子组件（如纯展示组件）仅当包含关键样式时才深入

## 产物位置

三份分析报告写入 `<ARTIFACT_ROOT>/analysis/`：
- `layout.md`
- `interaction.md`
- `style.md`

同时更新 `<ARTIFACT_ROOT>/todo.md`、`progress.md` 和 `pipeline-status.md`，用于跨 agent 交接。

