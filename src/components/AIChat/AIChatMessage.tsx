import { cn } from '../../lib/utils'
import {
  BaseComponents,
  DefaultComponents,
  FcOrClassName,
  renderComponent,
} from './componentsTypes'
import { AIChatMessageFilePart } from './parts/AIChatMessageFilePart'
import { AIChatMessageReasoningPart } from './parts/AIChatMessageReasoningPart'
import { AIChatMessageSourcePart } from './parts/AIChatMessageSourcePart'
import { AIChatMessageTextPart } from './parts/AIChatMessageTextPart'
import {
  AIChatMessageToolPart,
  AIChatMessageToolPartComponents,
} from './parts/AIChatMessageToolPart'
import type { ChatMessage } from './types'

export interface AIChatMessageProps {
  message: ChatMessage
  className?: string
  components?: Partial<AIChatMessageComponents>
  isLoading?: boolean
}

interface AvatarComponents extends BaseComponents {
  user: FcOrClassName<unknown>
  assistant: FcOrClassName<unknown>
  system: FcOrClassName<unknown>
}

export interface AIChatMessageComponents {
  toolCall: Partial<AIChatMessageToolPartComponents>
  avatar: Partial<AvatarComponents>
}

const defaultAvatars: DefaultComponents<AvatarComponents> = {
  user: ({ className }) => (
    <div
      className={cn(
        'h-6 w-6 overflow-hidden rounded-full ring-1 ring-inset',
        className
      )}
    >
      <img
        src={`https://avatar.vercel.sh/user.svg?size=20`}
        alt="User"
        className="h-full w-full"
      />
    </div>
  ),
  assistant: ({ className }) => (
    <div
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded border text-[10px] font-medium',
        className
      )}
    >
      AI
    </div>
  ),
  system: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
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
  ),
}

export function AIChatMessage({
  message,
  className,
  components,
  isLoading = false,
}: AIChatMessageProps) {
  return (
    <li role="listitem" className={cn('px-4 py-3', className)}>
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0">
          {renderComponent(
            defaultAvatars,
            components?.avatar,
            message.role,
            {}
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {message.parts.length > 0
            ? message.parts.map((part, index) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <AIChatMessageTextPart
                        key={index}
                        text={part.text}
                        isLoading={isLoading}
                      />
                    )
                  case 'reasoning':
                    return (
                      <AIChatMessageReasoningPart
                        key={index}
                        reasoning={part.reasoning}
                      />
                    )
                  case 'tool-invocation':
                    return (
                      <AIChatMessageToolPart
                        key={index}
                        toolInvocation={part.toolInvocation}
                        components={components?.toolCall}
                      />
                    )
                  case 'file':
                    return (
                      <AIChatMessageFilePart
                        key={index}
                        mimeType={part.mimeType}
                        data={part.data}
                        fileName={part.fileName}
                      />
                    )
                  case 'source':
                    return (
                      <AIChatMessageSourcePart
                        key={index}
                        source={part.source}
                      />
                    )
                  default:
                    return null
                }
              })
            : // Show loading state for empty assistant messages
              isLoading &&
              message.role === 'assistant' && (
                <AIChatMessageTextPart text="" isLoading={true} />
              )}
        </div>
      </div>
    </li>
  )
}
