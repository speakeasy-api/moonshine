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

This section is auto-generated from the CSS files. Last updated: 2025-08-23T04:30:40.888Z

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
  color: var(--text-display);
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
  color: var(--text-display);
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
  color: var(--text-display);
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
  color: var(--text-display);
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
  color: var(--text-display);
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
  color: var(--text-display);
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
  color: var(--text-heading-xl);
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
  color: var(--text-heading-lg);
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
  color: var(--text-heading-md);
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
  color: var(--text-heading-sm);
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
  color: var(--text-heading-xs);
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
  color: var(--text-highlight);
}
```

#### `text-default`

```css
.text-default {
  color: var(--text-default);
}
```

#### `text-muted`

```css
.text-muted {
  color: var(--text-muted);
}
```

#### `text-placeholder`

```css
.text-placeholder {
  color: var(--text-placeholder);
}
```

#### `text-disabled`

```css
.text-disabled {
  color: var(--text-disabled);
}
```

#### `text-highlight-fixed-dark`

```css
.text-highlight-fixed-dark {
  color: var(--text-highlight-fixed-dark);
}
```

#### `text-default-fixed-dark`

```css
.text-default-fixed-dark {
  color: var(--text-default-fixed-dark);
}
```

#### `text-muted-fixed-dark`

```css
.text-muted-fixed-dark {
  color: var(--text-muted-fixed-dark);
}
```

#### `text-highlight-fixed-light`

```css
.text-highlight-fixed-light {
  color: var(--text-highlight-fixed-light);
}
```

#### `text-default-fixed-light`

```css
.text-default-fixed-light {
  color: var(--text-default-fixed-light);
}
```

#### `text-muted-fixed-light`

```css
.text-muted-fixed-light {
  color: var(--text-muted-fixed-light);
}
```

#### `text-highlight-inverse`

```css
.text-highlight-inverse {
  color: var(--text-highlight-inverse);
}
```

#### `text-default-inverse`

```css
.text-default-inverse {
  color: var(--text-default-inverse);
}
```

#### `text-muted-inverse`

```css
.text-muted-inverse {
  color: var(--text-muted-inverse);
}
```

#### `text-link-primary`

```css
.text-link-primary {
  color: var(--text-link-primary);
}
```

#### `text-link-secondary`

```css
.text-link-secondary {
  color: var(--text-link-secondary);
}
```

#### `text-link-visited`

```css
.text-link-visited {
  color: var(--text-link-visited);
}
```

#### `text-default-destructive`

```css
.text-default-destructive {
  color: var(--text-default-destructive);
}
```

#### `text-link-destructive`

```css
.text-link-destructive {
  color: var(--text-link-destructive);
}
```

#### `text-default-information`

```css
.text-default-information {
  color: var(--text-default-information);
}
```

#### `text-link-information`

```css
.text-link-information {
  color: var(--text-link-information);
}
```

#### `text-default-success`

```css
.text-default-success {
  color: var(--text-default-success);
}
```

#### `text-link-success`

```css
.text-link-success {
  color: var(--text-link-success);
}
```

#### `text-default-warning`

```css
.text-default-warning {
  color: var(--text-default-warning);
}
```

#### `text-link-warning`

```css
.text-link-warning {
  color: var(--text-link-warning);
}
```

#### `text-warning`

```css
.text-warning {
  color: var(--text-warning);
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
  background-color: var(--bg-warning);
}
```

#### `bg-surface-primary-default`

```css
.bg-surface-primary-default {
  background-color: var(--bg-surface-primary-default);
}
```

#### `bg-surface-primary-inverse`

```css
.bg-surface-primary-inverse {
  background-color: var(--bg-surface-primary-inverse);
}
```

#### `bg-surface-secondary-default`

```css
.bg-surface-secondary-default {
  background-color: var(--bg-surface-secondary-default);
}
```

#### `bg-surface-secondary-inverse`

```css
.bg-surface-secondary-inverse {
  background-color: var(--bg-surface-secondary-inverse);
}
```

#### `bg-surface-tertiary-default`

```css
.bg-surface-tertiary-default {
  background-color: var(--bg-surface-tertiary-default);
}
```

#### `bg-surface-tertiary-inverse`

```css
.bg-surface-tertiary-inverse {
  background-color: var(--bg-surface-tertiary-inverse);
}
```

#### `bg-highlight`

```css
.bg-highlight {
  background-color: var(--bg-highlight);
}
```

#### `bg-active`

```css
.bg-active {
  background-color: var(--bg-active);
}
```

#### `bg-default`

```css
.bg-default {
  background-color: var(--bg-default);
}
```

#### `bg-muted`

```css
.bg-muted {
  background-color: var(--bg-muted);
}
```

#### `bg-inset`

```css
.bg-inset {
  background-color: var(--bg-inset);
}
```

#### `bg-surface-primary-fixed-light`

```css
.bg-surface-primary-fixed-light {
  background-color: var(--bg-surface-primary-fixed-light);
}
```

#### `bg-surface-secondary-fixed-light`

```css
.bg-surface-secondary-fixed-light {
  background-color: var(--bg-surface-secondary-fixed-light);
}
```

#### `bg-surface-tertiary-fixed-light`

```css
.bg-surface-tertiary-fixed-light {
  background-color: var(--bg-surface-tertiary-fixed-light);
}
```

#### `bg-surface-primary-fixed-dark`

```css
.bg-surface-primary-fixed-dark {
  background-color: var(--bg-surface-primary-fixed-dark);
}
```

#### `bg-surface-secondary-fixed-dark`

```css
.bg-surface-secondary-fixed-dark {
  background-color: var(--bg-surface-secondary-fixed-dark);
}
```

#### `bg-surface-tertiary-fixed-dark`

```css
.bg-surface-tertiary-fixed-dark {
  background-color: var(--bg-surface-tertiary-fixed-dark);
}
```

#### `bg-destructive-highlight`

```css
.bg-destructive-highlight {
  background-color: var(--bg-destructive-highlight);
}
```

#### `bg-destructive-default`

```css
.bg-destructive-default {
  background-color: var(--bg-destructive-default);
}
```

#### `bg-destructive-muted`

```css
.bg-destructive-muted {
  background-color: var(--bg-destructive-muted);
}
```

#### `bg-destructive-softest`

```css
.bg-destructive-softest {
  background-color: var(--bg-destructive-softest);
}
```

#### `bg-information-highlight`

```css
.bg-information-highlight {
  background-color: var(--bg-information-highlight);
}
```

#### `bg-information-default`

```css
.bg-information-default {
  background-color: var(--bg-information-default);
}
```

#### `bg-information-muted`

```css
.bg-information-muted {
  background-color: var(--bg-information-muted);
}
```

#### `bg-information-softest`

```css
.bg-information-softest {
  background-color: var(--bg-information-softest);
}
```

#### `bg-success-highlight`

```css
.bg-success-highlight {
  background-color: var(--bg-success-highlight);
}
```

#### `bg-success-default`

```css
.bg-success-default {
  background-color: var(--bg-success-default);
}
```

#### `bg-success-muted`

```css
.bg-success-muted {
  background-color: var(--bg-success-muted);
}
```

#### `bg-success-softest`

```css
.bg-success-softest {
  background-color: var(--bg-success-softest);
}
```

#### `bg-warning-highlight`

```css
.bg-warning-highlight {
  background-color: var(--bg-warning-highlight);
}
```

#### `bg-warning-default`

```css
.bg-warning-default {
  background-color: var(--bg-warning-default);
}
```

#### `bg-warning-muted`

```css
.bg-warning-muted {
  background-color: var(--bg-warning-muted);
}
```

#### `bg-warning-softest`

```css
.bg-warning-softest {
  background-color: var(--bg-warning-softest);
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
  border-color: var(--border-warning);
  border-width: 1px;
  border-style: solid;
}
```

#### `border-neutral-active`

```css
.border-neutral-active {
  border-color: var(--border-neutral-active);
}
```

#### `border-neutral-hover`

```css
.border-neutral-hover {
  border-color: var(--border-neutral-hover);
}
```

#### `border-neutral-default`

```css
.border-neutral-default {
  border-color: var(--border-neutral-default);
}
```

#### `border-neutral-disabled`

```css
.border-neutral-disabled {
  border-color: var(--border-neutral-disabled);
  opacity: 0.4;
}
```

#### `border-neutral-softest`

```css
.border-neutral-softest {
  border-color: var(--border-neutral-softest);
}
```

#### `border-neutral-inset`

```css
.border-neutral-inset {
  border-color: var(--border-neutral-inset);
}
```

#### `border-neutral-alpha`

```css
.border-neutral-alpha {
  border-color: var(--border-neutral-alpha);
}
```

#### `border-destructive-highlight`

```css
.border-destructive-highlight {
  border-color: var(--border-destructive-highlight);
}
```

#### `border-destructive-default`

```css
.border-destructive-default {
  border-color: var(--border-destructive-default);
}
```

#### `border-destructive-muted`

```css
.border-destructive-muted {
  border-color: var(--border-destructive-muted);
}
```

#### `border-destructive-softest`

```css
.border-destructive-softest {
  border-color: var(--border-destructive-softest);
}
```

#### `border-information-highlight`

```css
.border-information-highlight {
  border-color: var(--border-information-highlight);
}
```

#### `border-information-default`

```css
.border-information-default {
  border-color: var(--border-information-default);
}
```

#### `border-information-muted`

```css
.border-information-muted {
  border-color: var(--border-information-muted);
}
```

#### `border-information-softest`

```css
.border-information-softest {
  border-color: var(--border-information-softest);
}
```

#### `border-success-highlight`

```css
.border-success-highlight {
  border-color: var(--border-success-highlight);
}
```

#### `border-success-default`

```css
.border-success-default {
  border-color: var(--border-success-default);
}
```

#### `border-success-muted`

```css
.border-success-muted {
  border-color: var(--border-success-muted);
}
```

#### `border-success-softest`

```css
.border-success-softest {
  border-color: var(--border-success-softest);
}
```

#### `border-warning-highlight`

```css
.border-warning-highlight {
  border-color: var(--border-warning-highlight);
}
```

#### `border-warning-default`

```css
.border-warning-default {
  border-color: var(--border-warning-default);
}
```

#### `border-warning-muted`

```css
.border-warning-muted {
  border-color: var(--border-warning-muted);
}
```

#### `border-warning-softest`

```css
.border-warning-softest {
  border-color: var(--border-warning-softest);
}
```

#### `border-focus`

```css
.border-focus {
  border-color: var(--border-focus);
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
  color: var(--underline-link-primary);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `underline-link-secondary`

```css
.underline-link-secondary {
  color: var(--underline-link-secondary);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `underline-link-visited`

```css
.underline-link-visited {
  color: var(--underline-link-visited);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}
```

#### `fill-neutral-highlight`

```css
.fill-neutral-highlight {
  fill: var(--fill-neutral-highlight);
}
```

#### `fill-neutral-active`

```css
.fill-neutral-active {
  fill: var(--fill-neutral-active);
}
```

#### `fill-neutral-default`

```css
.fill-neutral-default {
  fill: var(--fill-neutral-default);
}
```

#### `fill-neutral-muted`

```css
.fill-neutral-muted {
  fill: var(--fill-neutral-muted);
}
```

#### `fill-neutral-highlight-fixed-dark`

```css
.fill-neutral-highlight-fixed-dark {
  fill: var(--fill-neutral-highlight-fixed-dark);
}
```

#### `fill-neutral-default-fixed-dark`

```css
.fill-neutral-default-fixed-dark {
  fill: var(--fill-neutral-default-fixed-dark);
}
```

#### `fill-neutral-muted-fixed-dark`

```css
.fill-neutral-muted-fixed-dark {
  fill: var(--fill-neutral-muted-fixed-dark);
}
```

#### `fill-neutral-highlight-fixed-light`

```css
.fill-neutral-highlight-fixed-light {
  fill: var(--fill-neutral-highlight-fixed-light);
}
```

#### `fill-neutral-default-fixed-light`

```css
.fill-neutral-default-fixed-light {
  fill: var(--fill-neutral-default-fixed-light);
}
```

#### `fill-neutral-muted-fixed-light`

```css
.fill-neutral-muted-fixed-light {
  fill: var(--fill-neutral-muted-fixed-light);
}
```

#### `fill-neutral-highlight-inverse`

```css
.fill-neutral-highlight-inverse {
  fill: var(--fill-neutral-highlight-inverse);
}
```

#### `fill-neutral-default-inverse`

```css
.fill-neutral-default-inverse {
  fill: var(--fill-neutral-default-inverse);
}
```

#### `fill-neutral-muted-inverse`

```css
.fill-neutral-muted-inverse {
  fill: var(--fill-neutral-muted-inverse);
}
```

#### `fill-link-primary`

```css
.fill-link-primary {
  fill: var(--fill-link-primary);
}
```

#### `fill-link-secondary`

```css
.fill-link-secondary {
  fill: var(--fill-link-secondary);
}
```

#### `fill-link-visited`

```css
.fill-link-visited {
  fill: var(--fill-link-visited);
}
```

#### `fill-destructive-highlight`

```css
.fill-destructive-highlight {
  fill: var(--fill-destructive-highlight);
}
```

#### `fill-destructive-default`

```css
.fill-destructive-default {
  fill: var(--fill-destructive-default);
}
```

#### `fill-destructive-muted`

```css
.fill-destructive-muted {
  fill: var(--fill-destructive-muted);
}
```

#### `fill-information-highlight`

```css
.fill-information-highlight {
  fill: var(--fill-information-highlight);
}
```

#### `fill-information-default`

```css
.fill-information-default {
  fill: var(--fill-information-default);
}
```

#### `fill-information-muted`

```css
.fill-information-muted {
  fill: var(--fill-information-muted);
}
```

#### `fill-success-highlight`

```css
.fill-success-highlight {
  fill: var(--fill-success-highlight);
}
```

#### `fill-success-default`

```css
.fill-success-default {
  fill: var(--fill-success-default);
}
```

#### `fill-success-muted`

```css
.fill-success-muted {
  fill: var(--fill-success-muted);
}
```

#### `fill-warning-highlight`

```css
.fill-warning-highlight {
  fill: var(--fill-warning-highlight);
}
```

#### `fill-warning-default`

```css
.fill-warning-default {
  fill: var(--fill-warning-default);
}
```

#### `fill-warning-muted`

```css
.fill-warning-muted {
  fill: var(--fill-warning-muted);
}
```

#### `stroke-neutral-highlight`

```css
.stroke-neutral-highlight {
  stroke: var(--stroke-neutral-highlight);
}
```

#### `stroke-neutral-active`

```css
.stroke-neutral-active {
  stroke: var(--stroke-neutral-active);
}
```

#### `stroke-neutral-default`

```css
.stroke-neutral-default {
  stroke: var(--stroke-neutral-default);
}
```

#### `stroke-neutral-muted`

```css
.stroke-neutral-muted {
  stroke: var(--stroke-neutral-muted);
}
```

#### `stroke-neutral-highlight-fixed-dark`

```css
.stroke-neutral-highlight-fixed-dark {
  stroke: var(--stroke-neutral-highlight-fixed-dark);
}
```

#### `stroke-neutral-default-fixed-dark`

```css
.stroke-neutral-default-fixed-dark {
  stroke: var(--stroke-neutral-default-fixed-dark);
}
```

#### `stroke-neutral-muted-fixed-dark`

```css
.stroke-neutral-muted-fixed-dark {
  stroke: var(--stroke-neutral-muted-fixed-dark);
}
```

#### `stroke-neutral-highlight-fixed-light`

```css
.stroke-neutral-highlight-fixed-light {
  stroke: var(--stroke-neutral-highlight-fixed-light);
}
```

#### `stroke-neutral-default-fixed-light`

```css
.stroke-neutral-default-fixed-light {
  stroke: var(--stroke-neutral-default-fixed-light);
}
```

#### `stroke-neutral-muted-fixed-light`

```css
.stroke-neutral-muted-fixed-light {
  stroke: var(--stroke-neutral-muted-fixed-light);
}
```

#### `stroke-neutral-highlight-inverse`

```css
.stroke-neutral-highlight-inverse {
  stroke: var(--stroke-neutral-highlight-inverse);
}
```

#### `stroke-neutral-default-inverse`

```css
.stroke-neutral-default-inverse {
  stroke: var(--stroke-neutral-default-inverse);
}
```

#### `stroke-neutral-muted-inverse`

```css
.stroke-neutral-muted-inverse {
  stroke: var(--stroke-neutral-muted-inverse);
}
```

#### `stroke-link-primary`

```css
.stroke-link-primary {
  stroke: var(--stroke-link-primary);
}
```

#### `stroke-link-secondary`

```css
.stroke-link-secondary {
  stroke: var(--stroke-link-secondary);
}
```

#### `stroke-link-visited`

```css
.stroke-link-visited {
  stroke: var(--stroke-link-visited);
}
```

#### `stroke-destructive-highlight`

```css
.stroke-destructive-highlight {
  stroke: var(--stroke-destructive-highlight);
}
```

#### `stroke-destructive-default`

```css
.stroke-destructive-default {
  stroke: var(--stroke-destructive-default);
}
```

#### `stroke-destructive-muted`

```css
.stroke-destructive-muted {
  stroke: var(--stroke-destructive-muted);
}
```

#### `stroke-information-highlight`

```css
.stroke-information-highlight {
  stroke: var(--stroke-information-highlight);
}
```

#### `stroke-information-default`

```css
.stroke-information-default {
  stroke: var(--stroke-information-default);
}
```

#### `stroke-information-muted`

```css
.stroke-information-muted {
  stroke: var(--stroke-information-muted);
}
```

#### `stroke-success-highlight`

```css
.stroke-success-highlight {
  stroke: var(--stroke-success-highlight);
}
```

#### `stroke-success-default`

```css
.stroke-success-default {
  stroke: var(--stroke-success-default);
}
```

#### `stroke-success-muted`

```css
.stroke-success-muted {
  stroke: var(--stroke-success-muted);
}
```

#### `stroke-warning-highlight`

```css
.stroke-warning-highlight {
  stroke: var(--stroke-warning-highlight);
}
```

#### `stroke-warning-default`

```css
.stroke-warning-default {
  stroke: var(--stroke-warning-default);
}
```

#### `stroke-warning-muted`

```css
.stroke-warning-muted {
  stroke: var(--stroke-warning-muted);
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
