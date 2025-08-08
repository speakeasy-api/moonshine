import { Meta, StoryObj } from '@storybook/react'
import {
  SegmentedButton,
  SegmentedButtonItemProps,
  SegmentedButtonProps,
} from '.'
import { useState } from 'react'
import React from 'react'

type Story = StoryObj<typeof SegmentedButton>

const meta: Meta<typeof SegmentedButton> = {
  component: SegmentedButton,
  tags: ['autodocs'],
}

export default meta

const StoryRenderer = (args: SegmentedButtonProps) => {
  const getInitialActiveId = () => {
    let foundActiveId: string | null = null
    React.Children.forEach(args.children, (child) => {
      if (
        foundActiveId === null &&
        React.isValidElement(child) &&
        child.props.active &&
        child.props.id
      ) {
        foundActiveId = child.props.id as string
      }
    })

    if (foundActiveId) return foundActiveId

    let firstId: string | null = null
    React.Children.forEach(args.children, (child) => {
      if (firstId === null && React.isValidElement(child) && child.props.id) {
        firstId = child.props.id as string
      }
    })

    return firstId
  }

  const [activeId, setActiveId] = useState<string | null>(() =>
    getInitialActiveId()
  )
  return (
    <SegmentedButton {...args}>
      {React.Children.map(args.children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const props: SegmentedButtonItemProps = {
          id: child.props.id ?? '',
          active: child.props.id === activeId,
          children: child.props.children,
          onClick: () => setActiveId(child.props.id ?? ''),
        }
        return React.cloneElement(child, props)
      })}
    </SegmentedButton>
  )
}

export const Default: Story = {
  args: {
    children: [
      <SegmentedButton.Item id="chat">Chat</SegmentedButton.Item>,
      <SegmentedButton.Item id="split" active>
        Split
      </SegmentedButton.Item>,
      <SegmentedButton.Item id="code">Code</SegmentedButton.Item>,
    ],
  },
  render: (args) => <StoryRenderer {...args} />,
}

export const TwoItems: Story = {
  args: {
    children: [
      <SegmentedButton.Item id="chat">Chat</SegmentedButton.Item>,
      <SegmentedButton.Item id="split" active>
        Split
      </SegmentedButton.Item>,
    ],
  },
  render: (args) => <StoryRenderer {...args} />,
}

export const FourItems: Story = {
  args: {
    children: [
      <SegmentedButton.Item id="chat">Chat</SegmentedButton.Item>,
      <SegmentedButton.Item id="split" active>
        Split
      </SegmentedButton.Item>,
      <SegmentedButton.Item id="code">Code</SegmentedButton.Item>,
      <SegmentedButton.Item id="beast-mode">Beast Mode</SegmentedButton.Item>,
    ],
  },
  render: (args) => <StoryRenderer {...args} />,
}
