import { Org } from '.'
import { ScrollArea } from '../ScrollArea'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'

interface OrgListProps {
  orgs: Org[]
  selectedOrg: Org | null
  setSelectedOrg: (org: Org) => void
}

export function OrgList({ orgs, selectedOrg, setSelectedOrg }: OrgListProps) {
  return (
    <div className="border-border w-1/3 border-r">
      <ScrollArea className="h-[400px]">
        <div>
          {orgs.map((org) => (
            <CommandItem
              key={org.id}
              onSelect={() => setSelectedOrg(org)}
              aria-selected={selectedOrg?.id === org.id}
              className={cn(
                'mx-1 cursor-pointer gap-1.5 p-2 first:mt-1 last:mb-1',
                selectedOrg?.id === org.id &&
                  'bg-accent text-accent-foreground font-semibold'
              )}
            >
              <GradientCircle name={org.label} />
              {org.label}
              {selectedOrg?.id === org.id && (
                <div className="ml-auto">
                  <Icon name="chevron-right" size="small" />
                </div>
              )}
            </CommandItem>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
