import { CommandItem } from '../Command'
import { Icon } from '../Icon'
import { Org, Workspace } from '.'
import { cn } from '@/lib/utils'
import { WorkspaceItem } from './WorkspaceItem'
import { useEffect, useRef, useState } from 'react'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'
import { SearchBox } from './SearchBox'

interface WorkspaceListProps {
  selectedOrg: Org
  selectedWorkspace: Workspace | null
  handleCreateViewOpen: () => void
  handleSelect: (org: Org, workspace: Workspace) => void
  enableCreate?: boolean
}

export function WorkspaceList({
  selectedOrg,
  selectedWorkspace,
  handleCreateViewOpen,
  handleSelect,
  enableCreate = true,
}: WorkspaceListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [filteredWorkspaces, setFilteredWorkspaces] = useState<Workspace[]>(
    selectedOrg?.workspaces || []
  )

  useEffect(() => {
    setFilteredWorkspaces(
      selectedOrg?.workspaces.filter((workspace) =>
        workspace.slug.toLowerCase().includes(search.toLowerCase())
      ) || []
    )
  }, [search, selectedOrg?.workspaces])

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
      <SearchBox
        inputRef={inputRef}
        placeholder="Search workspaces..."
        search={search}
        setSearch={setSearch}
      />
      {filteredWorkspaces.length === 0 ? (
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
              isSelected={
                selectedOrg.id === selectedOrg.id &&
                selectedWorkspace?.id === workspace.id
              }
            />
          )}
        />
      )}
      {enableCreate && (
        <div className="bg-background border-t">
          <CommandItem
            onSelect={handleCreateViewOpen}
            className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
          >
            <Icon name="plus" />
            Create workspace
          </CommandItem>
        </div>
      )}
    </div>
  )
}
