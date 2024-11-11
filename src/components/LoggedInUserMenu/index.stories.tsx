import { LoggedInUserMenu } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof LoggedInUserMenu> = {
  component: LoggedInUserMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoggedInUserMenu>

export const Default: Story = {
  args: {
    email: 'test@test.com',
    name: 'John Doe',
    imageUrl: 'https://robohash.org/3',
    onSignOut: fn(),
  },
  parameters: {
    layout: 'centered',
  },
}

export const WithLongName: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    name: 'Really Long Name That Should Be Truncated',
  },
}

export const WithLongEmail: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    email: 'really.really.long.email.address@test.com',
  },
}

export const NoImage: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    name: 'Trevor Smith',
    imageUrl: undefined,
  },
}
