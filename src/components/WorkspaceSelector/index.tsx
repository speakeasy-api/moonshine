'use client'

import * as React from 'react'
import { Command, CommandEmpty } from '../Command'
import { CreateWorkspace, CreateResult } from './CreateWorkspace'
import { OrgList } from './OrgList'
import { WorkspaceList } from './WorkspaceList'
import './styles.css'
import { RecentWorkspaces } from './RecentWorkspaces'
import { Text } from '../Text'
import { Logo } from '../Logo'
import { Stack } from '../Stack'
import { CreateOrg } from './CreateOrg'
import { Heading } from '../Heading'
import { GlobalWorkspaceSelectorProps } from '@/types'
import { cn } from '@/lib/utils'

export interface Org {
  id: string
  label: string
  slug: string
  workspaces: Workspace[]
}

export interface Workspace {
  id: string
  slug: string
  label: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

interface WorkspaceSelectorBaseProps extends GlobalWorkspaceSelectorProps {
  onCreateOrg: (newOrgName: string) => Promise<Org>

  /**
   * Returns a promise that resolves to true if the workspace was created, false otherwise.
   */
  onCreate: (org: Org, newWorkspaceName: string) => Promise<CreateResult>
  placeholder?: string
  emptyText?: string
  recents?: Org[]
  height?: string | number

  /**
   * If true, creating a new workspace will trigger the onSelect callback.
   */
  createTriggersSelection?: boolean

