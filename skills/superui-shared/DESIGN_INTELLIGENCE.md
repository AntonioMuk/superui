# SuperUI Design Intelligence

Use this reference before generating or reviewing `DESIGN.md`.

## Goal

Match the UI direction to the product, audience, platform, data density, and trust level before choosing colors, typography, layout, or effects.

## Required Design Brief

Capture these fields in `DESIGN.md` before token generation:

| Field | Required Decision |
|-------|-------------------|
| Product type | SaaS, dashboard, marketplace, healthcare, fintech, e-commerce, developer tool, content, portfolio, game, or other |
| Audience | Consumer, enterprise operator, developer, admin, creator, senior user, child/family, regulated user |
| Primary job | Browse, compare, create, monitor, transact, collaborate, learn, configure, analyze |
| Density | Sparse/editorial, balanced, dense/operator |
| Trust level | Low-risk, purchase, financial, healthcare, government, security-sensitive |
| Platform | Desktop web, mobile web, native app, responsive web app, 3D/immersive |
| Brand posture | Calm, premium, playful, technical, editorial, utilitarian, expressive |

## Recommendation Matrix

| Context | Prefer | Avoid |
|---------|--------|-------|
| Enterprise dashboard / admin | Dense but calm layout, semantic tokens, table ergonomics, clear filters, compact spacing | Marketing hero patterns, decorative cards, weak contrast, hidden filters |
| SaaS / developer tool | Clear hierarchy, product screenshots, trust proof, restrained motion, code/data affordances | Generic AI gradients, vague benefits, ornamental blur layers |
| Fintech / banking / security | Trust colors, strong contrast, explicit status, secure transaction feedback, conservative motion | Playful styling, unclear fees/status, purple-pink AI gradients as default |
| Healthcare / public service | Accessible typography, large targets, explicit labels, low-cognitive-load flows | Tiny text, gesture-only interactions, decorative motion |
| E-commerce / marketplace | Product-first media, comparison, availability, cart/checkout feedback, urgency used sparingly | Hidden prices, image-light product pages, color-only states |
| Creative / portfolio / brand | Strong visual thesis, curated imagery, expressive typography, controlled motion | Template-looking grids, inconsistent art direction |
| Data visualization | Chart type chosen by data task, table fallback, keyboard/tooltips, colorblind-safe series | Pie overuse, color-only legends, too many series, chart decoration |
| Mobile-first app | Safe areas, 44/48px targets, bottom content insets, orientation checks | Hover-only interactions, fixed bars covering content, tiny icon hit areas |

## Design System Output Shape

When generating `DESIGN.md`, include a "Design Intelligence" section:

```markdown
## Design Intelligence
- Product type:
- Audience:
- Primary job:
- Density:
- Trust level:
- Platform:
- Brand posture:
- Recommended pattern:
- Style rationale:
- Anti-patterns to avoid:
```

Then derive:

- Layout pattern and section order.
- Color mood and semantic token roles.
- Typography mood and scale.
- Motion rules and reduced-motion fallback.
- Component priority list.
- Pre-delivery checklist.

## Priority Quality Gates

Apply gates in this order:

1. Accessibility: contrast, labels, keyboard/focus, reduced motion.
2. Interaction: visible feedback, loading, disabled, error, success, undo where needed.
3. Performance: image dimensions, lazy loading, layout stability, route/component splitting when relevant.
4. Style fit: product/audience match, consistent icon language, token-driven theming.
5. Layout and responsive: mobile-first, no horizontal scroll, safe fixed elements, stable breakpoints.
6. Typography and color: readable body size, line length, semantic colors, dark/light parity.
7. Motion: 150-300ms micro-interactions, transform/opacity, no decorative blocking motion.
8. Forms and feedback: labels, inline errors, helper text, recovery actions, focus management.
9. Navigation: predictable back, active state, reachable core nav, no mixed patterns at one level.
10. Charts and data: correct chart type, table alternative, accessible series, empty/error states.

## Optional External Intelligence: ui-ux-pro-max-skill

When design intelligence is needed, explicitly check whether `ui-ux-pro-max-skill` is installed locally. Use it when available; otherwise fall back to this file.

### Detection Order

Check likely local install locations with file search or directory listing:

```text
<current_workspace>/.claude/skills/ui-ux-pro-max/
<current_workspace>/skills/ui-ux-pro-max/
~/.claude/skills/ui-ux-pro-max/
~/.agents/skills/ui-ux-pro-max/
~/.codex/skills/ui-ux-pro-max/
E:/MySkills/ui-ux-pro-max/
E:/MySkills/ui-ux-pro-max-skill/
```

The install is considered usable if one of these files exists:

```text
scripts/search.py
src/ui-ux-pro-max/scripts/search.py
cli/assets/scripts/search.py
```

### Call Pattern

Run the discovered script with a multi-dimensional query:

```bash
python <path-to-search.py> "<product type> <audience> <density> <brand posture>" --design-system -f markdown -p "<project name>"
```

For a deeper pass, also query relevant domains when needed:

```bash
python <path-to-search.py> "<keyword>" --domain ux
python <path-to-search.py> "<keyword>" --domain color
python <path-to-search.py> "<keyword>" --domain typography
python <path-to-search.py> "<keyword>" --domain chart
python <path-to-search.py> "<keyword>" --stack react
```

Use Windows `python` when `python3` is unavailable.

### If Not Installed

If no usable installation is found or the script fails:

1. Continue with SuperUI's built-in `DESIGN_INTELLIGENCE.md` workflow without blocking the task.
2. Record `External inspiration: not available` in `DESIGN.md`.
3. Recommend installation to the user in the final response or handoff notes when it would materially improve future design recommendations.

Suggested wording:

```text
Optional enhancement: install ui-ux-pro-max-skill to provide searchable UI style, palette, typography, UX, chart, and stack recommendations. SuperUI worked from its built-in design intelligence for this run.
```

Do not repeatedly ask during the same task. One recommendation per completed run is enough.

### Required Citation in DESIGN.md

If `ui-ux-pro-max-skill` was used, record a short citation in `DESIGN.md`:

```markdown
## Design Intelligence
- External inspiration: ui-ux-pro-max-skill
- Query:
- Returned pattern/style/color/typography summary:
- Adopted:
- Rejected:
- Reason:
```

Use the result as advisory input only. Do not make SuperUI depend on that tool, and do not copy its datasets into SuperUI unless license and attribution are explicitly handled.
