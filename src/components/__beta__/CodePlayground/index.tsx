import { HighlightedCode, Pre, RawCode, highlight } from 'codehike/code'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import { prettyLanguageName, SupportedLanguage } from '@/types'
import { lineNumbers } from './lineNumbers'
import { tokenTransitions } from './tokenTransitions'
import './index.css'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/Icon'

interface CodePlaygroundChildrenProps {
  selectedLang: SupportedLanguage
  selectedCode: string
}

interface CodePlaygroundProps {
  /**
   * An array of snippets to display in the playground.
   */
  snippets: Map<SupportedLanguage, string>
  /**
   * A heading to display above the playground.
   */
  heading?:
    | React.ReactNode
    | ((props: CodePlaygroundChildrenProps) => React.ReactNode)
  /**
   * A footer to display below the playground.
   */
  footer?:
    | React.ReactNode
    | ((props: CodePlaygroundChildrenProps) => React.ReactNode)
  /**
   * Whether the code should be copyable.
   */
  copyable?: boolean

  /** Custom class name to apply to the container */
  className?: string
}

async function highlightCode(code: string, language: SupportedLanguage) {
  const rawCode: RawCode = {
    value: code,
    lang: language,
    meta: '',
  }
  return highlight(rawCode, 'github-from-css')
}

export function CodePlayground({
  snippets,
  heading,
  footer,
  copyable = true,
  className,
}: CodePlaygroundProps) {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    snippets.keys().next().value
  )
  const selectedCode = useMemo<string>(
    () => snippets.get(selectedLang)!,
    [selectedLang, snippets]
  )
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)

  const updateHighlighted = useCallback(
    async (code: string, language: SupportedLanguage) => {
      const highlighted = await highlightCode(code, language)
      setHighlighted(highlighted)
    },
    []
  )

  const [copying, setCopying] = useState(false)

  const handleCopy = useCallback(() => {
    setCopying(true)
    setTimeout(() => {
      setCopying(false)
    }, 1000)
  }, [])

  const maxHeight = useMemo(() => {
    const largestLines = Math.max(
      ...Array.from(snippets.values()).map((code) => code.split('\n').length)
    )
    const lineHeight = 24
    const padding = 12
    return largestLines * lineHeight + padding * 2
  }, [snippets])

  useEffect(() => {
    updateHighlighted(selectedCode, selectedLang)
  }, [selectedCode, selectedLang])

  useEffect(() => {
    updateHighlighted(selectedCode, selectedLang)
  }, [selectedLang])

  if (!highlighted) return null

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border shadow-md shadow-white/5',
        className
      )}
    >
      <div className="bg-card flex items-center border-b p-2">
        <div className="select-none">
          {typeof heading === 'function'
            ? heading({ selectedLang, selectedCode })
            : heading}
        </div>
        <div className="ml-auto">
          <Select
            value={selectedLang}
            onValueChange={(value) =>
              setSelectedLang(value as SupportedLanguage)
            }
          >
            <SelectTrigger className="text-muted select-none gap-1.5 !border-none !bg-transparent !p-0 leading-none !shadow-none !ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" alignOffset={-30}>
              {Array.from(snippets.keys()).map((language) => (
                <SelectItem key={language} value={language}>
                  {prettyLanguageName(language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-background relative">
        <Pre
          code={highlighted}
          handlers={[lineNumbers, tokenTransitions]}
          className="bg-muted/15 dark:bg-background m-0 px-4 py-3 text-sm"
          style={{ height: `${maxHeight}px` }}
        />

        {copyable && (
          <div className="absolute right-4 top-4">
            <button
              role="button"
              className={cn(
                'relative ml-2 border-none bg-transparent outline-none'
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
                    className="text-green-500"
                    exit="hidden"
                  >
                    <Icon name="check" stroke="currentColor" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    variants={copyIconVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-muted hover:text-foreground"
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

      {footer && (
        <div className="bg-card flex select-none items-center border-t p-2">
          {typeof footer === 'function'
            ? footer({ selectedLang, selectedCode })
            : footer}
        </div>
      )}
    </div>
  )
}

const copyIconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}
