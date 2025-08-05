import { assertNever } from './lib/assert'

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
export const gapValues = [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const
export type Gap = (typeof gapValues)[number]

// Grid Columns
export const gridColumnValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export type Columns = (typeof gridColumnValues)[number]

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
  'json',
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export function isSupportedLanguage(
  language: string
): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage)
}

export function prettyLanguageName(language: SupportedLanguage) {
  switch (language) {
    case 'typescript':
      return 'TypeScript'
    case 'go':
      return 'Go'
    case 'ruby':
      return 'Ruby'
    case 'python':
      return 'Python'
    case 'csharp':
      return 'C#'
    case 'php':
      return 'PHP'
    case 'java':
      return 'Java'
    case 'swift':
      return 'Swift'
    case 'postman':
      return 'Postman'
    case 'terraform':
      return 'Terraform'
    case 'unity':
      return 'Unity'
    case 'json':
      return 'JSON'
    default:
      assertNever(language)
  }
}

export type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

export const wrapOptions = ['nowrap', 'wrap', 'wrap-reverse'] as const
export type Wrap = (typeof wrapOptions)[number]

export const programmingLanguages = [
  'javascript',
  'typescript',
  'python',
  'bash',
  'json',
  'go',
  'dotnet',
  'java',
] as const
export type ProgrammingLanguage = (typeof programmingLanguages)[number]

export function isProgrammingLanguage(
  language: string
): language is ProgrammingLanguage {
  return programmingLanguages.includes(language as ProgrammingLanguage)
}

// Workspace selector - shared by Navbar and WorkspaceSelector
export interface Org {
  id: string
  label: string
  slug: string
  workspaces: Workspace[]
}

export interface Workspace {
  id: string
  slug: string
  label: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GlobalWorkspaceSelectorProps {
  orgs: Org[]
  value?: string
  onSelect: (org: Org, workspace: Workspace) => void
}
