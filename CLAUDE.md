# Moonshine CSS Architecture - Technical Guide

This document provides technical details about Moonshine's CSS architecture for AI assistants and developers working on the design system.

## Overview

Moonshine is a utility-first design system built on Tailwind CSS v4 that enforces design consistency through constrained, semantic utilities rather than arbitrary values.

## File Structure

```
src/
├── global.css      # Entry point and orchestration
├── base.css        # Design tokens and primitives
└── utilities.css   # Public utility classes
```

## Architecture Details

### base.css - Design Tokens

This file contains four main sections:

1. **Primitive Tokens** - Raw design values (should not be used directly)
   ```css
   --color-neutral-200: hsl(0, 0%, 92%);
   --font-diatype: 'Diatype', -apple-system, ...;
   ```

2. **Semantic/Utility Tokens** - Theme-aware variables that map to utilities
   ```css
   /* Light mode */
   --text-warning: var(--color-feedback-orange-700);
   --bg-warning: var(--color-feedback-orange-100);
   
   /* Automatically switches in dark mode */
   ```

3. **Component Tokens** - Higher-level semantic tokens
   ```css
   --radius: 0.625rem;
   --shadow: hsl(0 0% 50%);
   ```

4. **Deprecated Tokens** - Shadcn compatibility (to be removed)

### utilities.css - Public API

Contains the utility classes that developers should use:

- **Typography utilities**: `text-heading-xl`, `text-body-sm` (enforced combinations)
- **Semantic colors**: `bg-warning`, `text-error`, `border-success`
- **Surface utilities**: `bg-surface-primary`, `bg-surface-secondary`
- **Component utilities**: `container`, `bg-mask`

### global.css - Configuration

Handles Tailwind configuration and imports:

- Imports core dependencies in correct order
- Defines custom variants (`dark`, `interact`)
- Configures responsive utility generation via `@source`
- Maps fonts to Tailwind's theme

## Key Design Decisions

### Why Custom Typography Utilities?

Instead of allowing arbitrary combinations like:
```css
/* ❌ Bad - leads to inconsistency */
.heading {
  @apply text-[1.813rem] leading-[1.5] tracking-[0.0015em] font-light;
}
```

We provide semantic utilities:
```css
/* ✅ Good - enforces design system */
.heading {
  @apply text-heading-lg;
}
```

### Theme-Aware Semantic Tokens

The "utility tokens" pattern in base.css enables automatic theme switching:

```css
/* Developers use this */
.warning-banner {
  @apply bg-warning text-warning border-warning;
}

/* It automatically adapts to light/dark mode */
```

### Preventing Design System Escape Hatches

We intentionally:
- Don't expose raw color values as utilities
- Provide complete typography utilities (not individual properties)
- Use semantic naming to guide correct usage

## Common Tasks

### Adding a New Color Utility

1. Add primitive colors to base.css if needed
2. Create semantic tokens in base.css (both light and dark variants)
3. Create utility classes in utilities.css that reference the tokens

### Adding a New Typography Scale

1. Define the complete set of properties in a single `@utility` in utilities.css
2. Use semantic naming (e.g., `text-label-sm` not `text-13`)
3. Ensure it works with all font families

### Extending Responsive Utilities

Add new `@source` declarations in global.css:
```css
@source inline("{,sm:,md:,lg:,xl:,2xl:}your-utility-{value1,value2}");
```

## Available Utility Classes

This section is auto-generated from the CSS files. Last updated: 2025-10-06T12:38:18.088Z

### Typography Utilities

#### `typography-heading-xl`

```css
.typography-heading-xl {
  font-size: 2.063rem;
  font-weight: 300;
  line-height: 1.375;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-heading-lg`

```css
.typography-heading-lg {
  font-size: 1.813rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-heading-md`

```css
.typography-heading-md {
  font-size: 1.625rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-heading-sm`

```css
.typography-heading-sm {
  font-size: 1.438rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-heading-xs`

```css
.typography-heading-xs {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-heading-xxs`

```css
.typography-heading-xxs {
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.778;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
}
```

#### `typography-body-lg`

```css
.typography-body-lg {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
}
```

#### `typography-body-md`

```css
.typography-body-md {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
}
```

#### `typography-body-sm`

```css
.typography-body-sm {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
}
```

#### `typography-body-xs`

```css
.typography-body-xs {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
}
```

#### `text-display-2xl`

```css
.text-display-2xl {
  font-size: 11.375rem;
  font-weight: 100;
  line-height: 1;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-display-xl`

```css
.text-display-xl {
  font-size: 5.625rem;
  font-weight: 100;
  line-height: 1.1;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-display-lg`

