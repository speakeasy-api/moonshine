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
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const PrimarySilent: Story = {
  args: {
    href: '/target',
    size: 'md',
    silent: true,
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const Secondary: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const SecondarySilent: Story = {
  args: {
    href: '/target',
    size: 'md',
    variant: 'secondary',
    silent: true,
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const ExtraSmall: Story = {
  args: {
    href: '/target',
    size: 'xs',
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const Small: Story = {
  args: {
    href: '/target',
    size: 'sm',
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const Medium: Story = {
  args: {
    href: '/target',
    size: 'md',
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}

export const Large: Story = {
  args: {
    href: '/target',
    size: 'lg',
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
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
    children: [
      <Link.Icon key="leading-icon" name="github" />,
      <Link.Text key="text">Link</Link.Text>,
    ],
  },
}

export const WithTrailingIcon: Story = {
  args: {
    href: '/target',
    size: 'md',
    children: [
      <Link.Text key="text">Link</Link.Text>,
      <Link.Icon key="trailing-icon" name="external-link" />,
    ],
  },
}
