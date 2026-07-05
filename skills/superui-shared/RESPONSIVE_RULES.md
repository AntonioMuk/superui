# RESPONSIVE_RULES - Responsive Layout Constraints

This file defines non-negotiable constraints for frontend implementation. HTML, CSS, Vue, and React output must pass these checks.

## MUST NOT

| # | Rule | Invalid example | Notes |
|---|------|-----------------|-------|
| R1 | Do not use `position: absolute` for primary layout containers | `position: absolute; top: 80px; left: 260px;` | Allowed for overlays, indicators, tooltips, and decorative helpers |
| R2 | Do not use fixed pixel width as container width | `width: 1200px;` | Use `max-width: 1200px; width: 100%;` |
| R3 | Do not use fixed pixel height to constrain content flow | `height: 600px; overflow: auto;` | Use `min-height` or content-driven height |
| R4 | Do not use `!important` inside responsive overrides | `@media (...) { width: 100% !important; }` | Fix specificity instead |
| R5 | Do not put static layout styles inline in HTML | `<div style="width:800px; display:flex">` | Static layout belongs in CSS or style modules |

## SHALL

| # | Rule | Valid example |
|---|------|---------------|
| R6 | Primary layout uses Flexbox or CSS Grid | `display: grid; grid-template-columns: 260px 1fr;` |
| R7 | Containers use `max-width` plus percentage width | `max-width: 1200px; width: 100%; margin: 0 auto;` |
| R8 | Font sizes use `clamp()` or `rem` | `font-size: clamp(1rem, 2.5vw, 1.5rem);` |
| R9 | Spacing uses DESIGN.md spacing tokens | `padding: var(--space-md);` |
| R10 | Define at least `sm`, `md`, and `lg` breakpoints | `640px`, `768px`, `1024px` |
| R11 | Images are responsive | `img { max-width: 100%; height: auto; }` |
| R12 | Mobile touch targets are at least 44x44px | Buttons, links, and controls |

## SHOULD

| # | Rule |
|---|------|
| R13 | Prefer container queries for component-local responsive behavior |
| R14 | Use mobile-first styles with `min-width` overrides |
| R15 | Use `aspect-ratio` instead of padding hacks |
| R16 | Use `gap` instead of margin spacing in Flexbox/Grid |
| R17 | Wrap motion with `prefers-reduced-motion` when relevant |

## Self-Check

- [ ] Search `position: absolute`; none is used for primary layout.
- [ ] Search fixed `width: Npx`; none defines container width.
- [ ] Search `!important`; none is used for responsive overrides.
- [ ] Search fixed `font-size: Npx`; replace with `clamp()` or `rem` where applicable.
- [ ] Verify spacing uses DESIGN.md tokens.
- [ ] Verify at least three breakpoints exist.
- [ ] Verify images have `max-width: 100%`.
- [ ] Verify touch targets are at least 44x44px.
