import { Subnav } from '.'

import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Subnav> = {
  component: Subnav,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Subnav>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    renderItem: (item) => item.label,
  },
}

export const ManyItems: Story = {
  args: {
    renderItem: (item) => item.label,
    items: Array.from({ length: 12 }, (_, index) => ({
      label: `Item ${index + 1}`,
      href: `/item-${index + 1}`,
      active: index === 0,
    })),
  },
}

export const IndicatorDoesNotMoveOnHover: Story = {
  args: {
    ...ManyItems.args,
    indicatorMovesOnHover: false,
  },
}
