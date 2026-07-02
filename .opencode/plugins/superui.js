/**
 * SuperUI plugin for OpenCode.ai.
 *
 * Registers the shared skills directory and injects the SuperUI bootstrap into
 * the first user message so frontend UI requests can auto-route through the
 * same skill entry used by other agents.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, "../../skills");
const superuiSkillPath = path.join(skillsDir, "superui", "SKILL.md");

let bootstrapCache = undefined;

const stripFrontmatter = (content) => {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match ? match[1] : content;
};

const getBootstrap = () => {
  if (bootstrapCache !== undefined) return bootstrapCache;
  if (!fs.existsSync(superuiSkillPath)) {
    bootstrapCache = null;
    return null;
  }

  const skillBody = stripFrontmatter(fs.readFileSync(superuiSkillPath, "utf8"));
  const toolMapping = `
**OpenCode Tool Mapping for SuperUI:**
- Invoke a skill -> OpenCode native skill tool
- Search files -> grep / glob
- Read files -> read
- Create or edit files -> apply_patch
- Run commands -> bash
- Dispatch independent review or analysis roles -> task when available; otherwise run sequentially
`;

  bootstrapCache = `
You have SuperUI available.

**IMPORTANT:** The SuperUI bootstrap is already loaded. For frontend UI creation,
redesign, analysis, DESIGN.md, planning, implementation, responsive QA,
accessibility, or review work, follow the SuperUI controller below before
writing UI code.

${skillBody}

${toolMapping}
`;
  return bootstrapCache;
};

export const SuperUIPlugin = async () => ({
  config: async (config) => {
    config.skills = config.skills || {};
    config.skills.paths = config.skills.paths || [];
    if (!config.skills.paths.includes(skillsDir)) {
      config.skills.paths.push(skillsDir);
    }
  },

  "experimental.chat.messages.transform": async (_input, output) => {
    const bootstrap = getBootstrap();
    if (!bootstrap || !output.messages.length) return;

    const firstUser = output.messages.find((message) => message.info.role === "user");
    if (!firstUser || !firstUser.parts.length) return;
    if (
      firstUser.parts.some(
        (part) => part.type === "text" && part.text.includes("You have SuperUI available.")
      )
    ) {
      return;
    }

    const ref = firstUser.parts[0];
    firstUser.parts.unshift({ ...ref, type: "text", text: bootstrap });
  },
});
