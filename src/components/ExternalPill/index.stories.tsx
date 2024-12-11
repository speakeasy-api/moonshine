import { ExternalPill } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof ExternalPill> = {
  component: ExternalPill,
}

export default meta

type Story = StoryObj<typeof ExternalPill>

export const Default: Story = {
  args: {
    href: 'https://example.com',
    icon: 'github',
    text: 'facebook/react',
  },
}

export const LongName: Story = {
  args: {
    href: 'https://example.com',
    icon: 'github',
    text: 'speakeasy-dev-sdks/speakeasy-sdk-go',
  },
}

export const Npm: Story = {
  args: {
    href: 'https://example.com',
    icon: 'npm',
    text: 'speakeasy/moonshine@1.0.8',
  },
}

export const Rubygems: Story = {
  args: {
    href: 'https://example.com',
    icon: 'rubygems',
    text: 'speakeasy-dev-sdks@1.0.8',
  },
}
