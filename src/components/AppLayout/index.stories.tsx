import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from '.'
import { AppLayoutProvider } from './provider'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '../Button'
import { motion } from 'framer-motion'
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
        <Text variant="md">Some more bullshit text to fill the space.</Text>
      </div>
    </React.Fragment>
  )
}

export const Default: Story = {
  args: {
    children: [
      <AppLayout.Sidebar key="sidebar">
        {(collapsed) => (
          <div className="flex flex-col">
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="house" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Home
                </motion.span>
              )}
            </div>
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="settings" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Settings
                </motion.span>
              )}
            </div>
            <div className="text-muted-foreground hover:text-foreground flex h-9 cursor-pointer items-center gap-3">
              <Icon name="users" className="size-6" strokeWidth={1.25} />
              {collapsed ? null : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Users
                </motion.span>
              )}
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

export const CustomSurfaceHeader: Story = {
  name: 'Custom Surface Header',
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
