import { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from '.'
import { AppLayoutProvider } from './provider'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { Button } from '../Button'
import React, { useState } from 'react'
import { MoonshineConfigProvider } from '@/context/ConfigContext'

type Story = StoryObj<typeof AppLayout>

const meta: Meta<typeof AppLayout> = {
  title: 'Components/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
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
            <AppLayout.NavItem title="Users" icon="users" disabled />
          </AppLayout.NavItemGroup>
        </AppLayout.Nav>
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <AppLayout.HeaderDivider />
        <AppLayout.Breadcrumb>
          <AppLayout.BreadcrumbItem>Home</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem>Settings</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem active>Users</AppLayout.BreadcrumbItem>
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

const HomePage = ({
  handlePageChange,
}: {
  handlePageChange: (page: AllPages) => void
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Heading>Home</Heading>

      <Text>
        This is the home page. It's the first page you see when you open the
        app.
      </Text>

      <div>
        <Button onClick={() => handlePageChange('settings')}>
          Go to settings
        </Button>
      </div>
    </div>
  )
}

const SettingsPage = () => {
  return (
    <div>
      <Heading>Settings</Heading>

      <Text>
        This is the settings page. It's the second page you see when you open
        the app.
      </Text>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
const allPages = ['home', 'settings'] as const
type AllPages = (typeof allPages)[number]
const SurfaceTransition = () => {
  const [page, setPage] = useState<AllPages>('settings')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const handlePageChange = (newPage: AllPages) => {
    if (newPage === page || isTransitioning) return // Don't transition if already on that page or transitioning

    setIsTransitioning(true)

    // Determine direction: 'one' -> 'two' = forward (left to right), 'two' -> 'one' = backward (right to left)
    const isForward = page === 'home' && newPage === 'settings'
    const newDirection = isForward ? 'forward' : 'backward'

    // Set direction first, then start transition after a micro-task
    setDirection(newDirection)

    // Set CSS variables on document root for view transition pseudo-elements
    const slideOutTransform = isForward
      ? 'translateX(-100%)'
      : 'translateX(100%)'
    const slideInTransform = isForward
      ? 'translateX(100%)'
      : 'translateX(-100%)'

    document.documentElement.style.setProperty(
      '--slide-out-transform',
      slideOutTransform
    )
    document.documentElement.style.setProperty(
      '--slide-in-transform',
      slideInTransform
    )

    // Use setTimeout to ensure direction is applied before transition starts
    setTimeout(() => {
      document
        .startViewTransition(() => {
          setPage(newPage)
        })
        .finished.then(() => {
          console.log('Transition finished')
          setIsTransitioning(false)
        })
    }, 0)
  }

  return (
    <div>
      <style>{`
        ::view-transition-group(page-transition) {
          overflow: hidden;
        }

        ::view-transition-old(page-transition),
        ::view-transition-new(page-transition) {
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }

        ::view-transition-old(page-transition) {
          animation-name: slideOut;
        }

        ::view-transition-new(page-transition) {
          animation-name: slideIn;
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: var(--slide-out-transform, translateX(-100%));
          }
        }

        @keyframes slideIn {
          from {
            transform: var(--slide-in-transform, translateX(100%));
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      <AppLayoutProvider defaultCollapsed>
        <AppLayout>
          <AppLayout.Sidebar>
            <AppLayout.Nav>
              <AppLayout.NavItem title="Home" icon="house" />
              <AppLayout.NavItem title="Settings" icon="settings" />
              <AppLayout.NavItem title="Users" icon="users" />
            </AppLayout.Nav>
          </AppLayout.Sidebar>
          <AppLayout.SurfaceHeader>
            <AppLayout.CollapseButton />
            <AppLayout.Breadcrumb>
              <AppLayout.BreadcrumbItem
                active={page === 'home'}
                onClick={() => handlePageChange('home')}
              >
                Home
              </AppLayout.BreadcrumbItem>
              {page === 'settings' && (
                <AppLayout.BreadcrumbItem
                  active={page === 'settings'}
                  onClick={() => handlePageChange('settings')}
                >
                  Settings
                </AppLayout.BreadcrumbItem>
              )}
            </AppLayout.Breadcrumb>
          </AppLayout.SurfaceHeader>
          <AppLayout.Surface
            style={{ viewTransitionName: 'page-transition' }}
            data-direction={direction}
            className="p-4"
          >
            {page === 'home' ? (
              <HomePage handlePageChange={handlePageChange} />
            ) : (
              <SettingsPage />
            )}
          </AppLayout.Surface>
        </AppLayout>
      </AppLayoutProvider>
    </div>
  )
}
export const SurfaceTransitionStory: Story = {
  name: 'Surface Transition',
  render: () => <SurfaceTransition />,
}

export const WithFullScreenSurface: Story = {
  name: 'With Full Screen Surface',
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
      <AppLayout.Surface className="p-0" key="surface">
        <div className="bg-surface-secondary flex h-full w-full flex-col">
          <div className="flex items-center justify-center py-4">
            <Text>This is a full screen surface</Text>
          </div>

          <div className="border-neutral-default mt-auto flex items-center justify-center border-t py-4">
            <Text>
              This content is pushed to the bottom but doesn't overflow the
              viewport
            </Text>
          </div>
        </div>
      </AppLayout.Surface>,
    ],
  },
  render: (args) => (
    <AppLayoutProvider>
      <AppLayout {...args} />
    </AppLayoutProvider>
  ),
}

export const CustomExtraSidebarChildren: Story = {
  name: 'Custom Extra Sidebar Children',
  args: {
    children: [
      <AppLayout.Sidebar className="max-h-full" key="sidebar">
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
            <AppLayout.NavItem title="Users" icon="users" disabled />
          </AppLayout.NavItemGroup>
        </AppLayout.Nav>

        <AppLayout.ThemeSwitcher />
      </AppLayout.Sidebar>,
      <AppLayout.SurfaceHeader key="surface-header">
        <AppLayout.CollapseButton />
        <AppLayout.HeaderDivider />
        <AppLayout.Breadcrumb>
          <AppLayout.BreadcrumbItem>Home</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem>Settings</AppLayout.BreadcrumbItem>
          <AppLayout.BreadcrumbItem active>Users</AppLayout.BreadcrumbItem>
        </AppLayout.Breadcrumb>
      </AppLayout.SurfaceHeader>,
      <AppLayout.Surface className="p-4" key="surface">
        <SurfaceContent />
      </AppLayout.Surface>,
    ],
  },
  render: (args, context) => (
    <AppLayoutProvider>
      <MoonshineConfigProvider
        theme={context.globals.theme}
        /** TODO: support changing the storybook context value from the story */
        setTheme={(theme) => {
          console.log('theme', theme)
        }}
      >
        <AppLayout {...args} />
      </MoonshineConfigProvider>
    </AppLayoutProvider>
  ),
}
