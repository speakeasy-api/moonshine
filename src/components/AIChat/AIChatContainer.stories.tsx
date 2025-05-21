import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { AIChatContainer } from './AIChatContainer'
import { useToolCallApproval } from './toolCallApproval'
import type { ChatMessage, ToolInvocation, ToolResult } from './types'
import { useState, useEffect, useRef } from 'react'

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

export const Customized: Story = {
  args: {
    messages: openApiEditingMessages.slice(0, 3),
    onSendMessage: (message) => console.log('Sending message:', message),
    components: {
      composer: {
        submitButton: ({ disabled, type }) => (
          <Button type={type} disabled={disabled}>
            Custom submit button
          </Button>
        ),
        additionalActions: <Button>Additional action</Button>,
      },
      message: {
        toolCall: {
          toolName: 'bg-red-500',
          input: 'bg-blue-500',
          result: 'bg-green-500',
        },
      },
    },
  },
}

const ModelSelectorDemoComponent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'What are the main differences between GPT-4 and Claude 3 Opus?',
        },
      ],
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'GPT-4 and Claude 3 Opus are both advanced language models. GPT-4 is known for its reasoning and code generation, while Claude 3 Opus excels at summarization and safety.',
        },
      ],
    },
    {
      id: '3',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'Can you summarize this text using Claude 3 Sonnet?',
        },
      ],
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Certainly! Here is a concise summary using Claude 3 Sonnet.',
        },
      ],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [model, setModel] = useState('gpt-4')

  const availableModels = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
    { label: 'Claude 3 Opus', value: 'claude-3-opus' },
    { label: 'Claude 3 Sonnet', value: 'claude-3-sonnet' },
  ]

  const handleSendMessage = async (message: string) => {
    setIsLoading(true)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        parts: [{ type: 'text', text: message }],
      },
    ])

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: `This is a simulated response from ${model}. The actual model would generate a more sophisticated response.`,
          },
        ],
      },
    ])
    setIsLoading(false)
  }

  return (
    <AIChatContainer
      messages={messages}
      isLoading={isLoading}
      onSendMessage={handleSendMessage}
      modelSelector={{
        model,
        onModelChange: setModel,
        availableModels,
      }}
    />
  )
}

export const WithModelSelector: Story = {
  render: () => <ModelSelectorDemoComponent />,
}

const ToolCallApprovalDemoComponent = () => {
  const toolCallApproval = useToolCallApproval({
    executeToolCall: async () => {
      alert('Tool call approved')
      return 'Tool call executed successfully'
    },
    requiresApproval: (toolCall) => {
      return 'Allow this file to be read?'
    },
  })

  useEffect(() => {
    toolCallApproval.toolCallFn({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toolCall: (toolCallStates[1].parts[1] as any).toolInvocation,
    })
  }, [])

  return (
    <AIChatContainer
      messages={toolCallStates.slice(0, 2)}
      toolCallApproval={toolCallApproval}
    />
  )
}

export const WithToolCallApproval: Story = {
  render: () => <ToolCallApprovalDemoComponent />,
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
    }, 1000) // Change state every 1 second

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

// Markdown rendering demonstration
const markdownRenderingMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Can you show me how markdown rendering works in the chat?',
      },
    ],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: `This message demonstrates the various markdown features supported by our enhanced chat component:

## Text Formatting

You can use **bold text**, *italic text*, and ~~strikethrough~~ text.

## Code Blocks

Inline code: \`const greeting = "Hello, world!";\`

Code block with syntax highlighting:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("User"));
\`\`\`

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > And can be nested.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Links and Images

[Link to documentation](https://example.com)

![Image description](https://via.placeholder.com/150)

## Task Lists

- [x] Completed task
- [ ] Pending task

## Horizontal Rule

---

That's all for this markdown demonstration!`,
      },
    ],
  },
]

export const MarkdownRendering: Story = {
  args: {
    messages: markdownRenderingMessages,
    isLoading: false,
    onSendMessage: (message) => console.log('Sending message:', message),
  },
}

// Auto-scrolling demonstration
const AutoScrollDemoComponent = () => {
  const initialMessages: ChatMessage[] = [
    { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello!' }] },
    {
      id: '2',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Hi there! How can I help you today?' }],
    },
    {
      id: '3',
      role: 'user',
      parts: [{ type: 'text', text: "I'm just testing the scroll behavior." }],
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Understood. This list should be long enough to require scrolling.',
        },
      ],
    },
    {
      id: '5',
      role: 'user',
      parts: [{ type: 'text', text: "Let's add a few more to be sure." }],
    },
    {
      id: '6',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Message number six.' }],
    },
    {
      id: '7',
      role: 'user',
      parts: [{ type: 'text', text: 'Message number seven.' }],
    },
    {
      id: '8',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Message number eight, this should definitely be scrollable now.',
        },
      ],
    },
    {
      id: '9',
      role: 'user',
      parts: [
        {
          type: 'text',
          text: 'Okay, I think that is enough initial messages.',
        },
      ],
    },
    {
      id: '10',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'Agreed. Ready for the new message test?' },
      ],
    },
  ]

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const messageCounter = useRef(initialMessages.length)

  const handleAddMessage = async () => {
    setIsLoading(true)
    messageCounter.current += 1
    const newMessage: ChatMessage = {
      id: `msg-${messageCounter.current}`,
      role: messageCounter.current % 2 === 0 ? 'assistant' : 'user',
      parts: [
        {
          type: 'text',
          text: `This is new message number ${messageCounter.current}.`,
        },
      ],
    }

    // Simulate some delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setIsLoading(false)
  }

  return (
    <div
      style={{
        height: '400px',
        border: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AIChatContainer
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleAddMessage} // Though we use a button, let's keep this for consistency
        className="flex-grow"
      />
      <button
        onClick={handleAddMessage}
        disabled={isLoading}
        style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer' }}
      >
        {isLoading ? 'Adding...' : 'Add New Message & Scroll'}
      </button>
    </div>
  )
}

export const AutoScrollDemo: Story = {
  render: () => <AutoScrollDemoComponent />,
}
