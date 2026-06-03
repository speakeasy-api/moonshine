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
    <svg
      viewBox="0 0 20 20"
      role="img"
      aria-label="User"
      className={cn(
        'bg-muted text-body-muted h-6 w-6 rounded-full ring-1 ring-inset',
        className
      )}
    >
      <defs>
        <linearGradient
          id="moonshine-ai-chat-user-avatar-gradient"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#06f98c" />
          <stop offset="100%" stopColor="#8c06f9" />
        </linearGradient>
      </defs>
      <rect
        width="20"
        height="20"
        fill="url(#moonshine-ai-chat-user-avatar-gradient)"
        rx="0"
        ry="0"
      />
    </svg>
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
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <AIChatMessageTextPart key={index} text={part.text} />
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
                  <AIChatMessageSourcePart key={index} source={part.source} />
                )
              default:
                return null
            }
          })}
        </div>
      </div>
    </li>
  )
}
