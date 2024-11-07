import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '.'
import { createSampleChildren } from '@/lib/storybookUtils'
import { alignmentOptions, directionOptions, justifyOptions } from '@/types'

const meta: Meta<typeof Stack> = {
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: alignmentOptions,
    },
    justify: {
      control: 'select',
      options: justifyOptions,
    },
    direction: {
      control: 'select',
      options: directionOptions,
    },
    gap: {
      control: 'number',
    },
  },
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

export const Padding: Story = {
  args: {
    ...Default.args,
    padding: 2,
  },
}

export const ResponsivePadding: Story = {
  args: {
    ...Default.args,
    padding: { sm: 2, md: 4, lg: 6, xl: 8 },
  },
}

export const PaddingPerSide: Story = {
  args: {
    ...Default.args,
    padding: { top: 12, right: 0, bottom: 12, left: 0 },
  },
}

export const ResponsivePaddingPerSide: Story = {
  args: {
    ...Default.args,
    padding: { sm: 0, md: 0, lg: 0, xl: { x: 10, y: 12 } },
  },
}

export const RowJustifyStart: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: 'start',
  },
}

export const RowJustifyCenter: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: 'center',
  },
}

export const RowJustifyEnd: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: 'end',
  },
}

export const RowJustifySpaceBetween: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: 'spaceBetween',
  },
}

export const RowJustifySpaceAround: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: 'spaceAround',
  },
}

export const ResponsiveJustify: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    justify: { sm: 'start', md: 'center', lg: 'end' },
  },
}

export const ResponsiveAlign: Story = {
  args: {
    ...Default.args,
    direction: 'column',
    align: { sm: 'start', md: 'center', lg: 'end' },
  },
}
