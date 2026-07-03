# SuperUI 兼容性矩阵

## 状态含义

- `入口已提供`：仓库中已有对应入口文件或 manifest。
- `技能发现`：入口声明了 `skills/` 或等效路径。
- `自动引导`：会在会话开始或上下文加载时引导智能体读取 `superui`。
- `端到端验证`：已经在对应运行时完成最小验收测试。

| 生态 | 入口已提供 | 技能发现 | 自动引导 | 端到端验证 | 备注 |
|------|------------|----------|----------|------------|------|
| Codex App / Codex CLI | 是 | 是 | 依赖插件 / `AGENTS.md` | 未验证 | `.codex-plugin/plugin.json` 声明 `skills`，`AGENTS.md` 提供通用引导。 |
| Claude / Claude Code | 是 | 依赖平台 | 依赖 `CLAUDE.md` | 未验证 | `.claude-plugin/plugin.json` 提供元数据，`CLAUDE.md` 指向总控 skill。 |
| Cursor | 是 | 是 | 依赖 rules | 未验证 | `.cursor-plugin/plugin.json` 声明 `skills`，`.cursor/rules/superui.mdc` 提供规则入口。 |
| Gemini | 是 | 依赖上下文文件 | 是 | 未验证 | `GEMINI.md` 使用 `@./skills/superui/SKILL.md`。 |
| Kimi Code | 是 | 是 | 是 | 未验证 | `.kimi-plugin/plugin.json` 使用 `sessionStart.skill = superui`。 |
| OpenCode | 是 | 是 | 是 | 未验证 | `.opencode/plugins/superui.js` 注册 `skills/` 并注入 bootstrap。 |
| Windsurf | 是 | 依赖 rules | 依赖 rules | 未验证 | `.windsurf/rules/superui.md` 提供规则入口。 |
| 通用智能体 / OpenAI Agents | 是 | 手动或框架适配 | 依赖 `AGENTS.md` | 未验证 | 读取 `AGENTS.md` 后进入 `skills/superui/SKILL.md`。 |

## 最小验收测试

在干净会话中输入：

```text
Use SuperUI to create a DESIGN.md for a compact admin dashboard.
```

通过标准：

1. 智能体先加载 `skills/superui/SKILL.md`。
2. 智能体确定 `<ARTIFACT_ROOT>`。
3. 智能体读取用户偏好；没有用户级偏好时，只读取仓库模板。
4. 智能体路由到 `superui-design-md`。
5. 智能体不直接跳到页面代码实现。

完成某个平台的真实测试后，把 `端到端验证` 改为 `已验证`，并在备注中记录运行时版本、日期和关键日志位置。
