import { AnnotationHandler, HighlightedCode, Pre } from 'codehike/code'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Children,
  isValidElement,
  HTMLAttributes,
} from 'react'
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
import { Skeleton } from '@/components/Skeleton'
import { highlightCode } from './utils'
import React from 'react'

const copyIconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}
export interface CodePlaygroundSnippet {
  /**
   * The code to display in the playground.
   */
  code?: string | undefined
  /**
   * Whether the code is loading.
   */
  loading?: boolean | undefined
  /**
   * The error to display in the playground if the code could not be loaded.
   */
  error?: React.ReactNode | undefined
}

export type CodePlaygroundSnippets = Partial<
  Record<SupportedLanguage, CodePlaygroundSnippet>
>

export interface CodePlaygroundProps {
  /**
   * The children of the playground.
   * Accepts a `CodePlayground.Header` and a `CodePlayground.Footer` or a `CodePlayground.Code` component.
   */
  children: React.ReactNode

  /**
   * An array of snippets to display in the playground.
   */
  snippets: CodePlaygroundSnippets

  /**
   * Whether the code should be copyable.
   */
  copyable?: boolean

  /** Custom class name to apply to the container */
  className?: string

  /**
   * A callback to be called when the language is changed.
   */
  onChangeLanguage?: (language: SupportedLanguage) => void

  /**
   * Whether to animate the code when the language is changed.
   */
  animateOnLanguageChange?: boolean

  /**
   * Whether to show line numbers.
   */
  showLineNumbers?: boolean
}

