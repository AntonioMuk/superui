# SuperUI Design Handoff Checklist

Use this checklist before implementation and during review. It adapts ideas from the public Front-End Design Checklist to SuperUI's `DESIGN.md` workflow.

## Required Design Inputs

| Area | SuperUI Requirement |
|------|---------------------|
| Grid | Define columns, gutters, max width, nesting behavior, and breakpoint changes. |
| Colors | Name all colors semantically and define light/dark/background/text/button/input states. |
| Typography | Define font families, fallback stacks, weights, line heights, loading strategy, and license/source notes when non-system fonts are used. |
| Links and navigation | Define default, hover, focus, active/current, disabled, and visited states where relevant. |
| Images and icons | Prefer SVG/vector icons, stable naming, clear aspect ratios, alt strategy, favicon/app icon requirements, and responsive image behavior. |
| Forms and buttons | Define label, helper, focus, disabled, loading, pressed, success, error, required/optional, and validation states. |
| Responsive design | Define mobile, tablet, desktop, and wide behavior; flag differences from mobile-first expectations. |
| Component approach | Group repeated elements into named reusable components and identify variants/states before coding. |
| Delivery files | Include previews, error/empty/loading states, modal/dialog states, and asset naming/organization guidance. |

## Pre-Development Review

Before `superui-tdd` starts, verify:

- Page structure is clear enough to map to `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- Heading hierarchy is defined; `h1` is not merely a logo and levels do not skip without reason.
- Similar visual elements are grouped into named components by function, not by one-off page location.
- Decorative effects such as heavy shadows, blur, large gradients, and video/3D assets have performance notes.
- Sitemap, routes, breadcrumbs, or navigation dependencies are known when the UI spans multiple pages.
- Plugin/library needs are listed early with reuse rationale and fallback options.

## Implementation Handoff

When implementation starts:

- Build layout skeleton from the grid before styling individual components.
- Reuse existing components and style guide entries when working in an existing project.
- Prefer CSS for simple visual effects instead of exporting layout decoration as images.
- Organize assets by role, for example `background/`, `banners/`, `icons/`, `content/`, and use stable prefixes such as `bg-`, `icon-`, `hero-`.
- Provide or generate 404, 500, empty, loading, and error states for user-facing flows.

## Review Questions

- Are all interactive states specified and implemented?
- Are all typography and color decisions tokenized and documented?
- Are responsive behaviors explicit instead of inferred from desktop-only layouts?
- Are component variants reusable rather than duplicated per page?
- Are source assets, icons, and media named and organized predictably?
- Can another agent continue from the handoff without asking for missing design decisions?
