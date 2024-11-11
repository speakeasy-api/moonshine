import type { Meta, StoryObj } from '@storybook/react'
import { TargetLanguageIcon } from './index'
import { sizes, supportedLanguages } from '@/types'

const meta: Meta<typeof TargetLanguageIcon> = {
  title: 'Components/TargetLanguageIcon',
  component: TargetLanguageIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
    language: {
      control: 'select',
      options: supportedLanguages,
    },
  },
}

export default meta
type Story = StoryObj<typeof TargetLanguageIcon>

export const Typescript: Story = {
  args: {
    language: 'typescript',
  },
}

export const Python: Story = {
  args: {
    language: 'python',
  },
}

export const Java: Story = {
  args: {
    language: 'java',
  },
}

// Show all sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['small', 'medium', 'large', 'xl', '2xl'] as const).map((size) => (
        <TargetLanguageIcon key={size} language="typescript" size={size} />
      ))}
    </div>
  ),
  argTypes: {
    size: {
      control: false,
    },
    language: {
      control: false,
    },
  },
}

// Grid of all supported languages
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {supportedLanguages.map((lang) => (
        <TargetLanguageIcon key={lang} language={lang} />
      ))}
    </div>
  ),
}
