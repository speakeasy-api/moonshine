import { Range } from '@/lib/typeUtils'

// Button variants
export const buttonVariants = [
  'default',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
] as const
export type ButtonVariant = (typeof buttonVariants)[number]

// Button sizes
export const buttonSizes = ['default', 'sm', 'lg', 'icon'] as const
export type ButtonSize = (typeof buttonSizes)[number]

// Generic
export type Orientation = 'horizontal' | 'vertical'

export const sizes = ['small', 'medium', 'large', 'xl', '2xl'] as const
export type Size = (typeof sizes)[number]

// Breakpoints
export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type Breakpoint = (typeof breakpoints)[number]
export type ResponsiveValue<T> = T | { [key in Breakpoint]?: T }

// Stack
export const directionOptions = ['row', 'column'] as const
export type Direction = (typeof directionOptions)[number]

// Gap
export type Gap = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

// Grid Columns
export const maxGridColumns = 12
export type Columns = Exclude<Range<typeof maxGridColumns>, 0>

// Padding
export const paddingValues = [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const
export type PaddingValue = (typeof paddingValues)[number]

export type PaddingPerAxis = { x?: PaddingValue; y?: PaddingValue }
export type PaddingPerSides = {
  top?: PaddingValue
  right?: PaddingValue
  bottom?: PaddingValue
  left?: PaddingValue
}

export type PaddingPerSide =
  /**
   * x, y
   */
  | PaddingPerAxis
  /**
   * top, right, bottom, left
   */
  | PaddingPerSides

export type Padding = PaddingValue | PaddingPerSide

export const alignmentOptions = [
  'start',
  'center',
  'end',
  'stretch',
  'baseline',
] as const
/**
 * Alignment is an abstraction / amalgamation of the CSS `justify-content`
 * and `align-items` properties.
 */
export type Alignment = (typeof alignmentOptions)[number]

export const justifyOptions = [
  'start',
  'center',
  'end',
  'spaceBetween',
  'spaceAround',
  'spaceEvenly',
] as const

export type Justify = (typeof justifyOptions)[number]

export const supportedLanguages = [
  'typescript',
  'go',
  'java',
  'python',
  'csharp',
  'terraform',
  'unity',
  'php',
  'swift',
  'ruby',
  'postman',
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}
