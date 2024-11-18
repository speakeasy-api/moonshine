import { CommandItem } from '../Command'
import { Icon } from '../Icon'
import { Org, Workspace } from '.'
import { cn } from '@/lib/utils'
import { WorkspaceItem } from './WorkspaceItem'
import { useEffect, useRef } from 'react'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'

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
  const virtuoso = useRef<VirtuosoHandle | null>(null)

  useEffect(() => {
    if (selectedWorkspace && virtuoso.current) {
      console.log('foo')
      virtuoso.current.scrollToIndex({
        index:
          selectedOrg?.workspaces.findIndex(
            (workspace) => workspace.id === selectedWorkspace.id
          ) ?? 0,
        align: 'end',
        behavior: selectedOrg?.workspaces.length < 10 ? 'smooth' : 'auto',
      })
    }
  }, [selectedWorkspace])

  return (
    <div className="flex w-2/3 flex-col">
      <ScrollingList
        ref={virtuoso}
        items={selectedOrg?.workspaces}
        renderItem={(workspace) => (
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
        )}
        height={height}
      />
      {enableCreate && (
        <div className="bg-background border-t">
          <CommandItem
            onSelect={handleCreateDialogOpen}
            className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
          >
            <Icon name="plus" />
            Create new workspace
          </CommandItem>
        </div>
      )}
    </div>
  )
}
