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
        key={workspace.id}
        ref={ref}
        onSelect={() => handleSelect(selectedOrg, workspace)}
        className={cn(
          'hover:!bg-accent data-[selected]:!bg-accent flex w-full cursor-pointer flex-row gap-3 p-4 text-base',
          isSelected && 'font-semibold'
        )}
      >
        <GradientCircle name={workspace.label} />
        {workspace.label}

        {isSelected && (
          <div className="ml-auto">
            <Icon name="chevron-right" size="small" />
          </div>
        )}
      </CommandItem>
    )
  }
)
