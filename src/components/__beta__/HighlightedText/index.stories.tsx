import { Color, highlightBgMap, HighlightedText } from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HighlightedText> = {
  component: HighlightedText,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['green', 'blue', 'yellow', 'purple', 'orange'],
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HighlightedText>

export const Default: Story = {
  args: {
    children: 'really experiencing',
  },
  render: (args) => (
    <p className="text-lg">
      Understand how users are <HighlightedText {...args} /> your site without
      drowning in numbers
    </p>
  ),
}

export const Multiline: Story = {
  args: {
    children:
      'but it also has the potential to cause harm if not used properly.',
  },
  render: (args) => (
    <p className="text-lg">
      Research into the effect of AI on society have found that AI is a powerful
      tool for solving complex problems, <HighlightedText {...args} />
    </p>
  ),
}

export const AllColors: Story = {
  args: {
    children: 'highlighted text',
  },
  render: (args) => (
    <div className="inline-flex flex-col gap-2">
      {Object.keys(highlightBgMap).map((color) => (
        <HighlightedText key={color} {...args} color={color as Color} />
      ))}
    </div>
  ),
}
