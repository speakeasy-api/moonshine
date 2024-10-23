import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '.'
import { createSampleChildren } from '@/lib/storybookUtils'

const meta: Meta<typeof Stack> = {
  component: Stack,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  args: {
    children: createSampleChildren(3),
    gap: 0,
  },
}

export const WithCustomGap: Story = {
  args: {
    ...Default.args,
    gap: 5,
  },
}

export const RowDirection: Story = {
  args: {
    ...Default.args,
    direction: 'row',
  },
}

export const ResponsiveDirection: Story = {
  args: {
    ...Default.args,
    direction: { sm: 'column', md: 'row' },
  },
}

export const ResponsiveGap: Story = {
  args: {
    ...Default.args,
    gap: { sm: 2, md: 5, lg: 10, xl: 12 },
  },
}
