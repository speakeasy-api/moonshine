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
  const rawCode: RawCode = {
    value: code,
    lang: isProgrammingLanguage(language)
      ? getMappedLanguage(language)
      : language,
    meta: '',
  }
  return highlight(rawCode, CODEHIKE_THEME)
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
function isProgrammingLanguage(
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
