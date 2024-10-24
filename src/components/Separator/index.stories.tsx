import { Meta, StoryObj } from '@storybook/react/*'
import { Separator } from './'

const meta: Meta<typeof Separator> = {
  component: Separator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Separator>

const defaultDecorator = (Story: React.ComponentType) => (
  <div className="flex h-20 items-center justify-center">
    <Story />
  </div>
)

export const Horizontal: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [defaultDecorator],
}

const verticalDecorator = (Story: React.ComponentType) => (
  // TODO: Make the height handling better between autodocs and stories
  <div className="flex h-[400px] w-full items-center justify-center">
    <Story />
  </div>
)

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [verticalDecorator],
}