```css
.text-display-lg {
  font-size: 4.188rem;
  font-weight: 100;
  line-height: 1.2;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-display-md`

```css
.text-display-md {
  font-size: 3.188rem;
  font-weight: 100;
  line-height: 1.3;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-display-sm`

```css
.text-display-sm {
  font-size: 2.375rem;
  font-weight: 100;
  line-height: 1.375;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-display-xs`

```css
.text-display-xs {
  font-size: 1.75rem;
  font-weight: 100;
  line-height: 1.4;
  letter-spacing: -0.04em;
  font-family: var(--font-tobias);
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-heading-xl`

```css
.text-heading-xl {
  font-size: 2.063rem;
  font-weight: 300;
  line-height: 1.375;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-heading-lg`

```css
.text-heading-lg {
  font-size: 1.813rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-heading-md`

```css
.text-heading-md {
  font-size: 1.625rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-heading-sm`

```css
.text-heading-sm {
  font-size: 1.438rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
  color: var(--color-neutral-800);

  /* dark variant */
    color: var(--color-neutral-200);
}
```

#### `text-heading-xs`

```css
.text-heading-xs {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.0015em;
  font-family: var(--font-diatype);
  color: var(--color-neutral-800);

  /* dark variant */
    color: var(--color-neutral-200);
}
```

#### `text-body-lg`

```css
.text-body-lg {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-body-md`

```css
.text-body-md {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-body-sm`

```css
.text-body-sm {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-body-xs`

```css
.text-body-xs {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-codeline-md`

```css
.text-codeline-md {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype-mono);
  color: var(--text-default);
}
```

#### `text-codeline-sm`

```css
.text-codeline-sm {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype-mono);
  color: var(--text-default);
}
```

#### `text-codeline-xs`

```css
.text-codeline-xs {
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype-mono);
  color: var(--text-default);
}
```

#### `text-button-md`

```css
.text-button-md {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-button-sm`

```css
.text-button-sm {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-button-xs`

```css
.text-button-xs {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.0025em;
  font-family: var(--font-diatype);
  color: var(--text-default);
}
```

#### `text-highlight`

```css
.text-highlight {
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-default`

```css
.text-default {
  color: var(--color-neutral-700);

  /* dark variant */
    color: var(--color-neutral-300);
}
```

#### `text-muted`

```css
.text-muted {
  color: var(--color-neutral-900-64);

  /* dark variant */
    color: var(--color-neutral-100-64);
}
```

#### `text-placeholder`

```css
.text-placeholder {
  color: var(--color-neutral-900-56);

  /* dark variant */
    color: var(--color-neutral-100-56);
}
```

#### `text-disabled`

```css
.text-disabled {
  color: var(--color-neutral-900-40);

  /* dark variant */
    color: var(--color-neutral-100-40);
}
```

#### `text-highlight-fixed-dark`

```css
.text-highlight-fixed-dark {
  color: var(--color-base-black);
}
```

#### `text-default-fixed-dark`

```css
.text-default-fixed-dark {
  color: var(--color-neutral-900);
}
```

#### `text-muted-fixed-dark`

```css
.text-muted-fixed-dark {
  color: var(--color-neutral-900-64);
}
```

#### `text-highlight-fixed-light`

```css
.text-highlight-fixed-light {
  color: var(--color-base-white);
}
```

#### `text-default-fixed-light`

```css
.text-default-fixed-light {
  color: var(--color-neutral-100);
}
```

#### `text-muted-fixed-light`

```css
.text-muted-fixed-light {
  color: var(--color-neutral-100-64);
}
```

#### `text-highlight-inverse`

```css
.text-highlight-inverse {
  color: var(--color-base-white);

  /* dark variant */
    color: var(--color-base-black);
}
```

#### `text-default-inverse`

```css
.text-default-inverse {
  color: var(--color-neutral-100);

  /* dark variant */
    color: var(--color-neutral-900);
}
```

#### `text-muted-inverse`

```css
.text-muted-inverse {
  color: var(--color-neutral-100-64);

  /* dark variant */
    color: var(--color-neutral-900-64);
}
```

#### `text-link-primary`

```css
.text-link-primary {
  color: var(--color-brand-blue-600);

  /* dark variant */
    color: var(--color-brand-blue-300);
}
```

#### `text-link-secondary`

```css
.text-link-secondary {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-link-visited`

```css
.text-link-visited {
  color: var(--color-feedback-violet-600);

  /* dark variant */
    color: var(--color-feedback-violet-300);
}
```

#### `text-default-destructive`

```css
.text-default-destructive {
  color: var(--color-feedback-red-700);

  /* dark variant */
    color: var(--color-feedback-red-300);
}
```

#### `text-link-destructive`

