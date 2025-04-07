import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import type { BasePartProps } from '../types'

export interface AIChatMessageReasoningPartProps extends BasePartProps {
  reasoning: string
}

export function AIChatMessageReasoningPart({
  reasoning,
  className,
}: AIChatMessageReasoningPartProps) {
  return (
    <div className={cn('rounded-md bg-neutral-800 p-3', className)}>
      <Text variant="sm" className="mb-1 font-medium text-neutral-50">
        Reasoning:
      </Text>
      <Text variant="sm" className="whitespace-pre-wrap text-neutral-200">
        {reasoning}
      </Text>
    </div>
  )
}
