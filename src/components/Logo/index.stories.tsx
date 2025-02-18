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
  decorators: [
    (Story) => (
      <div className="w-full max-w-96">
        <Story />
      </div>
    ),
  ],
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

export const WordmarkWithClassName: Story = {
  args: {
    variant: 'wordmark',
    className: 'text-emerald-500 h-96 w-2/3 m-auto',
  },
}

export const IconWithClassName: Story = {
  args: {
    variant: 'icon',
    className: 'text-foreground size-48',
  },
  parameters: {
    layout: 'centered',
  },
}
