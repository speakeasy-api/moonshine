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
  @apply text-[1.813rem] leading-[1.5] font-light tracking-[0.0015em];
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
/* Format: @source inline("{breakpoints}{utility-name}{values}"); */
@source inline("{,sm:,md:,lg:,xl:,2xl:}your-utility-{small,medium,large}");
```

**Example - Creating responsive margin utilities:**

```css
@source inline("{,sm:,md:,lg:,xl:,2xl:}m-{0,1,2,4,8,16}");
```

This generates classes like: `m-0`, `sm:m-0`, `md:m-2`, `lg:m-8`, etc.

## Available Utility Classes

This section is auto-generated from the CSS files. Last updated: 2025-08-05T10:11:38.811Z

### Typography Utilities

#### `text-display-2xl`

```tsx
<p className={cn('text-display-2xl')}>
Hello world
</p>
```

#### `text-display-xl`

```tsx
<p className={cn('text-display-xl')}>
Hello world
</p>
```

#### `text-display-lg`

```tsx
<p className={cn('text-display-lg')}>
Hello world
</p>
```

#### `text-display-md`

```tsx
<p className={cn('text-display-md')}>
Hello world
</p>
```

#### `text-display-sm`

```tsx
<p className={cn('text-display-sm')}>
Hello world
</p>
```

#### `text-display-xs`

```tsx
<p className={cn('text-display-xs')}>
Hello world
</p>
```

#### `text-heading-xl`

```tsx
<p className={cn('text-heading-xl')}>
Hello world
</p>
```

#### `text-heading-lg`

```tsx
<p className={cn('text-heading-lg')}>
Hello world
</p>
```

#### `text-heading-md`

```tsx
<p className={cn('text-heading-md')}>
Hello world
</p>
```

#### `text-heading-sm`

```tsx
<p className={cn('text-heading-sm')}>
Hello world
</p>
```

#### `text-heading-xs`

```tsx
<p className={cn('text-heading-xs')}>
Hello world
</p>
```

#### `text-body-lg`

```tsx
<p className={cn('text-body-lg')}>
Hello world
</p>
```

#### `text-body-md`

```tsx
<p className={cn('text-body-md')}>
Hello world
</p>
```

#### `text-body-sm`

```tsx
<p className={cn('text-body-sm')}>
Hello world
</p>
```

#### `text-body-xs`

```tsx
<p className={cn('text-body-xs')}>
Hello world
</p>
```

#### `text-codeline-md`

```tsx
<p className={cn('text-codeline-md')}>
Hello world
</p>
```

#### `text-codeline-sm`

```tsx
<p className={cn('text-codeline-sm')}>
Hello world
</p>
```

#### `text-codeline-xs`

```tsx
<p className={cn('text-codeline-xs')}>
Hello world
</p>
```

#### `text-button-md`

```tsx
<p className={cn('text-button-md')}>
Hello world
</p>
```

#### `text-button-sm`

```tsx
<p className={cn('text-button-sm')}>
Hello world
</p>
```

#### `text-button-xs`

```tsx
<p className={cn('text-button-xs')}>
Hello world
</p>
```

#### `text-highlight`

```tsx
<p className={cn('text-highlight')}>
Hello world
</p>
```

#### `text-default`

```tsx
<p className={cn('text-default')}>
Hello world
</p>
```

#### `text-muted`

```tsx
<p className={cn('text-muted')}>
Hello world
</p>
```

#### `text-placeholder`

```tsx
<p className={cn('text-placeholder')}>
Hello world
</p>
```

#### `text-disabled`

```tsx
<p className={cn('text-disabled')}>
Hello world
</p>
```

#### `text-highlight-fixed-dark`

```tsx
<p className={cn('text-highlight-fixed-dark')}>
Hello world
</p>
```

#### `text-default-fixed-dark`

```tsx
<p className={cn('text-default-fixed-dark')}>
Hello world
</p>
```

#### `text-muted-fixed-dark`

```tsx
<p className={cn('text-muted-fixed-dark')}>
Hello world
</p>
```

#### `text-highlight-fixed-light`

```tsx
<p className={cn('text-highlight-fixed-light')}>
Hello world
</p>
```

#### `text-default-fixed-light`

```tsx
<p className={cn('text-default-fixed-light')}>
Hello world
</p>
```

#### `text-muted-fixed-light`

```tsx
<p className={cn('text-muted-fixed-light')}>
Hello world
</p>
```

#### `text-highlight-inverse`

```tsx
<p className={cn('text-highlight-inverse')}>
Hello world
</p>
```

#### `text-default-inverse`

```tsx
<p className={cn('text-default-inverse')}>
Hello world
</p>
```

#### `text-muted-inverse`

```tsx
<p className={cn('text-muted-inverse')}>
Hello world
</p>
```

#### `text-link-primary`

```tsx
<p className={cn('text-link-primary')}>
Hello world
</p>
```

#### `text-link-secondary`

```tsx
<p className={cn('text-link-secondary')}>
Hello world
</p>
```

#### `text-link-visited`

```tsx
<p className={cn('text-link-visited')}>
Hello world
</p>
```

#### `text-default-destructive`

```tsx
<p className={cn('text-default-destructive')}>
Hello world
</p>
```

#### `text-link-destructive`

```tsx
<p className={cn('text-link-destructive')}>
Hello world
</p>
```

#### `text-default-information`

```tsx
<p className={cn('text-default-information')}>
Hello world
</p>
```

#### `text-link-information`

```tsx
<p className={cn('text-link-information')}>
Hello world
</p>
```

#### `text-default-success`

```tsx
<p className={cn('text-default-success')}>
Hello world
</p>
```

#### `text-link-success`

```tsx
<p className={cn('text-link-success')}>
Hello world
</p>
```

#### `text-default-warning`

```tsx
<p className={cn('text-default-warning')}>
Hello world
</p>
```

#### `text-link-warning`

```tsx
<p className={cn('text-link-warning')}>
Hello world
</p>
```

#### `text-warning`

```tsx
<p className={cn('text-warning')}>
Hello world
</p>
```

### Background Utilities

#### `bg-mask`

```tsx
<div className={cn('bg-mask')}>
Hello world
</div>
```

#### `bg-gradient-primary`

```tsx
<div className={cn('bg-gradient-primary')}>
Hello world
</div>
```

#### `bg-surface-primary`

```tsx
<div className={cn('bg-surface-primary')}>
Hello world
</div>
```

#### `bg-surface-secondary`

```tsx
<div className={cn('bg-surface-secondary')}>
Hello world
</div>
```

#### `bg-warning`

```tsx
<div className={cn('bg-warning')}>
Hello world
</div>
```

#### `bg-surface-primary-default`

```tsx
<div className={cn('bg-surface-primary-default')}>
Hello world
</div>
```

#### `bg-surface-primary-inverse`

```tsx
<div className={cn('bg-surface-primary-inverse')}>
Hello world
</div>
```

#### `bg-surface-secondary-default`

```tsx
<div className={cn('bg-surface-secondary-default')}>
Hello world
</div>
```

#### `bg-surface-secondary-inverse`

```tsx
<div className={cn('bg-surface-secondary-inverse')}>
Hello world
</div>
```

#### `bg-surface-tertiary-default`

```tsx
<div className={cn('bg-surface-tertiary-default')}>
Hello world
</div>
```

#### `bg-surface-tertiary-inverse`

```tsx
<div className={cn('bg-surface-tertiary-inverse')}>
Hello world
</div>
```

#### `bg-highlight`

```tsx
<div className={cn('bg-highlight')}>
Hello world
</div>
```

#### `bg-active`

```tsx
<div className={cn('bg-active')}>
Hello world
</div>
```

#### `bg-default`

```tsx
<div className={cn('bg-default')}>
Hello world
</div>
```

#### `bg-muted`

```tsx
<div className={cn('bg-muted')}>
Hello world
</div>
```

#### `bg-inset`

```tsx
<div className={cn('bg-inset')}>
Hello world
</div>
```

#### `bg-surface-primary-fixed-light`

```tsx
<div className={cn('bg-surface-primary-fixed-light')}>
Hello world
</div>
```

#### `bg-surface-secondary-fixed-light`

```tsx
<div className={cn('bg-surface-secondary-fixed-light')}>
Hello world
</div>
```

#### `bg-surface-tertiary-fixed-light`

```tsx
<div className={cn('bg-surface-tertiary-fixed-light')}>
Hello world
</div>
```

#### `bg-surface-primary-fixed-dark`

```tsx
<div className={cn('bg-surface-primary-fixed-dark')}>
Hello world
</div>
```

#### `bg-surface-secondary-fixed-dark`

```tsx
<div className={cn('bg-surface-secondary-fixed-dark')}>
Hello world
</div>
```

#### `bg-surface-tertiary-fixed-dark`

```tsx
<div className={cn('bg-surface-tertiary-fixed-dark')}>
Hello world
</div>
```

#### `bg-destructive-highlight`

```tsx
<div className={cn('bg-destructive-highlight')}>
Hello world
</div>
```

#### `bg-destructive-default`

```tsx
<div className={cn('bg-destructive-default')}>
Hello world
</div>
```

#### `bg-destructive-muted`

```tsx
<div className={cn('bg-destructive-muted')}>
Hello world
</div>
```

#### `bg-destructive-softest`

```tsx
<div className={cn('bg-destructive-softest')}>
Hello world
</div>
```

#### `bg-information-highlight`

```tsx
<div className={cn('bg-information-highlight')}>
Hello world
</div>
```

#### `bg-information-default`

```tsx
<div className={cn('bg-information-default')}>
Hello world
</div>
```

#### `bg-information-muted`

```tsx
<div className={cn('bg-information-muted')}>
Hello world
</div>
```

#### `bg-information-softest`

```tsx
<div className={cn('bg-information-softest')}>
Hello world
</div>
```

#### `bg-success-highlight`

```tsx
<div className={cn('bg-success-highlight')}>
Hello world
</div>
```

#### `bg-success-default`

```tsx
<div className={cn('bg-success-default')}>
Hello world
</div>
```

#### `bg-success-muted`

```tsx
<div className={cn('bg-success-muted')}>
Hello world
</div>
```

#### `bg-success-softest`

```tsx
<div className={cn('bg-success-softest')}>
Hello world
</div>
```

#### `bg-warning-highlight`

```tsx
<div className={cn('bg-warning-highlight')}>
Hello world
</div>
```

#### `bg-warning-default`

```tsx
<div className={cn('bg-warning-default')}>
Hello world
</div>
```

#### `bg-warning-muted`

```tsx
<div className={cn('bg-warning-muted')}>
Hello world
</div>
```

#### `bg-warning-softest`

```tsx
<div className={cn('bg-warning-softest')}>
Hello world
</div>
```

### Border Utilities

#### `border-gradient-primary`

```tsx
<div className={cn('border-gradient-primary')}>
Hello world
</div>
```

#### `border-warning`

```tsx
<div className={cn('border-warning')}>
Hello world
</div>
```

#### `border-neutral-active`

```tsx
<div className={cn('border-neutral-active')}>
Hello world
</div>
```

#### `border-neutral-hover`

```tsx
<div className={cn('border-neutral-hover')}>
Hello world
</div>
```

#### `border-neutral-default`

```tsx
<div className={cn('border-neutral-default')}>
Hello world
</div>
```

#### `border-neutral-disabled`

```tsx
<div className={cn('border-neutral-disabled')}>
Hello world
</div>
```

#### `border-neutral-softest`

```tsx
<div className={cn('border-neutral-softest')}>
Hello world
</div>
```

#### `border-neutral-inset`

```tsx
<div className={cn('border-neutral-inset')}>
Hello world
</div>
```

#### `border-neutral-alpha`

```tsx
<div className={cn('border-neutral-alpha')}>
Hello world
</div>
```

#### `border-destructive-highlight`

```tsx
<div className={cn('border-destructive-highlight')}>
Hello world
</div>
```

#### `border-destructive-default`

```tsx
<div className={cn('border-destructive-default')}>
Hello world
</div>
```

#### `border-destructive-muted`

```tsx
<div className={cn('border-destructive-muted')}>
Hello world
</div>
```

#### `border-destructive-softest`

```tsx
<div className={cn('border-destructive-softest')}>
Hello world
</div>
```

#### `border-information-highlight`

```tsx
<div className={cn('border-information-highlight')}>
Hello world
</div>
```

#### `border-information-default`

```tsx
<div className={cn('border-information-default')}>
Hello world
</div>
```

#### `border-information-muted`

```tsx
<div className={cn('border-information-muted')}>
Hello world
</div>
```

#### `border-information-softest`

```tsx
<div className={cn('border-information-softest')}>
Hello world
</div>
```

#### `border-success-highlight`

```tsx
<div className={cn('border-success-highlight')}>
Hello world
</div>
```

#### `border-success-default`

```tsx
<div className={cn('border-success-default')}>
Hello world
</div>
```

#### `border-success-muted`

```tsx
<div className={cn('border-success-muted')}>
Hello world
</div>
```

#### `border-success-softest`

```tsx
<div className={cn('border-success-softest')}>
Hello world
</div>
```

#### `border-warning-highlight`

```tsx
<div className={cn('border-warning-highlight')}>
Hello world
</div>
```

#### `border-warning-default`

```tsx
<div className={cn('border-warning-default')}>
Hello world
</div>
```

#### `border-warning-muted`

```tsx
<div className={cn('border-warning-muted')}>
Hello world
</div>
```

#### `border-warning-softest`

```tsx
<div className={cn('border-warning-softest')}>
Hello world
</div>
```

#### `border-focus`

```tsx
<div className={cn('border-focus')}>
Hello world
</div>
```

### Other Utilities

#### `container`

```tsx
<div className={cn('container')}>
Hello world
</div>
```

#### `underline-link-primary`

```tsx
<div className={cn('underline-link-primary')}>
Hello world
</div>
```

#### `underline-link-secondary`

```tsx
<div className={cn('underline-link-secondary')}>
Hello world
</div>
```

#### `underline-link-visited`

```tsx
<div className={cn('underline-link-visited')}>
Hello world
</div>
```

#### `fill-neutral-highlight`

```tsx
<div className={cn('fill-neutral-highlight')}>
Hello world
</div>
```

#### `fill-neutral-active`

```tsx
<div className={cn('fill-neutral-active')}>
Hello world
</div>
```

#### `fill-neutral-default`

```tsx
<div className={cn('fill-neutral-default')}>
Hello world
</div>
```

#### `fill-neutral-muted`

```tsx
<div className={cn('fill-neutral-muted')}>
Hello world
</div>
```

#### `fill-neutral-highlight-fixed-dark`

```tsx
<div className={cn('fill-neutral-highlight-fixed-dark')}>
Hello world
</div>
```

#### `fill-neutral-default-fixed-dark`

```tsx
<div className={cn('fill-neutral-default-fixed-dark')}>
Hello world
</div>
```

#### `fill-neutral-muted-fixed-dark`

```tsx
<div className={cn('fill-neutral-muted-fixed-dark')}>
Hello world
</div>
```

#### `fill-neutral-highlight-fixed-light`

```tsx
<div className={cn('fill-neutral-highlight-fixed-light')}>
Hello world
</div>
```

#### `fill-neutral-default-fixed-light`

```tsx
<div className={cn('fill-neutral-default-fixed-light')}>
Hello world
</div>
```

#### `fill-neutral-muted-fixed-light`

```tsx
<div className={cn('fill-neutral-muted-fixed-light')}>
Hello world
</div>
```

#### `fill-neutral-highlight-inverse`

```tsx
<div className={cn('fill-neutral-highlight-inverse')}>
Hello world
</div>
```

#### `fill-neutral-default-inverse`

```tsx
<div className={cn('fill-neutral-default-inverse')}>
Hello world
</div>
```

#### `fill-neutral-muted-inverse`

```tsx
<div className={cn('fill-neutral-muted-inverse')}>
Hello world
</div>
```

#### `fill-link-primary`

```tsx
<div className={cn('fill-link-primary')}>
Hello world
</div>
```

#### `fill-link-secondary`

```tsx
<div className={cn('fill-link-secondary')}>
Hello world
</div>
```

#### `fill-link-visited`

```tsx
<div className={cn('fill-link-visited')}>
Hello world
</div>
```

#### `fill-destructive-highlight`

```tsx
<div className={cn('fill-destructive-highlight')}>
Hello world
</div>
```

#### `fill-destructive-default`

```tsx
<div className={cn('fill-destructive-default')}>
Hello world
</div>
```

#### `fill-destructive-muted`

```tsx
<div className={cn('fill-destructive-muted')}>
Hello world
</div>
```

#### `fill-information-highlight`

```tsx
<div className={cn('fill-information-highlight')}>
Hello world
</div>
```

#### `fill-information-default`

```tsx
<div className={cn('fill-information-default')}>
Hello world
</div>
```

#### `fill-information-muted`

```tsx
<div className={cn('fill-information-muted')}>
Hello world
</div>
```

#### `fill-success-highlight`

```tsx
<div className={cn('fill-success-highlight')}>
Hello world
</div>
```

#### `fill-success-default`

```tsx
<div className={cn('fill-success-default')}>
Hello world
</div>
```

#### `fill-success-muted`

```tsx
<div className={cn('fill-success-muted')}>
Hello world
</div>
```

#### `fill-warning-highlight`

```tsx
<div className={cn('fill-warning-highlight')}>
Hello world
</div>
```

#### `fill-warning-default`

```tsx
<div className={cn('fill-warning-default')}>
Hello world
</div>
```

#### `fill-warning-muted`

```tsx
<div className={cn('fill-warning-muted')}>
Hello world
</div>
```

#### `stroke-neutral-highlight`

```tsx
<div className={cn('stroke-neutral-highlight')}>
Hello world
</div>
```

#### `stroke-neutral-active`

```tsx
<div className={cn('stroke-neutral-active')}>
Hello world
</div>
```

#### `stroke-neutral-default`

```tsx
<div className={cn('stroke-neutral-default')}>
Hello world
</div>
```

#### `stroke-neutral-muted`

```tsx
<div className={cn('stroke-neutral-muted')}>
Hello world
</div>
```

#### `stroke-neutral-highlight-fixed-dark`

```tsx
<div className={cn('stroke-neutral-highlight-fixed-dark')}>
Hello world
</div>
```

#### `stroke-neutral-default-fixed-dark`

```tsx
<div className={cn('stroke-neutral-default-fixed-dark')}>
Hello world
</div>
```

#### `stroke-neutral-muted-fixed-dark`

```tsx
<div className={cn('stroke-neutral-muted-fixed-dark')}>
Hello world
</div>
```

#### `stroke-neutral-highlight-fixed-light`

```tsx
<div className={cn('stroke-neutral-highlight-fixed-light')}>
Hello world
</div>
```

#### `stroke-neutral-default-fixed-light`

```tsx
<div className={cn('stroke-neutral-default-fixed-light')}>
Hello world
</div>
```

#### `stroke-neutral-muted-fixed-light`

```tsx
<div className={cn('stroke-neutral-muted-fixed-light')}>
Hello world
</div>
```

#### `stroke-neutral-highlight-inverse`

```tsx
<div className={cn('stroke-neutral-highlight-inverse')}>
Hello world
</div>
```

#### `stroke-neutral-default-inverse`

```tsx
<div className={cn('stroke-neutral-default-inverse')}>
Hello world
</div>
```

#### `stroke-neutral-muted-inverse`

```tsx
<div className={cn('stroke-neutral-muted-inverse')}>
Hello world
</div>
```

#### `stroke-link-primary`

```tsx
<div className={cn('stroke-link-primary')}>
Hello world
</div>
```

#### `stroke-link-secondary`

```tsx
<div className={cn('stroke-link-secondary')}>
Hello world
</div>
```

#### `stroke-link-visited`

```tsx
<div className={cn('stroke-link-visited')}>
Hello world
</div>
```

#### `stroke-destructive-highlight`

```tsx
<div className={cn('stroke-destructive-highlight')}>
Hello world
</div>
```

#### `stroke-destructive-default`

```tsx
<div className={cn('stroke-destructive-default')}>
Hello world
</div>
```

#### `stroke-destructive-muted`

```tsx
<div className={cn('stroke-destructive-muted')}>
Hello world
</div>
```

#### `stroke-information-highlight`

```tsx
<div className={cn('stroke-information-highlight')}>
Hello world
</div>
```

#### `stroke-information-default`

```tsx
<div className={cn('stroke-information-default')}>
Hello world
</div>
```

#### `stroke-information-muted`

```tsx
<div className={cn('stroke-information-muted')}>
Hello world
</div>
```

#### `stroke-success-highlight`

```tsx
<div className={cn('stroke-success-highlight')}>
Hello world
</div>
```

#### `stroke-success-default`

```tsx
<div className={cn('stroke-success-default')}>
Hello world
</div>
```

#### `stroke-success-muted`

```tsx
<div className={cn('stroke-success-muted')}>
Hello world
</div>
```

#### `stroke-warning-highlight`

```tsx
<div className={cn('stroke-warning-highlight')}>
Hello world
</div>
```

#### `stroke-warning-default`

```tsx
<div className={cn('stroke-warning-default')}>
Hello world
</div>
```

#### `stroke-warning-muted`

```tsx
<div className={cn('stroke-warning-muted')}>
Hello world
</div>
```

## Migration Notes

- **Shadcn components**: Currently using deprecated tokens, will need updates
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
