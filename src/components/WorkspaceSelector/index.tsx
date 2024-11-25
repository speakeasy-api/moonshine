'use client'

import * as React from 'react'
import { Command, CommandEmpty } from '../Command'
import { CreateWorkspace, CreateResult } from './CreateWorkspace'
import { OrgList } from './OrgList'
import { WorkspaceList } from './WorkspaceList'
import './styles.css'
import { FilteredWorkspaces } from './FilteredWorkspaces'
import { SearchBox } from './SearchBox'
import { Text } from '../Text'
import { Separator } from '../Separator'
import { Logo } from '../Logo'
import { Stack } from '../Stack'
import { CreateOrg } from './CreateOrg'

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

function requiresSearch(orgs: Org[]) {
  // if there is only one org, then no search
  // if there is one org with multiple workspaces, then no search
  return orgs.length > 1 || (orgs.length === 1 && orgs[0].workspaces.length > 5)
}

export interface WorkspaceSelectorProps {
  orgs: Org[]
  value?: string
  onSelect: (org: Org, workspace: Workspace) => void

  onCreateOrg: (newOrgName: string) => Promise<Org>

  /**
   * Returns a promise that resolves to true if the workspace was created, false otherwise.
   */
  onCreate: (org: Org, newWorkspaceName: string) => Promise<CreateResult>
  placeholder?: string
  emptyText?: string
  recents?: Org[]
  height?: string | number
  filterFn?: (workspace: Workspace, search: string) => boolean

  /**
   * If true, creating a new workspace will trigger the onSelect callback.
   */
  createTriggersSelection?: boolean

  showCreateWorkspaceView?: boolean

  defaultSelectedOrg?: Org
}

const defaultFilterFn = (workspace: Workspace, search: string) =>
  workspace.label.toLowerCase().startsWith(search.toLowerCase())

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
  filterFn = defaultFilterFn,
  createTriggersSelection = false,
  showCreateWorkspaceView = false,
  defaultSelectedOrg,
}: WorkspaceSelectorProps) {
  const [search, setSearch] = React.useState('')
  const [selectedWorkspace, setSelectedWorkspace] =
    React.useState<Workspace | null>(null)
  const [selectedOrg, setSelectedOrg] = React.useState<Org | null>(
    defaultSelectedOrg ?? orgs[0]
  )
  const [createWorkspaceViewOpen, setCreateWorkspaceViewOpen] = React.useState(
    showCreateWorkspaceView ?? false
  )
  const [createOrgViewOpen, setCreateOrgViewOpen] = React.useState(
    orgs.length === 0
  )
  const inputRef = React.useRef<HTMLInputElement>(null)
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

  const filteredOrgs = React.useMemo(
    () =>
      search
        ? orgs
            .map((org) => ({
              ...org,
              workspaces: org.workspaces.filter((workspace) =>
                filterFn(workspace, search)
              ),
            }))
            .filter((org) => org.workspaces.length > 0)
        : undefined,
    [orgs, search, filterFn]
  )

  const handleSelect = React.useCallback(
    (org: Org, workspace: Workspace, clearSearch: boolean = true) => {
      onSelect(org, workspace)
      if (clearSearch) setSearch('')
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
              : null
          )
          setNewWorkspaceName('')
          setCreateWorkspaceViewOpen(false)
          setSelectedWorkspace(workspace)
          setPreviousView(null)
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

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="workspace-selector border-border flex w-full flex-grow overflow-hidden rounded-md border"
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
          className="flex w-full"
        >
          <WorkspaceViewContents
            orgs={orgs}
            search={search}
            filteredOrgs={filteredOrgs}
            selectedOrg={selectedOrg}
            selectedWorkspace={selectedWorkspace}
            handleSelect={handleSelect}
            showRecents={showRecents}
            setShowRecents={setShowRecents}
            inputRef={inputRef}
            emptyText={emptyText}
            height={height}
            recents={recents}
            handleCreateWorkspaceViewOpen={handleCreateWorkspaceViewOpen}
            setSearch={setSearch}
            handleSelectOrg={handleSelectOrg}
          />
        </div>
      )}
    </div>
  )
}

