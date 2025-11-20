import { supportedLanguages } from '../../types'
import { LanguageIndicator } from '.'
import { StoryObj, Meta } from '@storybook/react-vite'

const meta: Meta<typeof LanguageIndicator> = {
  component: LanguageIndicator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LanguageIndicator>

export const Typescript: Story = {
  args: {
    language: 'typescript',
  },
}

export const Go: Story = {
  args: {
    language: 'go',
  },
}

export const Java: Story = {
  args: {
    language: 'java',
  },
}

export const Python: Story = {
  args: {
    language: 'python',
  },
}

export const Csharp: Story = {
  args: {
    language: 'csharp',
  },
}

export const Ruby: Story = {
  args: {
    language: 'ruby',
  },
}

export const PHP: Story = {
  args: {
    language: 'php',
  },
}

export const Terraform: Story = {
  args: {
    language: 'terraform',
  },
}

export const Unity: Story = {
  args: {
    language: 'unity',
  },
}

export const Swift: Story = {
  args: {
    language: 'swift',
  },
}

export const Postman: Story = {
  args: {
    language: 'postman',
  },
}

export const AllIcons: Story = {
  render: () => (
    <div className="bg-card flex w-32 flex-col flex-wrap gap-1.5 rounded-lg p-3">
      {supportedLanguages.map((language) => (
        <LanguageIndicator key={language} language={language} />
      ))}
    </div>
  ),
}

export const IndicatorOnly: Story = {
  args: {
    language: 'typescript',
    indicatorOnly: true,
  },
}
