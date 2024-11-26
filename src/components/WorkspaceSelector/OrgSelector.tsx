import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Org } from '.'
import { Icon } from '@/components/Icon'
import { Virtuoso } from 'react-virtuoso'

interface OrgSelectorProps {
  orgs: Org[]
  selectedOrg: Org | null
  onSelect: (org: Org) => void
  searchable?: boolean
  error?: boolean
  errorText?: string
  emptyText?: string
  searchPlaceholder?: string
}

const COMBOBOX_CONFIG = {
  heights: {
    row: 32,
    header: 28,
    padding: 8,
    max: 300,
  },
} as const

export function OrgSelector({
  orgs = [],
  selectedOrg,
  onSelect,
  searchable = false,
  error = false,
  errorText = 'An error occurred',
  emptyText = 'No organizations found',
  searchPlaceholder = 'Search organizations...',
}: OrgSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const handleSelect = (org: Org) => {
    onSelect(org)
    setOpen(false)
  }
  const filteredItems = React.useMemo(() => {
    if (!search) return orgs
    return orgs.filter((org) => org.slug.includes(search))
  }, [search, orgs])

  const virtuosoHeight = React.useMemo(() => {
    const { row, header, padding, max } = COMBOBOX_CONFIG.heights
    const shouldShowHeaders = filteredItems.some((group) => group.label)
    const headerHeight = shouldShowHeaders ? filteredItems.length * header : 0
    const contentHeight = filteredItems.reduce(
      (sum, group) => sum + group.workspaces.length * row,
      headerHeight
    )

    return Math.min(contentHeight + padding, max)
  }, [filteredItems])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedOrg ? selectedOrg.slug : 'Select organization...'}
          <Icon name="chevron-down" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          {searchable && (
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={searchPlaceholder}
            />
          )}
          <CommandList>
            {error ? (
              <CommandItem disabled>{errorText}</CommandItem>
            ) : filteredItems.length === 0 ? (
              <CommandItem disabled>{emptyText}</CommandItem>
            ) : (
              <Virtuoso
                style={{ height: virtuosoHeight }}
                data={filteredItems}
                itemContent={(_, org) => (
                  <CommandItem
                    key={org.slug}
                    value={org.slug}
                    onSelect={() => handleSelect(org)}
                  >
                    <div
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedOrg?.slug === org.slug
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    >
                      <Icon name="check" />
                    </div>
                    {org.label}
                  </CommandItem>
                )}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
