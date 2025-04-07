import { cn } from '@/lib/utils'
import { Icon } from '../Icon'
import { AnimatePresence, motion } from 'framer-motion'
import { IconName } from '../Icon/names'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

export interface PromptInputProps {
  prompt?: string
  placeholder: string
  onChange: (prompt: string) => void
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  onFileUpload?: (files: Attachment[]) => void
  suggestions?: Suggestion[]
  attachments?: Attachment[]

  /**
   * The icon to show when the prompt is being submitted.
   */
  submittingIcon?: IconName

  /**
   * Whether the prompt is being submitted.
   */
  isSubmitting?: boolean

  /**
   * The max height the prompt input can grow to in pixels.
   */
  maxHeight?: number

  /**
   * The ref to the file input.
   */
  fileInputRef?: React.RefObject<HTMLInputElement>

  /**
   * The file types that are accepted by the file input.
   */
  acceptedFileTypes?: string[]

  /**
   * Whether the prompt input is disabled.
   */
  isDisabled?: boolean

  /**
   * The maximum number of attachments that can be uploaded.
   */
  maxAttachments?: number
}

export function PromptInput({
  placeholder,
  onSubmit,
  suggestions = [],
  prompt,
  onChange,
  onFileUpload,
  attachments = [],
  maxHeight = 250,
  isSubmitting = false,
  submittingIcon = 'loader',
  fileInputRef,
  acceptedFileTypes,
  isDisabled = false,
  maxAttachments = 1,
}: PromptInputProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  // Always create a ref, and then assign it to the consumer's ref if provided
  const internalFileInputRef = useRef<HTMLInputElement>(null)
  const fileInputRefInternal = useMemo(() => {
    return fileInputRef || internalFileInputRef
  }, [fileInputRef])

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const minHeight = useMemo<React.CSSProperties['minHeight']>(() => {
    const promptLines = prompt?.split('\n').length ?? 0

    if (promptLines === 0) {
      return 0
    }

    // 1 line in the textarea = height 20px (approx)
    const totalHeight = promptLines * 20

    // We need to clamp the height of the textarea to the max height
    // as min-height will override max-height
    if (totalHeight > maxHeight) {
      return `${maxHeight}px`
    }

    return `${totalHeight}px`
  }, [prompt, maxHeight])

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDraggingOver(true)
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

      setIsDraggingOver(false)
      handleFiles(Array.from(event.dataTransfer.files))
    },
    [handleFiles]
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDraggingOver(false)
    },
    []
  )

  return (
    <div className="flex w-full flex-col">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={cn(
          'text-foreground/70 dark:text-body-muted bg-background flex flex-col rounded-md border pt-2 text-sm transition-colors duration-500',
          isDraggingOver && 'border-primary/60 border-dashed'
        )}
      >
        <div
          className={cn(
            'flex flex-row gap-2 px-2',
            attachments.length > 0 && 'mb-2'
          )}
        >
          <AnimatePresence>
            {attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </AnimatePresence>
        </div>

        <div
          className="overflow-x-hidden overflow-y-scroll"
          style={{ minHeight, maxHeight }}
        >
          <textarea
            className="text-foreground selection:bg-primary/20 selection:text-primary dark:selection:bg-primary/20 dark:selection:text-primary min-h-[inherit] w-full resize-none rounded-md border border-none bg-transparent px-3 py-1.5 focus:outline-none [&::-webkit-scrollbar]:!invisible"
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            data-1p-ignore="true"
            data-dashlane-disabled-on-field="true"
            ref={textAreaRef}
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
            className={cn(
              'text-foreground hover:bg-accent/80 relative flex cursor-pointer items-center gap-1 rounded-md p-1.5',
              attachments.length >= maxAttachments &&
                'cursor-not-allowed opacity-50'
            )}
            onClick={() => {
              if (attachments.length >= maxAttachments) {
                return
              }

              fileInputRefInternal.current?.click()
            }}
          >
            <Icon name="paperclip" className="h-4 w-4" />
            <input
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 hidden h-full w-full"
              onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
              accept={acceptedFileTypes?.join(',')}
            />
          </div>
          <div className="ml-auto">
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSubmit(e)
              }}
              className="bg-foreground/5 text-foreground/60 dark:bg-foreground dark:text-background disabled:!bg-background/70 disabled:!text-body-muted rounded-md border p-2"
              disabled={isDisabled || isSubmitting}
              title={
                !prompt
                  ? 'Enter a prompt to submit'
                  : isSubmitting
                    ? 'Submitting...'
                    : ''
              }
              whileHover={
                (prompt && !isSubmitting && { scale: 1.05 }) || undefined
              }
              whileTap={
                (prompt && !isSubmitting && { scale: 0.95 }) || undefined
              }
            >
              <Icon
                name={isSubmitting ? submittingIcon : 'arrow-up'}
                strokeWidth={2.5}
                className={cn(isSubmitting && 'animate-spin')}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 flex w-full flex-row flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.label}
              className={cn(
                'bg-foreground/5 hover:bg-foreground/10 text-foreground/80 relative flex cursor-pointer flex-row items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm tracking-tight whitespace-nowrap select-none',
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

  const icon = useMemo<IconName>(() => {
    switch (attachment.type) {
      // TODO: add more as and when
      case 'application/x-yaml':
      case 'application/yaml':
      case 'application/json':
        return 'file-code'
      case 'text/plain':
        return 'file-text'
      default:
        return 'file'
    }
  }, [attachment.type])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={cn(
        'bg-card flex flex-row items-center rounded-lg border px-1.5 py-1 text-xs',
        img && 'gap-1.5'
      )}
      key={attachment.id}
    >
      <div className={cn('size-5', img && 'size-4')}>
        {img ? (
          <img
            src={img}
            className="size-full rounded-lg object-cover"
            alt={attachment.name}
          />
        ) : (
          <Icon name={icon} className="size-full py-1" />
        )}
      </div>
      <div
        title={attachment.name}
        className="max-w-36 flex-1 truncate text-xs select-none"
      >
        {attachment.name}
      </div>
      {attachment.onRemove && (
        <div
          className="hover:text-foreground ml-1 cursor-pointer"
          onClick={() => attachment.onRemove?.(attachment.id)}
        >
          <Icon name="x" className="size-3" />
        </div>
      )}
    </motion.div>
  )
}
