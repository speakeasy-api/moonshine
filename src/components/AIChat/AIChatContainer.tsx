import { ToolCall } from 'ai'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { AIChatMessageComponents } from './AIChatMessage'
import {
  AIChatMessageComposer,
  AIChatMessageComposerComponents,
} from './AIChatMessageComposer'
import { AIChatMessageList } from './AIChatMessageList'
import { AIChatContext } from './context'
import type { AIChatContextValue, ToolCallApprovalProps } from './types'

export interface ModelSelectorConfig {
  model: string
  onModelChange: (v: string) => void
  availableModels: { label: string; value: string }[]
}

export interface AIChatContainerProps
  extends Omit<
    AIChatContextValue,
    'model' | 'onModelChange' | 'availableModels' | 'toolCallApproval'
  > {
  modelSelector?: ModelSelectorConfig
  className?: string
  components?: Partial<AIChatComponents>
  toolCallApproval?: ToolCallApprovalProps
  children?: ReactNode
}

interface AIChatComponents {
  composer: Partial<AIChatMessageComposerComponents>
  message: Partial<AIChatMessageComponents>
}

export function AIChatContainer({
  messages,
  isLoading,
  onSendMessage,
  modelSelector,
  className,
  components,
  toolCallApproval,
  children,
}: AIChatContainerProps) {
  return (
    <AIChatContext.Provider
      value={{
        messages,
        isLoading,
        onSendMessage,
        model: modelSelector?.model,
        onModelChange: modelSelector?.onModelChange,
        availableModels: modelSelector?.availableModels,
        toolCallApproval,
      }}
    >
      <div className={cn('flex h-full min-h-0 max-w-3xl flex-col', className)}>
        <div className="flex-1 overflow-hidden">
          <AIChatMessageList components={components?.message} />
        </div>
        <div className="sticky bottom-0">
          <AIChatMessageComposer components={components?.composer} />
        </div>
        {children}
      </div>
    </AIChatContext.Provider>
  )
}
