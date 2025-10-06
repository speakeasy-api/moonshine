export const variants = [
  'default',
  'success',
  'error',
  'warning',
  'info',
  'brand',
] as const
export type Variant = (typeof variants)[number]

export const modifiers = ['inline'] as const
export type Modifier = (typeof modifiers)[number]
