import { Org } from '.'
import { ScrollArea } from '../ScrollArea'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface OrgListProps {
  orgs: Org[]
  enableRecents: boolean
  showRecents: boolean
  selectedOrg: Org | null
  setSelectedOrg: (org: Org) => void
  onSelectRecent: () => void
  height: string | number
}

export function OrgList({
  orgs,
  showRecents,
  selectedOrg,
  setSelectedOrg,
  enableRecents,
  onSelectRecent,
  height,
}: OrgListProps) {
  const orgRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    // TODO: dont scroll if the org is already in view
    if (selectedOrg) {
      const element = orgRefs.current[selectedOrg.id]
      if (element) {
        element.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        })
      }
    }
  }, [selectedOrg])

  return (
    <div className="border-border w-1/3 border-r">
      {enableRecents && (
        <div className="bg-background border-b">
          <CommandItem
            onSelect={onSelectRecent}
            className={cn(
              'bg-background text-foreground/80 sticky top-0 z-10 m-1 flex cursor-pointer items-center p-4 text-base',
              showRecents && 'bg-accent text-accent-foreground font-semibold'
            )}
          >
            <Icon name="history" />
            Recently used
            {showRecents && (
              <div className="ml-auto">
                <Icon name="chevron-right" size="2xl" />
              </div>
            )}
          </CommandItem>
        </div>
      )}
      <ScrollArea style={{ height: `calc(${height} * 0.87)` }}>
        {orgs.map((org) => (
          <CommandItem
            key={org.id}
            onSelect={() => setSelectedOrg(org)}
            aria-selected={selectedOrg?.id === org.id}
            className={cn(
              'mx-1 flex cursor-pointer flex-row gap-3 p-4 text-base first:mt-1 last:mb-1',
              !showRecents &&
                selectedOrg?.id === org.id &&
                'bg-accent text-accent-foreground font-semibold'
            )}
            ref={(el) => (orgRefs.current[org.id] = el)}
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
      </ScrollArea>
    </div>
  )
}
