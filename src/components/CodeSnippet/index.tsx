import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ProgrammingLanguage, Size } from '@/types'
import useTailwindTheme from '@/hooks/useTailwindTheme'
import { AnnotationHandler, HighlightedCode, Pre } from 'codehike/code'
import { AnimatePresence, motion } from 'framer-motion'
import '@/styles/codeSyntax.css'
import './codeSnippet.css'
import { Icon } from '../Icon'
import { useConfig } from '@/hooks/useConfig'
import { highlightCode, getCodeHandlers } from '@/lib/codeUtils'

export interface CodeSnippetProps {
  /**
   * The code to display.
   */
  code: string
  /**
   * Whether to show a copy button.
   */
  copyable?: boolean
  /**
   * One of the known Speakeasy target languages, or a language that Codehike supports.
   * The full list of supported languages is available at https://codehike.org/docs/concepts/code#languages
   */
  language: ProgrammingLanguage | string
  /**
   * The symbol to display before the code.
   */
  promptSymbol?: React.ReactNode
  /**
   * Whether to display the code snippet inline.
   */
  inline?: boolean
  /**
   * The font size of the code snippet.
   */
  fontSize?: Size
  /**
   * Whether to show line numbers.
   */
  showLineNumbers?: boolean
  /**
   * The callback to call when the code is selected or copied.
   */
  onSelectOrCopy?: () => void
  /**
   * Whether to shimmer the code snippet.
   */
  shimmer?: boolean
  /**
   * Additional CSS classes to apply to the code snippet.
   */
  className?: string
  /**
   * Custom annotation handlers to be added to the default handlers.
   */
  customHandlers?: AnnotationHandler[]
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

export function CodeSnippet({
  code,
  copyable = false,
  language,
  promptSymbol,
  inline = false,
  fontSize = 'medium',
  onSelectOrCopy,
  shimmer = false,
  className,
  showLineNumbers = false,
  customHandlers = [],
}: CodeSnippetProps) {
  const [copying, setCopying] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width
        // Only update if we have a non-zero width
        if (width > 0) {
          setContainerWidth(width)
        }
      }
    }

    // Initial measurement
    updateWidth()

    // Create ResizeObserver for more reliable width tracking
    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const [highlightedCodeState, setHighlightedCodeState] = useState<
    HighlightedCode | undefined
  >(undefined)
  const isMultiline = code.split('\n').length > 1
  const { themeElement } = useConfig()
  const theme = useTailwindTheme(themeElement)

  // Get the code handlers for line numbers and animations, then add custom handlers
  const preHandlers = useMemo<AnnotationHandler[]>(() => {
    const defaultHandlers = getCodeHandlers(showLineNumbers, true)
    return [...defaultHandlers, ...customHandlers]
  }, [showLineNumbers, customHandlers])

  // Directly highlight the code when code or language changes
  useEffect(() => {
    if (!language) return

    // Use the highlightCode utility directly
    highlightCode(code, language).then((highlighted) => {
      setHighlightedCodeState(highlighted)
    })
  }, [code, language])

  const handleCopy = useCallback(() => {
    setCopying(true)
    navigator.clipboard.writeText(highlightedCodeState?.code ?? code)
    setTimeout(() => {
      setCopying(false)
      onSelectOrCopy?.()
    }, 1000)
  }, [highlightedCodeState?.code, code])

  const handleBeforeInput = (event: React.KeyboardEvent<HTMLPreElement>) =>
    event.preventDefault()

  return (
    <div
      data-theme={theme}
      className={cn(
        'border-muted snippet bg-card relative box-border flex w-full overflow-hidden rounded-lg border',
        inline && 'inline-flex',
        shimmer && 'shimmer',
        className
      )}
      style={{ '--width': `${containerWidth}px` } as React.CSSProperties}
      ref={containerRef}
    >
      <div className="snippet-inner bg-card flex w-full flex-row gap-2 rounded-lg p-4">
        {language === 'bash' && (
          <div className="text-body select-none self-center font-mono font-light">
            {promptSymbol ?? '$'}
          </div>
        )}
        {highlightedCodeState && (
          <Pre
            code={highlightedCodeState}
            onClick={onSelectOrCopy}
            className={cn(
              'highlighted-code inline-flex w-fit self-center font-mono outline-none',
              fontSizeMap[fontSize],
              isMultiline && 'min-w-32'
            )}
            onBeforeInput={handleBeforeInput}
            handlers={preHandlers}
          />
        )}

        {copyable && (
          <div
            className={cn(
              'ml-auto mr-1 flex self-center text-white',
              isMultiline && 'mt-1 h-4 w-6 self-start'
            )}
          >
            <button
              role="button"
              className="relative ml-2 border-none bg-transparent outline-none"
              onClick={handleCopy}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copying ? (
                  <motion.span
                    key="checkmark"
                    variants={copyIconVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-green-500"
                  >
                    <Icon name="check" stroke="currentColor" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    variants={copyIconVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-body-muted hover:text-body"
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
