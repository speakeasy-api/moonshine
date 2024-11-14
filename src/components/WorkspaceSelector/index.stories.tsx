import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Org, WorkspaceSelector, WorkspaceSelectorProps } from '.'
import { Container } from '@/index'

const meta = {
  title: 'Components/WorkspaceSelector',
  component: WorkspaceSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WorkspaceSelector>

export default meta
type Story = StoryObj<typeof WorkspaceSelector>

const sampleData = [
  {
    id: '1',
    label: 'speakeasy',
    workspaces: [
      {
        id: '1',
        label: 'zeus',
      },
      {
        id: '2',
        label: 'hermes',
      },
      {
        id: '3',
        label: 'poseidon',
      },
      {
        id: '4',
        label: 'athena',
      },
      {
        id: '5',
        label: 'apollo',
      },
      {
        id: '6',
        label: 'dionysus',
      },
      {
        id: '7',
        label: 'fable',
      },
      {
        id: '8',
        label: 'hercules',
      },
      {
        id: '9',
        label: 'medusa',
      },
      {
        id: '10',
        label: 'nike',
      },
      {
        id: '11',
        label: 'odysseus',
      },
      {
        id: '12',
        label: 'pandora',
      },
      {
        id: '13',
        label: 'prometheus',
      },
    ],
  },
  {
    id: '2',
    label: 'stripe',
    workspaces: [
      {
        id: '1',
        label: 'dev',
      },
      {
        id: '2',
        label: 'staging',
      },
      {
        id: '3',
        label: 'prod',
      },
      {
        id: '4',
        label: 'test',
      },
      {
        id: '5',
        label: 'staging-2',
      },
    ],
  },
]

const WorkspaceSelectorWithState = (props: Partial<WorkspaceSelectorProps>) => {
  const [orgs, setOrgs] = useState<Org[]>(sampleData)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(
    null
  )

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

      setSelectedWorkspaceId(name)
    }
  }

  return (
    <div className="h-full w-screen">
      <Container>
        <WorkspaceSelector
          orgs={orgs}
          onCreateNewWorkspace={handleCreateWorkspace}
          onSelect={setSelectedWorkspaceId}
          {...props}
        />

        <div className="mt-4">
          <b>Selected workspaceId:</b> {selectedWorkspaceId ?? 'none'}
        </div>
      </Container>
    </div>
  )
}

export const Default: Story = {
  render: () => <WorkspaceSelectorWithState />,
}
