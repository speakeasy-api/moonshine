import { Meta, StoryObj } from '@storybook/react'
import { GradientCircle } from '.'
import { useEffect, useState } from 'react'
import isChromatic from 'chromatic/isChromatic'

const meta: Meta<typeof GradientCircle> = {
  component: GradientCircle,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'xl', '2xl'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const name = 'Name'

export const Default: Story = {
  args: {
    name,
  },
}

export const Small: Story = {
  args: {
    name,
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    name,
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    name,
    size: 'large',
  },
}

export const Xl: Story = {
  args: {
    name,
    size: 'xl',
  },
}

export const WithInitial: Story = {
  args: {
    name,
    showInitial: true,
    size: '2xl',
  },
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const WithTransitionComponent = (args: Story['args']) => {
  const [name, setName] = useState(args?.name ?? '')

  useEffect(() => {
    setInterval(() => {
      setName(alphabet[Math.floor(Math.random() * alphabet.length)])
    }, 1500)
  }, [])

  return <GradientCircle {...args} name={name} />
}

export const WithTransition: Story = {
  args: {
    name,
    showInitial: true,
    transition: isChromatic() ? true : false,
    size: '2xl',
  },
  render: (args) => {
    return <WithTransitionComponent {...args} />
  },
}
