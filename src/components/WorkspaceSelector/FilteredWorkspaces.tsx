import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { CommandGroup } from '../Command'
import { ScrollArea } from '../ScrollArea'
import { WorkspaceItem } from './WorkspaceItem'

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
  selectedOrg,
  selectedWorkspace,
  height,
}: FilteredWorkspacesProps) {
  return (
    <ScrollArea
      className={cn(fullWidth ? 'w-full' : 'w-2/3')}
      style={{ height }}
    >
      {orgsWithFilteredWorkspaces.map((org) => (
        <CommandGroup key={org.id} heading={org.label}>
          {org.workspaces.map((workspace) => (
            <WorkspaceItem
              key={workspace.id}
              workspace={workspace}
              selectedOrg={org}
              handleSelect={onSelect}
              isSelected={
                selectedOrg?.id === org.id &&
                selectedWorkspace?.id === workspace.id
              }
            />
          ))}
        </CommandGroup>
      ))}
    </ScrollArea>
  )
}
