import { cn } from '@/lib/utils'
import styles from './prompt-window.module.css'
import { Icon } from '../Icon'
import { motion } from 'framer-motion'
import { IconName } from '../Icon/names'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface Suggestion {
  id: string
  label: string
  onClick: (id: string) => void
  icon?: IconName
  className?: string
  iconClassName?: string
}

export interface Attachment {
  id: string
  name: string
  bytes: ArrayBuffer
  type: string
  size: number
  onRemove?: (id: string) => void
}

interface PromptWindowProps {
  prompt?: string
  placeholder: string
  onChange: (prompt: string) => void
  onSubmit: (prompt: string) => void
  onFileUpload?: (files: Attachment[]) => void
  suggestions?: Suggestion[]
  attachments?: Attachment[]
}

export function PromptWindow({
  placeholder,
  onSubmit,
  suggestions = [],
  prompt,
  onChange,
  onFileUpload,
  attachments = [],
}: PromptWindowProps) {
  const minHeight = useMemo<string>(() => {
    const promptLines = prompt?.split('\n').length ?? 0

    // 1rem = 16px
    if (promptLines === 0) {
      return 'auto'
    }

    // scale the height by the number of lines between tailwind's min-h-0 and min-h-72
    const height = Math.min(72, 8 * promptLines)

    return `min-h-${height}`
  }, [prompt])

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
    },
    []
  )

  const handleFiles = useCallback(
    async (files: File[]) => {
      const attachments: Attachment[] = await Promise.all(
        files.map(async (file) => ({
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          size: file.size,
          bytes: await file.arrayBuffer(),
        }))
      )
      onFileUpload?.(attachments)
    },
    [onFileUpload]
  )

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      handleFiles(Array.from(event.dataTransfer.files))
    },
    [handleFiles]
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
    },
    []
  )

  return (
    <div className="flex flex-col">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className="text-foreground/70 dark:text-muted bg-background flex flex-col rounded-xl border pt-2 text-sm"
      >
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-row gap-2 px-2">
            {attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
        <div
          className={cn(
            'max-h-72 overflow-x-hidden overflow-y-scroll',
            minHeight
          )}
        >
          <div className={styles.growWrap}>
            <textarea
              className="text-foreground h-full w-full resize-none rounded-lg border border-none bg-transparent px-3 py-1.5 selection:bg-emerald-500/20 selection:text-emerald-500 focus:outline-none dark:selection:bg-emerald-500/20 dark:selection:text-emerald-400 [&::-webkit-scrollbar]:!invisible"
              placeholder={placeholder}
              value={prompt}
              onChange={(e) => onChange(e.target.value)}
              autoComplete="off"
              data-1p-ignore="true"
              data-dashlane-disabled-on-field="true"
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
              onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
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

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const [img, setImg] = useState<string | null>(null)

  useEffect(() => {
    async function readFile() {
      if (!attachment.type.startsWith('image/')) {
        return // Only process image files
      }

      const reader = new FileReader()
      reader.onloadend = () => setImg(reader.result as string)

      try {
        reader.readAsDataURL(
          new Blob([attachment.bytes], { type: attachment.type })
        )
      } catch (error) {
        console.error('Error reading file:', error)
      }
    }

    readFile()
  }, [attachment])

  return (
    <div
      className="bg-card flex flex-row items-center gap-2 rounded-lg border px-1.5 py-0.5 text-xs"
      key={attachment.id}
    >
      <div className="bg-foreground/5 size-6 rounded-sm">
        {img ? (
          <img
            src={img}
            className="size-full rounded-lg object-cover"
            alt={attachment.name}
          />
        ) : (
          <Icon name="file" className="size-full py-1" />
        )}
      </div>
      <div
        title={attachment.name}
        className="max-w-36 flex-1 select-none truncate text-xs"
      >
        {attachment.name}
      </div>
      {attachment.onRemove && (
        <div
          className="hover:text-foreground cursor-pointer"
          onClick={() => attachment.onRemove?.(attachment.id)}
        >
          <Icon name="x" className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
