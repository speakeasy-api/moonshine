import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Org, WorkspaceSelector, WorkspaceSelectorProps } from '.'

const meta = {
  title: 'Components/WorkspaceSelector',
  component: WorkspaceSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WorkspaceSelector>

export default meta
type Story = StoryObj<typeof WorkspaceSelector>

const WorkspaceSelectorWithState = (props: Partial<WorkspaceSelectorProps>) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    string | undefined
  >(undefined)
  const [orgs, setOrgs] = useState<Org[]>([
    {
      id: '1',
      label: '@speakeasy/self',
      workspaces: [
        { id: '2', label: 'test-vrt' },
        { id: '3', label: 'nolan-test' },
      ],
    },
    {
      id: '2',
      label: '@speakeasy/misc',
      workspaces: [
        { id: '4', label: 'Project Zeus' },
        { id: '5', label: 'BAU' },
      ],
    },
  ])

  const handleCreateWorkspace = (orgId: string, name: string) => {
    const existingOrg = orgs.find((org) => org.id === orgId)
    if (existingOrg) {
      setOrgs(
        orgs.map((org) =>
          org.id === existingOrg.id
            ? {
                ...org,
                workspaces: [
                  ...org.workspaces,
                  {
                    id: name,
                    label: name,
                  },
                ],
              }
            : org
        )
      )
      setSelectedWorkspace(name)
    }
  }

  return (
    <WorkspaceSelector
      orgs={orgs}
      value={selectedWorkspace}
      onValueChange={setSelectedWorkspace}
      onCreateNewWorkspace={handleCreateWorkspace}
      {...props}
    />
  )
}

export const Default: Story = {
  render: () => <WorkspaceSelectorWithState />,
}

export const AsPopover: Story = {
  render: () => <WorkspaceSelectorWithState asPopover={true} />,
}
