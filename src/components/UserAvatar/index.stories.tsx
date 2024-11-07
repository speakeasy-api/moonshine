import { sizes } from '@/types'
import { UserAvatar } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
  },
}

export default meta

type Story = StoryObj<typeof UserAvatar>

const baseOpts = {
  parameters: {
    layout: 'centered',
  },
}

export const Default: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://robohash.org/3',
    onSignOut: fn(),
  },
  ...baseOpts,
}

export const NoImageJohnDoe: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    onSignOut: fn(),
  },
  ...baseOpts,
}

export const NoImageAliceSmith: Story = {
  args: {
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    onSignOut: fn(),
  },
  ...baseOpts,
}

export const WithLongEmail: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe.long.email.example.com@example.com',
    onSignOut: fn(),
  },
  ...baseOpts,
}
