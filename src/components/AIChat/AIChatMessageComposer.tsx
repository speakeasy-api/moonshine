import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { useAIChat } from './context'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { AIChatModelSelector } from './AIChatModelSelector'

export interface AIChatMessageComposerProps {
  className?: string
}

export function AIChatMessageComposer({
  className,
}: AIChatMessageComposerProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { onSendMessage, isLoading, model, onModelChange, availableModels } =
    useAIChat()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  // Initialize height on mount and adjust on content change
  useEffect(() => {
    adjustHeight()
  }, [message])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (message.trim() && onSendMessage && !isLoading) {
      onSendMessage(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('mt-auto p-4', className)}>
      <div className="flex flex-col">
        <div
          className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-neutral-600 transition-shadow',
            isFocused && 'ring-1 ring-white ring-offset-1'
          )}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Send a message..."
            rows={1}
            className={cn(
              'max-h-[300px] min-h-[44px] w-full resize-none bg-transparent px-4 pt-3',
              'text-neutral-50 placeholder:text-neutral-400',
              'focus:outline-none',
              'text-sm'
            )}
            disabled={isLoading}
          />
          <div className="flex items-center justify-between p-3 pt-2">
            <div className="flex items-center gap-2">
              {availableModels && model && onModelChange && (
                <AIChatModelSelector
                  modelSelector={{
                    model,
                    onModelChange,
                    availableModels,
                  }}
                  /* Inner border radius = outer border radius (rounded-lg = 8px) - border width (1px) = 7px */
                  className="rounded-[7px]"
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={!message.trim() || isLoading}
              size="icon"
              variant="secondary"
              /* Inner border radius = outer border radius (rounded-lg = 8px) - border width (1px) = 7px */
              className="h-8 w-8 rounded-[7px]"
            >
              <Icon name="arrow-up" className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
