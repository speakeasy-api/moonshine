import { Skeleton } from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    children: [
      <p>
        Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
        consectetur.
      </p>,
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit.
      </p>,
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>,
    ],
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

        <div className="flex flex-row gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </Skeleton>
    </div>
  ),
}

export const WithEmptyChildren: Story = {
  args: {
    children: [
      <div className="bg-muted h-5 w-60 rounded-lg" />,
      <div className="bg-muted h-5 w-48 rounded-lg" />,
      <div className="bg-muted h-5 w-40 rounded-lg" />,
    ],
  },
}

export const WithClassName: Story = {
  args: {
    className: 'bg-muted/50',
    children: [
      <p>
        Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
        consectetur.
      </p>,
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit.
      </p>,
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>,
    ],
  },
}
