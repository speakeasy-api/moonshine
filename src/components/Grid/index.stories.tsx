import type { Meta, StoryObj } from '@storybook/react'

import Grid from '.'
import { createSampleChildren } from '@/lib/storybookUtils'

const meta: Meta<typeof Grid> = {
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

const columnCount = 6
export const Primary: Story = {
  args: {
    children: createSampleChildren(columnCount),
    columns: columnCount,
    gap: 0,
  },
}

export const WithCustomGap: Story = {
  args: {
    ...Primary.args,
    gap: 10,
  },
}

export const WithResponsiveColumns: Story = {
  args: {
    ...Primary.args,
    columns: { sm: 1, md: 2, lg: 3 },
  },
}
