---
name: "[Design System Name]"
version: "1.0.0"
colors:
  primary:
    DEFAULT: "#000000"
    hover: "#111111"
    disabled: "#999999"
  success:
    DEFAULT: "#16a34a"
  warning:
    DEFAULT: "#f59e0b"
  error:
    DEFAULT: "#dc2626"
  info:
    DEFAULT: "#2563eb"
  neutral:
    ink: "#111827"
    body: "#374151"
    muted: "#6b7280"
    line: "#d1d5db"
    canvas: "#ffffff"
typography:
  display-xl:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 64
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0
spacing:
  xs: 4
  sm: 8
  md: 16
  lg: 24
  xl: 32
  2xl: 48
  3xl: 64
borderRadius:
  none: 0
  sm: 2
  md: 4
  lg: 8
  xl: 12
  full: 9999
shadows:
  sm: "0 1px 2px rgba(0,0,0,.08)"
  md: "0 8px 24px rgba(0,0,0,.12)"
breakpoints:
  sm: 640
  md: 768
  lg: 1024
  xl: 1280
  2xl: 1536
---

# [Design System Name]

## Overview

- Define the product's visual thesis in one sentence.
- State the brand posture and design philosophy.
- State the primary UI context where this system will be used.

## Design Intelligence

- Product type:
- Audience:
- Primary job:
- Density:
- Trust level:
- Platform:
- Brand posture:
- Recommended pattern:
- Anti-patterns to avoid:

## Colors

- Explain primary color usage.
- Explain functional colors and feedback states.
- Explain neutral scale, surfaces, borders, and text contrast.

## Typography

- Explain font choices and fallback strategy.
- Define hierarchy rules for display, title, body, and caption text.
- Explain weight and line-height usage.

## Layout

- Define grid, containers, page regions, and spacing rhythm.
- Define alignment rules and density behavior.
- Define responsive breakpoint behavior.

## Elevation & Depth

- Define shadow levels and use cases.
- Define z-index or layering rules when relevant.
- Explain when flat surfaces are preferred over elevation.

## Shapes

- Define radius usage by component type.
- Define icon style and stroke/fill behavior.
- Define image and media framing rules.

## Components

For each core component, define variants and states.

### Buttons

- Variants:
- Sizes:
- States:

### Inputs

- Variants:
- States:
- Validation:

### Cards

- Usage:
- Padding:
- Border/elevation:

### Navigation

- Structure:
- Active state:
- Responsive behavior:

### Dialogs

- Trigger:
- Layout:
- Focus and dismissal:

## Interaction Loop

- Define each key CRUD loop: trigger -> validation -> request -> feedback -> state sync.
- Define loading, empty, success, error, and disabled states.
- Define optimistic updates and rollback behavior when relevant.

## Do's and Don'ts

- Do:
- Do:
- Don't:
- Don't:

## Responsive Behavior

- Mobile:
- Tablet:
- Desktop:
- Touch targets:
- Overflow and wrapping:

## Agent Prompt Guidelines

- SHALL use DESIGN.md tokens for color, typography, spacing, radius, and shadows.
- SHALL implement non-happy-path states.
- SHALL preserve responsive constraints.
- MUST NOT hardcode design values outside the token system.
- MUST NOT use primary-layout absolute positioning.

## Design Handoff Checklist

- [ ] Layout is implementable.
- [ ] Color tokens and contrast are clear.
- [ ] Typography hierarchy is clear.
- [ ] Component variants and states are clear.
- [ ] Core interaction loops are defined.
- [ ] Responsive behavior is defined.
- [ ] Accessibility expectations are defined.
- [ ] Assets and fallback rules are clear.
- [ ] Non-happy-path states are covered.
