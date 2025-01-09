import { PullRequestPreview, PullRequestPreviewProps } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { ExternalPill } from '../ExternalPill'

const meta: Meta<typeof PullRequestPreview> = {
  component: PullRequestPreview,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PullRequestPreview>

const defaultProps: PullRequestPreviewProps = {
  trigger: (
    <ExternalPill
      href="https://github.com/speakeasy-api/speakeasy"
      icon="github"
      text="#1829 feat: add new feature"
    />
  ),
  number: 123,
  title: 'feat: add amazing new feature',
  description:
    'Adds an amazing new feature which fixes all of the issues ever, and also makes us millions of dollars.',
  status: 'open',
  baseBranch: 'main',
  headBranch: 'feature/my-feature',
  createdAt: '2024-12-01',
  canMerge: true,
  githubOrg: 'speakeasy-api',
  githubRepo: 'speakeasy',
}

export const Default: Story = {
  args: defaultProps,
}

export const CanMerge: Story = {
  args: {
    ...defaultProps,
    canMerge: true,
  },
}

export const CannotMerge: Story = {
  args: {
    ...defaultProps,
    canMerge: false,
  },
}

export const NoDescription: Story = {
  args: {
    ...defaultProps,
    description: undefined,
  },
}

export const LongDescription: Story = {
  args: {
    ...defaultProps,
    description: `Adds an amazing new feature which fixes all of the issues ever, and also makes us millions of dollars.
      This is a really long description that should wrap to the next line.
      `,
  },
}

export const Closed: Story = {
  args: {
    ...defaultProps,
    status: 'closed',
  },
}

export const Merged: Story = {
  args: {
    ...defaultProps,
    status: 'merged',
  },
}
