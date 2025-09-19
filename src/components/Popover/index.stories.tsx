import { Popover, PopoverContent, PopoverTrigger } from '.'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    children: [
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>,
      <PopoverContent align="start">
        <div>Popover Content</div>
      </PopoverContent>,
    ],
  },
}
