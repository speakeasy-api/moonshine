import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Icon } from '../Icon'

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: [
      <DropdownMenuTrigger asChild>
        <Button>Open</Button>
      </DropdownMenuTrigger>,
      <DropdownMenuContent align="start" className="max-w-64">
        <DropdownMenuLabel>
          <Stack direction="column" gap={1}>
            <div>Jane Smith</div>
            <div className="text-muted-foreground text-sm font-normal">
              jane@example.com
            </div>
          </Stack>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="cursor-pointer">
          <Stack direction="row" gap={2} align="center">
            <Icon name="log-out" />
            <span>Log out</span>
          </Stack>
        </DropdownMenuItem>
      </DropdownMenuContent>,
    ],
  },
}
