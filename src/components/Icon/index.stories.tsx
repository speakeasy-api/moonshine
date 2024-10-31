import { StoryObj, Meta } from '@storybook/react'
import { Icon } from '.'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

type Story = StoryObj<typeof Icon>

const meta: Meta<typeof Icon> = {
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(dynamicIconImports),
    },
  },
}

export default meta

export const Default: Story = {
  args: {
    name: 'plus',
    size: 'xl',
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

export const Animate: Story = {
  args: {
    name: 'baby',
    size: '2xl',
    stroke: 'blue',
    className: 'animate-bounce',
  },
  decorators: [(Story) => <div className="p-10">{Story()}</div>],
}
