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