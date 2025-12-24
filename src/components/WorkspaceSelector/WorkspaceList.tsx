import { CommandItem } from '../Command'
import { Icon } from '../Icon'
import { Org, Workspace } from '.'
import { cn } from '@/lib/utils'
import { WorkspaceItem } from './WorkspaceItem'
import { useEffect, useRef, useState } from 'react'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'
import { SearchBox } from './SearchBox'
import { Text } from '../Text'

interface WorkspaceListProps {
  selectedOrg?: Org
  selectedWorkspace: Workspace | null
  handleCreateViewOpen: () => void
  handleSelect: (org: Org, workspace: Workspace) => void
  enableCreate?: boolean
  filterWorkspaceFunc: (workspace: Workspace, search: string) => boolean
}

export function WorkspaceList({
  selectedOrg,
  selectedWorkspace,
  handleCreateViewOpen,
  handleSelect,
  enableCreate = true,
  filterWorkspaceFunc,
}: WorkspaceListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const filteredWorkspaces =
    selectedOrg?.workspaces.filter((workspace) =>
      filterWorkspaceFunc(workspace, search)
    ) ?? []

  useEffect(() => {
    if (selectedOrg && selectedWorkspace && virtuoso.current) {
      const index = selectedOrg.workspaces.findIndex(
        (workspace) => workspace.slug === selectedWorkspace.slug
      )

      setTimeout(() => {
        virtuoso.current?.scrollToIndex({
          index,
          behavior: 'smooth',
        })
      }, 100)
    }
  }, [selectedWorkspace, selectedOrg])

  return (
    <div className="flex h-full w-full flex-col @[640px]:w-2/3">
      <SearchBox
        inputRef={inputRef}
        placeholder="Search workspaces..."
        search={search}
        setSearch={setSearch}
      />
      {!selectedOrg || filteredWorkspaces.length === 0 ? (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-body">
            {search.length > 0
              ? 'No workspaces found'
              : 'No workspaces in this organization'}
          </p>
        </div>
      ) : (
        <ScrollingList
          ref={virtuoso}
          items={filteredWorkspaces}
          renderItem={(workspace) => (
            <WorkspaceItem
              key={workspace.id}
              workspace={workspace}
              selectedOrg={selectedOrg}
              handleSelect={handleSelect}
              isSelected={selectedWorkspace?.id === workspace.id}
            />
          )}
        />
      )}
      {enableCreate && (
        <div className="bg-background border-neutral-softest border-t">
          <CommandItem
            onSelect={handleCreateViewOpen}
            className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
          >
            <Icon name="plus" />
            <Text>Create workspace</Text>
          </CommandItem>
        </div>
      )}
    </div>
  )
}
