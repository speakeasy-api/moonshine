import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { AIChatContext } from './context'
import { AIChatMessageList } from './AIChatMessageList'
import { AIChatMessageComposer } from './AIChatMessageComposer'
import type { AIChatContextValue } from './types'

export interface AIChatContainerProps extends AIChatContextValue {
  className?: string
  children?: ReactNode
}

export function AIChatContainer({
  messages,
  isLoading,
  onSendMessage,
  className,
  children,
}: AIChatContainerProps) {
  return (
    <AIChatContext.Provider
      value={{
        messages,
        isLoading,
        onSendMessage,
      }}
    >
      <div className={cn('flex h-full min-h-0 max-w-3xl flex-col', className)}>
        <div className="flex-1 overflow-hidden">
          <AIChatMessageList />
        </div>
        <div className="sticky bottom-0">
          <AIChatMessageComposer />
        </div>
        {children}
      </div>
    </AIChatContext.Provider>
  )
}
