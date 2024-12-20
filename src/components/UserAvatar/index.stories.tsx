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

const baseOpts = {
  parameters: {
    layout: 'centered',
  },
}

export const Default: Story = {
  args: {
    name: 'John Doe',
    imageUrl: 'https://robohash.org/3',
  },
  ...baseOpts,
}

export const NoImageJohnDoe: Story = {
  args: {
    name: 'John Doe',
  },
  ...baseOpts,
}

export const NoImageAliceSmith: Story = {
  args: {
    name: 'Alice Smith',
  },
  ...baseOpts,
}

export const Large: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    size: 'large',
  },
}

export const ResponsiveWithImage: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    size: {
      sm: 'small',
      md: 'medium',
      lg: 'large',
      xl: 'xl',
    },
  },
}

export const ResponsiveNoImage: Story = {
  ...Default.parameters,
  args: {
    name: 'John Doe',
    size: {
      sm: 'small',
      md: 'medium',
      lg: 'large',
      xl: 'xl',
    },
    imageUrl: undefined,
  },
}
