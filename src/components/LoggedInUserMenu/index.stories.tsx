import { LoggedInUserMenu } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { fn, userEvent, within, screen, expect } from '@storybook/test'
import { Icon } from '../Icon'

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

export const ExtraMenuItem: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    children: [
      <LoggedInUserMenu.MenuItem onSelect={() => {}} key="billing">
        <Icon name="wallet-cards" />
        Billing
      </LoggedInUserMenu.MenuItem>,
    ],
  },
}

export const MultipleExtraMenuItems: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    children: [
      <LoggedInUserMenu.MenuItem onSelect={() => {}} key="billing">
        <Icon name="wallet-cards" />
        Billing
      </LoggedInUserMenu.MenuItem>,
      <LoggedInUserMenu.MenuItem onSelect={() => {}} key="api-keys">
        <Icon name="key-round" />
        Api Keys
      </LoggedInUserMenu.MenuItem>,
    ],
  },
}

export const Interactive: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    onSignOut: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'), { delay: 500 })
    await userEvent.click(screen.getByText('Logout'))

    expect(Interactive.args?.onSignOut).toHaveBeenCalled()
  },
}
