import { useCallback, useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ProgrammingLanguage, Size } from '@/types'
import useTailwindTheme from '@/hooks/useTailwindTheme'
import { highlight, HighlightedCode, Pre, RawCode } from 'codehike/code'
import { AnimatePresence, motion } from 'framer-motion'
import './codeSnippet.css'
import { Icon } from '../Icon'
import { useConfig } from '@/hooks/useConfig'

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
  onSelectOrCopy?: () => void
}

const fontSizeMap: Record<Size, string> = {
  small: 'text-sm',
  medium: 'text-sm',
  large: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
}

const copyIconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}

function getLanguage(language: ProgrammingLanguage): string {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
const codehikeThemeNames = [
  'dark-plus',
  'dracula-soft',
  'dracula',
  'github-dark',
  'github-dark-dimmed',
  'github-from-css',
  'github-light',
  'light-plus',
  'material-darker',
  'material-default',
  'material-from-css',
  'material-lighter',
  'material-ocean',
  'material-palenight',
  'min-dark',
  'min-light',
  'monokai',
  'nord',
  'one-dark-pro',
  'poimandres',
  'slack-dark',
  'slack-ochin',
  'solarized-dark',
  'solarized-light',
] as const

type CodehikeTheme = (typeof codehikeThemeNames)[number]

export function CodeSnippet({
  code,
  copyable = false,
  language,
  promptSymbol,
  inline = false,
  fontSize = 'medium',
  onSelectOrCopy,
}: CodeSnippetProps) {
  const [copying, setCopying] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [highlightedCodeState, setHighlightedCodeState] = useState<
    HighlightedCode | undefined
  >(undefined)
  const isMultiline = code.split('\n').length > 1
  const { themeElement } = useConfig()
  const theme = useTailwindTheme(themeElement)

  const codehikeTheme = useMemo<CodehikeTheme>(() => {
    if (theme === 'light') return 'solarized-light'
    return 'nord'
  }, [theme])

  useEffect(() => {
    if (!language) return
    async function highlightCode() {
      const rawCode: RawCode = {
        value: code,
        lang: getLanguage(language),
        meta: '',
      }
      const highlighted = await highlight(rawCode, codehikeTheme)
      setHighlightedCodeState(highlighted)
    }
    highlightCode()
  }, [code, language, codehikeTheme])

  const handleCopy = useCallback(() => {
    setCopying(true)
    setHighlighted(true)

    setTimeout(() => {
      navigator.clipboard.writeText(code)
      onSelectOrCopy?.()
      setTimeout(() => {
        setCopying(false)
        setHighlighted(false)
      }, 750)
    }, 750)
  }, [code])

  const handleBeforeInput = (event: React.KeyboardEvent<HTMLPreElement>) =>
    event.preventDefault()

  const bgColor = useMemo(() => {
    return theme === 'dark' ? 'bg-zinc-900' : 'bg-neutral-100'
  }, [highlighted, theme])

  return (
    <div
      data-theme={theme}
      className={cn(
        `border-muted snippet relative box-border flex w-full overflow-hidden rounded-lg border ${bgColor}`,
        inline && 'inline-flex',
        copying && 'copied'
      )}
      style={
        {
          '--gradient':
            theme === 'dark'
              ? 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(102, 102, 102, 0.4) 50%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0) 100%)',
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'snippet-inner flex w-full flex-row gap-2 rounded-lg p-4',
          bgColor
        )}
      >
        {language === 'bash' && (
          <div className="text-muted-foreground self-center font-mono font-light">
            {promptSymbol ?? '$'}
          </div>
        )}
        {highlightedCodeState && (
          <Pre
            code={highlightedCodeState}
            onClick={onSelectOrCopy}
            className={cn(
              'text-foreground highlighted-code inline-flex w-fit self-center font-mono outline-none',
              highlighted && theme === 'dark' && '!bg-zinc-500/40',
              highlighted && theme === 'light' && '!bg-zinc-200/40',
              fontSizeMap[fontSize],
              isMultiline && 'min-w-32'
            )}
            onBeforeInput={handleBeforeInput}
          />
        )}

        {copyable && (
          <div
            className={cn(
              'ml-auto mr-1 flex self-center text-white',
              isMultiline && 'mt-1 self-start'
            )}
          >
            <button
              role="button"
              className={cn(
                'relative ml-2 border-none bg-transparent outline-none',
                theme === 'dark' && 'text-white',
                theme === 'light' && 'text-black'
              )}
              onClick={handleCopy}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copying ? (
                  <motion.span
                    key="checkmark"
                    variants={copyIconVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-foreground"
                  >
                    <Icon name="check" stroke="currentColor" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    variants={copyIconVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-foreground"
                    exit="hidden"
                  >
                    <Icon name="copy" stroke="currentColor" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
