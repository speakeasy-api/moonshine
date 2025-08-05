import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from '.'
import { AppLayoutProvider } from './provider'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '../Button'
import React from 'react'

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

const SurfaceContent = () => {
  return (
    <React.Fragment>
      <Heading>Hello this is a surface</Heading>
      <div className="flex flex-col gap-1">
        <Text variant="md">A surface is like a piece of paper.</Text>
        <Text variant="md">
          A surface should have a tactile feel to it, like your first school
          diary. It should evoke a sense of nostalgia and warmth.
        </Text>
      </div>
    </React.Fragment>
  )
}

export const Default: Story = {
  args: {
    children: [
      <AppLayout.Sidebar key="sidebar">
        <AppLayout.Nav>
          <AppLayout.NavItem
            onClick={() => alert('Home')}
            title="Home"
            icon="house"
          />
          <AppLayout.NavItem
            onClick={() => alert('Settings')}
            title="Settings"
            icon="settings"
          />
          <AppLayout.NavItem
            onClick={() => alert('Users')}
            title="Users"
            icon="users"
          />
        </AppLayout.Nav>
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <AppLayout.HeaderDivider />
        <AppLayout.Breadcrumb>
          <AppLayout.BreadcrumbItem onClick={() => alert('Home')}>
            Home
          </AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem active>Settings</AppLayout.BreadcrumbItem>
        </AppLayout.Breadcrumb>
      </AppLayout.SurfaceHeader>,
      <AppLayout.Surface className="p-4" key="surface">
        <SurfaceContent />
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider defaultCollapsed>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}

export const WithHeader: Story = {
  name: 'With Header',
  args: {
    children: [
      <AppLayout.Header key="header" className="p-3">
        <Text variant="sm">This layout is in beta.</Text>
      </AppLayout.Header>,
      <AppLayout.Sidebar key="sidebar">
        <AppLayout.Nav>
          <AppLayout.NavItem
            onClick={() => alert('Home')}
            title="Home"
            icon="house"
          />
          <AppLayout.NavItem title="Settings" icon="settings" />
          <AppLayout.NavItem title="Users" icon="users" />
        </AppLayout.Nav>
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <div className="mr-1 ml-auto flex items-center gap-3">
          <Button variant="outline">
            <Icon name="circle-plus" className="size-4" strokeWidth={1.25} />
            <span>Add new</span>
          </Button>
        </div>
      </AppLayout.SurfaceHeader>,
      <AppLayout.Surface className="p-4" key="surface">
        <SurfaceContent />
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}

export const WithNavItemGroups: Story = {
  name: 'With Nav Item Groups',
  args: {
    children: [
      <AppLayout.Sidebar key="sidebar">
        <AppLayout.Nav>
          <AppLayout.NavItemGroup name="General">
            <AppLayout.NavItem
              onClick={() => alert('Home')}
              title="Home"
              icon="house"
            />
            <AppLayout.NavItem title="Settings" icon="settings" />
            <AppLayout.NavItem title="Users" icon="users" />
          </AppLayout.NavItemGroup>
          <AppLayout.NavItemGroup name="Activity">
            <AppLayout.NavItem title="Activity" icon="activity" />
            <AppLayout.NavItem title="Notifications" icon="bell" />
            <AppLayout.NavItem title="Messages" icon="message-circle" />
          </AppLayout.NavItemGroup>
        </AppLayout.Nav>
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
        <SurfaceContent />
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}

export const CustomSurfaceHeader: Story = {
  name: 'Custom Surface Header',
  args: {
    children: [
      <AppLayout.Sidebar key="sidebar">
        <AppLayout.Nav>
          <AppLayout.NavItem
            onClick={() => alert('Home')}
            title="Home"
            icon="house"
          />
          <AppLayout.NavItem
            onClick={() => alert('Settings')}
            title="Settings"
            icon="settings"
          />
          <AppLayout.NavItem
            onClick={() => alert('Users')}
            title="Users"
            icon="users"
          />
        </AppLayout.Nav>
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <div className="mr-1 ml-auto flex items-center gap-3">
          <Button variant="outline">
            <Icon name="circle-plus" className="size-4" strokeWidth={1.25} />
            <span>Add new</span>
          </Button>
        </div>
      </AppLayout.SurfaceHeader>,
      <AppLayout.Surface className="p-4" key="surface">
        <SurfaceContent />
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider defaultCollapsed>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}
