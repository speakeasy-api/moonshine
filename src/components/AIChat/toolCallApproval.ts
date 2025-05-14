import { ToolCall } from 'ai'
import { useState } from 'react'
import { ToolCallApprovalProps, ToolCallWithApproval } from './types'

type ToolCallFn = (t: { toolCall: ToolCall<string, any> }) => Promise<string>

export function useToolCallApprovalManager({
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
      return `Tool Call Error: ${error}`
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
        return `User rejected tool call`
      })
  }

  return {
    pendingToolCall,
    toolCallFn,
  }
}