```css
.text-link-destructive {
  color: var(--color-feedback-red-900);

  /* dark variant */
    color: var(--color-feedback-red-100);
}
```

#### `text-default-information`

```css
.text-default-information {
  color: var(--color-feedback-blue-700);

  /* dark variant */
    color: var(--color-feedback-blue-300);
}
```

#### `text-link-information`

```css
.text-link-information {
  color: var(--color-feedback-blue-900);

  /* dark variant */
    color: var(--color-feedback-blue-100);
}
```

#### `text-default-success`

```css
.text-default-success {
  color: var(--color-feedback-green-700);

  /* dark variant */
    color: var(--color-feedback-green-300);
}
```

#### `text-link-success`

```css
.text-link-success {
  color: var(--color-feedback-green-900);

  /* dark variant */
    color: var(--color-feedback-green-100);
}
```

#### `text-default-warning`

```css
.text-default-warning {
  color: var(--color-feedback-orange-700);

  /* dark variant */
    color: var(--color-feedback-orange-300);
}
```

#### `text-link-warning`

```css
.text-link-warning {
  color: var(--color-feedback-orange-900);

  /* dark variant */
    color: var(--color-feedback-orange-100);
}
```

#### `text-btn-brand`

```css
.text-btn-brand {
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-btn-brand-hover`

```css
.text-btn-brand-hover {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-brand-active`

```css
.text-btn-brand-active {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-brand-disabled`

```css
.text-btn-brand-disabled {
  color: var(--color-neutral-900);
  opacity: 0.4;

  /* dark variant */
    color: var(--color-neutral-100);
    opacity: 0.4;
}
```

#### `text-btn-primary`

```css
.text-btn-primary {
  color: var(--color-neutral-100);

  /* dark variant */
    color: var(--color-neutral-900);
}
```

#### `text-btn-primary-hover`

```css
.text-btn-primary-hover {
  color: var(--color-base-white);

  /* dark variant */
    color: var(--color-base-black);
}
```

#### `text-btn-primary-active`

```css
.text-btn-primary-active {
  color: var(--color-base-white);

  /* dark variant */
    color: var(--color-base-black);
}
```

#### `text-btn-primary-disabled`

```css
.text-btn-primary-disabled {
  color: var(--color-neutral-100);
  opacity: 0.4;

  /* dark variant */
    color: var(--color-neutral-900);
    opacity: 0.4;
}
```

#### `text-btn-secondary`

```css
.text-btn-secondary {
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-btn-secondary-hover`

```css
.text-btn-secondary-hover {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-secondary-active`

```css
.text-btn-secondary-active {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-secondary-disabled`

```css
.text-btn-secondary-disabled {
  color: var(--color-neutral-900);
  opacity: 0.4;

  /* dark variant */
    color: var(--color-neutral-100);
    opacity: 0.4;
}
```

#### `text-btn-tertiary`

```css
.text-btn-tertiary {
  color: var(--color-neutral-900);

  /* dark variant */
    color: var(--color-neutral-100);
}
```

#### `text-btn-tertiary-hover`

```css
.text-btn-tertiary-hover {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-tertiary-active`

```css
.text-btn-tertiary-active {
  color: var(--color-base-black);

  /* dark variant */
    color: var(--color-base-white);
}
```

#### `text-btn-tertiary-disabled`

```css
.text-btn-tertiary-disabled {
  color: var(--color-neutral-900);
  opacity: 0.4;

  /* dark variant */
    color: var(--color-neutral-100);
    opacity: 0.4;
}
```

#### `text-btn-destructive-primary`

```css
.text-btn-destructive-primary {
  color: var(--color-base-white);
}
```

#### `text-btn-destructive-primary-hover`

```css
.text-btn-destructive-primary-hover {
  color: var(--color-base-white);
}
```

#### `text-btn-destructive-primary-active`

```css
.text-btn-destructive-primary-active {
  color: var(--color-base-white);
}
```

#### `text-btn-destructive-primary-disabled`

```css
.text-btn-destructive-primary-disabled {
  color: var(--color-base-white);
  opacity: 0.4;
}
```

#### `text-btn-destructive-secondary`

```css
.text-btn-destructive-secondary {
  color: var(--color-feedback-red-600);

  /* dark variant */
    color: var(--color-feedback-red-400);
}
```

#### `text-btn-destructive-secondary-hover`

```css
.text-btn-destructive-secondary-hover {
  color: var(--color-feedback-red-700);

  /* dark variant */
    color: var(--color-feedback-red-500);
}
```

#### `text-btn-destructive-secondary-active`

```css
.text-btn-destructive-secondary-active {
  color: var(--color-feedback-red-800);

  /* dark variant */
    color: var(--color-feedback-red-600);
}
```

