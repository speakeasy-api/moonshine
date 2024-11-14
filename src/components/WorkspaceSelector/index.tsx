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
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { ScrollArea } from '../ScrollArea'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { GradientCircle } from './GradientCircle'
import './transitions.css'
import { Icon } from '../Icon'
import { Stack } from '../Stack'

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
  onValueChange: (value: string | undefined) => void
  onCreateNewWorkspace: (orgId: string, newWorkspaceName: string) => void
  placeholder?: string
  emptyText?: string
  asPopover?: boolean
  width?: number | string
  height?: number | string
}

type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

export function WorkspaceSelector({
  orgs,
  value,
  onValueChange,
  onCreateNewWorkspace,
  placeholder = 'Select workspace...',
  emptyText = 'No workspaces found.',
  asPopover = false,
  width = 350,
  height = 250,
}: WorkspaceSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedOrg, setSelectedOrg] = React.useState<Org | null>(orgs[0])
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const createInputRef = React.useRef<HTMLInputElement>(null)
  const [newWorkspaceName, setNewWorkspaceName] = React.useState('')

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
    (currentValue: string) => {
      onValueChange(currentValue)
      setOpen(false)
      setSearch('')
    },
    [onValueChange]
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false)

      // Wait for the popover to close before resetting the dialog state
      setTimeout(() => {
        setCreateDialogOpen(false)
        setNewWorkspaceName('')
      }, 300)
    } else {
      setOpen(true)
    }
  }

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

  const selectedOption = React.useMemo(() => {
    if (!orgs) return null
    for (const org of orgs) {
      const workspace = org.workspaces.find(
        (workspace) => workspace.id === value
      )
      if (workspace) return workspace
    }
    return null
  }, [orgs, value])

  const handleCreateDialogOpen = React.useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
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

  const Inner = (
    <div
      className="border-border overflow-hidden rounded-md border"
      style={{ width, height }}
    >
      {createDialogOpen ? (
        <div style={{ viewTransitionName: 'create-dialog' }} className="h-full">
          <Command>
            <CommandList>
              <div className="flex flex-col">
                <div className="flex flex-row items-center p-4">
                  <h1 className="text-md font-semibold">
                    {selectedOrg?.label}
                  </h1>
                  <span className="text-muted-foreground mx-2 text-sm">/</span>
                  <input
                    ref={createInputRef}
                    type="text"
                    placeholder="workspace-slug"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md text-sm outline-none"
                  />
                </div>
              </div>
            </CommandList>

            <div className="mt-auto flex p-4">
              <Button variant="ghost" onClick={() => backToWorkspaceSelector()}>
                <Icon name="chevron-left" size="small" />
                Back
              </Button>
              <div className="ml-auto">
                <Button
                  variant="secondary"
                  disabled={!newWorkspaceName}
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
          className="h-full"
        >
          <Command shouldFilter={false} className="h-full w-full flex-grow">
            <CommandInput
              ref={inputRef}
              placeholder="Search workspaces..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="flex h-full flex-grow">
              <CommandEmpty className="text-gray-500">{emptyText}</CommandEmpty>
              {filteredOrgs.length > 0 ? (
                <div className="flex h-full w-full flex-grow flex-row">
                  <ScrollArea
                    className="border-border h-full w-max border-r"
                    style={{ flex: 1 }}
                  >
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
                      </CommandItem>
                    ))}
                  </ScrollArea>
                  <ScrollArea className="flex-grow" style={{ flex: 2 }}>
                    {selectedOrg && (
                      <CommandGroup>
                        <CommandItem
                          onSelect={handleCreateDialogOpen}
                          className="cursor-pointer !items-center hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                          Create new workspace
                        </CommandItem>
                        {selectedOrg.workspaces.map((workspace) => (
                          <CommandItem
                            key={workspace.id}
                            onSelect={() => handleSelect(workspace.id)}
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <GradientCircle name={workspace.label} />
                            {workspace.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </ScrollArea>
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

  return asPopover ? (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          {selectedOption ? (
            <>
              <GradientCircle name={selectedOption?.label || ''} />
              {selectedOption.label}
            </>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-popover text-popover-foreground w-max overflow-hidden border-none p-0">
        {Inner}
      </PopoverContent>
    </Popover>
  ) : (
    Inner
  )
}
