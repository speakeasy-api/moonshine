'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command'
import { ScrollArea } from '../ScrollArea'
import { GradientCircle } from './GradientCircle'
import './transitions.css'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Text } from '../Text'
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
  const createInputRef = React.useRef<HTMLInputElement>(null)
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

  React.useEffect(() => {
    if (createDialogOpen) {
      // Wait for the transition to complete
      setTimeout(() => {
        createInputRef.current?.focus()
      }, 300) // matches the animation duration
    }
  }, [createDialogOpen])

  const handleCreateWithValues = React.useCallback(() => {
    handleCreateDialogOpen()
    setNewWorkspaceName(search)
  }, [handleCreateDialogOpen, search])

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
          className="flex h-full w-full"
        >
          <Command className="p-8">
            <div className="flex flex-col gap-2">
              <Text variant="h3">Create new workspace</Text>
              <Text variant="muted">
                Workspaces are used to organize your SDK targets into logical
                groups.
              </Text>
            </div>
            <CommandList className="flex max-h-none flex-grow flex-col">
              <div className="flex flex-grow flex-col justify-center">
                <div className="flex flex-row items-baseline justify-stretch rounded-xl border border-dashed p-6 pb-4">
                  <h1 className="text-md font-semibold">
                    {selectedOrg?.label}
                  </h1>
                  <span className="text-muted-foreground mx-2 text-sm">/</span>
                  <div className="flex flex-col justify-start">
                    <input
                      ref={createInputRef}
                      type="text"
                      pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                      placeholder="your-new-workspace"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      className="border-input bg-background ring-offset-background text-md flex h-10 w-fit min-w-fit flex-1 rounded-md px-2 py-1.5 outline-none invalid:border-b invalid:border-red-400"
                    />

                    <div
                      className="mt-1 text-sm text-red-400"
                      style={{
                        visibility:
                          newWorkspaceName &&
                          !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                            ? 'visible'
                            : 'hidden',
                      }}
                    >
                      Workspace names can only contain lowercase letters,
                      numbers, and hyphens
                    </div>
                  </div>
                </div>
              </div>
            </CommandList>

            <div className="mt-auto flex">
              <Button
                variant="outline"
                onClick={() => backToWorkspaceSelector()}
              >
                <Icon name="chevron-left" size="small" />
                Back
              </Button>
              <div className="ml-auto">
                <Button
                  variant="secondary"
                  disabled={
                    !newWorkspaceName ||
                    !newWorkspaceName.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                  }
                  onClick={handleCreateNewWorkspace}
                >
                  Create
                </Button>
              </div>
            </div>
          </Command>
        </div>
      ) : (
        <div
          style={{ viewTransitionName: 'workspace-content' }}
          className="flex h-full w-full"
        >
          <Command shouldFilter={false}>
            <CommandInput
              ref={inputRef}
              placeholder="Search workspaces..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty className="text-gray-500">{emptyText}</CommandEmpty>

              {filteredOrgs.length > 0 ? (
                <div className="flex h-[400px] flex-grow flex-row">
                  <ScrollArea className="border-border w-2/5 border-r">
                    {filteredOrgs.map((org) => (
                      <CommandItem
                        key={org.id}
                        onSelect={() => setSelectedOrg(org)}
                        aria-selected={selectedOrg?.id === org.id}
                        className={cn(
                          'mx-1 cursor-pointer gap-1.5 p-2 first:mt-1 last:mb-1', // lighter hover style
                          selectedOrg?.id === org.id &&
                            'bg-accent text-accent-foreground font-semibold'
                        )}
                        data-selected={
                          selectedOrg?.id === org.id ? 'true' : undefined
                        }
                      >
                        <GradientCircle name={org.label} />
                        {org.label}

                        {selectedOrg?.id === org.id && (
                          <div className="ml-auto">
                            <Icon name="chevron-right" size="small" />
                          </div>
                        )}
                      </CommandItem>
                    ))}
                  </ScrollArea>

                  <div className="flex w-3/5 flex-col">
                    <div className="bg-background sticky top-0 z-10 m-1 border-b pb-1">
                      <CommandItem
                        onSelect={handleCreateDialogOpen}
                        className="cursor-pointer !items-center py-2 hover:bg-gray-100"
                      >
                        <Icon name="plus" />
                        Create new workspace
                      </CommandItem>
                    </div>
                    <ScrollArea className="flex-grow">
                      <CommandGroup>
                        {selectedOrg?.workspaces.map((workspace) => (
                          <CommandItem
                            key={workspace.id}
                            onSelect={() => handleSelect(workspace.id)}
                            className="hover:!bg-accent data-[selected]:!bg-accent cursor-pointer"
                          >
                            <GradientCircle name={workspace.label} />
                            {workspace.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </div>
                </div>
              ) : (
                <CommandItem className="flex w-full flex-col items-center justify-center text-gray-500 data-[selected=true]:bg-inherit">
                  <Stack
                    direction="column"
                    align="center"
                    justify="center"
                    gap={3}
                  >
                    <div>{emptyText}</div>

                    <Button variant="outline" onClick={handleCreateWithValues}>
                      Create '{search}'
                    </Button>
                  </Stack>
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
