'use client'

import * as React from 'react'
import { Command, CommandEmpty, CommandInput } from '../Command'
import { CreateDialog } from './CreateDialog'
import { OrgList } from './OrgList'
import { WorkspaceList } from './WorkspaceList'
import './transitions.css'

export interface Org {
  id: string
  label: string
  workspaces: Workspace[]
}

export interface Workspace {
  id: string
  label: string
  disabled?: boolean
}

export interface WorkspaceSelectorProps {
  orgs: Org[]
  value?: string
  onSelect: (id: string) => void
  onCreateNewWorkspace: (orgId: string, newWorkspaceName: string) => void
  placeholder?: string
  emptyText?: string
}

type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

export function WorkspaceSelector({
  orgs,
  onSelect,
  onCreateNewWorkspace,
  emptyText = 'No workspaces found.',
}: WorkspaceSelectorProps) {
  const [search, setSearch] = React.useState('')
  const [selectedOrg, setSelectedOrg] = React.useState<Org | null>(orgs[0])
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [newWorkspaceName, setNewWorkspaceName] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const filteredOrgs = React.useMemo(() => {
    if (!search) return orgs
    return orgs
      .map((org) => ({
        ...org,
        workspaces: org.workspaces.filter((workspace) =>
          workspace.label.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((org) => org.workspaces.length > 0)
  }, [orgs, search])

  const handleSelect = React.useCallback(
    (id: string) => {
      onSelect(id)
      setSearch('')
    },
    [onSelect]
  )

  const handleCreateNewWorkspace = React.useCallback(() => {
    if (selectedOrg && newWorkspaceName) {
      onCreateNewWorkspace(selectedOrg.id, newWorkspaceName)

      // Update the selectedOrg state with the new workspace
      setSelectedOrg((prev) =>
        prev
          ? {
              ...prev,
              workspaces: [
                ...prev.workspaces,
                {
                  id: newWorkspaceName,
                  label: newWorkspaceName,
                },
              ],
            }
          : null
      )

      setNewWorkspaceName('')
      setCreateDialogOpen(false)
    }
  }, [selectedOrg, newWorkspaceName, onCreateNewWorkspace])

  const handleCreateDialogOpen = React.useCallback(() => {
    if (document.startViewTransition) {
      // Capture the current height before transition
      const height = containerRef.current?.offsetHeight

      document.startViewTransition(() => {
        if (containerRef.current && height) {
          containerRef.current.style.height = `${height}px`
        }
        setCreateDialogOpen(true)
      })
    } else {
      setCreateDialogOpen(true)
    }
  }, [])

  const backToWorkspaceSelector = React.useCallback(() => {
    if (document.startViewTransition) {
      const root = document.documentElement
      root.classList.add('view-transition-reverse')

      const transition = (
        document.startViewTransition as unknown as (
          callback: () => void
        ) => ViewTransition
      )(() => {
        setCreateDialogOpen(false)
      })

      transition.finished.then(() => {
        root.classList.remove('view-transition-reverse')
      })
    } else {
      setCreateDialogOpen(false)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="border-border flex w-full flex-grow overflow-hidden rounded-md border"
    >
      {createDialogOpen ? (
        <div
          style={{ viewTransitionName: 'create-dialog' }}
          className="h-full w-full"
        >
          <CreateDialog
            open={createDialogOpen}
            selectedOrg={selectedOrg!}
            onClose={backToWorkspaceSelector}
            onSubmit={handleCreateNewWorkspace}
            newWorkspaceName={newWorkspaceName}
            setNewWorkspaceName={setNewWorkspaceName}
          />
        </div>
      ) : (
        <div
          style={{ viewTransitionName: 'workspace-content' }}
          className="flex h-full w-full"
        >
          <Command shouldFilter={false}>
            {requiresSearch(filteredOrgs) && (
              <CommandInput
                ref={inputRef}
                placeholder="Search workspaces..."
                value={search}
                onValueChange={setSearch}
              />
            )}
            {filteredOrgs.length > 0 ? (
              <div className="flex h-[400px] flex-grow flex-row">
                <OrgList
                  orgs={filteredOrgs}
                  selectedOrg={selectedOrg}
                  setSelectedOrg={setSelectedOrg}
                />
                <WorkspaceList
                  selectedOrg={selectedOrg!}
                  handleCreateDialogOpen={handleCreateDialogOpen}
                  handleSelect={handleSelect}
                />
              </div>
            ) : (
              <CommandEmpty className="p-6 text-gray-500">
                {emptyText}
              </CommandEmpty>
            )}
          </Command>
        </div>
      )}
    </div>
  )
}

function requiresSearch(orgs: Org[]) {
  // if there is only one org, then no search
  // if there is one org with multiple workspaces, then no search
  return orgs.length > 1 || (orgs.length === 1 && orgs[0].workspaces.length > 5)
}
