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
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const PrimarySilent: Story = {
  args: {
    href: '/target',
    size: 'md',
    silent: true,
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const Secondary: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const SecondarySilent: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    silent: true,
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const ExtraSmall: Story = {
  args: {
    href: '/target',
    size: 'xs',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const Small: Story = {
  args: {
    href: '/target',
    size: 'sm',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const Medium: Story = {
  args: {
    href: '/target',
    size: 'md',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const Large: Story = {
  args: {
    href: '/target',
    size: 'lg',
    iconPrefixName: 'github',
    iconSuffixName: 'external-link',
    children: 'Link',
  },
}

export const TextOnly: Story = {
  args: {
    href: '/target',
    size: 'md',
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
