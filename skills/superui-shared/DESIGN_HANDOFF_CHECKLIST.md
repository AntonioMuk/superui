# Design Handoff Checklist

Use this file when planning, reviewing, or deciding whether `DESIGN.md` is complete enough for implementation. It checks completeness only; it does not create new design parameters.

## Required Coverage

| Area | Required details |
|------|------------------|
| Layout | Grid, containers, spacing rhythm, page regions, breakpoints |
| Color | Primary, functional, neutral, surfaces, borders, text colors, contrast notes |
| Typography | Font family, hierarchy, weight, line height, responsive behavior |
| Components | Buttons, inputs, cards, navigation, dialogs, tables/lists when relevant |
| States | default, hover, focus, active, disabled, loading, empty, error, success |
| Interaction | Trigger, validation, request, feedback, state sync for key flows |
| Responsive | Mobile, tablet, desktop behavior and known layout changes |
| Accessibility | Contrast, keyboard focus, labels, alt text, semantic structure |
| Assets | Icon style, image treatment, logo usage, missing asset fallback |
| Error pages | 404, 500, empty, offline/network error where relevant |
| Delivery files | DESIGN.md, previews, specs, test plan, review artifacts |

## Handling Gaps

- If a required detail is missing and implementation depends on it, return to `superui-design-md` or ask the user.
- If a gap is low risk, record it as a pending item in the plan or `progress.md`.
- Do not fill missing values from personal taste. Use source evidence, user instructions, or DESIGN.md updates.

## Checklist Snippet

```markdown
## Design Handoff Checklist

- [ ] Layout is implementable
- [ ] Color tokens and contrast are clear
- [ ] Typography hierarchy is clear
- [ ] Component variants and states are clear
- [ ] Core interaction loops are defined
- [ ] Responsive behavior is defined
- [ ] Accessibility expectations are defined
- [ ] Assets and fallback rules are clear
- [ ] Non-happy-path states are covered
```
