import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '.'
import { useState } from 'react'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative h-[600px] w-full">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    label: 'SDK Navigation',
    children: [
      <Sidebar.Item iconName="layout-dashboard" label="Overview" isSelected />,
      <Sidebar.Item iconName="gauge" label="SDK Quality" />,
      <Sidebar.Item iconName="github" label="Github" />,
      <Sidebar.Item iconName="file-stack" label="Versions" badge={3} />,
      <Sidebar.Item iconName="file-json" label="API Spec" />,
      <Sidebar.Item iconName="activity" label="Logs" />,
    ],
  },
}

export const WithLongLabels: Story = {
  args: {
    label: 'Navigation with long labels',
    children: [
      <Sidebar.Item
        iconName="layout-dashboard"
        label="This is a very long label that should truncate nicely"
        isSelected
      />,
      <Sidebar.Item
        iconName="gauge"
        label="Another extremely long label that demonstrates truncation behavior"
      />,
      <Sidebar.Item iconName="file-stack" label="Short one" badge={99} />,
    ],
  },
}

export const WithBadges: Story = {
  args: {
    label: 'Navigation with badges',
    children: [
      <Sidebar.Item iconName="mail" label="Inbox" badge={24} isSelected />,
      <Sidebar.Item iconName="bell" label="Notifications" badge={5} />,
      <Sidebar.Item iconName="message-square" label="Messages" badge={99} />,
      <Sidebar.Item iconName="circle-alert" label="Alerts" badge={1} />,
    ],
  },
}

export const WithClickHandlers: Story = {
  args: {
    label: 'Interactive Navigation',
    children: [
      <Sidebar.Item
        iconName="layout-dashboard"
        label="Overview"
        isSelected
        onClick={() => alert('Overview clicked!')}
      />,
      <Sidebar.Item
        iconName="settings"
        label="Settings"
        onClick={() => alert('Settings clicked!')}
      />,
    ],
  },
}

const InteractiveSidebarExample = () => {
  const [selectedItem, setSelectedItem] = useState('overview')

  return (
    <Sidebar label="Interactive Navigation">
      <Sidebar.Item
        iconName="layout-dashboard"
        label="Overview"
        isSelected={selectedItem === 'overview'}
        onClick={() => setSelectedItem('overview')}
      />
      <Sidebar.Item
        iconName="gauge"
        label="SDK Quality"
        isSelected={selectedItem === 'quality'}
        onClick={() => setSelectedItem('quality')}
      />
      <Sidebar.Item
        iconName="github"
        label="Github"
        isSelected={selectedItem === 'github'}
        onClick={() => setSelectedItem('github')}
      />
      <Sidebar.Item
        iconName="file-stack"
        label="Versions"
        badge={3}
        isSelected={selectedItem === 'versions'}
        onClick={() => setSelectedItem('versions')}
      />
    </Sidebar>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveSidebarExample />,
}
