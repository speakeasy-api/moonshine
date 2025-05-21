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
  const { messages } = useAIChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ul role="log" className={cn('h-full overflow-y-auto', className)}>
      {messages.map((message) => (
        <AIChatMessage
          key={message.id}
          message={message}
          components={components}
        />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  )
}
