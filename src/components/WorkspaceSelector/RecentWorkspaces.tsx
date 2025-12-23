import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { WorkspaceItem } from './WorkspaceItem'
import { ScrollingList } from './ScrollingList'
import { CommandGroup, CommandItem } from '../Command'
import { Icon } from '../Icon'
import { useState, useRef, useEffect } from 'react'
import { SearchBox } from './SearchBox'
import { Text } from '../Text'

interface RecentWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (org: Org, workspace: Workspace) => void
  fullWidth?: boolean
  selectedOrg?: Org
  selectedWorkspace: Workspace | null
  handleCreateViewOpen: () => void
}

export function RecentWorkspaces({
  orgsWithFilteredWorkspaces,
  onSelect,
  fullWidth = false,
  selectedOrg,
  selectedWorkspace,
  handleCreateViewOpen,
}: RecentWorkspacesProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [filteredRecents, setFilteredRecents] = useState<Org[]>(
    orgsWithFilteredWorkspaces
  )

  useEffect(() => {
    setFilteredRecents(
      orgsWithFilteredWorkspaces.filter((org) =>
        org.workspaces.some((workspace) => workspace.slug.includes(search))
      )
    )
  }, [search, orgsWithFilteredWorkspaces])

  return (
    <div className={cn('flex h-full flex-col', fullWidth ? 'w-full' : 'w-2/3')}>
      <SearchBox
        inputRef={inputRef}
        placeholder="Search workspaces..."
        search={search}
        setSearch={setSearch}
      />
      <ScrollingList
        items={filteredRecents}
        renderItem={(org) => {
          return (
            <CommandGroup key={org.id} heading={org.slug}>
              {org.workspaces.map((workspace) => (
                <WorkspaceItem
                  key={workspace.id}
                  workspace={workspace}
                  isSelected={
                    selectedOrg?.id === org.id &&
                    selectedWorkspace?.id === workspace.id
                  }
                  selectedOrg={org}
                  handleSelect={onSelect}
                />
              ))}
            </CommandGroup>
          )
        }}
      />

      <div className="bg-background border-neutral-softest border-t">
        <CommandItem
          onSelect={handleCreateViewOpen}
          className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
        >
          <Icon name="plus" />
          <Text>Create workspace</Text>
        </CommandItem>
      </div>
    </div>
  )
}
