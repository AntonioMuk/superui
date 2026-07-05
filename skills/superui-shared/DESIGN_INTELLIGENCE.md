# Design Intelligence

Use this file when generating DESIGN.md or reviewing whether a visual direction fits the product. It provides decision prompts, not fixed design values.

## Required Questions

Before generating tokens, determine:

- Product type: SaaS, internal tool, ecommerce, content, portfolio, game, finance, healthcare, AI, developer tool, consumer app, or other.
- Audience: expert operator, casual consumer, buyer, developer, executive, student, or mixed.
- Primary job: what the user mainly does on the page.
- Density: sparse, balanced, dense, or operational.
- Trust level: low, medium, high, regulated, or safety-critical.
- Platform: web, mobile-first, desktop-heavy, embedded, kiosk, or unknown.
- Brand posture: quiet, premium, playful, editorial, technical, institutional, energetic, or utilitarian.
- Anti-patterns to avoid.

## Product Heuristics

| Context | Prefer | Avoid |
|---------|--------|-------|
| SaaS / CRM / admin | Dense but calm layouts, clear tables, restrained visuals, predictable navigation | Marketing hero layouts, decorative cards everywhere, oversized type in work surfaces |
| Finance / healthcare / legal | High clarity, conservative color, strong hierarchy, explicit states | Playful styling that reduces trust |
| Developer tools | Precise spacing, code-aware surfaces, dark-mode readiness, strong command patterns | Generic stock visuals and vague claims |
| Consumer brand | Product imagery, memorable rhythm, strong first-viewport signal | Abstract decoration that hides the product |
| Content / editorial | Reading rhythm, typography quality, article navigation | Dashboard density unless needed |
| Games / playful tools | Expressive visuals, motion, immediate interaction | Static marketing-only screens |

## Optional External Intelligence: ui-ux-pro-max-skill

When design direction is under-specified, check whether `ui-ux-pro-max-skill` is installed locally. Search common locations such as the current workspace, `~/.claude/skills/`, `~/.agents/skills/`, `~/.codex/skills/`, and `E:/MySkills/`.

If available, run its search tool for design-system guidance and summarize only relevant pattern, style, color, typography, UX, chart, or stack recommendations. Record Adopted / Rejected / Reason in DESIGN.md or `progress.md`.

If unavailable or failing, do not block. Continue with this file's heuristics and mention that the user may optionally install `ui-ux-pro-max-skill` for stronger design intelligence.

The external skill is advisory only. DESIGN.md, source evidence, accessibility, and user instructions remain stronger constraints.

## Output Guidance

Write a concise `Design Intelligence` section in DESIGN.md covering product type, audience, primary job, density, trust level, platform, brand posture, recommended pattern, rationale, and anti-patterns.
