import type { Meta, StoryObj } from '@storybook/react'
import { AIChatContainer } from './AIChatContainer'
import type { ChatMessage, ToolInvocation, ToolResult } from './types'
import { useState, useEffect } from 'react'

const meta: Meta<typeof AIChatContainer> = {
  component: AIChatContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AIChatContainer>

const openApiEditingMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Can you help me add a new endpoint to my OpenAPI spec for creating a user subscription?',
      },
    ],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "I'll help you add a new endpoint for user subscriptions. First, let me check the current OpenAPI spec.",
      },
      {
        type: 'tool-invocation',
        toolInvocation: {
          toolName: 'read_file',
          toolCallId: 'read-1',
          state: 'call',
          args: {
            target_file: 'openapi.yaml',
            should_read_entire_file: true,
          },
        },
      },
      {
        type: 'tool-result',
        toolCallId: 'read-1',
        content: `openapi: 3.0.0
info:
  title: User Management API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
    post:
      summary: Create user`,
      },
      {
        type: 'text',
        text: "I'll add a new POST endpoint for creating subscriptions with proper request/response schemas.",
      },
      {
        type: 'tool-invocation',
        toolInvocation: {
          toolName: 'edit_file',
          toolCallId: 'edit-1',
          state: 'call',
          args: {
            target_file: 'openapi.yaml',
            instructions:
              'Add POST /subscriptions endpoint with request/response schemas',
            code_edit: `openapi: 3.0.0
info:
  title: User Management API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
    post:
      summary: Create user
  /subscriptions:
    post:
      summary: Create user subscription
      description: Create a new subscription for a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - userId
                - planId
              properties:
                userId:
                  type: string
                  format: uuid
                planId:
                  type: string
                startDate:
                  type: string
                  format: date
      responses:
        '201':
          description: Subscription created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  status:
                    type: string
                    enum: [active, pending]
                  createdAt:
                    type: string
                    format: date-time`,
          },
        },
      },
      {
        type: 'tool-result',
        toolCallId: 'edit-1',
        content:
          'Successfully updated openapi.yaml with new /subscriptions endpoint',
      },
      {
        type: 'text',
        text: "I've added the new POST /subscriptions endpoint. Would you like me to add any additional operations for managing subscriptions, such as GET or PUT endpoints?",
      },
    ],
  },
  {
    id: '3',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Yes, please add a GET endpoint to fetch a subscription by ID',
      },
    ],
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "I'll add a GET endpoint for retrieving individual subscriptions.",
      },
      {
        type: 'tool-invocation',
        toolInvocation: {
          toolName: 'edit_file',
          toolCallId: 'edit-2',
          state: 'call',
          args: {
            target_file: 'openapi.yaml',
            instructions: 'Add GET /subscriptions/{id} endpoint',
            code_edit: `// ... existing code ...
  /subscriptions/{id}:
    get:
      summary: Get subscription by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Subscription details
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    format: uuid
                  userId:
                    type: string
                    format: uuid
                  planId:
                    type: string
                  status:
                    type: string
                    enum: [active, pending, cancelled]
                  startDate:
                    type: string
                    format: date
                  createdAt:
                    type: string
                    format: date-time
                  updatedAt:
                    type: string
                    format: date-time
        '404':
          description: Subscription not found`,
          },
        },
      },
      {
        type: 'tool-result',
        toolCallId: 'edit-2',
        content: 'Successfully added GET /subscriptions/{id} endpoint',
      },
      {
        type: 'text',
        text: "I've added the GET endpoint with detailed response schemas and error handling. Would you like me to add any other endpoints or make any adjustments to the existing ones?",
      },
    ],
  },
]

export const OpenAPIEditing: Story = {
  args: {
    messages: openApiEditingMessages,
    isLoading: false,
    onSendMessage: (message) => console.log('Sending message:', message),
  },
}

export const Loading: Story = {
  args: {
    messages: openApiEditingMessages.slice(0, 2),
    isLoading: true,
    onSendMessage: (message) => console.log('Sending message:', message),
  },
}

export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
    onSendMessage: (message) => console.log('Sending message:', message),
  },
}

// Tool call states demonstration
const toolCallStates: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Can you help me with a tool call demonstration?',
      },
    ],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "I'll demonstrate the different states of a tool call. Let's start with a partial call.",
      },
      {
        type: 'tool-invocation',
        toolInvocation: {
          toolName: 'read_file',
          toolCallId: 'read-1',
          state: 'partial-call',
          args: {
            target_file: 'example.txt',
            should_read_entire_file: true,
          },
        },
      },
    ],
  },
]

// Create a component that cycles through tool call states
const ToolCallStateDemoComponent = () => {
  const [currentState, setCurrentState] = useState<
    'partial-call' | 'call' | 'result'
  >('partial-call')
  const [messages, setMessages] = useState<ChatMessage[]>(toolCallStates)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prevState) => {
        if (prevState === 'partial-call') return 'call'
        if (prevState === 'call') return 'result'
        return 'partial-call'
      })
    }, 5000) // Change state every 5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Update the tool call state in the messages
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages]
      const assistantMessage = newMessages[1]

      // Find the tool invocation part
      const toolInvocationIndex = assistantMessage.parts.findIndex(
        (part) => part.type === 'tool-invocation'
      )

      if (toolInvocationIndex !== -1) {
        const toolPart = assistantMessage.parts[
          toolInvocationIndex
        ] as ToolInvocation

        // Update the tool invocation state
        toolPart.toolInvocation.state = currentState

        // Handle the result state
        if (currentState === 'result') {
          // Check if we already have a result part
          const hasResultPart = assistantMessage.parts.some(
            (part) =>
              part.type === 'tool-result' &&
              part.toolCallId === toolPart.toolInvocation.toolCallId
          )

          // Add a result part if we don't have one
          if (!hasResultPart) {
            const resultPart: ToolResult = {
              type: 'tool-result',
              toolCallId: toolPart.toolInvocation.toolCallId,
              content:
                'This is the result of the tool call. It contains some example data that would normally be returned from an API.',
            }

            // Insert the result part after the tool invocation
            assistantMessage.parts.splice(
              toolInvocationIndex + 1,
              0,
              resultPart
            )
          }
        } else {
          // Remove any result parts when not in result state
          assistantMessage.parts = assistantMessage.parts.filter(
            (part) =>
              !(
                part.type === 'tool-result' &&
                part.toolCallId === toolPart.toolInvocation.toolCallId
              )
          )
        }
      }

      return newMessages
    })
  }, [currentState])

  return (
    <AIChatContainer
      messages={messages}
      isLoading={false}
      onSendMessage={(message) => console.log('Sending message:', message)}
    />
  )
}

export const ToolCallStateDemo: Story = {
  render: () => <ToolCallStateDemoComponent />,
}
