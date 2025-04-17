import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import type { BasePartProps } from '../types'

export interface AIChatMessageToolInvocationPartProps extends BasePartProps {
  toolName: string
  toolInput?: Record<string, unknown>
}

export function AIChatMessageToolInvocationPart({
  toolName,
  toolInput,
  className,
}: AIChatMessageToolInvocationPartProps) {
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <Text variant="xs" className="font-medium text-neutral-50">
          Tool Invocation: {toolName}
        </Text>
      </div>
      {toolInput && (
        <div className="mt-2">
          <Text variant="xs" className="mb-1 font-medium text-neutral-200">
            Input:
          </Text>
          <pre className="typography-body-xs whitespace-pre-wrap rounded bg-neutral-900 p-2 text-neutral-300">
            {JSON.stringify(toolInput, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
