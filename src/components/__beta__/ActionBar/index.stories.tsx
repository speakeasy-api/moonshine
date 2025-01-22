import { DndContext } from '@dnd-kit/core'
import { ActionBar } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof ActionBar> = {
  component: ActionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <DndContext>
        <Story />
      </DndContext>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ActionBar>

export const Default: Story = {
  args: {
    id: 'action-bar-1',
    initialPosition: { x: 300, y: 300 },
    onChangePosition: fn(),
    onDragStart: fn(),
    onDragEnd: fn(),
    children: [
      <ActionBar.Item iconName="arrow-down">Next</ActionBar.Item>,
      <ActionBar.Item disabled iconName="arrow-up">
        Previous
      </ActionBar.Item>,
      <ActionBar.Separator />,
      <ActionBar.Item iconName="undo-2">Undo</ActionBar.Item>,
      <ActionBar.Item disabled iconName="redo-2">
        Redo
      </ActionBar.Item>,
      <ActionBar.Separator />,
      <ActionBar.Item iconName="activity">Activity</ActionBar.Item>,
    ],
  },
}

export const NonDraggable: Story = {
  args: {
    ...Default.args,
    draggable: false,
  },
}
