import { Attachment, PromptInput, Suggestion } from '@/components/PromptInput'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState, useCallback, useRef } from 'react'

const meta: Meta<typeof PromptInput> = {
  component: PromptInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-screen p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof PromptInput>

const WithState = (args: Story['args']) => {
  const [prompt, setPrompt] = useState(args?.prompt ?? '')
  const [attachments, setAttachments] = useState<Attachment[]>(
    args?.attachments ?? []
  )
  const [isSubmitting, setIsSubmitting] = useState(args?.isSubmitting ?? false)
  const handleSuggestionClick = useCallback((id: string) => {
    switch (id) {
      case 'learn-something-new':
        setPrompt('Teach me about the history of the internet')
        break
      case 'upload-a-screenshot':
        // trigger the file input control
        fileInputRef.current?.click()
        break
      case 'make-a-moodboard':
        setPrompt('Help me make a moodboard for my new home renovation')
        break
      default:
        setPrompt(id)
        break
    }
  }, [])

  const modifiedSuggestions: Suggestion[] =
    args?.suggestions?.map((suggestion) => ({
      ...suggestion,
      onClick: handleSuggestionClick,
    })) ?? []

  const handleAttachmentRemove = useCallback((id: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.id !== id)
    )
  }, [])

  const handleFileUpload = useCallback(async (attachments: Attachment[]) => {
    setAttachments((prevAttachments) => [
      ...prevAttachments,
      ...attachments.map((attachment) => {
        return {
          ...attachment,
          onRemove: () => handleAttachmentRemove(attachment.id),
        }
      }),
    ])
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <PromptInput
      {...args}
      prompt={prompt}
      placeholder={args?.placeholder ?? ''}
      onChange={setPrompt}
      onSubmit={() =>
        setTimeout(() => {
          setIsSubmitting(true)
        }, 500)
      }
      onFileUpload={handleFileUpload}
      suggestions={modifiedSuggestions}
      attachments={attachments}
      isSubmitting={isSubmitting}
      isDisabled={prompt !== ''}
      fileInputRef={fileInputRef}
    />
  )
}

export const Default: Story = {
  render: (args) => <WithState {...args} />,
  args: {
    placeholder: 'What is the capital of France?',
    suggestions: [
      {
        label: 'Learn something new',
        icon: 'graduation-cap',
        onClick: fn(),
        iconClassName: 'stroke-emerald-400',
        id: 'learn-something-new',
      },
      {
        label: 'Upload a screenshot',
        icon: 'image',
        onClick: fn(),
        iconClassName: 'stroke-purple-400',
        id: 'upload-a-screenshot',
      },
      {
        label: 'Make a moodboard',
        icon: 'palette',
        onClick: fn(),
        iconClassName: 'stroke-orange-400',
        id: 'make-a-moodboard',
      },
    ],
  },
}

export const WithAttachments: Story = {
  render: (args) => <WithState {...args} />,
  args: {
    ...Default.args,
    attachments: [
      {
        id: '1',
        name: 'notes.txt',
        type: 'text/plain',
        size: 1000,
        bytes: new Uint8Array([]),
        onRemove: fn(),
      },
    ],
  },
}

export const WithPrefilledPrompt: Story = {
  render: (args) => <WithState {...args} />,
  args: {
    ...Default.args,
    prompt: 'How big is the moon?',
  },
}

export const Submitting: Story = {
  render: (args) => <WithState {...args} />,
  args: {
    ...Default.args,
    isSubmitting: true,
    prompt: 'How big is the moon?',
  },
}
