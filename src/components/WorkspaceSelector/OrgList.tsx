import { Org } from '.'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { ScrollingList } from './ScrollingList'

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
          block: 'nearest',
        })
      }
    }
  }, [selectedOrg])

  return (
    <div className="border-border w-1/3 border-r">
      {/* <div
        className={cn(
          'flex flex-col justify-center gap-2 px-4 py-6',
          !enableRecents && 'border-b'
        )}
      >
        <Text variant="h4">Select your workspace</Text>
        <Text variant="muted">
          Select the workspace you want to use for this project. Alternatively,
          you can create a new workspace.
        </Text>
      </div> */}
      {enableRecents && (
        <div className="bg-background border-y">
          <CommandItem
            onSelect={onSelectRecent}
            className={cn(
              'bg-background text-foreground/80 sticky top-0 z-10 flex cursor-pointer items-center p-4 text-base',
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
      <ScrollingList
        items={orgs}
        height={height}
        renderItem={(org) => (
          <CommandItem
            key={org.id}
            onSelect={() => setSelectedOrg(org)}
            aria-selected={selectedOrg?.id === org.id}
            className={cn(
              'flex max-w-lg cursor-pointer flex-row gap-3 p-4 text-base',
              !showRecents &&
                selectedOrg?.id === org.id &&
                'bg-accent text-accent-foreground font-semibold'
            )}
            ref={(el) => (orgRefs.current[org.id] = el)}
          >
            <GradientCircle name={org.label} />
            <span className="truncate">{org.label}</span>
            {!showRecents && selectedOrg?.id === org.id && (
              <div className="ml-auto">
                <Icon name="chevron-right" size="small" />
              </div>
            )}
          </CommandItem>
        )}
      />
    </div>
  )
}
