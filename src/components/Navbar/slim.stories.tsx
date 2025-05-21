import { Navbar } from '.'
import { Meta, StoryObj } from '@storybook/react'
import type { NavItem } from './Slim'
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
      <div className="bg-muted h-screen">
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
    label: 'New',
    icon: 'plus',
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

const DefaultContent = () => (
  <div className="bg-muted min-h-screen p-6">
    {Array.from({ length: 10 }).map((_, i) =>
      i % 2 === 0 ? (
        <h1 key={i} className="mb-5 text-2xl font-bold">
          {faker.lorem.words(4)}
        </h1>
      ) : (
        <p key={i} className="mb-3">
          {faker.lorem.paragraphs(1, '\n')}
        </p>
      )
    )}
  </div>
)

export const Default: StoryObj<typeof Navbar.Slim> = {
  render: () => (
    <Navbar.Slim navItems={navItems}>
      <DefaultContent />
    </Navbar.Slim>
  ),
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
    <Navbar.Slim navItems={clickableNavItems} onItemClick={handleItemClick}>
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
