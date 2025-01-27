import { Skeleton } from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
}

export const WithComplexChildren: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Skeleton {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
          consectetur.
        </p>
      </Skeleton>
      <Skeleton {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit.
        </p>
      </Skeleton>
      <Skeleton {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </Skeleton>
    </div>
  ),
}

export const WithClassName: Story = {
  args: {
    className: 'max-w-64',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
}
