import { Org } from '.'
import { CommandGroup, CommandItem } from '../Command'
import { ScrollArea } from '../ScrollArea'
import { GradientCircle } from './GradientCircle'

interface FilteredWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (workspaceId: string) => void
}

export function FilteredWorkspaces({
  orgsWithFilteredWorkspaces,
  onSelect,
}: FilteredWorkspacesProps) {
  return (
    <ScrollArea className="h-[400px]">
      {orgsWithFilteredWorkspaces.map((org) => (
        <CommandGroup key={org.id} heading={org.label}>
          {org.workspaces.map((workspace) => (
            <CommandItem
              key={workspace.id}
              onSelect={() => onSelect(workspace.id)}
            >
              <GradientCircle name={workspace.label} />
              {workspace.label}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </ScrollArea>
  )
}
