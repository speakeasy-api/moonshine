import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
}
