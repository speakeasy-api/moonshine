import { PageHeader } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Badge } from '../Badge'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="m-auto max-w-full p-16">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'Speakeasy',
    subtitle:
      'Best in class API tooling for robust SDKs, Terraform Providers and End to End Testing. OpenAPI Native.',
    imageUrl: 'https://avatars.githubusercontent.com/u/91446104?s=200&v=4',
    children: [
      <div className="mt-2">
        <Badge variant="success">1m+ followers</Badge>
      </div>,
    ],
  },
}