const CodePlayground = ({
  children,
  snippets,
  copyable = true,
  className,
  onChangeLanguage,
  animateOnLanguageChange = true,
  showLineNumbers = true,
}: CodePlaygroundProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    const isValidSubType =
      type.displayName === 'CodePlayground.Header' ||
      type.displayName === 'CodePlayground.Footer' ||
      type.displayName === 'CodePlayground.Code'

    if (!isValidSubType) {
      console.warn(
        `Invalid child type: ${type.displayName}. Must be one of: CodePlayground.Header, CodePlayground.Footer`
      )
    }

    return isValidSubType
  })

  const header = validChildren.find(
    (child) =>
      isValidElement(child) &&
      (child.type as { displayName?: string }).displayName ===
        'CodePlayground.Header'
  )

  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    // @ts-expect-error ignore this
    Object.keys(snippets)[0]
  )
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)
  const selectedCode = useMemo<CodePlaygroundSnippet>(
    () => snippets[selectedLang]!,
    [selectedLang, snippets]
  )

  const preHandlers = useMemo(() => {
    const handlers: AnnotationHandler[] = []

    if (showLineNumbers) {
      handlers.push(lineNumbers)
    }

    if (animateOnLanguageChange) {
      handlers.push(tokenTransitions)
    }

    return handlers
  }, [animateOnLanguageChange, showLineNumbers])

  const codeContents = useMemo(() => {
    return selectedCode.loading ? (
      <div className="flex items-center p-4">
        <Skeleton>
          <div>
            {
              'export default function fakeFunctionThatWontBeDisplayedToTheUser() {'
            }
          </div>
          <div>
            {
              "const sampleCode2 = 'sample code 2'.filter(Boolean).repeat(34).map((c) => c.toUpperCase())"
            }
          </div>
          <div>
            {"const sampleCode3 = '3'.filter(Boolean).repeat(34).toUpperCase()"}
          </div>
          <div className="min-w-40">{`}`}</div>
        </Skeleton>
      </div>
    ) : selectedCode.error ? (
      selectedCode.error
    ) : highlighted ? (
      <Pre
        code={highlighted}
        handlers={preHandlers}
        className="bg-muted/15 dark:bg-background relative m-0 px-4 py-3 text-sm"
      />
    ) : null
  }, [selectedCode.loading, selectedCode.error, highlighted])

  const foundCustomCodeContainer = useMemo(
    () =>
      validChildren.find(
        (child) =>
          isValidElement(child) &&
          (child.type as { displayName?: string }).displayName ===
            'CodePlayground.Code'
      ),
    [validChildren]
  )

  const code = useMemo(
    () =>
      foundCustomCodeContainer ? (
        React.cloneElement(foundCustomCodeContainer as React.ReactElement, {
          __children__: codeContents,
        })
      ) : (
        <CodePlaygroundCode __children__={codeContents} />
      ),
    [foundCustomCodeContainer, codeContents]
  )
  const footer = useMemo(
    () =>
      validChildren.find(
        (child) =>
          isValidElement(child) &&
          (child.type as { displayName?: string }).displayName ===
            'CodePlayground.Footer'
      ),
    [validChildren]
  )

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

  useEffect(() => {
    if (selectedCode.code) {
      updateHighlighted(selectedCode.code, selectedLang)
    }
  }, [selectedCode, selectedLang])

  useEffect(() => {
    if (selectedCode.code) {
      updateHighlighted(selectedCode.code, selectedLang)
    }
  }, [selectedLang])

  const handleChangeLanguage = useCallback(
    (language: SupportedLanguage) => {
      setSelectedLang(language)
      onChangeLanguage?.(language)
    },
    [onChangeLanguage]
  )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border shadow-md shadow-white/5',
        className
      )}
    >
      <div className="bg-card flex items-center border-b p-2">
        <div className="select-none">{header && header}</div>
        <div className="ml-auto">
          <Select value={selectedLang} onValueChange={handleChangeLanguage}>
            <SelectTrigger className="text-muted select-none gap-1.5 !border-none !bg-transparent !p-0 leading-none !shadow-none !ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" alignOffset={-30}>
              {Object.keys(snippets).map((language) => (
                <SelectItem key={language} value={language}>
                  {prettyLanguageName(language as SupportedLanguage)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative">
        {code}

        {selectedCode.code && copyable && (
          <div className="pointer-events-auto absolute right-6 top-5 bg-transparent">
            <button
              role="button"
              className={cn('ml-2 border-none bg-transparent outline-none')}
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

      {footer && footer}
    </div>
  )
}

CodePlayground.displayName = 'CodePlayground'

export interface CodePlaygroundCodeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string

  /**
   * internal api for passing children
   */
  __children__?: React.ReactNode
}

const CodePlaygroundCode = ({
  className,
  __children__: children,
  ...props
}: CodePlaygroundCodeProps) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-background overflow-x-hidden overflow-y-scroll',
        className
      )}
    >
      {children}
    </div>
  )
}

CodePlaygroundCode.displayName = 'CodePlayground.Code'

export interface CodePlaygroundHeaderProps {
  children: React.ReactNode
}

const CodePlaygroundHeader = ({ children }: CodePlaygroundHeaderProps) => {
  return <div className="bg-card flex items-center">{children}</div>
}

CodePlaygroundHeader.displayName = 'CodePlayground.Header'

export interface CodePlaygroundFooterProps {
  children: React.ReactNode
}

const CodePlaygroundFooter = ({ children }: CodePlaygroundFooterProps) => {
  return (
    <div className="bg-card flex select-none items-center border-t p-2">
      {children}
    </div>
  )
}

CodePlaygroundFooter.displayName = 'CodePlayground.Footer'

const CodePlaygroundWithSubcomponents = Object.assign(CodePlayground, {
  Header: CodePlaygroundHeader,
  Footer: CodePlaygroundFooter,

  /**
   * Can be used to manipulate the properties of the code container. You can pass a custom class name to control the maximum height of the code container for example.
   * No children are expected as the parent component will handle that.
   * @example
   * <CodePlayground.Code className="max-h-72 overflow-y-auto" />
   */
  Code: CodePlaygroundCode,
})

export { CodePlaygroundWithSubcomponents as CodePlayground }
