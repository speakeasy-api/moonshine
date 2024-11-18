import { cn } from '@/lib/utils'
import { Org, Workspace } from '.'
import { CommandGroup } from '../Command'
import { WorkspaceItem } from './WorkspaceItem'
import { GroupedScrollingList } from './ScrollingList'
import { GradientCircle } from './GradientCircle'

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
    <div className={cn(fullWidth ? 'w-full' : 'w-2/3')}>
      <GroupedScrollingList<Org, Workspace>
        groups={orgsWithFilteredWorkspaces}
        groupCounts={orgsWithFilteredWorkspaces.map(
          (org) => org.workspaces.length
        )}
        height={height}
        renderGroupHeader={(group) => (
          <div className="bg-card z-10 flex flex-row items-center gap-2 border-b border-t p-4 text-sm font-medium">
            <GradientCircle name={group.label} />
            {group.label}
          </div>
        )}
        renderItem={(org, itemIndex) => {
          const workspace = orgsWithFilteredWorkspaces
            .flatMap((org) => org.workspaces)
            .find((_, index) => index === itemIndex)
          if (!workspace) {
            console.log(`workspace not found for org: ${org.id}`)
            console.log(`itemIndex: ${itemIndex}`)

            return null
          }
          return (
            <WorkspaceItem
              key={workspace.id}
              workspace={workspace}
              selectedOrg={org}
              handleSelect={onSelect}
              indent
              isSelected={
                selectedOrg?.id === org.id &&
                selectedWorkspace?.id === workspace.id
              }
            />
          )
        }}
      />
    </div>
  )
}
