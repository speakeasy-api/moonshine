import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Children,
  isValidElement,
  HTMLAttributes,
  forwardRef,
  useRef,
} from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select'
import { prettyLanguageName, SupportedLanguage } from '../../types'
import '../../styles/codeSyntax.css'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'
import { AnimatePresence } from 'motion/react'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'
import {
  highlightCode,
  HighlightedCode,
  LIGHT_THEME,
  DARK_THEME,
} from '../../lib/codeUtils'
import React from 'react'
import { Pre } from '../CodeHighlight/Pre'
import { useConfig } from '../../hooks/useConfig'

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
   * The error to display in the playground if the code could not be loaded.
   */
  error?: React.ReactNode | undefined

  /**
   * An object of snippets to display in the playground.
   *
   * @example
   * <CodePlayground
   *   snippets={{
   *     javascript: { code: 'console.log("Hello, world!");' },
   *     typescript: { code: 'console.log("Hello, world!");' },
   *   }}
   * />
   */
  snippets: CodePlaygroundSnippets

  /**
   * The language that should be selected when the playground is mounted.
   */
  selectedLanguage: SupportedLanguage

  /**
   * Whether the code should be copyable.
   *
   * @default true
   */
  copyable?: boolean

  /** Custom class name to apply to the container */
  className?: string

  /**
   * Whether to wrap the code.
   *
   * @default true
   */
  wordWrap?: boolean

  /**
   * A callback to be called when the language is changed.
   */
  onChangeLanguage?: (language: SupportedLanguage) => void

  /**
   * Whether to show the language selector.
   */
  showLanguageSelector?: boolean

  /**
   * Whether to show line numbers.
   *
   * @default true
   */
  showLineNumbers?: boolean
}

const CodePlayground = ({
  children,
  snippets,
  copyable = true,
  selectedLanguage,
  className,
  onChangeLanguage,
  error,
  showLineNumbers = true,
  showLanguageSelector = true,
  wordWrap = true,
}: CodePlaygroundProps) => {
  const codeRef = useRef<HTMLDivElement>(null)
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

  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)
  const selectedCode = snippets[selectedLanguage]!
  const { theme } = useConfig()

  const loadingSkeleton = useMemo(() => {
    // Try to measure the existing height of the code container if code has
    // already been rendered. Otherwise, use a default height

    // TODO: improve this logic
    const measuredHeight =
      codeRef.current?.getBoundingClientRect().height ?? 400

    const lines = Math.ceil(measuredHeight / 40)
    return (
      <Skeleton className={`w-full`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div id={`skeleton-line-${i}`} key={i} className="h-4 w-full" />
        ))}
      </Skeleton>
    )
  }, [codeRef.current])

  const codeContents = error ? (
    error
  ) : selectedCode.loading ? (
    <div className="flex items-center p-4">{loadingSkeleton}</div>
  ) : highlighted ? (
    <Pre
      code={highlighted}
      showLineNumbers={showLineNumbers}
      wordWrap={wordWrap}
      className="bg-muted/15 dark:bg-background relative m-0 mr-4 w-full px-4 py-3 text-sm"
    />
  ) : null

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

  const code = foundCustomCodeContainer ? (
    React.cloneElement(foundCustomCodeContainer as React.ReactElement, {
      __children__: codeContents,
      ref: codeRef,
    })
  ) : (
    <CodePlaygroundCode __children__={codeContents} ref={codeRef} />
  )

  const footer = validChildren.find(
    (child) =>
      isValidElement(child) &&
      (child.type as { displayName?: string }).displayName ===
        'CodePlayground.Footer'
  )

  const updateHighlighted = useCallback(
    async (code: string, language: SupportedLanguage) => {
      const shikiTheme = theme === 'dark' ? DARK_THEME : LIGHT_THEME
      const highlighted = await highlightCode(code, language, shikiTheme)
      setHighlighted(highlighted)
    },
    [theme]
  )

  const [copying, setCopying] = useState(false)

  const handleCopy = useCallback(() => {
    setCopying(true)
    navigator.clipboard.writeText(selectedCode.code ?? '')
    setTimeout(() => {
      setCopying(false)
    }, 1000)
  }, [selectedCode.code])

  useEffect(() => {
    if (selectedCode.code) {
      updateHighlighted(selectedCode.code, selectedLanguage)
    }
  }, [selectedCode, selectedLanguage, updateHighlighted])

  const handleChangeLanguage = useCallback(
    (language: SupportedLanguage) => {
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
        {showLanguageSelector && (
          <div className="ml-auto">
            <Select
              value={selectedLanguage}
              onValueChange={handleChangeLanguage}
            >
              <SelectTrigger className="text-body gap-1.5 !border-none !bg-transparent !p-0 !shadow-none !ring-0 select-none">
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
        )}
      </div>

      <div className="relative">
        {code}

        {selectedCode.code && copyable && (
          <div className="pointer-events-auto absolute top-5 right-6 bg-transparent">
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
                    className="text-body-muted hover:text-foreground"
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

const CodePlaygroundCode = forwardRef<HTMLDivElement, CodePlaygroundCodeProps>(
  ({ className, __children__, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn('bg-background overflow-auto', className)}
      >
        {__children__}
      </div>
    )
  }
)

CodePlaygroundCode.displayName = 'CodePlayground.Code'

export interface CodePlaygroundHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CodePlaygroundHeader = ({
  children,
  className,
  ...props
}: CodePlaygroundHeaderProps) => {
  return (
    <div className={cn('bg-card flex items-center', className)} {...props}>
      {children}
    </div>
  )
}

CodePlaygroundHeader.displayName = 'CodePlayground.Header'

export interface CodePlaygroundFooterProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CodePlaygroundFooter = ({
  children,
  className,
  ...props
}: CodePlaygroundFooterProps) => {
  return (
    <div
      className={cn(
        'bg-card flex items-center border-t p-2 select-none',
        className
      )}
      {...props}
    >
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
