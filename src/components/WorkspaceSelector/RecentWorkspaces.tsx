import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { WorkspaceItem } from './WorkspaceItem'
import { ScrollingList } from './ScrollingList'
import { CommandGroup, CommandItem } from '../Command'
import { Icon } from '../Icon'
import { useState, useRef, useEffect } from 'react'
import { SearchBox } from './SearchBox'

interface RecentWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (org: Org, workspace: Workspace) => void
  fullWidth?: boolean
  selectedOrg: Org | null
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
            <CommandGroup key={org.slug} heading={org.label}>
              {org.workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.slug}
                  onSelect={() => onSelect(org, workspace)}
                >
                  <WorkspaceItem
                    workspace={workspace}
                    isSelected={
                      selectedOrg?.slug === org.slug &&
                      selectedWorkspace?.slug === workspace.slug
                    }
                    selectedOrg={org}
                    handleSelect={onSelect}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          )
        }}
      />

      <div className="bg-background border-t">
        <CommandItem
          onSelect={handleCreateViewOpen}
          className={cn('m-1 cursor-pointer !items-center p-4 text-base')}
        >
          <Icon name="plus" />
          Create workspace
        </CommandItem>
      </div>
    </div>
  )
}
