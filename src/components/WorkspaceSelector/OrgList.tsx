import { Org } from '.'
import { CommandItem } from '../Command'
import { GradientCircle } from '../GradientCircle'
import { Icon } from '../Icon'
import { cn } from '#lib/utils'
import { ScrollingList } from './ScrollingList'
import { VirtuosoHandle } from 'react-virtuoso'
import { useEffect, useRef, useState } from 'react'
import { SearchBox } from './SearchBox'

interface OrgListProps {
  orgs: Org[]
  enableRecents: boolean
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
  enableRecents,
  onSelectRecent,
}: OrgListProps) {
  const virtuoso = useRef<VirtuosoHandle | null>(null)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [filteredOrgs, setFilteredOrgs] = useState(orgs)

  useEffect(() => {
    setFilteredOrgs(
      orgs.filter((org) =>
        org.slug.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

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
      <SearchBox
        inputRef={inputRef}
        placeholder="Search organizations..."
        search={search}
        setSearch={setSearch}
      />

      {filteredOrgs.length > 0 ? (
        <ScrollingList
          items={filteredOrgs}
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
              <span className="truncate">{org.slug}</span>
              {!showRecents && selectedOrg?.slug === org.slug && (
                <div className="ml-auto">
                  <Icon name="chevron-right" size="small" />
                </div>
              )}
            </CommandItem>
          )}
        />
      ) : (
        <div className="text-muted-foreground max-w-2/3 m-auto flex h-full items-center justify-center p-6 text-center">
          No organizations found
        </div>
      )}

      {enableRecents && (
        <div className="bg-background border-t">
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
    </div>
  )
}
