import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip'
import { motion, MotionConfig } from 'framer-motion'
import { CheckIcon, UserCheck, XIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../Button'
import { Text } from '../../Text'
import {
  BaseComponents,
  DefaultComponents,
  FcOrClassName,
  renderComponent,
} from '../componentsTypes'
import { useAIChat } from '../context'
import {
  TOOL_CALL_ERROR_MESSAGE,
  TOOL_CALL_REJECTED_MESSAGE,
} from '../toolCallApproval'
import type { BasePartProps } from '../types'

type ToolInvocationState = 'partial-call' | 'call' | 'result'

type ToolInvocationStatus = 'pending' | 'in-progress' | 'success' | 'error'

interface ToolInvocation {
  state: ToolInvocationState
  toolCallId: string
  toolName: string
  args: Record<string, unknown>
  result?: unknown
}

export interface AIChatMessageToolPartProps extends BasePartProps {
  toolInvocation: ToolInvocation
  components?: Partial<AIChatMessageToolPartComponents>
  onAccept?: () => void
  onReject?: () => void
}

export interface AIChatMessageToolPartComponents extends BaseComponents {
  toolName: FcOrClassName<ToolInvocation>
  statusIndicator: FcOrClassName<{ status: ToolInvocationStatus }>
  input: FcOrClassName<Omit<ToolInvocation, 'args'> & { args: string }>
  result: FcOrClassName<Omit<ToolInvocation, 'result'> & { result: string }>
  approveButton: FcOrClassName<ToolInvocation & { onClick: () => void }>
  rejectButton: FcOrClassName<ToolInvocation & { onClick: () => void }>
}

const inputResultClassName =
  'typography-body-xs max-h-48 overflow-auto rounded bg-neutral-900 p-2 break-all whitespace-pre-wrap text-neutral-300'

const defaultComponents: DefaultComponents<AIChatMessageToolPartComponents> = {
  toolName: ({ toolName, className }) => (
    <Text
      variant="xs"
      className={cn('flex-1 py-1 font-medium text-neutral-100', className)}
    >
      {toolName}
    </Text>
  ),
  statusIndicator: ({ status, className }) => (
    <StatusIndicator status={status} className={className} />
  ),
  input: ({ args, className }) => (
    <>
      <Text variant="xs" className="mb-1 font-medium text-neutral-300">
        Input
      </Text>
      <pre className={cn(inputResultClassName, className)}>{args}</pre>
    </>
  ),
  result: ({ result, className }) => (
    <>
      <Text variant="xs" className="mb-1 font-medium text-neutral-300">
        Result
      </Text>
      <pre className={cn(inputResultClassName, className)}>{result}</pre>
    </>
  ),
  approveButton: ({ onClick, className }) => (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClick}
            className={cn(
              'border-em-600 bg-success-fill text-success-foreground/90 hover:bg-success-fill/80 hover:text-success-foreground h-6 w-6',
              className
            )}
            aria-label="Accept"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Approve tool call</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  rejectButton: ({ onClick, className }) => (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClick}
            className={cn(
              'text-danger-fill hover:text-danger-fill hover:bg-danger-fill/30 h-6 w-6',
              className
            )}
            aria-label="Reject"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reject tool call</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export function AIChatMessageToolPart({
  toolInvocation,
  className,
  components,
}: AIChatMessageToolPartProps) {
  const { state, toolCallId, args, result } = toolInvocation
  const [isExpanded, setIsExpanded] = useState(false)

  const { toolCallApproval } = useAIChat()
  const isPending = toolCallId === toolCallApproval?.pendingToolCall?.toolCallId

  useEffect(() => {
    if (isPending) {
      setIsExpanded(true)
    }
  }, [isPending])

  useEffect(() => {
    if (state === 'result') {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }, [state])

  // Format the result for display
  const formatResult = (result: unknown): string => {
    if (typeof result === 'string') return result
    if (typeof result === 'object' && result !== null)
      return JSON.stringify(result as Record<string, unknown>, null, 2)
    return String(result)
  }

  const status = useMemo(() => {
    if (isPending) return 'pending'
    if (state === 'call') return 'in-progress'
    if (state === 'result') {
      if (formatResult(result).includes(TOOL_CALL_ERROR_MESSAGE)) return 'error'
      if (formatResult(result).includes(TOOL_CALL_REJECTED_MESSAGE))
        return 'error'
      return 'success'
    }
    return 'pending'
  }, [state, isPending, result])

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
            'flex items-center gap-3 border-neutral-600 bg-neutral-900 px-4 py-2',
            {
              'border-b': isExpanded,
            }
          )}
        >
          {/* Status Indicator */}
          <div className="relative flex h-6 w-6 items-center justify-center">
            {renderComponent(defaultComponents, components, 'statusIndicator', {
              status,
            })}
          </div>
          {/* Tool Name */}
          {renderComponent(
            defaultComponents,
            components,
            'toolName',
            toolInvocation
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {isPending &&
              toolCallApproval?.pendingToolCall?.reject &&
              renderComponent(defaultComponents, components, 'rejectButton', {
                ...toolInvocation,
                onClick: toolCallApproval?.pendingToolCall?.reject,
              })}
            {isPending &&
              toolCallApproval?.pendingToolCall?.approve &&
              renderComponent(defaultComponents, components, 'approveButton', {
                ...toolInvocation,
                onClick: toolCallApproval?.pendingToolCall?.approve,
              })}
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
                {renderComponent(defaultComponents, components, 'input', {
                  ...toolInvocation,
                  args: JSON.stringify(
                    args as Record<string, unknown>,
                    null,
                    2
                  ),
                })}
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
                {renderComponent(defaultComponents, components, 'result', {
                  ...toolInvocation,
                  result: formatResult(result),
                })}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

const StatusIndicator = ({
  status,
  className,
}: {
  status: ToolInvocationStatus
  className: string
}) => {
  const widthHeight = 'h-3 w-3'
  const baseClassName = `${widthHeight} flex items-center justify-center rounded-full`

  switch (status) {
    case 'success':
      return (
        <motion.div
          className={cn(baseClassName, 'bg-success-fill', className)}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          <CheckIcon className="h-full w-full text-neutral-100" />
        </motion.div>
      )
    case 'error':
      return (
        <motion.div
          className={cn(baseClassName, 'bg-danger-fill', className)}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          <XIcon className="h-full w-full text-neutral-100" />
        </motion.div>
      )
    case 'pending':
      return (
        <>
          {/* Track */}
          <motion.div
            className="absolute inset-0 rounded-full bg-neutral-500/20"
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
              className="h-full w-full rounded-full border-2 border-neutral-500 [border-top-color:transparent] [border-left-color:transparent]"
              style={{
                animation: 'spin 3s linear infinite',
              }}
            />
          </motion.div>
          <motion.div
            className={cn(
              'relative h-4 w-4 rounded-full bg-neutral-500',
              className
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <UserCheck className="h-full w-full text-neutral-100" />
          </motion.div>
        </>
      )
    case 'in-progress':
      return (
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
          <motion.div
            className={cn(
              widthHeight,
              'bg-information-fill relative rounded-full',
              className
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          />
        </>
      )
  }
}
