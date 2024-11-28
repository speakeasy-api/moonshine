import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { WorkspaceItem } from './WorkspaceItem'
import { ScrollingList } from './ScrollingList'
import { CommandGroup, CommandItem } from '../Command'
import { Separator } from '../Separator'
import { Stack } from '../Stack'

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
            <>
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
              <Stack padding={{ left: 0, right: 0, top: 5, bottom: 5 }}>
                <Separator orientation="horizontal" />
              </Stack>
            </>
          )
        }}
      />
    </div>
  )
}
