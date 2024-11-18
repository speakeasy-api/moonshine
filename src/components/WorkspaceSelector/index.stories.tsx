import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Org, Workspace, WorkspaceSelector, WorkspaceSelectorProps } from '.'
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
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  )
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null)

  const handleCreateWorkspace = async (
    o: Org,
    name: string
  ): Promise<boolean> => {
    const existingOrg = orgs.find((org) => org.id === o.id)
    if (existingOrg) {
      setSelectedOrg(existingOrg)
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

      setSelectedWorkspace({
        id: name,
        label: name,
      })

      return true
    }

    return false
  }

  return (
    <div className="h-full w-screen">
      <Container>
        <WorkspaceSelector
          orgs={orgs}
          onCreate={handleCreateWorkspace}
          onSelect={(org, workspace) => {
            setSelectedOrg(org)
            setSelectedWorkspace(workspace)
          }}
          recents={props.recents ?? []}
          {...props}
        />

        <div className="border-border mt-8 flex flex-col gap-2 border-t pt-4">
          <b>Selected org:</b> {selectedOrg?.label ?? 'none'}
          <b>Selected workspaceId:</b> {selectedWorkspace?.label ?? 'none'}
        </div>
      </Container>
    </div>
  )
}

export const Default: Story = {
  render: () => <WorkspaceSelectorWithState />,
}

export const WithOneOrg: Story = {
  render: () => <WorkspaceSelectorWithState orgs={sampleData.slice(0, 1)} />,
}

export const WithOneOrgAndAFewWorkspaces: Story = {
  render: () => {
    const org = Object.assign({}, sampleData[0])
    org.workspaces = org.workspaces.slice(0, 3)
    return <WorkspaceSelectorWithState orgs={[org]} />
  },
}

export const WithRecents: Story = {
  render: () => {
    const firstOrg = Object.assign({}, sampleData[0])
    firstOrg.workspaces = firstOrg.workspaces.slice(0, 1)
    const secondOrg = Object.assign({}, sampleData[1])
    secondOrg.workspaces = secondOrg.workspaces.slice(0, 2)
    const recents = [firstOrg, secondOrg]
    return <WorkspaceSelectorWithState recents={recents} />
  },
}

export const WithManyOrgs: Story = {
  render: () => {
    const manyOrgs = Array.from({ length: 100 }, (_, i) => ({
      id: `org-${i}`,
      label: `org-${i}`,
      workspaces: Array.from({ length: 5 }, (_, j) => ({
        id: `workspace-${i}-${j}`,
        label: `workspace-${i}-${j}`,
      })),
    }))
    return <WorkspaceSelectorWithState orgs={manyOrgs} />
  },
}
