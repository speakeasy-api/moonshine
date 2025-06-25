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
   --text-warning: var(--color-warning-700);
   --bg-warning: var(--color-warning-100);
   
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

This section is auto-generated from the CSS files. Last updated: 2025-06-25T19:18:12.312Z

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
}
```

#### `bg-warning`

```css
.bg-warning {
  background-color: var(--bg-warning);
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

### Other Utilities

#### `container`

```css
.container {
  padding-inline: 1rem;
  margin-inline: auto;
}
```

#### `test-auto-gen`

```css
.test-auto-gen {
  padding: 1rem;
  background: red;
  color: white;
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