import { KeyHint } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof KeyHint> = {
  component: KeyHint,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof KeyHint>

export const Default: Story = {
  args: {
    modifiers: ['ctrlorcommand'],
    keys: ['g'],
    actionText: 'to enter manual mode',
  },
}

export const WithMultipleKeys: Story = {
  args: {
    modifiers: ['ctrlorcommand'],
    keys: ['g', 'm'],
    actionText: 'to group manually',
  },
}

export const WithMultipleModifiers: Story = {
  args: {
    modifiers: ['ctrlorcommand', 'alt'],
    keys: ['g'],
    actionText: 'to group manually',
  },
}

export const WithCustomTitle: Story = {
  args: {
    titleText: 'Editor Hotkeys',
    modifiers: ['ctrlorcommand'],
    keys: ['g'],
    actionText: 'to enter manual mode',
  },
}
