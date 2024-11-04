import type { Meta, StoryObj } from '@storybook/react'

import { Grid } from '.'
import { createSampleGridChildren } from '@/lib/storybookUtils'

const meta: Meta<typeof Grid> = {
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

const columnCount = 6
export const Default: Story = {
  args: {
    children: createSampleGridChildren(columnCount),
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

export const WithCustomColspan: Story = {
  args: {
    ...Default.args,
    wrap: false,
    children: createSampleGridChildren(columnCount).map((child, index) => (
      <Grid.Item
        key={child.key}
        colSpan={index === 0 ? 2 : undefined}
        {...child.props}
      >
        {index === 0 ? 'Colspan 2' : 'Colspan 1'}
      </Grid.Item>
    )),
  },
}

export const WithResponsiveColspan: Story = {
  args: {
    ...WithCustomColspan.args,
    children: createSampleGridChildren(columnCount - 1).map((child, index) => (
      <Grid.Item
        key={child.key}
        colSpan={index === 0 ? { sm: 2, md: 3, lg: 4 } : undefined}
        {...child.props}
      >
        {index === 0 ? 'Colspan 2' : 'Colspan 1'}
      </Grid.Item>
    )),
  },
}

export const WithInvalidChildren: Story = {
  args: {
    ...Default.args,
    children: [
      ...createSampleGridChildren(columnCount),
      <div key="invalid-child">Invalid child - will be dropped</div>,
    ],
  },
}
