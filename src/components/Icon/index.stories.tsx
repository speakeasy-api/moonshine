import { StoryObj, Meta } from '@storybook/react'
import { Icon } from '.'

type Story = StoryObj<typeof Icon>

const meta: Meta<typeof Icon> = {
  component: Icon,
}

export default meta

export const Default: Story = {
  args: {
    name: 'plus',
    size: 'small',
    stroke: 'black',
  },
  parameters: {
    layout: 'centered',
  },
}

export const Responsive: Story = {
  args: {
    name: 'plus',
    size: {
      xs: 'small',
      sm: 'small',
      md: 'medium',
      lg: 'large',
      xl: 'xl',
      '2xl': '2xl',
    },
  },
}
