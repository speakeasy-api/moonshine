import { Logo } from '.'

import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Logo>

export const Wordmark: Story = {
  args: {
    variant: 'wordmark',
  },
}

export const Icon: Story = {
  args: {
    variant: 'icon',
  },
}

export const MutedIcon: Story = {
  args: {
    variant: 'icon',
    muted: true,
  },
}

export const MutedWordmark: Story = {
  args: {
    variant: 'wordmark',
    muted: true,
  },
}
