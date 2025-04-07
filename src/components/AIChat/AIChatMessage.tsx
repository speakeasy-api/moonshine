import { cn } from '../../lib/utils'
import type { ChatMessage } from './types'
import { AIChatMessageTextPart } from './parts/AIChatMessageTextPart'
import { AIChatMessageReasoningPart } from './parts/AIChatMessageReasoningPart'
import { AIChatMessageToolPart } from './parts/AIChatMessageToolPart'
import { AIChatMessageFilePart } from './parts/AIChatMessageFilePart'
import { AIChatMessageSourcePart } from './parts/AIChatMessageSourcePart'

export interface AIChatMessageProps {
  message: ChatMessage
  className?: string
}

export function AIChatMessage({ message, className }: AIChatMessageProps) {
  const roleIcons = {
    user: (
      <div className="h-5 w-5 overflow-hidden rounded-full ring-1 ring-neutral-400 ring-inset">
        <img
          src={`https://avatar.vercel.sh/user.svg?size=20`}
          alt="User"
          className="h-full w-full"
        />
      </div>
    ),
    assistant: (
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-800 bg-neutral-900 text-[10px] font-medium text-neutral-400">
        AI
      </div>
    ),
    system: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-neutral-400"
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

  return (
    <li role="listitem" className={cn('px-4 py-3', className)}>
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0">{roleIcons[message.role]}</div>
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
