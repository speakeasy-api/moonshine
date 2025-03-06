import { Navbar } from '.'
import { Meta, StoryObj } from '@storybook/react'
import type { NavItem, RenderNavItemProps } from './Slim'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'
import { faker } from '@faker-js/faker'
import { useState, useMemo } from 'react'

faker.seed(123)

const meta: Meta<typeof Navbar.Slim> = {
  component: Navbar.Slim,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta

const navItems: NavItem[] = [
  {
    id: 'new',
    active: true,
    render: ({ expanded, active, onClick }: RenderNavItemProps) => (
      <div
        className={cn(
          'bg-muted hover:bg-muted/50 relative -left-2 flex w-full flex-grow cursor-pointer flex-row items-center justify-center gap-1.5 rounded-xl border px-3',
          expanded && 'flex-grow-0 justify-start',
          active && 'bg-muted/50'
        )}
        onClick={onClick}
      >
        <Icon name="plus" className="h-full min-h-9" />

        {expanded && <span className="whitespace-nowrap">New Project</span>}
      </div>
    ),
    label: 'New',
  },
  {
    id: 'packages',
    icon: 'box',
    label: 'Packages',
  },
  {
    id: 'alerts',
    icon: 'siren',
    label: 'Alerts',
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
  },
]

export const Default: StoryObj<typeof Navbar.Slim> = {
  args: {
    navItems,
    children: (
      <div className="bg-muted min-h-screen p-6">
        {Array.from({ length: 10 }).map((_, i) =>
          i % 2 === 0 ? (
            <h1 className="mb-5 text-2xl font-bold">{faker.lorem.words(4)}</h1>
          ) : (
            <p className="mb-3" key={i}>
              {faker.lorem.paragraphs(1, '\n')}
            </p>
          )
        )}
      </div>
    ),
    defaultExpanded: false,
  },
}

const WithState = () => {
  const [activeTab, setActiveTab] = useState<string>(navItems[0].id)
  const clickableNavItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        active: item.id === activeTab,
        onClick: () => setActiveTab(item.id),
      })),
    [activeTab]
  )

  const handleItemClick = (item: NavItem) => {
    setActiveTab(item.id)
  }

  return (
    <Navbar.Slim
      navItems={clickableNavItems}
      onItemClick={handleItemClick}
      defaultExpanded={false}
    >
      <div className="bg-muted min-h-screen p-6">
        <h2 className="border-border border-b pb-4 text-2xl font-bold capitalize">
          {activeTab}
        </h2>
      </div>
    </Navbar.Slim>
  )
}

export const SlimWithState: StoryObj<typeof Navbar.Slim> = {
  render: () => <WithState />,
  name: 'With state',
}
