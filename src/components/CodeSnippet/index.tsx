import { Button, Icon } from '@/index'
import { useCallback, useEffect, useRef, useState } from 'react'
import { highlightText, ShjLanguage } from '@speed-highlight/core'
import '@speed-highlight/core/themes/dark.css'
import { cn } from '@/lib/utils'

type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'bash'
  | 'json'
  | 'go'
  | 'dotnet'
  | 'java'

interface CodeSnippetProps {
  code: string
  copyable?: boolean
  language: ProgrammingLanguage
  promptSymbol?: React.ReactNode
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
    <div className="inline-flex flex-row items-start rounded-lg bg-zinc-900 p-2">
      {language === 'bash' && (
        <div className="text-muted-foreground ml-1 mr-0.5 self-center font-mono font-light">
          {promptSymbol ?? '$'}
        </div>
      )}
      <pre
        ref={codeRef}
        onBeforeInput={handleBeforeInput}
        className={cn(
          '!my-0 self-center !bg-transparent !py-0 px-2 font-mono !text-sm font-normal text-white outline-none',
          highlighted && 'selection:bg-zinc-800'
        )}
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
      ></pre>
      {copyable && (
        <div className="ml-1">
          <Button
            role="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
          >
            {copied ? (
              <Icon fill="green" name="circle-check-big" />
            ) : (
              <Icon name="copy" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
