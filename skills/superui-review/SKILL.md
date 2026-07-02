---
name: superui-review
description: "Use when reviewing or auditing SuperUI plans, DESIGN.md files, frontend code, tests, responsive behavior, accessibility, token compliance, interaction completeness, visual QA, plan gates, code gates, or improvement-plan.md decisions."
---

# 交叉审核与收敛

三个视角、一个主席、最多三轮。这不是找茬，是确保产物经得起三个不同性格的工程师盯。

## 核心规则

- **rubric-locked.md 全程锁定**：审核标准在审核启动时从 `skills/superui-shared/rubric-locked.md` 读取，全程不可修改。防止"审着审着标准变了"。
- **设计情报与工程门禁必审**：同时读取 `DESIGN_INTELLIGENCE.md` 和 `ENGINEERING_GATES.md`，检查产品/受众适配、反模式、证据链、最小范围、复用和兼容性。
- **SubAgent 隔离运行**：三个 SubAgent 各自独立审核，互不知晓彼此的结论。若当前环境支持 subagent，就并行派发；否则由主 agent 按三角色顺序独立完成，避免互相污染。
- **Chairman 不做新评审**：Chairman 只做汇聚、提问、裁决，不引入新的评审意见。
- **最多 3 轮提问硬约束**：第三轮后强制终止。非核心分歧用默认值兜底由 Chairman 裁决；核心分歧写入 `review-conflicts.json` 提请人类决策。
- **产物全量留痕**：所有审核意见、分歧、修复记录、裁决结果写入 `<ARTIFACT_ROOT>/review/`。

## 流程速览

```
Gate 触发 → Plan Gate 或 Code Gate？
              ↓
Step 1   加载 rubric-locked.md + 待审产物
              ↓
Step 2   并行派发三个 SubAgent → 各自产出审核报告
              ↓
Step 3   Chairman 读取三份报告 → 构建分歧图谱
              ↓
Step 4   最多三轮提问收敛 → improvement-plan.md
              ↓
Step 5   执行修改 → 增量审核（可选）
```

---

## Gate 触发时机

此 skill 在两个 Gate 被触发：

| Gate | 触发时机 | 待审产物 |
|------|---------|---------|
| Plan Gate | proposal.md 或 design-proposal.md 产出后 | 方案文档 + DESIGN.md |
| Code Gate | TDD 实现 + 测试代码完成后 | 代码 + 测试 + DESIGN.md + design-adjustments.md |

两个 Gate 使用相同的三角色 + Chairman 流程，仅待审产物不同。

---

## Step 1：加载审核标准

读取 `skills/superui-shared/rubric-locked.md`、`skills/superui-shared/DESIGN_INTELLIGENCE.md`、`skills/superui-shared/ENGINEERING_GATES.md` 获取锁定的审核标准。如 `rubric-locked.md` 不存在，创建默认版本：

```markdown
# rubric-locked.md（锁定审核标准，全程不可修改）

## 通用标准
- 所有交互行为必须有反馈（加载/成功/错误）
- 所有颜色引用 DESIGN.md 定义的 token
- 所有间距引用 DESIGN.md spacing token
- 所有文本字号引用 DESIGN.md typography token

## RESPONSIVE_RULES 遵守
- 无 position:absolute 用于主布局
- 无固定像素宽度容器
- 容器使用 max-width + 百分比
- 字号使用 clamp() 或 rem
- 至少 3 个断点

## WCAG 标准
- 所有文本对比度 ≥ 4.5:1（正文）/ 3:1（大文本）
- 所有可交互元素可键盘到达
- 可见 focus 指示器

## Design Intelligence
- 产品类型、受众、密度、平台与 DESIGN.md 的风格方向一致
- 高信任行业不得使用削弱信任的娱乐化风格
- 明确记录 anti-patterns，并在代码/方案中规避

## Engineering Gates
- 证据确凿、最小范围、手术创伤、测试驱动、有效注释、奥卡姆剃刀、优先复用、最佳兼容均有证据
```

---

## Step 2：并行派发三角色 SubAgent

优先并行派发三个 SubAgent，各自携带以下 prompt 模板。若当前环境没有 subagent 工具，则分三次独立执行角色审查，每次只使用该角色允许关注的材料和输出格式。

### 角色 A：批判者（Critic）

```
你是前端工程的资深批判者。你的默认立场是怀疑——只相信证据，不相信声称。

## 关注焦点
1. 用户实际需求是否被完整覆盖？逐一对照需求清单
2. 交互闭环是否完整？（触发→校验→请求→反馈→同步），逐闭环检查
3. 边界场景是否覆盖？空数据/加载失败/权限不足/网络超时/极端数据

## 输出格式
格式：`[问题位置] | [对应需求] | [缺失/缺陷描述] | [严重程度：🔴阻塞/🟠严重/🟡建议]`

## 禁止越界
- 不评论配色、字体选择、CSS 写法
- 不评论后端接口设计
- 不评论代码风格（除非影响可读性到阻塞理解）
```

### 角色 B：协调者（Coordinator）

