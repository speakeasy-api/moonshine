import { cn } from '../../../lib/utils'
import { Text } from '../../Text'
import { Button } from '../../Button'
import type { BasePartProps } from '../types'
import { useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'

type ToolInvocationState = 'partial-call' | 'call' | 'result'

interface ToolInvocation {
  state: ToolInvocationState
  toolCallId: string
  toolName: string
  args: Record<string, unknown>
  result?: unknown
}

export interface AIChatMessageToolPartProps extends BasePartProps {
  toolInvocation: ToolInvocation
  onAccept?: () => void
  onReject?: () => void
  onClick?: () => void
}

export function AIChatMessageToolPart({
  toolInvocation,
  className,
  onAccept,
  onReject,
  onClick,
}: AIChatMessageToolPartProps) {
  const { state, toolName, args, result } = toolInvocation
  const [isExpanded, setIsExpanded] = useState(false)

  // Format the result for display
  const formatResult = (result: unknown): string => {
    if (typeof result === 'string') return result
    if (typeof result === 'object' && result !== null)
      return JSON.stringify(result as Record<string, unknown>, null, 2)
    return String(result)
  }

  const StatusIndicator = () => {
    // TODO: support an "isError(toolInvocation) => bool" prop?
    // TODO: change icon based on success
    const success =
      state === 'result' && (result as { status: string })?.status !== 'error'
    const resultClassname = success ? 'bg-success-fill' : 'bg-danger-fill'

    return (
      <div className="flex h-6 w-6 items-center justify-center">
        {state === 'result' ? (
          <motion.div
            className={cn(
              resultClassname,
              'flex h-3 w-3 items-center justify-center rounded-full'
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-3 w-3 text-neutral-900"
              fill="currentColor"
            >
              <path d="M9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z" />
            </svg>
          </motion.div>
        ) : (
          <div className="relative">
            {state === 'call' && (
              <>
                {/* Track */}
                <motion.div
                  className="bg-information-fill/20 absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                {/* Animated Ring */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="border-information-fill h-full w-full rounded-full border-2 [border-top-color:transparent] [border-left-color:transparent]"
                    style={{
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                </motion.div>
              </>
            )}
            <motion.div
              className={cn('relative h-3 w-3 rounded-full', {
                'bg-warning-fill': state === 'partial-call',
                'bg-information-fill': state === 'call',
              })}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <motion.div
        className={cn(
          'overflow-hidden rounded-lg border border-neutral-600 transition-all duration-300',
          className
        )}
        initial={false}
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center gap-3 border-neutral-700 bg-neutral-900 px-4 py-2',
            {
              'border-b': isExpanded,
            }
          )}
        >
          {/* Status Indicator */}
          <StatusIndicator />
          {/* Tool Name */}
          {onClick ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClick}
              className="h-6 flex-1 justify-start p-0 text-neutral-100 hover:text-neutral-100 hover:underline"
            >
              <Text variant="xs" className="font-medium">
                {toolName}
              </Text>
            </Button>
          ) : (
            <Text
              variant="xs"
              className="flex-1 py-1 font-medium text-neutral-100"
            >
              {toolName}
            </Text>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {state === 'result' && onReject && (
              <Button
                size="icon"
                variant="ghost"
                onClick={onReject}
                className="h-6 w-6 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                aria-label="Reject"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
            {state === 'result' && onAccept && (
              <Button
                size="icon"
                variant="ghost"
                onClick={onAccept}
                className="h-6 w-6 border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                aria-label="Accept"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                variants={{
                  expanded: { rotate: 180 },
                  collapsed: { rotate: 0 },
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </Button>
          </div>
        </div>

        {/* Expandable Body */}
        <motion.div
          variants={{
            expanded: {
              height: 'auto',
              opacity: 1,
              maskImage:
                'linear-gradient(to bottom, black 100%, transparent 100%)',
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 },
                maskImage: { duration: 0.3 },
              },
            },
            collapsed: {
              height: 0,
              opacity: 0,
              maskImage:
                'linear-gradient(to bottom, black 50%, transparent 100%)',
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.1 },
                maskImage: { duration: 0.3 },
              },
            },
          }}
          className="overflow-hidden"
        >
          <motion.div
            variants={{
              expanded: {
                filter: 'blur(0px)',
                opacity: 1,
              },
              collapsed: {
                filter: 'blur(2px)',
                opacity: 0,
              },
            }}
            className="space-y-3 p-4"
          >
            {/* Tool Input */}
            {args && Object.keys(args).length > 0 ? (
              <motion.div
                variants={{
                  expanded: { y: 0, opacity: 1 },
                  collapsed: { y: -10, opacity: 0 },
                }}
              >
                <Text
                  variant="xs"
                  className="mb-1 font-medium text-neutral-300"
                >
                  Input
                </Text>
                <pre className="typography-body-xs max-h-48 overflow-auto rounded bg-neutral-900 p-2 break-all whitespace-pre-wrap text-neutral-300">
                  {JSON.stringify(args as Record<string, unknown>, null, 2)}
                </pre>
              </motion.div>
            ) : null}

            {/* Tool Result */}
            {state === 'result' && result ? (
              <motion.div
                variants={{
                  expanded: { y: 0, opacity: 1 },
                  collapsed: { y: -10, opacity: 0 },
                }}
              >
                <Text
                  variant="xs"
                  className="mb-1 font-medium text-neutral-300"
                >
                  Result
                </Text>
                <pre className="typography-body-xs max-h-48 overflow-auto rounded bg-neutral-900 p-2 break-all whitespace-pre-wrap text-neutral-300">
                  {formatResult(result)}
                </pre>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}
