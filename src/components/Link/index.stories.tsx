import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '.'

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Primary: Story = {
  args: {
    href: '/target',
    size: 'md',
    children: 'Link',
  },
}

export const PrimaryNoUnderline: Story = {
  args: {
    href: '/target',
    size: 'md',
    underline: false,
    children: 'Link',
  },
}

export const Secondary: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    children: 'Link',
  },
}

export const SecondaryNoUnderline: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    underline: false,
    children: 'Link',
  },
}

export const ExtraSmall: Story = {
  args: {
    href: '/target',
    size: 'xs',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    href: '/target',
    size: 'sm',
    children: 'Link',
  },
}

export const Medium: Story = {
  args: {
    href: '/target',
    size: 'md',
    children: 'Link',
  },
}

export const Large: Story = {
  args: {
    href: '/target',
    size: 'lg',
    children: 'Link',
  },
}

export const WithLeadingAndTrailingIcons: Story = {
  args: {
    href: '/target',
    size: 'md',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const WithLeadingIcon: Story = {
  args: {
    href: '/target',
    size: 'md',
    iconPrefixName: 'github',
    children: 'Link',
  },
}

export const WithTrailingIcon: Story = {
  args: {
    href: '/target',
    size: 'md',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}
