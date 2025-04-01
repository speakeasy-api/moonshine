import { describe, it, expect } from 'vitest'
import {
  removeCodeHikeAnnotations,
  highlightCode,
  getCodeHandlers,
  getMappedLanguage,
  isProgrammingLanguage,
  CODEHIKE_THEME,
} from './codeUtils'
import { ProgrammingLanguage } from '@/types'

describe('codeUtils', () => {
  describe('removeCodeHikeAnnotations', () => {
    it('should remove CodeHike annotations and their empty lines', () => {
      const input = `# !focus(1:3)
console.log("Hello")

# !callout
# This is a comment
const x = 1

# !hover
function test() {
  return true
}`

      const expected = `console.log("Hello")

# This is a comment
const x = 1

function test() {
  return true
}`

      expect(removeCodeHikeAnnotations(input)).toBe(expected)
    })

    it('should handle annotations with parameters', () => {
      const input = `# !focus(5:8)
console.log("Test")

# !callout(title="Note")
# Important comment
const x = 1`

      const expected = `console.log("Test")

# Important comment
const x = 1`

      expect(removeCodeHikeAnnotations(input)).toBe(expected)
    })

    it('should preserve regular comments', () => {
      const input = `# Regular comment
# !focus
console.log("Test")

# Another comment
const x = 1`

      const expected = `# Regular comment
console.log("Test")

# Another comment
const x = 1`

      expect(removeCodeHikeAnnotations(input)).toBe(expected)
    })

    it('should handle empty input', () => {
      expect(removeCodeHikeAnnotations('')).toBe('')
    })

    it('should handle input with only newlines', () => {
      expect(removeCodeHikeAnnotations('\n\n\n')).toBe('\n\n\n')
    })

    it('should handle empty lines after annotations', () => {
      const input = `# !focus
console.log("Test")

# !callout
# Important comment
const x = 1`

      const expected = `console.log("Test")

# Important comment
const x = 1`

      expect(removeCodeHikeAnnotations(input)).toBe(expected)
    })
  })

  describe('highlightCode', () => {
    it('should highlight code with supported language', async () => {
      const result = await highlightCode('console.log("test")', 'typescript')
      expect(result).toHaveProperty('value')
    })

    it('should handle unsupported language', async () => {
      const result = await highlightCode('console.log("test")', 'unsupported')
      expect(result).toHaveProperty('value')
    })
  })

  describe('getCodeHandlers', () => {
    it('should return only transitions by default', () => {
      const handlers = getCodeHandlers()
      expect(handlers).toHaveLength(1)
      expect(handlers[0]).toBeDefined()
    })

    it('should include line numbers and transitions when line numbers are enabled', () => {
      const handlers = getCodeHandlers(true)
      expect(handlers).toHaveLength(2)
      expect(handlers[0]).toBeDefined()
      expect(handlers[1]).toBeDefined()
    })

    it('should include only transitions when transitions are enabled', () => {
      const handlers = getCodeHandlers(false, true)
      expect(handlers).toHaveLength(1)
      expect(handlers[0]).toBeDefined()
    })
  })

  describe('getMappedLanguage', () => {
    it('should map supported languages correctly', () => {
      const mappings = {
        javascript: 'js',
        typescript: 'ts',
        python: 'py',
        bash: 'bash',
        json: 'json',
        go: 'go',
        dotnet: 'c#',
        java: 'java',
      } as const

      Object.entries(mappings).forEach(([lang, expected]) => {
        expect(getMappedLanguage(lang as ProgrammingLanguage)).toBe(expected)
      })
    })

    it('should return original language if not mapped', () => {
      expect(getMappedLanguage('unknown' as ProgrammingLanguage)).toBe(
        'unknown'
      )
    })
  })

  describe('isProgrammingLanguage', () => {
    it('should identify supported languages', () => {
      const supported = [
        'javascript',
        'typescript',
        'python',
        'bash',
        'json',
        'go',
        'dotnet',
        'java',
      ] as const

      supported.forEach((lang) => {
        expect(isProgrammingLanguage(lang)).toBe(true)
      })
    })

    it('should reject unsupported languages', () => {
      const unsupported = ['html', 'css', 'sql', 'unknown']
      unsupported.forEach((lang) => {
        expect(isProgrammingLanguage(lang)).toBe(false)
      })
    })
  })

  describe('CODEHIKE_THEME', () => {
    it('should have the correct theme value', () => {
      expect(CODEHIKE_THEME).toBe('github-from-css')
    })
  })
})
