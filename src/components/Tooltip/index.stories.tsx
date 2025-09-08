import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: [
      <TooltipTrigger>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>,
      <TooltipContent side="right">
        <p>You hovered me!</p>
      </TooltipContent>,
    ],
  },
}
