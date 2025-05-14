import { ToolCall } from 'ai'

export type MessageRole = 'user' | 'assistant' | 'system'

export type ToolArgs = {
  target_file?: string
  should_read_entire_file?: boolean
  query?: string
  target_directories?: string[]
  instructions?: string
  code_edit?: string
  command?: string
  is_background?: boolean
  explanation?: string
}

export type ToolInvocation = {
  type: 'tool-invocation'
  toolInvocation: {
    toolName: string
    toolCallId: string
    state: 'partial-call' | 'call' | 'result'
    args: ToolArgs
  }
}

export type ToolResult = {
  type: 'tool-result'
  toolCallId: string
  content: string
}

export type TextPart = {
  type: 'text'
  text: string
}

export type ReasoningPart = {
  type: 'reasoning'
  reasoning: string
}

export type FilePart = {
  type: 'file'
  mimeType: string
  data: string
  fileName: string
}

export type SourcePart = {
  type: 'source'
  source: {
    id: string
    url: string
    title: string
  }
}

export type MessagePart =
  | TextPart
  | ReasoningPart
  | ToolInvocation
  | ToolResult
  | FilePart
  | SourcePart

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  parts: MessagePart[]
}

export interface AIChatContextValue {
  messages: ChatMessage[]
  isLoading?: boolean
  onSendMessage?: (message: string) => void
  model?: string
  onModelChange?: (model: string) => void
  availableModels?: { label: string; value: string }[]
  toolCallApproval?: ToolCallApprovalProps
}

export interface BasePartProps {
  className?: string
}

export type ToolCallWithApproval = ToolCall<string, any> & {
  approve: () => void
  reject: () => void
}

export interface ToolCallApprovalProps {
  pendingToolCall: ToolCallWithApproval | null
}
