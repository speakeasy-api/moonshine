import { StoryObj, Meta } from '@storybook/react-vite'

import { Switch } from '@/components/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="m-auto mt-20 max-w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    disabled: false,
    checked: false,
  },
}
