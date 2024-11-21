import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { WorkspaceItem } from './WorkspaceItem'
import { ScrollingList } from './ScrollingList'
import { CommandGroup, CommandItem } from '../Command'

interface FilteredWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (org: Org, workspace: Workspace) => void
  fullWidth?: boolean
  selectedOrg: Org | null
  selectedWorkspace: Workspace | null
}

export function FilteredWorkspaces({
  orgsWithFilteredWorkspaces,
  onSelect,
  fullWidth = false,
  selectedOrg,
  selectedWorkspace,
}: FilteredWorkspacesProps) {
  return (
    <div className={cn('h-full', fullWidth ? 'w-full' : 'w-2/3')}>
      <ScrollingList
        items={orgsWithFilteredWorkspaces}
        renderItem={(org) => {
          return (
            <CommandGroup key={org.id} heading={org.label}>
              {org.workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  onSelect={() => onSelect(org, workspace)}
                >
                  <WorkspaceItem
                    workspace={workspace}
                    isSelected={
                      selectedOrg?.id === org.id &&
                      selectedWorkspace?.id === workspace.id
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
    </div>
  )
}