interface WorkspaceViewContentsProps {
  orgs: Org[]
  search: string
  filteredOrgs: Org[] | undefined
  selectedOrg: Org | null
  selectedWorkspace: Workspace | null
  handleSelect: (org: Org, workspace: Workspace, clearSearch: boolean) => void
  showRecents: boolean
  setShowRecents: (show: boolean) => void
  inputRef: React.RefObject<HTMLInputElement>
  emptyText: string
  height: string | number
  recents: Org[]
  handleCreateWorkspaceViewOpen: () => void
  setSearch: (search: string) => void
  handleSelectOrg: (org: Org) => void
}

function WorkspaceViewContents({
  orgs,
  search,
  filteredOrgs,
  selectedOrg,
  selectedWorkspace,
  handleSelect,
  showRecents,
  setShowRecents,
  inputRef,
  emptyText,
  height,
  recents,
  handleCreateWorkspaceViewOpen,
  setSearch,
  handleSelectOrg,
}: WorkspaceViewContentsProps) {
  const showDefaultView = React.useMemo(
    () => orgs.length > 0 && filteredOrgs === undefined,
    [orgs, filteredOrgs]
  )
  const showFilteredView = React.useMemo(
    () => filteredOrgs !== undefined && filteredOrgs.length > 0,
    [filteredOrgs]
  )
  const showRecentsView = React.useMemo(
    () => filteredOrgs === undefined && recents.length > 0 && showRecents,
    [filteredOrgs, recents, showRecents]
  )
  return (
    <>
      <div className="bg-popover flex h-full w-1/3 flex-col items-center justify-center">
        <div className="flex max-w-80 flex-col items-center justify-center px-8 text-center">
          <Stack align="center" gap={4}>
            <div className="flex h-16 w-16 items-center justify-center">
              <Logo variant="icon" />
            </div>
            <Stack align="center" gap={2}>
              <Text variant="h3">Select your workspace</Text>
              <Text variant="muted">
                Select or create the workspace you want to use for this project.
              </Text>
            </Stack>
          </Stack>
        </div>
      </div>

      <Separator orientation="vertical" />

      <div className="w-2/3">
        <Command shouldFilter={false}>
          {requiresSearch(orgs) && (
            <SearchBox
              inputRef={inputRef}
              search={search}
              setSearch={setSearch}
            />
          )}
          {showFilteredView ? (
            <FilteredWorkspaces
              onSelect={(org, workspace) => handleSelect(org, workspace, false)}
              orgsWithFilteredWorkspaces={filteredOrgs ?? []}
              fullWidth
              selectedOrg={selectedOrg}
              selectedWorkspace={selectedWorkspace}
            />
          ) : showRecentsView ? (
            <div className="flex w-full flex-grow flex-row">
              <OrgList
                orgs={orgs}
                selectedOrg={selectedOrg}
                setSelectedOrg={handleSelectOrg}
                onSelectRecent={() => setShowRecents(true)}
                showRecents={showRecents}
                enableRecents={recents.length > 0}
              />
              <FilteredWorkspaces
                onSelect={(org, workspace) =>
                  handleSelect(org, workspace, false)
                }
                orgsWithFilteredWorkspaces={recents}
                selectedOrg={selectedOrg}
                selectedWorkspace={selectedWorkspace}
              />
            </div>
          ) : showDefaultView ? (
            <div className="flex h-full flex-row">
              <OrgList
                orgs={orgs}
                selectedOrg={selectedOrg}
                setSelectedOrg={handleSelectOrg}
                onSelectRecent={() => setShowRecents(true)}
                showRecents={showRecents}
                enableRecents={recents.length > 0}
              />
              <WorkspaceList
                selectedOrg={selectedOrg!}
                handleCreateViewOpen={handleCreateWorkspaceViewOpen}
                handleSelect={(org, workspace) =>
                  handleSelect(org, workspace, false)
                }
                selectedWorkspace={selectedWorkspace}
              />
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
