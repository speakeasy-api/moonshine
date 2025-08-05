import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import type { BasePartProps } from '../types'

export interface AIChatMessageToolResultPartProps extends BasePartProps {
  content: string
}

export function AIChatMessageToolResultPart({
  content,
  className,
}: AIChatMessageToolResultPartProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-neutral-600 bg-neutral-800 p-3',
        className
      )}
    >
      <div className="mb-1 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Text variant="xs" className="font-medium text-neutral-50">
          Tool Result
        </Text>
      </div>
      <div className="mt-2">
        <pre className="text-body-xs rounded bg-neutral-900 p-2 whitespace-pre-wrap text-neutral-300">
          {content}
        </pre>
      </div>
    </div>
  )
}
