import { CommandItem } from '../Command'
import { Icon } from '../Icon'
import { Org, Workspace } from '.'
import { cn } from '@/lib/utils'
import { WorkspaceItem } from './WorkspaceItem'
import { useEffect, useRef } from 'react'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'
import { Text } from '../Text'

interface WorkspaceListProps {
  selectedOrg: Org
  selectedWorkspace: Workspace | null
  handleCreateViewOpen: () => void
  handleSelect: (org: Org, workspace: Workspace) => void
  enableCreate?: boolean
  height: string | number
}

export function WorkspaceList({
  selectedOrg,
  selectedWorkspace,
  handleCreateViewOpen,
  handleSelect,
  enableCreate = true,
  height,
}: WorkspaceListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null)

  useEffect(() => {
    if (selectedWorkspace && virtuoso.current) {
      const index = selectedOrg?.workspaces.findIndex(
        (workspace) => workspace.slug === selectedWorkspace.slug
      )

      // wait for the ref to update
      setTimeout(() => {
        virtuoso.current?.scrollToIndex({
          index,
          behavior: selectedOrg?.workspaces.length < 10 ? 'smooth' : 'auto',
        })
      }, 100)
    }
  }, [selectedWorkspace, selectedOrg?.workspaces])

  return (
    <div className="flex w-2/3 flex-col">
      {selectedOrg?.workspaces.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <Text variant="muted">No workspaces exist in this organization</Text>
        </div>
      ) : (
        <ScrollingList
          ref={virtuoso}
          items={selectedOrg?.workspaces}
          renderItem={(workspace) => (
            <WorkspaceItem
              key={workspace.slug}
              workspace={workspace}
              selectedOrg={selectedOrg}
              handleSelect={handleSelect}
              isSelected={
                selectedOrg.slug === selectedOrg.slug &&
                selectedWorkspace?.slug === workspace.slug
              }
            />
          )}
          height={height}
        />
      )}
      {enableCreate && (
        <div className="bg-background border-t">
          <CommandItem
            onSelect={handleCreateViewOpen}
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
