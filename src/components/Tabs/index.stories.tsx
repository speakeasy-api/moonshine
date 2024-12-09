import { Tabs } from '.'
import { Meta, StoryObj } from '@storybook/react'

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
    children: [
      <Tabs.Tab key="1" active>
        Overview
      </Tabs.Tab>,
      <Tabs.Tab key="2">Versions</Tabs.Tab>,
      <Tabs.Tab key="3">Logs</Tabs.Tab>,
      <Tabs.Tab key="4">Publishing</Tabs.Tab>,
      <Tabs.Tab key="5">Settings</Tabs.Tab>,
    ],
  },
}
