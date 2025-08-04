import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from '.'
import { AppLayoutProvider } from './provider'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Icon } from '../Icon'

type Story = StoryObj<typeof AppLayout>

const meta: Meta<typeof AppLayout> = {
  title: 'Components/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-svh w-full">
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default: Story = {
  args: {
    children: [
      <AppLayout.Sidebar key="sidebar">
        {(collapsed) => (
          <div className="flex flex-col">
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="house" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : <span>Home</span>}
            </div>
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="settings" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : <span>Settings</span>}
            </div>
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="users" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : <span>Users</span>}
            </div>
          </div>
        )}
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <AppLayout.HeaderDivider />
        <AppLayout.Breadcrumb>
          <AppLayout.BreadcrumbItem>Home</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem active>Settings</AppLayout.BreadcrumbItem>
        </AppLayout.Breadcrumb>
      </AppLayout.SurfaceHeader>,
      <AppLayout.Surface className="p-4" key="surface">
        <Heading>Hello this is a surface</Heading>
        <Text variant="lg">
          A surface is like a piece of paper that you can write on.
        </Text>
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider defaultCollapsed>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}
