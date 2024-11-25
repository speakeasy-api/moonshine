import { Icon } from '@/components/Icon'
import { useCallback, useEffect, useRef, useState } from 'react'
import { highlightText, ShjLanguage } from '@speed-highlight/core'
import { cn } from '@/lib/utils'
import { ProgrammingLanguage, Size } from '@/types'
import useTailwindTheme from '@/hooks/useTailwindTheme'

type Theme = 'dark' | 'light'

interface CodeSnippetProps {
  code: string
  copyable?: boolean
  language: ProgrammingLanguage
  promptSymbol?: React.ReactNode
  inline?: boolean
  fontSize?: Size
  minWidth?: string
  theme?: Theme
}

const fontSizeMap: Record<Size, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
}

function getLanguage(language: ProgrammingLanguage): ShjLanguage | undefined {
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
      return 'c'
    case 'java':
      return 'java'
  }
}

export function CodeSnippet({
  code,
  copyable = false,
  language,
  promptSymbol,
  inline = false,
  fontSize = 'medium',
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState(code)
  const isMultiline = code.split('\n').length > 1
  const theme = useTailwindTheme()

  useEffect(() => {
    if (theme === 'dark') {
      import('@speed-highlight/core/themes/dark.css')
    } else {
      import('@speed-highlight/core/themes/github-light.css')
    }
  }, [theme])
  const codeRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    const highlight = async () => {
      if (codeRef.current) {
        const lang = getLanguage(language)
        if (lang) {
          const highlightedCode = await highlightText(code, lang, false)
          setHighlightedCode(highlightedCode)
          setHighlighted(true)
        }
      }
    }
    highlight()
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)

    if (codeRef.current) {
      codeRef.current.focus()
      const range = document.createRange()

      range.selectNodeContents(codeRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }

    setTimeout(() => {
      setCopied(false)
      setHighlighted(false)
      const selection = window.getSelection()
      selection?.removeAllRanges()
    }, 1000)
  }, [code])

  const handleBeforeInput = (event: React.KeyboardEvent<HTMLPreElement>) =>
    event.preventDefault()

  return (
    <div
      data-theme={theme}
      className={cn(
        'flex w-full flex-row items-start rounded-lg border border-neutral-200/5 p-4',
        inline && 'inline-flex',
        theme === 'dark' && 'bg-zinc-900',
        theme === 'light' && 'bg-zinc-50'
      )}
    >
      {language === 'bash' && (
        <div className="ml-1 mr-0.5 self-center font-mono font-light">
          {promptSymbol ?? '$'}
        </div>
      )}
      <pre
        ref={codeRef}
        onBeforeInput={handleBeforeInput}
        className={cn(
          '!my-0 w-fit self-center !bg-transparent !py-0 px-3 font-mono outline-none',
          highlighted && theme === 'dark' && 'selection:bg-zinc-800',
          highlighted && theme === 'light' && 'selection:bg-zinc-200',
          fontSizeMap[fontSize]
        )}
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
      ></pre>

      {copyable && (
        <div
          className={cn(
            'ml-auto mr-2 flex self-center text-white',
            isMultiline && 'self-start'
          )}
        >
          <button
            role="button"
            className={cn(
              'relative ml-2 border-none bg-transparent',
              theme === 'dark' && 'text-white',
              theme === 'light' && 'text-black'
            )}
            onClick={handleCopy}
          >
            {copied ? (
              <Icon fill="green" name="circle-check-big" />
            ) : (
              <Icon name="copy" stroke="currentColor" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}
