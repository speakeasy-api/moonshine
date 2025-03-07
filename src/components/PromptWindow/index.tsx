import { cn } from '@/lib/utils'
import styles from './prompt-window.module.css'
import { Icon } from '../Icon'
import { motion } from 'framer-motion'
import { IconName } from '../Icon/names'
import { useMemo } from 'react'

export interface Suggestion {
  id: string
  label: string
  onClick: (id: string) => void
  icon?: IconName
  className?: string
  iconClassName?: string
}

interface PromptWindowProps {
  prompt?: string
  placeholder: string
  onChange: (prompt: string) => void
  onSubmit: (prompt: string) => void
  onFileUpload?: (file: File[]) => void
  suggestions: Suggestion[]
}

export function PromptWindow({
  placeholder,
  onSubmit,
  suggestions = [],
  prompt,
  onChange,
  onFileUpload,
}: PromptWindowProps) {
  const minHeight = useMemo(() => {
    const promptLines = prompt?.split('\n').length ?? 0

    // 1rem = 16px
    if (promptLines === 0) {
      return 'auto'
    }

    // scale the height by the number of lines between tailwind's min-h-0 and min-h-72
    const height = Math.min(72, 8 * promptLines)

    return `min-h-${height}`
  }, [prompt])
  return (
    <div className="flex flex-col">
      <div className="text-foreground/70 dark:text-muted bg-background flex flex-col rounded-xl border pt-2 text-sm">
        <div
          className={cn(
            'max-h-72 overflow-y-scroll',
            styles.growWrap,
            minHeight
          )}
        >
          <textarea
            className="text-foreground h-full w-full resize-none rounded-lg border border-none bg-transparent px-3 py-1.5 selection:bg-emerald-500/20 selection:text-emerald-500 focus:outline-none dark:selection:bg-emerald-500/20 dark:selection:text-emerald-400 [&::-webkit-scrollbar]:!invisible"
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            onInput={(e) => {
              if (e.currentTarget.parentNode) {
                ;(
                  e.currentTarget.parentNode as HTMLElement
                ).dataset.replicatedValue = e.currentTarget.value
              }
            }}
          />
        </div>

        <div id="actions-bar" className="flex items-center p-2">
          <div
            id="file-upload"
            className="text-foreground hover:bg-accent/80 relative flex items-center gap-1 rounded-lg p-1.5"
          >
            <Icon name="paperclip" className="h-4 w-4" />
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? [])
                onFileUpload?.(files)
              }}
            />
          </div>
          <div className="ml-auto">
            <motion.button
              onClick={() => onSubmit(prompt ?? '')}
              className="bg-foreground/5 text-foreground/60 dark:bg-foreground dark:text-background disabled:!bg-background/70 disabled:!text-muted rounded-xl border p-2 disabled:cursor-not-allowed"
              disabled={!prompt}
              whileHover={prompt && { scale: 1.05 }}
              whileTap={prompt && { scale: 0.95 }}
            >
              <Icon name="arrow-up" strokeWidth={2.5} className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.label}
              className={cn(
                'bg-foreground/5 hover:bg-foreground/10 text-foreground/80 relative flex cursor-pointer select-none flex-row items-center gap-1.5 whitespace-nowrap rounded-xl border px-2.5 py-2 text-sm tracking-tight',
                suggestion.className
              )}
              onClick={() => suggestion.onClick(suggestion.id)}
            >
              {suggestion.icon && (
                <Icon
                  name={suggestion.icon}
                  className={cn(
                    'stroke-primary relative size-4',
                    suggestion.iconClassName
                  )}
                  strokeWidth={1}
                />
              )}
              {suggestion.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
