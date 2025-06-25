import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { AIChatModelSelector } from './AIChatModelSelector'
import {
  DefaultComponents,
  FcOrClassName,
  renderComponent,
} from './componentsTypes'
import { useAIChat } from './context'

export interface AIChatMessageComposerProps {
  className?: string
  components?: Partial<AIChatMessageComposerComponents>
}

export type AIChatMessageComposerComponents = {
  submitButton: FcOrClassName<{
    disabled?: boolean
    type: 'submit'
  }>
  modelSelector: FcOrClassName<{
    model: string
    onModelChange: (model: string) => void
    availableModels: { label: string; value: string }[]
  }>
  additionalActions: ReactNode
}

const defaultComponents: DefaultComponents<AIChatMessageComposerComponents> = {
  submitButton: ({
    disabled,
    type,
    className,
  }: {
    disabled?: boolean
    type: 'submit'
    className: string
  }) => (
    <Button
      type={type}
      disabled={disabled}
      size="icon"
      variant="secondary"
      className={cn('h-8 w-8 rounded-[7px]', className)}
    >
      <Icon name="arrow-up" className="size-4" />
    </Button>
  ),
  modelSelector: ({
    model,
    onModelChange,
    availableModels,
    className,
  }: {
    model: string
    onModelChange: (model: string) => void
    availableModels: { label: string; value: string }[]
    className: string
  }) => (
    <AIChatModelSelector
      modelSelector={{ model, onModelChange, availableModels }}
      /* Inner border radius = outer border radius (rounded-lg = 8px) - border width (1px) = 7px */
      className={cn('rounded-[7px]', className)}
    />
  ),
  additionalActions: null,
}

export function AIChatMessageComposer({
  className,
  components,
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
            'flex flex-col overflow-hidden rounded-lg border transition-shadow',
            isFocused && 'ring-1 ring-offset-1'
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
              // 'text-neutral-50 placeholder:text-neutral-400',
              'focus:outline-none',
              'text-sm'
            )}
            disabled={isLoading}
          />
          <div className="flex items-center justify-between p-3 pt-2">
            <div className="flex items-center gap-2">
              {availableModels &&
                model &&
                onModelChange &&
                renderComponent(
                  defaultComponents,
                  components,
                  'modelSelector',
                  {
                    model,
                    onModelChange,
                    availableModels,
                  }
                )}
              {components?.additionalActions}
            </div>
            {renderComponent(defaultComponents, components, 'submitButton', {
              disabled: !message.trim() || isLoading,
              type: 'submit',
            })}
          </div>
        </div>
      </div>
    </form>
  )
}
