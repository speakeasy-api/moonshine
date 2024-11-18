import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { WorkspaceItem } from './WorkspaceItem'
import { GroupedScrollingList, ScrollingList } from './ScrollingList'
import { GradientCircle } from './GradientCircle'
import { CommandGroup, CommandItem } from '../Command'

interface FilteredWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (org: Org, workspace: Workspace) => void
  fullWidth?: boolean
  selectedOrg: Org | null
  selectedWorkspace: Workspace | null
  height: string | number
}

export function FilteredWorkspaces({
  orgsWithFilteredWorkspaces,
  onSelect,
  fullWidth = false,
  height,
  selectedOrg,
  selectedWorkspace,
}: FilteredWorkspacesProps) {
  return (
    <div className={cn(fullWidth ? 'w-full' : 'w-2/3')}>
      <ScrollingList
        items={orgsWithFilteredWorkspaces}
        height={height}
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
