import { Org } from '.'
import { CommandItem } from '../Command'
import { GradientCircle } from './GradientCircle'
import { Icon } from '../Icon'
import { cn } from '@/lib/utils'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'
import { useEffect, useRef } from 'react'

interface OrgListProps {
  orgs: Org[]
  enableRecents: boolean
  showRecents: boolean
  selectedOrg: Org | null
  setSelectedOrg: (org: Org) => void
  onSelectRecent: () => void
  handleCreateViewOpen: () => void
}

export function OrgList({
  orgs,
  showRecents,
  selectedOrg,
  setSelectedOrg,
  enableRecents,
  onSelectRecent,
  handleCreateViewOpen,
}: OrgListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null)

  useEffect(() => {
    if (selectedOrg && virtuoso.current) {
      const index = orgs.findIndex((org) => org.slug === selectedOrg.slug)

      setTimeout(() => {
        virtuoso.current?.scrollIntoView({
          index,
          behavior: orgs.length < 10 ? 'smooth' : 'auto',
        })
      }, 100)
    }
  }, [selectedOrg, orgs])

  return (
    <div className="border-border flex w-1/3 flex-col border-r">
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
        ref={virtuoso}
        renderItem={(org) => (
          <CommandItem
            key={org.slug}
            onSelect={() => setSelectedOrg(org)}
            value={`org-${org.slug}`}
            className={cn(
              'flex max-w-lg cursor-pointer flex-row gap-3 p-4 text-base',
              !showRecents &&
                selectedOrg?.slug === org.slug &&
                'bg-accent text-accent-foreground font-semibold'
            )}
          >
            <GradientCircle name={org.label} />
            <span className="truncate">{org.label}</span>
            {!showRecents && selectedOrg?.slug === org.slug && (
              <div className="ml-auto">
                <Icon name="chevron-right" size="small" />
              </div>
            )}
          </CommandItem>
        )}
      />

      <div className="bg-background border-t">
        <CommandItem
          onSelect={handleCreateViewOpen}
          className="m-1 cursor-pointer !items-center whitespace-pre p-4 text-base"
        >
          <Icon name="plus" />
          Create company
        </CommandItem>
      </div>
    </div>
  )
}
