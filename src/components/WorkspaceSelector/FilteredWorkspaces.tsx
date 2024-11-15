import { cn } from '@/lib/utils'
import { Org } from '.'
import { CommandGroup, CommandItem } from '../Command'
import { ScrollArea } from '../ScrollArea'
import { GradientCircle } from './GradientCircle'

interface FilteredWorkspacesProps {
  orgsWithFilteredWorkspaces: Org[]
  onSelect: (workspaceId: string) => void
  fullWidth?: boolean
}

export function FilteredWorkspaces({
  orgsWithFilteredWorkspaces,
  onSelect,
  fullWidth = false,
}: FilteredWorkspacesProps) {
  return (
    <ScrollArea className={cn('h-[400px]', fullWidth ? 'w-full' : 'w-2/3')}>
      {orgsWithFilteredWorkspaces.map((org) => (
        <CommandGroup key={org.id} heading={org.label}>
          {org.workspaces.map((workspace) => (
            <CommandItem
              key={workspace.id}
              onSelect={() => onSelect(workspace.id)}
              className="hover:!bg-accent data-[selected]:!bg-accent cursor-pointer"
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
