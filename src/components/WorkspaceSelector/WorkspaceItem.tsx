import { cn } from '@/lib/utils'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Org, Workspace } from '.'
import { Icon } from '../Icon'
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
        ref={ref}
        value={`workspace-${selectedOrg.slug}-${workspace.slug}`}
        onSelect={() => handleSelect(selectedOrg, workspace)}
        className={cn(
          'hover:!bg-accent data-[selected]:!bg-accent flex w-full max-w-full cursor-pointer flex-row gap-3 p-4 text-base',
          isSelected && 'font-semibold',
          !workspace.active && 'opacity-50'
        )}
      >
        <GradientCircle name={workspace.label} />
        <span className="truncate">{workspace.label}</span>

        {isSelected && (
          <div className="ml-auto">
            <Icon name="chevron-right" size="small" />
          </div>
        )}
      </CommandItem>
    )
  }
)
