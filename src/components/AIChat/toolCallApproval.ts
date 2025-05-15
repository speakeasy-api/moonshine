import { ToolCall } from 'ai'
import { useState } from 'react'
import { ToolCallApprovalProps, ToolCallWithApproval } from './types'

type ToolCallFn = (t: { toolCall: ToolCall<string, any> }) => Promise<string>

export const TOOL_CALL_ERROR_MESSAGE = 'Tool call error'
export const TOOL_CALL_REJECTED_MESSAGE = 'User rejected tool call'

export function useToolCallApproval({
  executeToolCall,
  requiresApproval,
}: {
  executeToolCall: (toolCall: ToolCall<string, any>) => Promise<string>
  requiresApproval?: (toolCall: ToolCall<string, any>) => boolean
}): ToolCallApprovalProps & { toolCallFn: ToolCallFn } {
  const [pendingToolCall, setPendingToolCall] =
    useState<ToolCallWithApproval | null>(null)

  const executeWithErrorHandling = async (toolCall: ToolCall<string, any>) => {
    try {
      return await executeToolCall(toolCall)
    } catch (error) {
      return `${TOOL_CALL_ERROR_MESSAGE}: ${error}`
    }
  }

  const toolCallFn = async ({
    toolCall,
  }: {
    toolCall: ToolCall<string, any>
  }) => {
    if (!requiresApproval?.(toolCall)) {
      return executeWithErrorHandling(toolCall)
    }

    // If the tool call requires approval, return a promise that resolves when the user approves the tool call
    return new Promise<string>((resolve, reject) => {
      setPendingToolCall({
        ...toolCall,
        approve: () => resolve('approved'),
        reject: () => reject('rejected'),
      })
    })
      .then(async () => {
        setPendingToolCall(null)
        return executeWithErrorHandling(toolCall)
      })
      .catch(() => {
        setPendingToolCall(null)
        return TOOL_CALL_REJECTED_MESSAGE
      })
  }

  return {
    pendingToolCall,
    toolCallFn,
  }
}