```
你是前后端对接的务实工程师。你关心的只有一件事：数据能不能跑通。

## 关注焦点
1. 前后端接口契约是否对齐？API 端点、请求体、响应体是否与后端一致
2. 错误码转译：后端错误码是否在前端有对应的用户可读提示
3. 业务交互闭环：每个 CRUD 操作是否从前端触发 → API 调用 → 响应处理 → UI 同步形成完整链条

## 输出格式
格式：`[调用位置] | [后端接口要求] | [缺失环节] | [修复建议]`

## 禁止越界
- 不评论视觉设计、配色、排版
- 不评论需求的合理性
- 不评论代码结构（除非导致数据流断裂）
```

### 角色 C：标审者（Auditor）

```
你是严谨的质检员。你逐行比对，只认证据。

## 关注焦点
1. 需求文档 / DESIGN.md / 产出代码三者是否一致
2. 实现是否脱离设计框架（颜色值是否匹配 token、间距是否匹配 spacing、字号是否匹配 typography）
3. Token 引用是否合规（是否用 CSS 变量而非硬编码、Tailwind 是否引用设计 token 类名）
4. Design Intelligence 是否被落实：产品类型、受众、密度、信任等级、反模式是否与实现一致
5. Engineering Gates 是否有证据：证据链、最小范围、复用、兼容性是否完整

## 输出格式
格式：`[文件:行号] | DESIGN.md 定义: {值} | 代码实际: {值} | 偏离等级: 🟢一致/🟡小偏/🟠中偏/🔴严重 | 修复建议`

## 禁止越界
- 不评论需求合理性
- 不评论接口设计
- 不评论代码架构（除非导致 token 引用不可行）
```

---

## Step 3：Chairman 构建分歧图谱

Chairman 读取三份 SubAgent 审核报告，构建分歧图谱：

```markdown
# 分歧图谱

## 共识项
三份报告都指出的问题：[列出]

## 独有见解
仅一份报告提出的问题：[列出]

## 冲突项
两份以上报告互相矛盾的结论：[列出]

## 缺口项
rubric-locked.md 中有关键维度过但三份报告均未覆盖：[列出]
```

---

## Step 4：Chairman 最多三轮提问收敛

### 提问优先级

每轮提问的优先级：**冲突项 > 缺口项 > 独有见解**

### 第 1 轮

针对冲突项和缺口项，拟定向三个 SubAgent 的问题。**重新 spawn 三个 SubAgent**（携带上一轮的完整报告 + Chairman 问题 + 其他 SubAgent 的相关观点作为上下文），获取答复后更新分歧图谱。

### 第 2 轮

如仍有冲突项，再次提问。如冲突已解决，针对剩余缺口项和高风险独有见解提问。

### 第 3 轮（强制终止轮）

- 非核心分歧 → Chairman 使用默认值裁决，记录裁决理由。**默认值优先级：标审者意见（DESIGN.md 合规性优先） > 协调者意见（数据链路可跑通） > 批判者意见（需求覆盖）。同优先级时采纳更严格的一方。**
- 核心分歧（影响用户核心需求、阻塞关键交互） → 写入 `review-conflicts.json` 提请人类决策

```json
{
  "conflicts": [
    {
      "id": "C001",
      "topic": "...",
      "position_a": "...",
      "position_b": "...",
      "impact": "阻塞用户核心需求 X",
      "chairman_recommendation": "...",
      "awaiting_human_decision": true
    }
  ]
}
```

### 收敛输出：improvement-plan.md

```markdown
# 改进方案

## 共识改进项
| 编号 | 问题描述 | 来源 | 改进措施 | 影响范围 |
|------|---------|------|---------|---------|

## 冲突裁决项
| 编号 | 冲突描述 | 裁决结果 | 裁决理由 |
|------|---------|---------|---------|

## 缺口补全项
| 编号 | rubric 要求 | 补全措施 |
|------|-----------|---------|

## 不修改项（含理由）
| 编号 | 问题描述 | 不修改理由 |
|------|---------|-----------|

## Rubric 覆盖度
- 总项数: N
- 已覆盖: M
- 未覆盖: K（附说明）

## Engineering Gates 覆盖度
| Gate | 结论 | 证据/缺口 |
|------|------|-----------|
```

---

## Step 5：执行修改（可选）

基于 improvement-plan.md：
1. 对"共识改进项"和"冲突裁决项"执行修改
2. 修改完成后可选择触发**增量审核**：仅审核 diff 范围，非全量重审
3. 增量审核通过后 Gate 放行
4. 如有人在类决策的核心冲突（review-conflicts.json），暂停等待人类裁决

---

## 产物清单

| 文件 | 位置 |
|------|------|
| 批判者报告 | `<ARTIFACT_ROOT>/review/critic-report.md` |
| 协调者报告 | `<ARTIFACT_ROOT>/review/coordinator-report.md` |
| 标审者报告 | `<ARTIFACT_ROOT>/review/auditor-report.md` |
| 分歧图谱 | `<ARTIFACT_ROOT>/review/divergence-map.md` |
| 冲突升级 | `<ARTIFACT_ROOT>/review/review-conflicts.json`（如有核心冲突） |
| 改进方案 | `<ARTIFACT_ROOT>/review/improvement-plan.md` |

## 工具依赖

- subagent / multi-agent 工具（如可用）：并行派发三角色审查；不可用时降级为主 agent 分角色审查
- `skills/superui-shared/rubric-locked.md`：锁定的审核标准
- `skills/superui-shared/DESIGN_INTELLIGENCE.md`：设计情报、行业适配和反模式
- `skills/superui-shared/ENGINEERING_GATES.md`：工程原则自查与审核门禁

