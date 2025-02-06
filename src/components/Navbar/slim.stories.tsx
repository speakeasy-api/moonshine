import { Navbar } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { NavItems } from './Slim'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'
import { faker } from '@faker-js/faker'

faker.seed(123)

const meta: Meta<typeof Navbar.Slim> = {
  title: 'Navbar/Slim',
  component: Navbar.Slim,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const navItems: NavItems[] = [
  {
    render: ({ expanded }) => (
      <div
        className={cn(
          'bg-muted hover:bg-muted/50 flex w-full min-w-9 flex-grow cursor-pointer flex-row items-center justify-center gap-2.5 rounded-xl border px-1.5',
          expanded && 'flex-grow-0 justify-start'
        )}
      >
        <Icon name="plus" className="h-full min-h-9" />

        {expanded && <span className="whitespace-nowrap">New Project</span>}
      </div>
    ),
    label: 'New',
    onClick: () => {},
  },
  {
    icon: 'box',
    label: 'Packages',
    onClick: () => {},
  },
  {
    icon: 'siren',
    label: 'Alerts',
    onClick: () => {},
  },
  {
    icon: 'settings',
    label: 'Settings',
    onClick: () => {},
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
