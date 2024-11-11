import { CodeSnippet } from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CodeSnippet> = {
  component: CodeSnippet,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CodeSnippet>

export const Default: Story = {
  args: {
    code: 'console.log("Hello, world!")',
    language: 'javascript',
    copyable: true,
  },
}

export const Python: Story = {
  args: {
    code: 'print("Hello, world!")',
    language: 'python',
    copyable: true,
  },
}

export const TypescriptMultiline: Story = {
  args: {
    code: `type User = {
  name: string
  age: number
}`,
    language: 'typescript',
    copyable: true,
  },
}
