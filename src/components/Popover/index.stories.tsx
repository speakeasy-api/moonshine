import { Button } from '@/index'
import { Popover, PopoverContent, PopoverTrigger } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Popover> = {
  component: Popover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Click me</Button>
      </PopoverTrigger>
      <PopoverContent>Lorem ipsum dolor sit amet.</PopoverContent>
    </Popover>
  ),
}
