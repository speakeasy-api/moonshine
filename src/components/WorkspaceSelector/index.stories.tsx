import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Org, Workspace, WorkspaceSelector, WorkspaceSelectorProps } from '.'
import { Container } from '@/index'
import { CreateResult } from './CreateDialog'

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
    slug: 'speakeasy',
    workspaces: [
      {
        id: '1',
        label: 'zeus',
        slug: 'zeus',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        label: 'hermes',
        slug: 'hermes',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        label: 'poseidon',
        slug: 'poseidon',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        label: 'athena',
        slug: 'athena',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        label: 'apollo',
        slug: 'apollo',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6',
        label: 'dionysus',
        slug: 'dionysus',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7',
        label: 'fable',
        slug: 'fable',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8',
        label: 'hercules',
        slug: 'hercules',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9',
        label: 'medusa',
        slug: 'medusa',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '10',
        label: 'nike',
        slug: 'nike',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '11',
        label: 'odysseus',
        slug: 'odysseus',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '12',
        label: 'pandora',
        slug: 'pandora',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '13',
        label: 'prometheus',
        slug: 'prometheus',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: '2',
    label: 'stripe',
    slug: 'stripe',
    workspaces: [
      {
        id: '1',
        label: 'dev',
        slug: 'dev',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        label: 'staging',
        slug: 'staging',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        label: 'prod',
        slug: 'prod',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        label: 'test',
        slug: 'test',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        label: 'staging-2',
        slug: 'staging-2',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
  ): Promise<CreateResult> => {
    const existingOrg = orgs.find((org) => org.id === o.id)
    if (existingOrg) {
      setSelectedOrg(existingOrg)

      const workspaceExists = existingOrg.workspaces.find(
        (workspace) => workspace.slug === name
      )
      if (workspaceExists) {
        return { success: false, error: 'Workspace already exists' }
      }
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
                    slug: name,
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ],
              }
            : org
        )
      )

      setSelectedWorkspace({
        id: name,
        label: name,
        slug: name,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return { success: true }
    }

    return { success: false, error: 'Failed to create workspace' }
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
  parameters: {
    layout: 'centered',
  },
  render: () => <WorkspaceSelectorWithState />,
}

export const WithOneOrg: Story = {
  ...Default,
  render: () => <WorkspaceSelectorWithState orgs={sampleData.slice(0, 1)} />,
}

export const WithOneOrgAndAFewWorkspaces: Story = {
  ...Default,
  render: () => {
    const org = Object.assign({}, sampleData[0])
    org.workspaces = org.workspaces.slice(0, 3)
    return <WorkspaceSelectorWithState orgs={[org]} />
  },
}

export const WithRecents: Story = {
  ...Default,
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
  ...Default,
  render: () => {
    const manyOrgs = Array.from({ length: 100 }, (_, i) => ({
      id: `org-${i}`,
      label: `org-${i}`,
      slug: `org-${i}`,
      workspaces: Array.from({ length: 5 }, (_, j) => ({
        id: `workspace-${i}-${j}`,
        label: `workspace-${i}-${j}`,
        slug: `workspace-${i}-${j}`,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }))
    return <WorkspaceSelectorWithState orgs={manyOrgs} />
  },
}

export const WithAnExtremeAmountOfOrgs: Story = {
  ...Default,
  render: () => {
    const manyOrgs = Array.from({ length: 5000 }, (_, i) => ({
      id: `org-${i}`,
      label: `org-${i}`,
      slug: `org-${i}`,
      workspaces: Array.from({ length: 5 }, (_, j) => ({
        id: `workspace-${i}-${j}`,
        label: `workspace-${i}-${j}`,
        slug: `workspace-${i}-${j}`,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }))
    return <WorkspaceSelectorWithState orgs={manyOrgs} />
  },
}

// TODO: this is not a valid scenario
// export const NoOrgs: Story = {
//   ...Default,
//   render: () => <WorkspaceSelectorWithState orgs={[]} />,
// }

export const NoWorkspacesInOrg: Story = {
  ...Default,
  render: () => {
    const org = Object.assign({}, sampleData[0])
    org.workspaces = []
    return <WorkspaceSelectorWithState orgs={[org]} />
  },
}

export const WithLongOrgName: Story = {
  ...Default,
  render: () => (
    <WorkspaceSelectorWithState
      orgs={[
        {
          id: '1',
          label: 'a'.repeat(100),
          slug: 'a'.repeat(100),
          workspaces: [
            {
              id: '1',
              label: 'workspace-1',
              slug: 'workspace-1',
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ]}
    />
  ),
}

export const WithLongWorkspaceName: Story = {
  ...Default,
  render: () => (
    <WorkspaceSelectorWithState
      orgs={[
        {
          id: '1',
          label: 'my-org',
          slug: 'my-org',
          workspaces: [
            {
              id: '1',
              label: 'a'.repeat(100),
              slug: 'a'.repeat(100),
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ]}
    />
  ),
}

export const WithInactiveWorkspace: Story = {
  ...Default,
  render: () => (
    <WorkspaceSelectorWithState
      orgs={[
        {
          ...sampleData[0],
          workspaces: [
            ...sampleData[0].workspaces,
            {
              id: 'inactive',
              label: 'inactive',
              slug: 'inactive',
              active: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ]}
    />
  ),
}
