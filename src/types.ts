import { Range } from '@/lib/typeUtils'

// Generic
export type Orientation = 'horizontal' | 'vertical'

// Breakpoints
export type Breakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ResponsiveValue<T> = T | { [key in Breakpoints]?: T }

// Gap
export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

// Grid Columns
export const maxGridColumns = 12
export type Columns = Exclude<Range<typeof maxGridColumns>, 0>
