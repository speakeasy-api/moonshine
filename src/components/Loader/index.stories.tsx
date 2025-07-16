import { Meta, StoryObj } from '@storybook/react/*'
import { Loader } from '.'

const meta: Meta<typeof Loader> = {
  component: Loader,
  decorators: [
    (Story) => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {
  render: () => <Loader />,
}

export const WithClassName: Story = {
  render: () => <Loader className="size-40" />,
}
