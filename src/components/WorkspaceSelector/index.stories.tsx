import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Org, Workspace, WorkspaceSelector, WorkspaceSelectorProps } from '.'
import { Container } from '@/index'
import { CreateResult } from './CreateWorkspace'
import { expect, userEvent, within } from 'storybook/test'
import { faker } from '@faker-js/faker'

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

// Move state logic to a custom hook
const useWorkspaceSelectorState = (initialOrgs: Org[] = sampleData) => {
  const [orgs, setOrgs] = useState<Org[]>(initialOrgs)
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  )
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null)

  const handleCreateWorkspace = async (
    org: Org,
    name: string
  ): Promise<CreateResult> => {
    const existingOrg = orgs.find((o) => o.slug === org.slug)
    if (!existingOrg) {
      return { success: false, error: 'Organization not found' }
    }

    if (existingOrg.workspaces.find((w) => w.slug === name)) {
      return { success: false, error: 'Workspace already exists' }
    }

    const newWorkspace = {
      id: name,
      label: name,
      slug: name,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setOrgs(
      orgs.map((o) =>
        o.slug === org.slug
          ? { ...o, workspaces: [...o.workspaces, newWorkspace] }
          : o
      )
    )
    setSelectedWorkspace(newWorkspace)
    return { success: true }
  }

  const handleCreateOrg = async (newOrgName: string): Promise<Org> => {
    const newOrg = {
      id: newOrgName,
      label: newOrgName,
      slug: newOrgName.toLowerCase().replace(/ /g, '-'),
      workspaces: [],
    }
    setOrgs([...orgs, newOrg])
    setSelectedOrg(newOrg)
    return newOrg
  }

  const handleSelect = (org: Org, workspace: Workspace) => {
    setSelectedOrg(org)
    setSelectedWorkspace(workspace)
  }

  return {
    orgs,
    selectedOrg,
    selectedWorkspace,
    handleCreateWorkspace,
    handleCreateOrg,
    handleSelect,
  }
}

// Simplified component
const WorkspaceSelectorWithState = (props: Partial<WorkspaceSelectorProps>) => {
  const state = useWorkspaceSelectorState(props.orgs)

  return (
    <div className="h-full w-screen">
      <Container>
        <WorkspaceSelector
          onCreate={state.handleCreateWorkspace}
          onCreateOrg={state.handleCreateOrg}
          onSelect={state.handleSelect}
          recents={props.recents ?? []}
          {...props}
          orgs={state.orgs}
        />

        <div className="border-border mt-8 flex flex-col gap-2 border-t pt-4">
          <b>Selected org:</b> {state.selectedOrg?.label ?? 'none'}
          <b>Selected workspaceId:</b>{' '}
          {state.selectedWorkspace?.label ?? 'none'}
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

export const WithManyWorkspaces: Story = {
  ...Default,
  render: () => {
    const org: Org = {
      id: '1',
      label: 'my-org',
      slug: 'my-org',
      workspaces: Array.from({ length: 100 }, (_, i) => ({
        id: `workspace-${i}`,
        label: `workspace-${i}`,
        slug: `workspace-${i}`,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    }

    return <WorkspaceSelectorWithState orgs={[org]} />
  },
}

export const NoOrgs: Story = {
  ...Default,
  render: () => <WorkspaceSelectorWithState orgs={[]} />,
}

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

export const WithCreateWorkspaceViewShownByDefault: Story = {
  ...Default,
  render: () => (
    <WorkspaceSelectorWithState
      showCreateWorkspaceView
      defaultSelectedOrg={sampleData[1]}
    />
  ),
}

export const WithSearchableOrgSelector: Story = {
  ...Default,
  render: () => {
    const orgs = Array.from({ length: 5000 }).map(() => {
      // Set seed to ensure consistent data
      faker.seed(42)
      const slug = faker.lorem.slug({ min: 1, max: 3 })
      return {
        id: faker.string.uuid(),
        label: slug,
        slug,
        workspaces: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return <WorkspaceSelectorWithState showCreateWorkspaceView orgs={orgs} />
  },
}

export const InteractiveNoOrgs: Story = {
  ...Default,
  parameters: {
    // TODO: fix issue with this particular interactive test failing to snapshot successfully
    // Ref: https://www.chromatic.com/test?appId=67127f39a7c35b3c23b07af9&id=67406008bda2864831d7dcf3
    chromatic: { disableSnapshot: true },
  },
  render: () => <WorkspaceSelectorWithState orgs={[]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const orgInput = canvas.getByRole('textbox')
    await userEvent.type(orgInput, 'new company name', { delay: 500 })
    await userEvent.click(canvas.getByText('Next'), { delay: 300 })

    expect(canvas.getByText('new-company-name')).toBeInTheDocument()

    const workspaceInput = canvas.getByRole('textbox')
    await userEvent.type(workspaceInput, 'new-workspace-slug', { delay: 300 })
    await userEvent.click(canvas.getByText('Create'), { delay: 300 })

    expect(canvas.getByText('new-workspace-slug')).toBeInTheDocument()
  },
}
