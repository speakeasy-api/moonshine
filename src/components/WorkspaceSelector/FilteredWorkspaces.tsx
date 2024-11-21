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
            <CommandGroup key={org.slug} heading={org.label}>
              {org.workspaces.map((workspace) => (
                <CommandItem
                  key={`${org.slug}-${workspace.slug}`}
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
    </div>
  )
}
