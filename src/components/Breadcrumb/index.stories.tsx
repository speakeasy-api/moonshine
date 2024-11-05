import { Breadcrumb } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    children: [
      <Breadcrumb.Item key="1">Home</Breadcrumb.Item>,
      <Breadcrumb.Item key="2">Products</Breadcrumb.Item>,
      <Breadcrumb.Item key="3">T-Shirts</Breadcrumb.Item>,
      <Breadcrumb.Item key="4">Cotton Crewneck T-Shirt</Breadcrumb.Item>,
      <Breadcrumb.Item key="5">Edit Details</Breadcrumb.Item>,
    ],
  },
}

export const WithCustomSeparator: Story = {
  args: {
    ...Default.args,
    separator: <div className="text-muted">{'>'}</div>,
  },
}

export const WithGap: Story = {
  args: {
    ...Default.args,
    gap: 12,
  },
}

export const WithResponsiveGap: Story = {
  args: {
    ...Default.args,
    gap: { sm: 6, md: 12 },
  },
}

export const WithInvalidChildren: Story = {
  args: {
    ...Default.args,
    children: [
      <div key="1">Will be omitted</div>,
      ...(Default.args?.children || []),
    ],
  },
}
