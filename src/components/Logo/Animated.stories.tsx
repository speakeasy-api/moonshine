import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedLogo } from './Animated'

const meta: Meta<typeof AnimatedLogo> = {
  component: AnimatedLogo,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AnimatedLogo>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
}