  filterOrgFunc: (org: Org, search: string) => boolean
  filterWorkspaceFunc: (workspace: Workspace, search: string) => boolean
}

export type WorkspaceSelectorProps = WorkspaceSelectorBaseProps &
  (
    | {
        showCreateWorkspaceView: true
        defaultSelectedOrg: Org
      }
    | {
        showCreateWorkspaceView?: false
        defaultSelectedOrg?: Org
      }
  )

const useViewTransition = () => {
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  const startTransition = React.useCallback(
    (callback: () => void, finished?: () => void) => {
      if ('startViewTransition' in document) {
        setIsTransitioning(true)
        const transition = document.startViewTransition(callback)
        transition.finished.then(() => {
          setIsTransitioning(false)
          finished?.()
        })
      } else {
        callback()
      }
    },
    []
  )

  return {
    isTransitioning,
    startTransition,
    setIsTransitioning,
  }
}

export function WorkspaceSelector({
  orgs,
  onSelect,
  onCreate,
  emptyText = 'No workspaces found.',
  recents = [],
  height = '500px',
  onCreateOrg,
  createTriggersSelection = false,
  showCreateWorkspaceView = false,
  defaultSelectedOrg,
  filterOrgFunc,
  filterWorkspaceFunc,
}: WorkspaceSelectorProps) {
  const [selectedWorkspace, setSelectedWorkspace] =
    React.useState<Workspace | null>(null)
  const [selectedOrg, setSelectedOrg] = React.useState<Org | undefined>(
    defaultSelectedOrg
  )
  const [createWorkspaceViewOpen, setCreateWorkspaceViewOpen] = React.useState(
    showCreateWorkspaceView ?? false
  )
  const [createOrgViewOpen, setCreateOrgViewOpen] = React.useState(
    orgs.length === 0
  )
  const [newWorkspaceName, setNewWorkspaceName] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [showRecents, setShowRecents] = React.useState(recents.length > 0)
  const { isTransitioning, startTransition, setIsTransitioning } =
    useViewTransition()
  const [previousView, setPreviousView] = React.useState<
    'workspace' | 'org' | null
  >(null)

  React.useLayoutEffect(() => {
    if (createOrgViewOpen) {
      setPreviousView('org')
      setIsTransitioning(true)
    }
  }, [createOrgViewOpen])

  const handleSelect = React.useCallback(
    (org: Org, workspace: Workspace) => {
      onSelect(org, workspace)
      setSelectedOrg(org)
      setSelectedWorkspace(workspace)
    },
    [onSelect]
  )

  const handleSelectOrg = React.useCallback((org: Org) => {
    setSelectedOrg(org)
    setShowRecents(false)
  }, [])

  const handleCreateNewWorkspace = React.useCallback(
    async (org: Org, newWorkspaceName: string): Promise<CreateResult> => {
      if (newWorkspaceName) {
        const result = await onCreate(org, newWorkspaceName)

        if (!result.success) {
          return result
        }

        const workspace: Workspace = {
          id: newWorkspaceName,
          label: newWorkspaceName,
          slug: newWorkspaceName,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        if (createTriggersSelection) {
          onSelect(org, workspace)
          return { success: true }
        }

        startTransition(() => {
          setSelectedOrg((prev) =>
            prev
              ? {
                  ...prev,
                  workspaces: [...prev.workspaces, workspace],
                }
              : undefined
          )
          setNewWorkspaceName('')
          setCreateWorkspaceViewOpen(false)
          setSelectedWorkspace(workspace)
          setPreviousView(null)
          setShowRecents(false)
        })

        return { success: true }
      }
      return { success: false, error: 'No workspace name provided' }
    },
    [onCreate, createTriggersSelection, onSelect, startTransition]
  )

  const handleCreateOrg = React.useCallback(
    async (newOrgName: string): Promise<Org> => {
      const result = await onCreateOrg(newOrgName)

      function updateState() {
        setSelectedOrg(result)
        setCreateOrgViewOpen(false)
        setCreateWorkspaceViewOpen(true)
      }

      if (document.startViewTransition) {
        document.startViewTransition(() => updateState())
      } else {
        updateState()
      }

      return result
    },
    [onCreateOrg]
  )
  const handleCreateWorkspaceViewOpen = React.useCallback(() => {
    startTransition(() => {
      if (containerRef.current && height) {
        containerRef.current.style.height = `${height}px`
      }
      setCreateWorkspaceViewOpen(true)
    })
  }, [startTransition])

  const backToWorkspaceSelector = React.useCallback(() => {
    const root = document.documentElement
    root.classList.add('view-transition-reverse')
    startTransition(
      () => {
        setCreateWorkspaceViewOpen(false)
        setCreateOrgViewOpen(false)
      },
      () => {
        root.classList.remove('view-transition-reverse')
      }
    )
  }, [startTransition])

  const backToOrgSelector = React.useCallback(() => {
    setSelectedOrg(undefined)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ height, containerType: 'inline-size' }}
      className="workspace-selector border-neutral-softest flex w-full flex-grow overflow-hidden rounded-md border"
    >
      {createOrgViewOpen ? (
        <div
          style={{ viewTransitionName: isTransitioning ? 'create-dialog' : '' }}
          className="h-full w-full"
        >
          <CreateOrg onSubmit={handleCreateOrg} />
        </div>
      ) : createWorkspaceViewOpen ? (
        <div
          style={{
            viewTransitionName: isTransitioning ? 'create-dialog' : '',
          }}
          className="h-full w-full"
        >
          <CreateWorkspace
            backButtonEnabled={orgs.length > 0}
            open={createWorkspaceViewOpen}
            selectedOrg={selectedOrg!}
            onBack={previousView === null ? backToWorkspaceSelector : undefined}
            allOrgs={orgs}
            onSubmit={(org, name) => handleCreateNewWorkspace(org, name)}
            newWorkspaceName={newWorkspaceName}
            setNewWorkspaceName={setNewWorkspaceName}
          />
        </div>
      ) : (
        <div
          style={{
            viewTransitionName: isTransitioning ? 'workspace-content' : '',
          }}
          className="flex w-full flex-col @[640px]:flex-row"
        >
          <WorkspaceViewContents
            orgs={orgs}
            selectedOrg={selectedOrg}
            selectedWorkspace={selectedWorkspace}
            handleSelect={handleSelect}
            showRecents={showRecents}
            setShowRecents={setShowRecents}
            emptyText={emptyText}
            height={height}
            recents={recents}
            handleCreateWorkspaceViewOpen={handleCreateWorkspaceViewOpen}
            handleSelectOrg={handleSelectOrg}
            filterOrgFunc={filterOrgFunc}
            filterWorkspaceFunc={filterWorkspaceFunc}
            backToOrgSelector={backToOrgSelector}
          />
        </div>
      )}
    </div>
  )
}

interface WorkspaceViewContentsProps {
  orgs: Org[]
  selectedOrg?: Org
  selectedWorkspace: Workspace | null
  handleSelect: (org: Org, workspace: Workspace, clearSearch: boolean) => void
  showRecents: boolean
  setShowRecents: (show: boolean) => void
  emptyText: string
  height: string | number
  recents: Org[]
  handleCreateWorkspaceViewOpen: () => void
  handleSelectOrg: (org: Org) => void
  filterOrgFunc: (org: Org, search: string) => boolean
  filterWorkspaceFunc: (workspace: Workspace, search: string) => boolean
  backToOrgSelector: () => void
}

function WorkspaceViewContents({
  orgs,
  selectedOrg,
  selectedWorkspace,
  handleSelect,
  showRecents,
  setShowRecents,
  emptyText,
  height,
  recents,
  handleCreateWorkspaceViewOpen,
  handleSelectOrg,
  filterOrgFunc,
  filterWorkspaceFunc,
  backToOrgSelector,
}: WorkspaceViewContentsProps) {
  const showRecentsView = React.useMemo(
    () => recents.length > 0 && showRecents,
    [recents, showRecents]
  )
  return (
    <>
      {/* Wide container layout (>= 640px) - Left sidebar with title */}
      <div className="bg-surface-primary border-neutral-softest hidden h-full flex-1/3 flex-col items-center justify-center border-r @[640px]:flex">
        <div className="flex h-full max-w-80 flex-col items-center justify-center px-8 text-center">
          <Stack align="center" gap={4}>
            <div className="flex h-16 w-16 items-center justify-center">
              <Logo variant="icon" className="size-12" />
            </div>
            <Stack align="center" gap={2}>
              <Heading variant="xl" className="whitespace-nowrap">
                Select your workspace
              </Heading>
              <Text muted>
                Select or create the workspace you want to use for this project.
              </Text>
            </Stack>
          </Stack>
        </div>
      </div>

      {/* Narrow container header (< 640px) */}
      <div className="border-neutral-softest flex w-full items-center gap-3 border-b px-4 py-3 @[640px]:hidden">
        <Logo variant="icon" className="size-8" />
        <Heading variant="xs">Select workspace</Heading>
      </div>

      {/* Main content area */}
      <div className="flex h-full w-full flex-1 flex-col overflow-hidden @[640px]:flex-2/3">
        <Command shouldFilter={false} className="h-full w-full">
          {showRecentsView ? (
            <div className="flex w-full flex-grow flex-row">
              <OrgList
                orgs={orgs}
                selectedOrg={selectedOrg}
                setSelectedOrg={handleSelectOrg}
                onSelectRecent={() => setShowRecents(true)}
                showRecents={showRecents}
                enableRecents={recents.length > 0}
                filterOrgFunc={(org, search) => filterOrgFunc(org, search)}
              />
              <RecentWorkspaces
                onSelect={(org, workspace) =>
                  handleSelect(org, workspace, false)
                }
                handleCreateViewOpen={handleCreateWorkspaceViewOpen}
                orgsWithFilteredWorkspaces={recents}
                selectedOrg={selectedOrg}
                selectedWorkspace={selectedWorkspace}
              />
            </div>
          ) : orgs.length > 0 ? (
            <div className="flex h-full w-full flex-1 flex-col @[640px]:flex-row">
              {/* Back button - narrow only, when org selected */}
              <div
                className={cn(
                  'border-neutral-softest flex-shrink-0 border-b p-3 @[640px]:hidden',
                  selectedOrg ? 'flex' : 'hidden'
                )}
              >
                <button
                  onClick={backToOrgSelector}
                  className="text-body-sm text-link-primary hover:text-link-secondary flex items-center gap-2"
                >
                  <span>←</span>
                  <span>Back to organizations</span>
                </button>
              </div>

              {/* OrgList - always in wide, only when no org selected in narrow */}
              <div
                className={cn(
                  selectedOrg ? 'hidden @[640px]:contents' : 'contents'
                )}
              >
                <OrgList
                  orgs={orgs}
                  selectedOrg={selectedOrg}
                  setSelectedOrg={handleSelectOrg}
                  onSelectRecent={() => setShowRecents(true)}
                  showRecents={showRecents}
                  enableRecents={recents.length > 0}
                  filterOrgFunc={(org, search) => filterOrgFunc(org, search)}
                />
              </div>

              {/* WorkspaceList - always in wide, only when org selected in narrow */}
              <div
                className={cn(
                  selectedOrg ? 'contents' : 'hidden @[640px]:contents'
                )}
              >
                <WorkspaceList
                  selectedOrg={selectedOrg}
                  handleCreateViewOpen={handleCreateWorkspaceViewOpen}
                  handleSelect={(org, workspace) =>
                    handleSelect(org, workspace, false)
                  }
                  selectedWorkspace={selectedWorkspace}
                  filterWorkspaceFunc={(workspace, search) =>
                    filterWorkspaceFunc(workspace, search)
                  }
                />
              </div>
            </div>
          ) : (
            <CommandEmpty
              style={{ height }}
              className="text-md text-muted-foreground p-6"
            >
              {emptyText}
            </CommandEmpty>
          )}
        </Command>
      </div>
    </>
  )
}
