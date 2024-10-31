import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Command> = {
  component: Command,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Command>

export const Default: Story = {
  args: {
    className: 'border border-gray rounded-md',
    children: [
      <CommandInput placeholder="Search items..." />,
      <CommandList>
        <CommandGroup>
          {Array.from({ length: 20 }).map((_, index) => (
            <CommandItem key={index}>Item {index + 1}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>,
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}
