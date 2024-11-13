import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WorkspaceSelector } from '.'

const meta = {
  title: 'Components/WorkspaceSelector',
  component: WorkspaceSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WorkspaceSelector>

export default meta
type Story = StoryObj<typeof WorkspaceSelector>

const WorkspaceSelectorWithState = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    string | undefined
  >(undefined)
  const [workspaces, setWorkspaces] = useState<
    {
      id: string
      label: string
      value: string
      options: {
        id: string
        label: string
        value: string
      }[]
    }[]
  >([
    {
      id: '1',
      label: 'Personal',
      value: '1',
      options: [
        { id: '2', label: 'Work', value: '2' },
        { id: '3', label: 'Side Projects', value: '3' },
      ],
    },
  ])

  const handleCreateWorkspace = (name: string) => {
    const newWorkspace = {
      id: String(workspaces.length + 1),
      label: name,
      value: '1',
      options: [],
    }
    setWorkspaces([...workspaces, newWorkspace])
    setSelectedWorkspace(newWorkspace.id)
  }

  return (
    <WorkspaceSelector
      groups={workspaces}
      value={selectedWorkspace}
      onValueChange={setSelectedWorkspace}
      onCreateNewItem={handleCreateWorkspace}
    />
  )
}

export const Default: Story = {
  render: () => <WorkspaceSelectorWithState />,
}
