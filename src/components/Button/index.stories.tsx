import { Meta, StoryObj } from '@storybook/react/*'
import { Button, ButtonProps } from './'
import { PlusIcon as RadixPlusIcon } from '@radix-ui/react-icons'
import { fn as storybookActionFn } from '@storybook/test'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

const baseProps: Partial<ButtonProps> = {
  onClick: storybookActionFn(),
}

export const Default: Story = {
  args: {
    ...baseProps,
    children: 'Button',
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
  },
}

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    ...Default.args,
    variant: 'link',
  },
}

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
}

export const WithIcon: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <PlusIcon />
        Button
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
}

// Wrapper for Radix PlusIcon that allows us to bypass issue
// where the code snippet would render React.forwardRef instead of <PlusIcon />
function PlusIcon(props: React.ComponentProps<typeof RadixPlusIcon>) {
  return <RadixPlusIcon {...props} />
}

export const IconOnly: Story = {
  args: {
    ...Default.args,
    size: 'icon',
    children: <PlusIcon />,
  },
}

export const AsChild: Story = {
  args: {
    ...Default.args,
    asChild: true,
    children: <a href="#">Link</a>,
  },
}
