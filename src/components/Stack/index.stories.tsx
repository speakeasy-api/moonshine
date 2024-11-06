import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '.'
import { createSampleChildren } from '@/lib/storybookUtils'
import { alignmentOptions, directionOptions } from '@/types'

const meta: Meta<typeof Stack> = {
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      control: 'select',
      options: alignmentOptions,
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

export const AlignmentStart: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: 'start',
  },
}

export const AlignmentCenter: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: 'center',
  },
}

export const AlignmentEnd: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: 'end',
  },
}

export const AlignmentSpaceBetween: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: 'spaceBetween',
  },
}

export const AlignmentSpaceAround: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: 'spaceAround',
  },
}
export const ResponsiveAlignment: Story = {
  args: {
    ...Default.args,
    direction: 'row',
    alignment: { sm: 'end', md: 'center', lg: 'start' },
  },
}
