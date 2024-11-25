import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { useCallback, useEffect, useRef, useState } from 'react'
import { highlightText, ShjLanguage } from '@speed-highlight/core'
import '@speed-highlight/core/themes/dark.css'
import { cn } from '@/lib/utils'
import { ProgrammingLanguage, Size } from '@/types'

interface CodeSnippetProps {
  code: string
  copyable?: boolean
  language: ProgrammingLanguage
  promptSymbol?: React.ReactNode
  inline?: boolean
  fontSize?: Size
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
      className={cn(
        'flex w-fit flex-row items-start rounded-lg bg-zinc-900 p-3',
        inline && 'inline-flex'
      )}
    >
      {language === 'bash' && (
        <div className="text-muted-foreground ml-1 mr-0.5 self-center font-mono font-light">
          {promptSymbol ?? '$'}
        </div>
      )}
      <pre
        ref={codeRef}
        onBeforeInput={handleBeforeInput}
        className={cn(
          '!my-0 w-fit self-center !bg-transparent !py-0 px-3 font-mono text-white outline-none',
          highlighted && 'selection:bg-zinc-800',
          fontSizeMap[fontSize]
        )}
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
      ></pre>

      {copyable && (
        <div className="ml-auto text-white">
          <Button
            role="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
          >
            {copied ? (
              <Icon fill="green" name="circle-check-big" />
            ) : (
              <Icon name="copy" stroke="currentColor" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
