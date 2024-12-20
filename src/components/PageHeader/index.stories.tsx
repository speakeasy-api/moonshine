import { PageHeader } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Badge } from '../Badge'
import { Facepile } from '../Facepile'

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
    image: 'https://avatars.githubusercontent.com/u/91446104?s=200&v=4',
    children: [
      <div className="mt-2">
        <Badge variant="success">1.5m followers</Badge>
      </div>,
    ],
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Speakeasy',
    image: 'https://avatars.githubusercontent.com/u/91446104?s=200&v=4',
    children: [
      <div className="mt-2">
        <Badge variant="success">1.5m followers</Badge>
      </div>,
    ],
  },
}

export const WithFacepileSubheader: Story = {
  args: {
    title: 'Speakeasy',
    subtitle: (
      <Facepile
        avatars={[
          {
            name: 'Alice Johnson',
            imageUrl: 'https://picsum.photos/id/10/200',
          },
          { name: 'Bob Smith', imageUrl: 'https://picsum.photos/id/20/200' },
          {
            name: 'Charlie Brown',
            imageUrl: 'https://picsum.photos/id/30/200',
          },
          { name: 'Diana Ross', imageUrl: 'https://picsum.photos/id/40/200' },
          {
            name: 'Edward Norton',
            imageUrl: 'https://picsum.photos/id/50/200',
          },
          { name: 'Fiona Apple', imageUrl: 'https://picsum.photos/id/60/200' },
          {
            name: 'George Clooney',
            imageUrl: 'https://picsum.photos/id/70/200',
          },
        ]}
        avatarSize="small"
      />
    ),
    image: 'https://avatars.githubusercontent.com/u/91446104?s=200&v=4',
    children: [
      <div className="mt-2">
        <Badge variant="success">1.5m followers</Badge>
      </div>,
    ],
  },
}
