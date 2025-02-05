import { Navbar } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { NavItems } from './Slim'
import { Icon } from '../Icon'

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
      <div className="bg-muted flex w-full max-w-full flex-col items-center rounded-xl border px-3 py-1.5">
        <Icon name="plus" className="size-5" />

        {expanded && <span>New</span>}
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
    children: <div className="bg-muted min-h-screen p-6">Hello</div>,
    defaultExpanded: false,
  },
}

export const Vertical: StoryObj<typeof Navbar.Slim> = {
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
}
