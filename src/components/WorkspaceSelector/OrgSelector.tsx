import * as React from 'react'

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Org } from '.'
import { Icon } from '@/components/Icon'
import { Virtuoso } from 'react-virtuoso'
import { cn } from '@/lib/utils'

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
    row: 16,
    header: 28,
    padding: 8,
    max: 250,
  },
} as const

function uniqBy<T>(arr: T[], key: keyof T) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export function OrgSelector({
  orgs = [],
  selectedOrg,
  onSelect,
  searchable = true,
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
    if (!search) return uniqBy(orgs, 'slug')
    return uniqBy(
      orgs.filter((org) => org.slug.includes(search)),
      'slug'
    )
  }, [search, orgs])

  const getSelectorMedianWidth = React.useMemo(() => {
    if (!orgs.length) return 0

    // Get lengths of all slugs
    const lengths = orgs.map((org) => org.slug.length)

    // Sort lengths to find the middle value(s)
    const sortedLengths = [...lengths].sort((a, b) => a - b)
    const mid = Math.floor(sortedLengths.length / 2)

    // Get median length (average of two middle values for even-length arrays)
    const medianLength =
      sortedLengths.length % 2 === 0
        ? (sortedLengths[mid - 1] + sortedLengths[mid]) / 2
        : sortedLengths[mid]

    // Base width calculation:
    // - Average lowercase letter: ~8px at 16px font size
    // - Average uppercase letter: ~10px at 16px font size
    // - Numbers: ~8px at 16px font size
    // - Font size adjustment (text-lg = 1.125rem = 18px): 18/16 = 1.125
    const baseCharWidth = 8 * 1.125

    return Math.round(medianLength * baseCharWidth)
  }, [orgs])

  const virtuosoHeight = React.useMemo(() => {
    const { row, header, padding, max } = COMBOBOX_CONFIG.heights
    const shouldShowHeaders = filteredItems.some((group) => group.label)
    const headerHeight = shouldShowHeaders ? filteredItems.length * header : 0
    const contentHeight = filteredItems.reduce((sum) => row + sum, headerHeight)

    return Math.min(contentHeight + padding, max)
  }, [filteredItems])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex flex-row items-center">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          title={selectedOrg ? selectedOrg.slug : 'Select organization...'}
          className="flex flex-row items-center gap-2 outline-none"
        >
          <div
            className={cn(
              'min-w-0 flex-1 truncate text-left text-lg font-semibold',
              open ? 'text-white' : 'text-white/80'
            )}
            style={{ width: getSelectorMedianWidth }}
          >
            {selectedOrg ? selectedOrg.slug : 'Select organization...'}
          </div>
          <Icon
            name={open ? 'chevron-up' : 'chevron-down'}
            className="flex-shrink-0"
          />
        </button>
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
                totalCount={filteredItems.length}
                itemContent={(_, org) => (
                  <CommandItem
                    key={org.slug}
                    value={org.slug}
                    onSelect={() => handleSelect(org)}
                    className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none"
                  >
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
