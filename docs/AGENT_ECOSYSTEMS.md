# SuperUI 多 Agent 生态兼容说明

SuperUI 的核心原则是：**核心能力只维护一份 `skills/`，不同 agent 生态只做薄适配层**。

这和 Superpowers 的做法类似：根目录保留通用入口文件，插件型平台提供自己的 manifest，CLI/IDE 型平台读取对应的规则文件或安装说明。

## 强触发约定

所有适配层都应把以下用户表达视为强触发，并先加载 `skills/superui/SKILL.md`：`SuperUI`、`superui`、`$superui`、`this skill`、`本技能`、`调用这个技能`、`使用这个技能`、`调用 SuperUI`、`使用 SuperUI`。

不要在用户明确点名 SuperUI 时直接执行普通前端流程。

## 当前支持的入口

| 生态 | 入口文件 | 作用 |
|------|----------|------|
| 通用 agent / OpenAI Agents / Codex 风格 | `AGENTS.md` | 告诉 agent 先读取 `skills/superui/SKILL.md` |
| Claude / Claude Code | `CLAUDE.md`、`.claude-plugin/plugin.json` | Claude 项目指令和插件元数据 |
| Codex App / Codex CLI | `.codex-plugin/plugin.json`、`AGENTS.md` | Codex 插件元数据和通用 agent 入口 |
| Cursor | `.cursor-plugin/plugin.json`、`.cursor/rules/superui.mdc` | Cursor 插件元数据和项目规则 |
| Gemini | `GEMINI.md`、`gemini-extension.json` | Gemini 上下文入口和扩展元数据 |
| Kimi Code | `.kimi-plugin/plugin.json` | Kimi 插件元数据和工具映射提示 |
| OpenCode | `.opencode/INSTALL.md`、`.opencode/plugins/superui.js` | OpenCode 安装说明、技能路径注册和 bootstrap 注入 |
| Windsurf | `.windsurf/rules/superui.md` | Windsurf 项目规则 |

## 适配层职责

适配层只负责三件事：

1. 让对应平台发现 SuperUI。
2. 把平台工具名称映射到 SuperUI 的通用动作。
3. 引导 agent 加载 `skills/superui/SKILL.md` 作为总控入口。

适配层不应该复制 SuperUI 的完整流程。流程只维护在 `skills/` 内，避免不同平台行为漂移。

## 工具映射约定

SuperUI skill 正文会尽量使用平台中立动作：

- 搜索文件：`rg` / 平台搜索工具
- 读取文件：平台文件读取工具
- 编辑文件：`apply_patch` 或平台编辑工具
- 执行命令：shell / bash / terminal
- 子 agent：平台支持时使用 subagent；不支持时由主 agent 分角色顺序执行
- skill 调用：平台原生 skill 工具；没有原生 skill 工具时，直接读取对应 `SKILL.md`

## 偏好记忆路径

默认用户级偏好：

```text
~/.superui/USER_PREFERENCES.md
```

平台可使用自己的用户级目录，例如：

```text
~/.codex/superui/USER_PREFERENCES.md
~/.claude/superui/USER_PREFERENCES.md
```

如果用户级目录不可写，不要写回仓库模板。应写入项目本地私有偏好：

```text
<target_project>/.superui/preferences.local.md
```

仓库内偏好文件仅作为只读模板：

```text
skills/superui-shared/USER_PREFERENCES.md
```

## 增加新生态的标准

新增一个 agent 生态时，至少补充：

1. 平台入口文件或插件 manifest。
2. 平台安装说明。
3. 工具名称映射说明。
4. 一条最小验收测试：

```text
Use SuperUI to create a DESIGN.md for a compact admin dashboard.
```

通过标准：agent 应该先加载 `superui` 总控，确定 `<ARTIFACT_ROOT>`，读取偏好，再路由到 `superui-design-md`，而不是直接写页面代码。

当前兼容性状态见：

```text
docs/COMPATIBILITY_MATRIX.md
```
