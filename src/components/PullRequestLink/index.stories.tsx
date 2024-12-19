import { PullRequestLink } from '.'
import { StoryObj, Meta } from '@storybook/react/*'

const meta: Meta<typeof PullRequestLink> = {
  component: PullRequestLink,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof PullRequestLink> = {
  args: {
    href: 'https://github.com/speakeasy-api/speakeasy/pull/123',
    prNumber: 123,
  },
}

export const Closed: StoryObj<typeof PullRequestLink> = {
  ...Default.args,
  args: {
    ...Default.args,
    status: 'closed',
  },
}

export const Merged: StoryObj<typeof PullRequestLink> = {
  ...Default.args,
  args: {
    ...Default.args,
    status: 'merged',
  },
}
