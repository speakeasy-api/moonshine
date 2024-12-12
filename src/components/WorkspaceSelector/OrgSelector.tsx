import * as React from 'react'

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '#@components/Command'
import { Popover, PopoverContent, PopoverTrigger } from '#@components/Popover'
import { Org } from '.'
import { Icon } from '#@components/Icon'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { cn } from '#lib/utils'

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
  searchPlaceholder = 'Search...',
}: OrgSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(0)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const handleSelect = (org: Org, index: number) => {
    onSelect(org)
    setOpen(false)
    setActiveIndex(index)
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

    return Math.round(medianLength * baseCharWidth * 1.2)
  }, [orgs])

  const virtuosoRef = React.useRef<VirtuosoHandle>(null)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (open) {
      virtuosoRef.current?.scrollToIndex({ index: activeIndex, align: 'start' })
    }
  }

  const VirtuosoItem = React.memo(
    ({ index, org }: { index: number; org: Org }) => {
      return (
        <CommandItem
          key={org.slug}
          value={org.slug}
          onSelect={() => handleSelect(org, index)}
          className="relative block w-full cursor-pointer select-none items-center gap-2 truncate rounded-sm px-2 py-1.5 text-sm outline-none"
        >
          {org.label}
        </CommandItem>
      )
    }
  )

  // When the search changes, reset the active index and scroll to the top
  React.useEffect(() => {
    setActiveIndex(0)
    virtuosoRef.current?.scrollToIndex({ index: 0, align: 'start' })
  }, [search])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
      if (!virtuosoRef.current) return

      let newIndex = activeIndex
      switch (e.key) {
        case 'ArrowDown':
          newIndex = Math.min(activeIndex + 1, filteredItems.length - 1)
          break
        case 'ArrowUp':
          newIndex = Math.max(activeIndex - 1, 0)
          break
        case 'Home':
          newIndex = 0
          break
      }
      setActiveIndex(newIndex)
      virtuosoRef.current?.scrollToIndex({ index: newIndex, align: 'start' })
    },
    [activeIndex, filteredItems.length]
  )

  const virtuosoHeight = React.useMemo(() => {
    const { row, header, padding, max } = COMBOBOX_CONFIG.heights
    const shouldShowHeaders = filteredItems.some((group) => group.label)
    const headerHeight = shouldShowHeaders ? filteredItems.length * header : 0
    const contentHeight = filteredItems.reduce((sum) => row + sum, headerHeight)

    return Math.min(contentHeight + padding, max)
  }, [filteredItems])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild className="flex flex-row items-center">
        <button
          type="button"
          role="combobox"
          ref={triggerRef}
          aria-expanded={open}
          title={selectedOrg ? selectedOrg.slug : 'Select organization...'}
          className="flex flex-row items-center gap-2 outline-none"
        >
          <div
            className={cn(
              'min-w-0 flex-1 truncate text-left text-lg font-semibold lowercase',
              open ? 'text-foreground' : 'text-foreground/80'
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
      <PopoverContent className="w-fit p-0" align="start" sideOffset={10}>
        <Command shouldFilter={false} onKeyDown={handleKeyDown}>
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
                ref={virtuosoRef}
                initialTopMostItemIndex={activeIndex}
                totalCount={filteredItems.length}
                itemContent={(index, org) => (
                  <VirtuosoItem index={index} org={org} />
                )}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
