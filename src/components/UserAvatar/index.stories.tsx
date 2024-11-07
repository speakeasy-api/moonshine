import { sizes } from '@/types'
import { UserAvatar } from '.'
import { Meta, StoryObj } from '@storybook/react'

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

export const Default: Story = {
  args: {
    name: 'John Doe',
    imageUrl: 'https://robohash.org/3',
  },
}

export const NoImageJohnDoe: Story = {
  args: {
    name: 'John Doe',
  },
}

export const NoImageAliceSmith: Story = {
  args: {
    name: 'Alice Smith',
  },
}
