import { CommandItem } from '../Command'
import { ScrollArea } from '../ScrollArea'
import { Icon } from '../Icon'
import { Org, Workspace } from '.'
import { cn } from '@/lib/utils'
import { WorkspaceItem } from './WorkspaceItem'
import { useEffect, useRef } from 'react'

interface WorkspaceListProps {
  selectedOrg: Org
  selectedWorkspace: Workspace | null
  handleCreateDialogOpen: () => void
  handleSelect: (org: Org, workspace: Workspace) => void
  enableCreate?: boolean
  height: string | number
}

export function WorkspaceList({
  selectedOrg,
  selectedWorkspace,
  handleCreateDialogOpen,
  handleSelect,
  enableCreate = true,
  height,
}: WorkspaceListProps) {
  const workspaceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    if (selectedWorkspace) {
      const element = workspaceRefs.current[selectedWorkspace.id]
      if (element) {
        element.scrollIntoView({
          behavior: selectedOrg?.workspaces.length < 20 ? 'smooth' : 'instant',
          block: 'nearest',
        })
      }
    }
  }, [selectedWorkspace])

  return (
    <div className="relative flex w-2/3 flex-col">
      {enableCreate && (
        <div className="bg-background absolute bottom-0 left-0 right-0 z-20 border-b border-t">
          <CommandItem
            onSelect={handleCreateDialogOpen}
            className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
          >
            <Icon name="plus" />
            Create new workspace
          </CommandItem>
        </div>
      )}
      <ScrollArea style={{ height: `calc(${height} * 0.87)` }}>
        {selectedOrg?.workspaces.map((workspace) => (
          <WorkspaceItem
            key={workspace.id}
            workspace={workspace}
            selectedOrg={selectedOrg}
            handleSelect={handleSelect}
            ref={(el) => (workspaceRefs.current[workspace.id] = el)}
            isSelected={
              selectedOrg.id === selectedOrg.id &&
              selectedWorkspace?.id === workspace.id
            }
          />
        ))}
      </ScrollArea>
    </div>
  )
}
