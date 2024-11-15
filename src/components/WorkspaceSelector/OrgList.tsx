import { Org } from '.'
import { ScrollArea } from '../ScrollArea'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'

interface OrgListProps {
  orgs: Org[]
  showRecents: boolean
  selectedOrg: Org | null
  setSelectedOrg: (org: Org) => void
  onSelectRecent: () => void
}

export function OrgList({
  orgs,
  showRecents,
  selectedOrg,
  setSelectedOrg,
  onSelectRecent,
}: OrgListProps) {
  return (
    <div className="border-border w-1/3 border-r">
      <div className="border-b">
        <CommandItem
          onSelect={onSelectRecent}
          className={cn(
            'bg-background text-foreground/80 sticky top-0 z-10 m-1 cursor-pointer',
            showRecents && 'bg-accent text-accent-foreground font-semibold'
          )}
        >
          <Icon name="history" />
          Recently used
          {showRecents && (
            <div className="ml-auto">
              <Icon name="chevron-right" size="small" />
            </div>
          )}
        </CommandItem>
      </div>
      <ScrollArea className="h-[calc(400px-44px)]">
        <div>
          {orgs.map((org) => (
            <CommandItem
              key={org.id}
              onSelect={() => setSelectedOrg(org)}
              aria-selected={!showRecents && selectedOrg?.id === org.id}
              className={cn(
                'mx-1 cursor-pointer gap-1.5 p-2 first:mt-1 last:mb-1',
                !showRecents &&
                  selectedOrg?.id === org.id &&
                  'bg-accent text-accent-foreground font-semibold'
              )}
            >
              <GradientCircle name={org.label} />
              {org.label}
              {!showRecents && selectedOrg?.id === org.id && (
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
