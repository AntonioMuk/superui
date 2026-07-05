# rubric-locked.md - Locked Review Rubric

Lock this file at review start. Reviewers and the Chairman must use it consistently for the whole review to avoid standard drift.

## Design Consistency

| # | Check | Standard | Severity |
|---|-------|----------|----------|
| D1 | Color references | Colors use DESIGN.md tokens; no hardcoded hex values | Blocker |
| D2 | Spacing references | Spacing uses DESIGN.md spacing tokens | Major |
| D3 | Typography references | Font sizes use DESIGN.md typography tokens | Major |
| D4 | Radius references | Radius uses DESIGN.md radius tokens | Minor |
| D5 | Shadow references | Shadows use DESIGN.md shadow tokens | Minor |

## Responsive Compliance

| # | Check | Standard | Severity |
|---|-------|----------|----------|
| R1 | No primary-layout absolute positioning | `position: absolute` is not used for primary layout containers | Blocker |
| R2 | No fixed container width | Fixed pixel widths do not define containers | Blocker |
| R3 | No fixed content height | Fixed heights do not truncate content flow | Blocker |
| R4 | No responsive `!important` | `!important` is not used in media queries | Major |
| R5 | Flexbox/Grid primary layout | Page layout uses Flexbox or CSS Grid | Blocker |
| R6 | `max-width` plus percentage containers | Max-width containers use percentage width | Major |
| R7 | `clamp()` or `rem` font sizes | Text scales safely | Major |
| R8 | At least three breakpoints | `sm`, `md`, `lg` or equivalent exist | Blocker |
| R9 | Responsive images | Images use `max-width: 100%` | Major |
| R10 | Touch target size | Mobile interactive targets are at least 44x44px | Major |

## Interaction Completeness

| # | Check | Standard | Severity |
|---|-------|----------|----------|
| I1 | Loading states | Async operations show loading feedback | Blocker |
| I2 | Success feedback | Mutations show success feedback or updated state | Blocker |
| I3 | Error handling | API calls handle errors with user-readable feedback | Blocker |
| I4 | CRUD loop | Business entities have complete create/read/update/delete loops when required | Blocker |
| I5 | Form validation | Forms validate before submission and show errors | Major |
| I6 | Duplicate action guard | Submit actions are disabled or guarded while pending | Major |
| I7 | Empty state | Lists and tables define empty states | Minor |

## Accessibility

| # | Check | Standard | Severity |
|---|-------|----------|----------|
| A1 | Contrast | Text contrast meets WCAG AA | Blocker |
| A2 | Keyboard navigation | Interactive elements are reachable by keyboard | Blocker |
| A3 | Focus indicator | Focusable elements have visible focus styles | Blocker |
| A4 | Image alt text | Images have alt text or empty decorative alt | Major |
| A5 | Form labels | Inputs have associated labels | Major |
| A6 | ARIA | Custom controls have valid ARIA where needed | Minor |

## Code Quality

| # | Check | Standard | Severity |
|---|-------|----------|----------|
| C1 | No debug logs | Production code has no debug `console.log` | Minor |
| C2 | Text management | User-visible text is centralized or i18n-ready when the project requires it | Minor |
| C3 | Type safety | TypeScript avoids unjustified `any` | Minor |

## Severity

- Blocker: must be fixed before the gate passes.
- Major: should be fixed; may pass only with a recorded justification.
- Minor: recommended; may pass with notes.
