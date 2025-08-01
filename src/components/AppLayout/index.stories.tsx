import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from '.'

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
      <AppLayout.Sidebar>
        <div className="flex flex-col gap-2">
          <div>Home</div>
          <div>Settings</div>
          <div>Users</div>
        </div>
      </AppLayout.Sidebar>,
      <AppLayout.Surface>
        <AppLayout.Breadcrumb>
          <AppLayout.BreadcrumbItem>Home</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem active>Settings</AppLayout.BreadcrumbItem>
        </AppLayout.Breadcrumb>
      </AppLayout.Surface>,
    ],
  },
}
