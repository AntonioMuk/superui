# DESIGN.md 模板参考

本文件不是最终输出，是生成 DESIGN.md 时的结构参照。

## 一、YAML 前言层（机器可读设计 token）

```yaml
---
version: alpha
name: <项目名>-design-analysis
description: <一句话描述整体设计风格和核心视觉特征>

colors:
  primary: "#xxxxxx"
  primary-active: "#xxxxxx"
  primary-disabled: "#xxxxxx"
  ink: "#xxxxxx"              # 最深文本色
  body: "#xxxxxx"             # 正文色
  body-strong: "#xxxxxx"      # 强调文本色
  muted: "#xxxxxx"            # 弱化文本色
  muted-soft: "#xxxxxx"       # 更弱文本色
  hairline: "#xxxxxx"         # 分割线
  hairline-soft: "#xxxxxx"    # 弱分割线
  canvas: "#xxxxxx"           # 页面背景
  surface-soft: "#xxxxxx"     # 次表面
  surface-card: "#xxxxxx"     # 卡片表面
  surface-elevated: "#xxxxxx" # 浮层表面
  on-primary: "#xxxxxx"       # 主色上的文字
  success: "#xxxxxx"
  warning: "#xxxxxx"
  error: "#xxxxxx"
  info: "#xxxxxx"

typography:
  display-xl:    { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }
  display-lg:    ...
  display-md:    ...
  display-sm:    ...
  title-lg:      ...
  title-md:      ...
  title-sm:      ...
  body-lg:       ...
  body-md:       ...
  body-sm:       ...
  caption:       ...

spacing:
  unit: 4px                    # 间距基准单位
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px

borderRadius:
  none: 0
  sm: 2px
  md: 4px
  lg: 8px
  xl: 12px
  full: 9999px

shadows:
  none: "none"
  sm: "0 1px 2px rgba(0,0,0,0.05)"
  md: "0 4px 6px rgba(0,0,0,0.07)"
  lg: "0 10px 15px rgba(0,0,0,0.1)"
  xl: "0 20px 25px rgba(0,0,0,0.15)"

breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
---
```

## 二、Markdown 正文层（人类可读的设计理由）

按以下顺序组织：

### 1. Overview
- 一句话描述这个设计系统的核心特征
- 品牌调性：是什么感觉（专业/活泼/极简/奢华）
- 设计哲学：为什么选择这些设计决策

### 2. Design Intelligence
- Product type：产品/业务类型
- Audience：目标用户和使用场景
- Primary job：用户在界面中的主要任务
- Density：稀疏/均衡/密集
- Trust level：普通/交易/金融/医疗/政务/安全敏感
- Platform：桌面 Web / 移动 Web / 响应式 Web App / 原生 App / 沉浸式
- Brand posture：冷静/高级/活泼/技术/编辑感/工具型/表达型
- Recommended pattern：推荐页面/应用模式
- Style rationale：为什么这种风格适合该产品
- Anti-patterns to avoid：必须规避的反模式

### 3. Colors ← 对应 requirements 的"配色与样式"
- 主色/品牌色：hex + 使用场景
- 功能色：成功/警告/危险/信息 + 各状态
- 中性色：文本阶、背景阶、边框阶
- 语义化命名规则
- 对比度合规声明

### 4. Typography ← 对应 requirements 的"排版规则"
- 字体族选择理由
- 字号层级的视觉逻辑
- 字重分配规则
- 行高与段落间距

### 5. Layout ← 对应 requirements 的"布局"
- 栅格系统说明
- 页面分区模式
- 间距基准与刻度
- 列表/网格布局偏好

### 6. Elevation & Depth ← 对应 requirements 的"阴影与层级"
- 阴影系统定义
- z-index 分层规范
- 表面层级关系

### 7. Shapes
- 圆角体系
- 图标风格
- 装饰元素规则

### 8. Components
- 按钮（变体×尺寸矩阵）
- 输入框（状态矩阵）
- 卡片
- 导航
- 弹窗/抽屉/对话框

### 9. Interaction Loop ← ⭐ 扩展部分，Google 原版没有
- 操作-反馈闭环总览
- CRUD 闭环（每实体的触发→校验→请求→反馈→同步）
- 加载态策略
- 错误处理策略
- 乐观更新策略

### 10. Do's and Don'ts
- 每个核心组件/场景的正确 vs 错误用法
- 配图说明（文字描述即可）

### 11. Responsive Behavior ← 对应 requirements 的"响应式设计"
- 断点体系
- 各断点行为规则
- 移动端特殊处理

### 12. Agent Prompt Guidelines
- 给 AI coding agent 的指令：如何根据此 DESIGN.md 生成 UI
- 禁止项（`MUST NOT`）
- 强制项（`SHALL`）
- 降级策略

