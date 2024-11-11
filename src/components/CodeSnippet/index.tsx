import { Button, Icon } from '@/index'
import { useEffect, useRef, useState } from 'react'
import {
  highlightElement,
  loadLanguage,
  ShjLanguage,
} from '@speed-highlight/core'
import '@speed-highlight/core/themes/dark.css'
type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'bash'
  | 'json'

interface CodeSnippetProps {
  code: string
  copyable?: boolean
  language: ProgrammingLanguage
}

function getLanguage(language: ProgrammingLanguage): ShjLanguage | undefined {
  switch (language) {
    case 'javascript':
      return 'js'
    case 'typescript':
      return 'ts'
    case 'python':
      return 'py'
  }
}

export function CodeSnippet({
  code,
  copyable = false,
  language,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const codeRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    if (codeRef.current) {
      highlightElement(codeRef.current, getLanguage(language) as ShjLanguage)
      loadLanguage(language, getLanguage(language) as ShjLanguage)
    }
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="inline-flex flex-row items-center rounded-lg bg-zinc-900 p-2">
      <pre
        ref={codeRef}
        className="text-foreground !my-0 !bg-transparent !py-0 px-2 font-mono !text-sm"
      >
        {code}
      </pre>
      {copyable && (
        <div className="ml-1">
          <Button variant="ghost" size="icon" onClick={handleCopy}>
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
