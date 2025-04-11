import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import type { BasePartProps } from '../types'

export interface AIChatMessageTextPartProps extends BasePartProps {
  text: string
}

export function AIChatMessageTextPart({
  text,
  className,
}: AIChatMessageTextPartProps) {
  return (
    <Text
      variant="sm"
      className={cn(
        'prose prose-sm prose-gray leading-5 break-words whitespace-pre-wrap',
        className
      )}
    >
      {text}
    </Text>
  )
}
