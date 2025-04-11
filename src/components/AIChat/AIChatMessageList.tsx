import { cn } from '../../lib/utils'
import { useAIChat } from './context'
import { AIChatMessage } from './AIChatMessage'

export interface AIChatMessageListProps {
  className?: string
}

export function AIChatMessageList({ className }: AIChatMessageListProps) {
  const { messages } = useAIChat()

  return (
    <ul role="log" className={cn('h-full overflow-y-auto', className)}>
      {messages.map((message) => (
        <AIChatMessage key={message.id} message={message} />
      ))}
    </ul>
  )
}