#### `text-btn-destructive-secondary-disabled`

```css
.text-btn-destructive-secondary-disabled {
  color: var(--color-feedback-red-600);
  opacity: 0.4;

  /* dark variant */
    color: var(--color-feedback-red-400);
    opacity: 0.4;
}
```

#### `text-warning`

```css
.text-warning {
  color: var(--color-feedback-orange-700);

  /* dark variant */
    color: var(--color-feedback-orange-300);
}
```

### Background Utilities

#### `bg-mask`

```css
.bg-mask {
  background-image: linear-gradient(
    to bottom,
    var(--background) 0%,
    var(--color-transparent) 5%,
    var(--color-transparent) 95%,
    var(--background) 100%
  );
}
```

#### `bg-gradient-primary`

```css
.bg-gradient-primary {
  background: var(--gradient-brand-primary);
}
```

#### `bg-gradient-green`

```css
.bg-gradient-green {
  background: var(--gradient-brand-green);
}
```

#### `bg-gradient-red`

```css
.bg-gradient-red {
  background: var(--gradient-brand-red);
}
```

#### `bg-surface-primary`

```css
.bg-surface-primary {
  background-color: var(--color-base-white);

  /* dark variant */
    background-color: var(--color-base-black);
}
```

#### `bg-surface-secondary`

```css
.bg-surface-secondary {
  background-color: var(--color-neutral-100);

  /* dark variant */
    background-color: var(--color-neutral-900);
}
```

#### `bg-warning`

```css
.bg-warning {
  background-color: var(--color-feedback-orange-100);

  /* dark variant */
    background-color: var(--color-feedback-orange-900);
}
```

#### `bg-btn-brand`

```css
.bg-btn-brand {
  background-color: var(--color-base-white);

  /* dark variant */
    background-color: var(--color-base-black);
}
```

#### `bg-btn-brand-hover`

```css
.bg-btn-brand-hover {
  background-color: var(--color-neutral-100);

  /* dark variant */
    background-color: var(--color-neutral-900);
}
```

#### `bg-btn-brand-active`

```css
.bg-btn-brand-active {
  background-color: var(--color-neutral-200);

  /* dark variant */
    background-color: var(--color-neutral-800);
}
```

#### `bg-btn-brand-disabled`

```css
.bg-btn-brand-disabled {
  background-color: var(--color-base-white);
  opacity: 1;
  color: var(--text-muted);

  /* dark variant */
    background-color: var(--color-base-black);
}
```

#### `bg-btn-primary`

```css
.bg-btn-primary {
  background-color: var(--color-neutral-800);

  /* dark variant */
    background-color: var(--color-neutral-200);
}
```

#### `bg-btn-primary-hover`

```css
.bg-btn-primary-hover {
  background-color: var(--color-neutral-900);

  /* dark variant */
    background-color: var(--color-neutral-100);
}
```

#### `bg-btn-primary-active`

```css
.bg-btn-primary-active {
  background-color: var(--color-base-black);

  /* dark variant */
    background-color: var(--color-base-white);
}
```

#### `bg-btn-primary-disabled`

```css
.bg-btn-primary-disabled {
  background-color: var(--color-neutral-800);
  opacity: 0.4;

  /* dark variant */
    background-color: var(--color-neutral-200);
    opacity: 0.4;
}
```

#### `bg-btn-secondary`

```css
.bg-btn-secondary {
  background-color: var(--color-neutral-200);

  /* dark variant */
    background-color: var(--color-neutral-800);
}
```

#### `bg-btn-secondary-hover`

```css
.bg-btn-secondary-hover {
  background-color: var(--color-neutral-300);

  /* dark variant */
    background-color: var(--color-neutral-700);
}
```

#### `bg-btn-secondary-active`

```css
.bg-btn-secondary-active {
  background-color: var(--color-neutral-400);

  /* dark variant */
    background-color: var(--color-neutral-600);
}
```

#### `bg-btn-secondary-disabled`

```css
.bg-btn-secondary-disabled {
  background-color: var(--color-neutral-200);
  opacity: 0.4;

  /* dark variant */
    background-color: var(--color-neutral-800);
    opacity: 0.4;
}
```

#### `bg-btn-destructive`

```css
.bg-btn-destructive {
  background-color: var(--color-feedback-red-600);

  /* dark variant */
    background-color: var(--color-feedback-red-400);
}
```

#### `bg-btn-destructive-hover`

```css
.bg-btn-destructive-hover {
  background-color: var(--color-feedback-red-700);

  /* dark variant */
    background-color: var(--color-feedback-red-500);
}
```

#### `bg-btn-destructive-active`

