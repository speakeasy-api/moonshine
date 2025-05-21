import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { useAIChat } from './context'
import { AIChatMessage } from './AIChatMessage'

export interface AIChatMessageListProps {
  className?: string
}

export function AIChatMessageList({ className }: AIChatMessageListProps) {
  const { messages } = useAIChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ul role="log" className={cn('h-full overflow-y-auto', className)}>
      {messages.map((message) => (
        <AIChatMessage key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  )
}
