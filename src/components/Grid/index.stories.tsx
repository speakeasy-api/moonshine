import type { Meta, StoryObj } from '@storybook/react'

import { Grid } from '.'
import { createSampleChildren } from '@/lib/storybookUtils'

const meta: Meta<typeof Grid> = {
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

const columnCount = 6
export const Default: Story = {
  args: {
    children: createSampleChildren(columnCount),
    columns: columnCount,
    gap: 5,
  },
}

export const WithCustomGap: Story = {
  args: {
    ...Default.args,
    gap: 10,
  },
}

export const WithResponsiveColumns: Story = {
  args: {
    ...Default.args,
    columns: { sm: 1, md: 2, lg: 3 },
  },
}
