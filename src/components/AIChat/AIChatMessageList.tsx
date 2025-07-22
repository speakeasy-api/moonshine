import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { AIChatMessage, AIChatMessageComponents } from './AIChatMessage'
import { useAIChat } from './context'

export interface AIChatMessageListProps {
  components?: Partial<AIChatMessageComponents>
  className?: string
}

export function AIChatMessageList({
  components,
  className,
}: AIChatMessageListProps) {
  const { messages, isLoading } = useAIChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ul role="log" className={cn('h-full overflow-y-auto', className)}>
      {messages.map((message, index) => (
        <AIChatMessage
          key={message.id}
          message={message}
          components={components}
          isLoading={
            isLoading &&
            index === messages.length - 1 &&
            message.role === 'assistant'
          }
        />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  )
}