```css
.bg-btn-destructive-active {
  background-color: var(--color-feedback-red-800);

  /* dark variant */
    background-color: var(--color-feedback-red-600);
}
```

#### `bg-btn-destructive-disabled`

```css
.bg-btn-destructive-disabled {
  background-color: var(--color-feedback-red-600);
  opacity: 0.4;

  /* dark variant */
    background-color: var(--color-feedback-red-400);
    opacity: 0.4;
}
```

#### `bg-surface-primary-default`

```css
.bg-surface-primary-default {
  background-color: var(--color-base-white);

  /* dark variant */
    background-color: var(--color-base-black);
}
```

#### `bg-surface-primary-inverse`

```css
.bg-surface-primary-inverse {
  background-color: var(--color-base-black);

  /* dark variant */
    background-color: var(--color-base-white);
}
```

#### `bg-surface-secondary-default`

```css
.bg-surface-secondary-default {
  background-color: var(--color-neutral-100);

  /* dark variant */
    background-color: var(--color-neutral-900);
}
```

#### `bg-surface-secondary-inverse`

```css
.bg-surface-secondary-inverse {
  background-color: var(--color-neutral-900);

  /* dark variant */
    background-color: var(--color-neutral-100);
}
```

#### `bg-surface-tertiary-default`

```css
.bg-surface-tertiary-default {
  background-color: var(--color-neutral-200);

  /* dark variant */
    background-color: var(--color-neutral-800);
}
```

#### `bg-surface-tertiary-inverse`

```css
.bg-surface-tertiary-inverse {
  background-color: var(--color-neutral-800);

  /* dark variant */
    background-color: var(--color-neutral-200);
}
```

#### `bg-highlight`

```css
.bg-highlight {
  background-color: var(--color-neutral-300);

  /* dark variant */
    background-color: var(--color-neutral-700);
}
```

#### `bg-active`

```css
.bg-active {
  background-color: var(--color-neutral-200);

  /* dark variant */
    background-color: var(--color-neutral-800);
}
```

#### `bg-default`

```css
.bg-default {
  background-color: var(--color-neutral-100);

  /* dark variant */
    background-color: var(--color-neutral-900);
}
```

#### `bg-muted`

```css
.bg-muted {
  background-color: var(--color-neutral-100-56);

  /* dark variant */
    background-color: var(--color-neutral-900-56);
}
```

#### `bg-inset`

```css
.bg-inset {
  background-color: var(--color-base-white);

  /* dark variant */
    background-color: var(--color-base-black);
}
```

#### `bg-surface-primary-fixed-light`

```css
.bg-surface-primary-fixed-light {
  background-color: var(--color-base-white);
}
```

#### `bg-surface-secondary-fixed-light`

```css
.bg-surface-secondary-fixed-light {
  background-color: var(--color-neutral-100);
}
```

#### `bg-surface-tertiary-fixed-light`

```css
.bg-surface-tertiary-fixed-light {
  background-color: var(--color-neutral-200);
}
```

#### `bg-surface-primary-fixed-dark`

```css
.bg-surface-primary-fixed-dark {
  background-color: var(--color-base-black);
}
```

#### `bg-surface-secondary-fixed-dark`

```css
.bg-surface-secondary-fixed-dark {
  background-color: var(--color-neutral-900);
}
```

#### `bg-surface-tertiary-fixed-dark`

```css
.bg-surface-tertiary-fixed-dark {
  background-color: var(--color-neutral-800);
}
```

#### `bg-destructive-highlight`

```css
.bg-destructive-highlight {
  background-color: var(--color-feedback-red-600);

  /* dark variant */
    background-color: var(--color-feedback-red-400);
}
```

#### `bg-destructive-default`

```css
.bg-destructive-default {
  background-color: var(--color-feedback-red-500);

  /* dark variant */
    background-color: var(--color-feedback-red-500);
}
```

#### `bg-destructive-muted`

```css
.bg-destructive-muted {
  background-color: var(--color-feedback-red-500-56);

  /* dark variant */
    background-color: var(--color-feedback-red-500-56);
}
```

#### `bg-destructive-softest`

```css
.bg-destructive-softest {
  background-color: var(--color-feedback-red-100);

  /* dark variant */
    background-color: var(--color-feedback-red-900);
}
```

#### `bg-information-highlight`

```css
.bg-information-highlight {
  background-color: var(--color-feedback-blue-600);

  /* dark variant */
    background-color: var(--color-feedback-blue-400);
}
```

#### `bg-information-default`

```css
.bg-information-default {
  background-color: var(--color-feedback-blue-500);

  /* dark variant */
    background-color: var(--color-feedback-blue-500);
}
```

