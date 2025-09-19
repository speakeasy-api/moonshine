import { fn } from 'storybook/test'
import { Tabs } from '.'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-screen-sm flex-col items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    selectedTab: '1',
    onTabChange: fn(),
    children: [
      <Tabs.Tab id="1" key="1" active>
        Overview
      </Tabs.Tab>,
      <Tabs.Tab id="2" key="2">
        Versions
      </Tabs.Tab>,
      <Tabs.Tab id="3" key="3">
        Logs
      </Tabs.Tab>,
      <Tabs.Tab id="4" key="4">
        Publishing
      </Tabs.Tab>,
      <Tabs.Tab id="5" key="5">
        Settings
      </Tabs.Tab>,
    ],
  },
}
