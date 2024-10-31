import { Button } from '@/index'
import { Popover, PopoverContent, PopoverTrigger } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Heading } from '../Heading'
import { Text } from '../Text'

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
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-6" align="start">
        <Heading level={2}>Popover</Heading>
        <Text variant="p">
          Popover is a component that displays a popover when triggered.
        </Text>
      </PopoverContent>
    </Popover>
  ),
}