#### `bg-information-muted`

```css
.bg-information-muted {
  background-color: var(--color-feedback-blue-500-56);

  /* dark variant */
    background-color: var(--color-feedback-blue-500-56);
}
```

#### `bg-information-softest`

```css
.bg-information-softest {
  background-color: var(--color-feedback-blue-100);

  /* dark variant */
    background-color: var(--color-feedback-blue-900);
}
```

#### `bg-success-highlight`

```css
.bg-success-highlight {
  background-color: var(--color-feedback-green-600);

  /* dark variant */
    background-color: var(--color-feedback-green-400);
}
```

#### `bg-success-default`

```css
.bg-success-default {
  background-color: var(--color-feedback-green-500);

  /* dark variant */
    background-color: var(--color-feedback-green-500);
}
```

#### `bg-success-muted`

```css
.bg-success-muted {
  background-color: var(--color-feedback-green-500-56);

  /* dark variant */
    background-color: var(--color-feedback-green-500-56);
}
```

#### `bg-success-softest`

```css
.bg-success-softest {
  background-color: var(--color-feedback-green-100);

  /* dark variant */
    background-color: var(--color-feedback-green-900);
}
```

#### `bg-warning-highlight`

```css
.bg-warning-highlight {
  background-color: var(--color-feedback-orange-600);

  /* dark variant */
    background-color: var(--color-feedback-orange-400);
}
```

#### `bg-warning-default`

```css
.bg-warning-default {
  background-color: var(--color-feedback-orange-500);

  /* dark variant */
    background-color: var(--color-feedback-orange-500);
}
```

#### `bg-warning-muted`

```css
.bg-warning-muted {
  background-color: var(--color-feedback-orange-500-56);

  /* dark variant */
    background-color: var(--color-feedback-orange-500-56);
}
```

#### `bg-warning-softest`

```css
.bg-warning-softest {
  background-color: var(--color-feedback-orange-100);

  /* dark variant */
    background-color: var(--color-feedback-orange-900);
}
```

### Border Utilities

#### `border-gradient-primary`

```css
.border-gradient-primary {
  border-image: var(--gradient-brand-primary) 1;
}
```

#### `border-warning`

```css
.border-warning {
  border-color: var(--color-feedback-orange-300);
  border-width: 1px;
  border-style: solid;
}
```

#### `border-neutral-active`

```css
.border-neutral-active {
  border-color: var(--color-neutral-600);
}
```

#### `border-neutral-hover`

```css
.border-neutral-hover {
  border-color: var(--color-neutral-500);
}
```

#### `border-neutral-default`

```css
.border-neutral-default {
  border-color: var(--color-neutral-400);
}
```

#### `border-neutral-disabled`

```css
.border-neutral-disabled {
  border-color: var(--color-neutral-400-40);
  opacity: 0.4;
}
```

#### `border-neutral-softest`

```css
.border-neutral-softest {
  border-color: var(--color-neutral-200);
}
```

#### `border-neutral-inset`

```css
.border-neutral-inset {
  border-color: var(--color-base-white);
}
```

#### `border-neutral-alpha`

```css
.border-neutral-alpha {
  border-color: hsla(0, 0%, 0%, 0.2);
}
```

#### `border-destructive-highlight`

```css
.border-destructive-highlight {
  border-color: var(--color-feedback-red-600);
}
```

#### `border-destructive-default`

```css
.border-destructive-default {
  border-color: var(--color-feedback-red-500);
}
```

#### `border-destructive-muted`

```css
.border-destructive-muted {
  border-color: var(--color-feedback-red-500-56);
}
```

#### `border-destructive-softest`

```css
.border-destructive-softest {
  border-color: var(--color-feedback-red-300);
}
```

#### `border-information-highlight`

```css
.border-information-highlight {
  border-color: var(--color-feedback-blue-600);
}
```

#### `border-information-default`

```css
.border-information-default {
  border-color: var(--color-feedback-blue-500);
}
```

#### `border-information-muted`

```css
.border-information-muted {
  border-color: var(--color-feedback-blue-500-56);
}
```

#### `border-information-softest`

```css
.border-information-softest {
  border-color: var(--color-feedback-blue-300);
}
```

#### `border-success-highlight`

```css
.border-success-highlight {
  border-color: var(--color-feedback-green-600);
}
```

#### `border-success-default`

```css
.border-success-default {
  border-color: var(--color-feedback-green-500);
}
```

#### `border-success-muted`

```css
.border-success-muted {
  border-color: var(--color-feedback-green-500-56);
}
```

#### `border-success-softest`

```css
.border-success-softest {
  border-color: var(--color-feedback-green-300);
}
```

#### `border-warning-highlight`

