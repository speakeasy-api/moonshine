import { PageHeader } from '.'
import { StoryObj, Meta } from '@storybook/react-vite'
import { Button } from '../Button'
import { Icon } from '../Icon'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
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
      <PageHeader.ContextBar key="context-area">
        <PageHeader.ParentLink href="/">Previous Page</PageHeader.ParentLink>
      </PageHeader.ContextBar>,
      <PageHeader.TitleBar key="title-bar">
        <PageHeader.TitleArea>
          <PageHeader.LeadingVisual>
            <Icon name="git-pull-request" size="large" />
          </PageHeader.LeadingVisual>
          <PageHeader.Title>speakeasy-sdks / code-sample-api</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Actions>
          <Button variant="secondary">Regenerate</Button>
          <Button variant="secondary">Action</Button>
        </PageHeader.Actions>
      </PageHeader.TitleBar>,

      <PageHeader.Footer key="footer">
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
          <Button variant="secondary">Regenerate</Button>
          <Button variant="secondary">Action</Button>
        </PageHeader.Actions>
      </PageHeader.TitleBar>,
    ],
  },
}
