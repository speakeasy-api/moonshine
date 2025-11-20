import { cn } from '../../lib/utils'
import { CommandItem } from '../Command'
import { GradientCircle } from '../GradientCircle'
import { Org, Workspace } from '.'
import { Text } from '../Text'
import { forwardRef } from 'react'

interface WorkspaceItemProps {
  workspace: Workspace
  selectedOrg: Org
  isSelected: boolean
  handleSelect: (org: Org, workspace: Workspace) => void
}

export const WorkspaceItem = forwardRef<HTMLDivElement, WorkspaceItemProps>(
  function WorkspaceItem(
    { workspace, selectedOrg, handleSelect, isSelected },
    ref
  ) {
    return (
      <CommandItem
        key={workspace.id}
        ref={ref}
        value={`workspace-${selectedOrg.id}-${workspace.id}`}
        onSelect={() => handleSelect(selectedOrg, workspace)}
        className={cn(
          'hover:!bg-accent/40 data-[selected=true]:!bg-accent/40 flex w-full max-w-full cursor-pointer flex-row gap-3 rounded-none p-4 text-base',
          isSelected && 'font-semibold',
          !workspace.active && 'opacity-50'
        )}
      >
        <GradientCircle name={workspace.label} />
        <Text className="truncate">{workspace.label}</Text>
      </CommandItem>
    )
  }
)
