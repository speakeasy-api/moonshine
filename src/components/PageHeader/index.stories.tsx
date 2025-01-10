import { PageHeader } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Button } from '../Button'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="m-auto max-w-full px-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    children: [
      <PageHeader.TitleBar>
        <PageHeader.TitleArea>
          <PageHeader.Title>speakeasy-sdks / code-sample-api</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <Button variant="outline">Regenerate</Button>
          <Button variant="secondary">Action</Button>
        </PageHeader.Actions>
      </PageHeader.TitleBar>,

      <PageHeader.Footer>
        <PageHeader.FooterItem>Footer item</PageHeader.FooterItem>
        <PageHeader.FooterItem>Footer item</PageHeader.FooterItem>
        <PageHeader.FooterItem>Footer item</PageHeader.FooterItem>
      </PageHeader.Footer>,
    ],
  },
}

export const TitleOnly: Story = {
  args: {
    children: [
      <PageHeader.TitleBar>
        <PageHeader.TitleArea>
          <PageHeader.Title>speakeasy-sdks / code-sample-api</PageHeader.Title>
        </PageHeader.TitleArea>
      </PageHeader.TitleBar>,
    ],
  },
}

export const WithActions: Story = {
  args: {
    children: [
      <PageHeader.TitleBar>
        <PageHeader.TitleArea>
          <PageHeader.Title>speakeasy-sdks / code-sample-api</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <Button variant="outline">Regenerate</Button>
          <Button variant="secondary">Action</Button>
        </PageHeader.Actions>
      </PageHeader.TitleBar>,
    ],
  },
}
