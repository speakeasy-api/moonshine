import { LoggedInUserMenu } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof LoggedInUserMenu> = {
  component: LoggedInUserMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoggedInUserMenu>

export const Default: Story = {
  args: {},
}
