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
  toolName: FcOrClassName<ToolInvocation & { confirmMessage?: string }>
  statusIndicator: FcOrClassName<{ status: ToolInvocationStatus }>
  input: FcOrClassName<Omit<ToolInvocation, 'args'> & { args: string }>
  result: FcOrClassName<Omit<ToolInvocation, 'result'> & { result: string }>
}

const inputResultClassName =
  'typography-body-xs max-h-48 overflow-auto rounded bg-neutral-900 p-2 break-all whitespace-pre-wrap text-neutral-300'

const defaultComponents: DefaultComponents<AIChatMessageToolPartComponents> = {
  toolName: ({ toolName, confirmMessage, className }) => (
    <Text
      variant="xs"
      className={cn('flex-1 py-1 font-medium text-neutral-100', className)}
    >
      {confirmMessage || toolName}
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
          {renderComponent(defaultComponents, components, 'toolName', {
            ...toolInvocation,
            confirmMessage: toolCallApproval?.pendingToolCall?.confirmMessage,
          })}

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
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

        {/* Approve / Reject Footer */}
        {isPending && (
          <div className="flex justify-end border-t border-neutral-600 bg-neutral-900 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={toolCallApproval?.pendingToolCall?.reject}
                className="hover:bg-background hover:text-foreground h-7 border border-transparent px-3 text-sm text-neutral-300 hover:border-neutral-600"
              >
                Reject
              </Button>

              <Button
                size="sm"
                onClick={toolCallApproval?.pendingToolCall?.approve}
                className="bg-foreground text-background h-7 border border-transparent px-3 text-sm hover:border-neutral-200 hover:bg-neutral-200"
              >
                Accept
              </Button>
            </div>
          </div>
        )}
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

// import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
// import { Card } from './ui/card'

// interface ToolCall {
//   id: string
//   name: string
//   status: 'pending' | 'approved' | 'rejected'
//   args: any
//   approvalMessage?: string
// }

// interface ToolApprovalCardProps {
//   toolCall: ToolCall
//   onApprove: () => void
//   onReject: () => void
// }

// export function ToolApprovalCard({
//   toolCall,
//   onApprove,
//   onReject,
// }: ToolApprovalCardProps) {
//   const [expanded, setExpanded] = useState(true)

//   const endpoint = toolCall.name.replace(/_/g, '/')

//   return (
//     <Card className="my-3 border border-zinc-700 bg-zinc-900 shadow-md">
//       <div className="flex flex-col">
//         <div className="flex items-center justify-between p-2.5">
//           <div className="flex items-center gap-2.5">
//             <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
//             <span className="text-sm text-zinc-100">
//               {toolCall.approvalMessage || 'Do you want to proceed?'}
//             </span>
//           </div>

//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setExpanded(!expanded)}
//             className="ml-2 h-6 w-6 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
//           >
//             {expanded ? (
//               <ChevronUp className="h-3.5 w-3.5" />
//             ) : (
//               <ChevronDown className="h-3.5 w-3.5" />
//             )}
//             <span className="sr-only">
//               {expanded ? 'Hide details' : 'Show details'}
//             </span>
//           </Button>
//         </div>

//         {expanded && (
//           <div className="animate-in fade-in-50 border-t border-zinc-800 p-3 duration-100">
//             <div className="mb-3 flex flex-col gap-2">
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <span className="mb-0.5 block text-xs text-zinc-500">
//                     Name
//                   </span>
//                   <span className="text-xs font-medium text-zinc-300">
//                     {toolCall.name}
//                   </span>
//                 </div>

//                 <div>
//                   <span className="mb-0.5 block text-xs text-zinc-500">
//                     Endpoint
//                   </span>
//                   <div className="flex items-center">
//                     <span className="mr-1 font-mono text-xs font-medium text-emerald-500">
//                       POST
//                     </span>
//                     <span className="font-mono text-xs text-zinc-300">
//                       /{endpoint}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-x-auto rounded bg-zinc-950 p-2 font-mono text-xs">
//               <pre className="text-zinc-300">
//                 {JSON.stringify(toolCall.args, null, 2)}
//               </pre>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end border-t border-zinc-800 p-2">
//           <div className="flex items-center gap-1.5">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onReject}
//               className="h-7 border border-transparent px-3 text-sm text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/70 hover:text-white"
//             >
//               Reject
//             </Button>

//             <Button
//               size="sm"
//               onClick={onApprove}
//               className="h-7 border border-transparent bg-white px-3 text-sm text-black hover:border-zinc-200 hover:bg-gray-50"
//             >
//               Accept
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }
