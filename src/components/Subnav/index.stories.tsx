import { Subnav } from '.'

import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Subnav> = {
  component: Subnav,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Subnav>

const defaultRenderItem = (item: { label: string; href: string }) => (
  <div className="px-4 py-2 text-sm">{item.label}</div>
)

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    renderItem: defaultRenderItem,
  },
}

export const ManyItems: Story = {
  args: {
    renderItem: defaultRenderItem,
    items: Array.from({ length: 12 }, (_, index) => ({
      label: `Item ${index + 1}`,
      href: `/item-${index + 1}`,
      active: index === 0,
    })),
  },
}
