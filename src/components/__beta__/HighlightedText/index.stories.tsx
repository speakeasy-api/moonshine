import { Color, highlightBgMap, HighlightedText, mutedBgMap } from '.'
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
    <p className="text-foreground text-lg">
      Understand how users are <HighlightedText {...args} /> your site without
      drowning in numbers
    </p>
  ),
}

export const Multiline: Story = {
  args: {
    children:
      'for solving complex problems but it also has the potential to cause harm if not used properly.',
  },
  render: (args) => (
    <p className="inline-block text-lg">
      Research into the effect of AI on society have found that AI is a powerful
      tool <HighlightedText {...args} />
    </p>
  ),
}

export const AllColors: Story = {
  args: {
    children: 'highlighted text',
  },
  render: (args) => (
    <div className="inline-flex flex-col gap-2">
      <h2>Base</h2>
      {Object.keys(highlightBgMap).map((color) => (
        <HighlightedText key={color} {...args} color={color as Color} />
      ))}

      <h2>Muted</h2>
      {Object.keys(mutedBgMap).map((color) => (
        <HighlightedText key={color} {...args} color={color as Color} muted />
      ))}
    </div>
  ),
}

export const NoAnimation: Story = {
  args: {
    children: 'highlighted text',
    animate: false,
  },
}

export const WithSelectionBox: Story = {
  args: {
    children: 'highlighted text with a selection box and handle',
    showSelectionBox: true,
    animate: true,
  },
}

export const WithSelectionBoxMultiline: Story = {
  args: {
    children:
      'highlighted text with a selection box and handle for solving complex problems but it also has the potential to cause harm if not used properly.',
    showSelectionBox: true,
    animate: false,
  },
}

export const WithSelectionBoxMultilineAnimated: Story = {
  args: {
    children:
      'highlighted text with a selection box and handle for solving complex problems but it also has the potential to cause harm if not used properly.',
    showSelectionBox: true,
    animate: true,
  },
}
