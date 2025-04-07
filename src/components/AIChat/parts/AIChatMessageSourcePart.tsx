import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import type { BasePartProps } from '../types'

export interface AIChatMessageSourcePartProps extends BasePartProps {
  source: {
    id: string
    url: string
    title?: string
  }
}

export function AIChatMessageSourcePart({
  source,
  className,
}: AIChatMessageSourcePartProps) {
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Text variant="sm" className="font-medium text-neutral-50">
          Source Reference
        </Text>
      </div>
      <div className="mt-2">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-yellow-300 hover:text-brand-yellow-200 block hover:underline"
        >
          <Text variant="sm">{source.title || source.url}</Text>
        </a>
        <Text variant="sm" className="mt-1 block text-neutral-400">
          ID: {source.id}
        </Text>
      </div>
    </div>
  )
}
