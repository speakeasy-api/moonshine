import { highlight, AnnotationHandler, RawCode } from 'codehike/code'
import { ProgrammingLanguage, SupportedLanguage } from '@/types'
import { lineNumbers } from '@/components/CodePlayground/lineNumbers'
import { tokenTransitions } from '@/components/CodePlayground/tokenTransitions'

export const CODEHIKE_THEME = 'github-from-css' as const

/**
 * Highlights code using the standardized theme across the application
 */
export async function highlightCode(
  code: string,
  language: SupportedLanguage | string
) {
  // Clean the code by removing annotations
  const cleanCode = removeCodeHikeAnnotations(code)

  const rawCode: RawCode = {
    value: code, // Use original code for highlighting
    lang: isProgrammingLanguage(language)
      ? getMappedLanguage(language)
      : language,
    meta: '',
  }
  const highlighted = await highlight(rawCode, CODEHIKE_THEME)

  return {
    ...highlighted,
    code: cleanCode, // Return the clean code without annotations
  }
}

/**
 * Returns an array of handlers for code highlighting with consistent options
 */
export function getCodeHandlers(
  showLineNumbers = false,
  useTransitions = true
): AnnotationHandler[] {
  const handlers: AnnotationHandler[] = []

  if (showLineNumbers) {
    handlers.push(lineNumbers)
  }

  if (useTransitions) {
    handlers.push(tokenTransitions)
  }

  return handlers
}

/**
 * Maps language identifiers to their proper syntax highlighting aliases
 */
export function getMappedLanguage(
  language: ProgrammingLanguage | SupportedLanguage
): string {
  switch (language) {
    case 'javascript':
      return 'js'
    case 'typescript':
      return 'ts'
    case 'python':
      return 'py'
    case 'bash':
      return 'bash'
    case 'json':
      return 'json'
    case 'go':
      return 'go'
    case 'dotnet':
    case 'csharp':
      return 'c#'
    case 'java':
      return 'java'
    case 'ruby':
      return 'ruby'
    case 'php':
      return 'php'
    case 'swift':
      return 'swift'
    case 'terraform':
      return 'hcl'
    default:
      return language as string
  }
}

/**
 * Helper to check if a language is in our supported set
 */
export function isProgrammingLanguage(
  language: string
): language is ProgrammingLanguage {
  return [
    'javascript',
    'typescript',
    'python',
    'bash',
    'json',
    'go',
    'dotnet',
    'csharp',
    'java',
    'ruby',
    'php',
    'swift',
    'terraform',
  ].includes(language)
}

const ANNOTATION_TYPES = [
  'callout',
  'className',
  'hover',
  'collapse',
  'diff',
  'focus',
  'fold',
  'link',
  'mark',
  'tooltip',
]

const ANNOTATION_REGEX = new RegExp(
  `^\\s*#\\s*!(${ANNOTATION_TYPES.join('|')})(\\s*$begin:math:text$[^)]*\\$end:math:text$)?.*$`
)

/**
 * Removes CodeHike annotations from the code
 * Useful for copying code / excluding annotations from clipboard
 * @param code - The code string containing CodeHike annotations
 * @returns Clean code string without annotations
 */
export function removeCodeHikeAnnotations(code: string): string {
  const lines = code.split('\n')
  const result: string[] = []
  let skipEmpty = false

  for (const line of lines) {
    if (ANNOTATION_REGEX.test(line)) {
      skipEmpty = true
      continue
    }

    if (line.trim() === '' && skipEmpty) {
      skipEmpty = false
      continue
    }

    result.push(line)
    skipEmpty = false
  }

  return result.join('\n')
}
