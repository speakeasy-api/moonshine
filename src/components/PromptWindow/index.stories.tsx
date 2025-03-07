import { PromptWindow, Suggestion } from '@/components/PromptWindow'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState, useCallback } from 'react'

const meta: Meta<typeof PromptWindow> = {
  component: PromptWindow,
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

type Story = StoryObj<typeof PromptWindow>

const WithState = (args: Story['args']) => {
  const [prompt, setPrompt] = useState('')

  const handleSuggestionClick = useCallback((id: string) => {
    switch (id) {
      case 'learn-something-new':
        setPrompt('Teach me about the history of the internet')
        break
      case 'upload-a-screenshot':
        setPrompt('TODO: Upload a screenshot')
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

  const handleFileUpload = useCallback(async (files: File[]) => {
    // try to extract a prompt from the file
    const file = files[0]
    const text = await file.text()
    setPrompt(text)
  }, [])

  return (
    <PromptWindow
      {...args}
      prompt={prompt}
      placeholder={args?.placeholder ?? ''}
      onChange={setPrompt}
      onSubmit={fn()}
      onFileUpload={handleFileUpload}
      suggestions={modifiedSuggestions}
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