```css
.border-warning-highlight {
  border-color: var(--color-feedback-orange-600);
}
```

#### `border-warning-default`

```css
.border-warning-default {
  border-color: var(--color-feedback-orange-500);
}
```

#### `border-warning-muted`

```css
.border-warning-muted {
  border-color: var(--color-feedback-orange-500-56);
}
```

#### `border-warning-softest`

```css
.border-warning-softest {
  border-color: var(--color-feedback-orange-300);
}
```

#### `border-focus`

```css
.border-focus {
  border-color: var(--color-brand-blue-600);
}
```

### Other Utilities

#### `container`

```css
.container {
  padding-inline: 1rem;
  margin-inline: auto;
}
```

#### `underline-link-primary`

```css
.underline-link-primary {
  color: var(--color-brand-blue-600);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `underline-link-secondary`

```css
.underline-link-secondary {
  color: var(--color-base-black);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `underline-link-visited`

```css
.underline-link-visited {
  color: var(--color-feedback-violet-600);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `fill-neutral-highlight`

```css
.fill-neutral-highlight {
  fill: var(--color-base-black);
}
```

#### `fill-neutral-active`

```css
.fill-neutral-active {
  fill: var(--color-neutral-900);
}
```

#### `fill-neutral-default`

```css
.fill-neutral-default {
  fill: var(--color-neutral-800);
}
```

#### `fill-neutral-muted`

```css
.fill-neutral-muted {
  fill: var(--color-neutral-800-56);
}
```

#### `fill-neutral-highlight-fixed-dark`

```css
.fill-neutral-highlight-fixed-dark {
  fill: var(--color-base-black);
}
```

#### `fill-neutral-default-fixed-dark`

```css
.fill-neutral-default-fixed-dark {
  fill: var(--color-neutral-800);
}
```

#### `fill-neutral-muted-fixed-dark`

```css
.fill-neutral-muted-fixed-dark {
  fill: var(--color-neutral-900-56);
}
```

#### `fill-neutral-highlight-fixed-light`

```css
.fill-neutral-highlight-fixed-light {
  fill: var(--color-base-white);
}
```

#### `fill-neutral-default-fixed-light`

```css
.fill-neutral-default-fixed-light {
  fill: var(--color-neutral-100);
}
```

#### `fill-neutral-muted-fixed-light`

```css
.fill-neutral-muted-fixed-light {
  fill: var(--color-neutral-100-56);
}
```

#### `fill-neutral-highlight-inverse`

```css
.fill-neutral-highlight-inverse {
  fill: var(--color-base-white);
}
```

#### `fill-neutral-default-inverse`

```css
.fill-neutral-default-inverse {
  fill: var(--color-neutral-100);
}
```

#### `fill-neutral-muted-inverse`

```css
.fill-neutral-muted-inverse {
  fill: var(--color-neutral-100-56);
}
```

#### `fill-link-primary`

```css
.fill-link-primary {
  fill: var(--color-brand-blue-600);
}
```

#### `fill-link-secondary`

```css
.fill-link-secondary {
  fill: var(--color-base-black);
}
```

#### `fill-link-visited`

```css
.fill-link-visited {
  fill: var(--color-feedback-violet-600);
}
```

#### `fill-destructive-highlight`

```css
.fill-destructive-highlight {
  fill: var(--color-feedback-red-600);
}
```

#### `fill-destructive-default`

```css
.fill-destructive-default {
  fill: var(--color-feedback-red-500);
}
```

#### `fill-destructive-muted`

```css
.fill-destructive-muted {
  fill: var(--color-feedback-red-600-56);
}
```

#### `fill-information-highlight`

```css
.fill-information-highlight {
  fill: var(--color-feedback-blue-600);
}
```

#### `fill-information-default`

```css
.fill-information-default {
  fill: var(--color-feedback-blue-500);
}
```

#### `fill-information-muted`

```css
.fill-information-muted {
  fill: var(--color-feedback-blue-500-56);
}
```

#### `fill-success-highlight`

```css
.fill-success-highlight {
  fill: var(--color-feedback-green-600);
}
```

#### `fill-success-default`

```css
.fill-success-default {
  fill: var(--color-feedback-green-500);
}
```

#### `fill-success-muted`

```css
.fill-success-muted {
  fill: var(--color-feedback-green-500-56);
}
```

#### `fill-warning-highlight`

```css
.fill-warning-highlight {
  fill: var(--color-feedback-orange-600);
}
```

#### `fill-warning-default`

```css
.fill-warning-default {
  fill: var(--color-feedback-orange-500);
}
```

#### `fill-warning-muted`

```css
.fill-warning-muted {
  fill: var(--color-feedback-orange-500-56);
}
```

#### `stroke-neutral-highlight`

```css
.stroke-neutral-highlight {
  stroke: var(--color-base-black);
}
```

#### `stroke-neutral-active`

```css
.stroke-neutral-active {
  stroke: var(--color-neutral-900);
}
```

#### `stroke-neutral-default`

```css
.stroke-neutral-default {
  stroke: var(--color-neutral-800);
}
```

#### `stroke-neutral-muted`

```css
.stroke-neutral-muted {
  stroke: var(--color-neutral-800-56);
}
```

#### `stroke-neutral-highlight-fixed-dark`

```css
.stroke-neutral-highlight-fixed-dark {
  stroke: var(--color-base-black);
}
```

#### `stroke-neutral-default-fixed-dark`

```css
.stroke-neutral-default-fixed-dark {
  stroke: var(--color-neutral-800);
}
```

#### `stroke-neutral-muted-fixed-dark`

```css
.stroke-neutral-muted-fixed-dark {
  stroke: var(--color-neutral-900-56);
}
```

#### `stroke-neutral-highlight-fixed-light`

```css
.stroke-neutral-highlight-fixed-light {
  stroke: var(--color-base-white);
}
```

#### `stroke-neutral-default-fixed-light`

```css
.stroke-neutral-default-fixed-light {
  stroke: var(--color-neutral-100);
}
```

#### `stroke-neutral-muted-fixed-light`

```css
.stroke-neutral-muted-fixed-light {
  stroke: var(--color-neutral-100-56);
}
```

#### `stroke-neutral-highlight-inverse`

```css
.stroke-neutral-highlight-inverse {
  stroke: var(--color-base-white);
}
```

#### `stroke-neutral-default-inverse`

```css
.stroke-neutral-default-inverse {
  stroke: var(--color-neutral-100);
}
```

#### `stroke-neutral-muted-inverse`

```css
.stroke-neutral-muted-inverse {
  stroke: var(--color-neutral-100-56);
}
```

#### `stroke-link-primary`

```css
.stroke-link-primary {
  stroke: var(--color-brand-blue-600);
}
```

#### `stroke-link-secondary`

```css
.stroke-link-secondary {
  stroke: var(--color-base-black);
}
```

#### `stroke-link-visited`

```css
.stroke-link-visited {
  stroke: var(--color-feedback-violet-600);
}
```

#### `stroke-destructive-highlight`

```css
.stroke-destructive-highlight {
  stroke: var(--color-feedback-red-600);
}
```

#### `stroke-destructive-default`

```css
.stroke-destructive-default {
  stroke: var(--color-feedback-red-500);
}
```

#### `stroke-destructive-muted`

```css
.stroke-destructive-muted {
  stroke: var(--color-feedback-red-600-56);
}
```

#### `stroke-information-highlight`

```css
.stroke-information-highlight {
  stroke: var(--color-feedback-blue-600);
}
```

#### `stroke-information-default`

```css
.stroke-information-default {
  stroke: var(--color-feedback-blue-500);
}
```

#### `stroke-information-muted`

```css
.stroke-information-muted {
  stroke: var(--color-feedback-blue-500-56);
}
```

#### `stroke-success-highlight`

```css
.stroke-success-highlight {
  stroke: var(--color-feedback-green-600);
}
```

#### `stroke-success-default`

```css
.stroke-success-default {
  stroke: var(--color-feedback-green-500);
}
```

#### `stroke-success-muted`

```css
.stroke-success-muted {
  stroke: var(--color-feedback-green-500-56);
}
```

#### `stroke-warning-highlight`

```css
.stroke-warning-highlight {
  stroke: var(--color-feedback-orange-600);
}
```

#### `stroke-warning-default`

```css
.stroke-warning-default {
  stroke: var(--color-feedback-orange-500);
}
```

#### `stroke-warning-muted`

```css
.stroke-warning-muted {
  stroke: var(--color-feedback-orange-500-56);
}
```

## Migration Notes

- **Shadcn components**: Currently using deprecated tokens, will need updates
- **Typography consolidation**: `typography-*` utilities should be removed in favor of `text-*`
- **Raw color usage**: Audit and replace any `var(--color-neutral-*)` usage with semantic utilities

## Performance Considerations

- Use `@source inline` for utilities that need responsive variants
- Avoid creating too many custom `@utility` declarations
- Leverage Tailwind's built-in utilities where they align with the design system

## Future Improvements

1. **Type generation**: Generate TypeScript types for all utilities
2. **Custom properties API**: Expose some CSS variables for component libraries
3. **Animation utilities**: Add semantic animation classes
4. **Layout utilities**: More sophisticated grid/flexbox patterns
