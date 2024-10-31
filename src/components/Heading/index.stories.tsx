import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from '.'

const meta: Meta<typeof Heading> = {
  component: Heading,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Heading>

export const Heading1: Story = {
  args: {
    level: 1,
    children: 'Heading level 1',
  },
}

export const Heading2: Story = {
  args: {
    level: 2,
    children: 'Heading level 2',
  },
}

export const Heading3: Story = {
  args: {
    level: 3,
    children: 'Heading level 3',
  },
}

export const Heading4: Story = {
  args: {
    level: 4,
    children: 'Heading level 4',
  },
}
