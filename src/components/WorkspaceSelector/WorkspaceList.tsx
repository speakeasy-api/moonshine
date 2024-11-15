import { CommandItem } from '../Command'
import { ScrollArea } from '../ScrollArea'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { Org } from '.'
import { cn } from '@/lib/utils'

interface WorkspaceListProps {
  selectedOrg: Org
  handleCreateDialogOpen: () => void
  handleSelect: (workspaceId: string) => void
}

export function WorkspaceList({
  selectedOrg,
  handleCreateDialogOpen,
  handleSelect,
}: WorkspaceListProps) {
  const useGridLayout = requiresGridLayout(selectedOrg)
  const gridCols = getGridCols(selectedOrg)
  return (
    <div className="flex w-2/3 flex-col">
      <div className="bg-background sticky top-0 z-10 border-b">
        <CommandItem
          onSelect={handleCreateDialogOpen}
          className={cn(
            'm-1 cursor-pointer !items-center py-2 hover:bg-gray-100',
            useGridLayout && 'px-5 py-3'
          )}
        >
          <Icon name="plus" />
          Create new workspace
        </CommandItem>
      </div>
      <ScrollArea className="h-[calc(400px-44px)]">
        <div
          className={cn(
            useGridLayout && `grid grid-cols-${gridCols} m-4 gap-2`,
            selectedOrg.workspaces.length === 1 && 'justify-items-start'
          )}
        >
          {selectedOrg?.workspaces.map((workspace) => (
            <CommandItem
              key={workspace.id}
              onSelect={() => handleSelect(workspace.id)}
              className={cn(
                'hover:!bg-accent data-[selected]:!bg-accent cursor-pointer',
                useGridLayout && 'rounded-lg border p-4'
              )}
            >
              <GradientCircle name={workspace.label} />
              {workspace.label}
            </CommandItem>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function requiresGridLayout(selectedOrg: Org) {
  return selectedOrg.workspaces.length <= 10
}

function getGridCols(selectedOrg: Org): number {
  // if one workspace, then one col
  // if two workspaces, then two cols
  // if three or four workspaces, then two cols
  // if five or six workspaces, then three cols
  // if seven or eight workspaces, then four cols
  // if nine or ten workspaces, then five cols
  return Math.min(Math.ceil(selectedOrg.workspaces.length / 2), 5)
}
