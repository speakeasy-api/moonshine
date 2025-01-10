import * as React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { ButtonProps } from '@/components/Button'
import { Icon } from '../Icon'

// I don't like that these aren't based on REM but I'm not sure how to fix it right now
const COMBOBOX_CONFIG = {
  heights: {
    row: 32,
    header: 28,
    padding: 8,
    max: 300,
  },
} as const

export interface ComboboxOption<T extends string = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface ComboboxGroup<T extends string = string> {
  label: string
  options: ComboboxOption<T>[]
}

type ComboboxDataProps<T extends string = string> =
  | { options: ComboboxOption<T>[]; groups?: never }
  | { options?: never; groups: ComboboxGroup<T>[] }

interface ComboboxBaseProps<T extends string = string> {
  value: T
  onValueChange: (value: T | undefined) => void
  variant?: Extract<ButtonProps['variant'], 'outline' | 'ghost'>
  size?: ButtonProps['size']
  disabled?: boolean
  loading?: boolean
  error?: boolean
  errorText?: string
  searchable?: boolean
  placeholder?: string
  emptyText?: string
  searchPlaceholder?: string
  iconOnly?: boolean
}

type ComboboxProps<T extends string = string> = ComboboxBaseProps<T> &
  ComboboxDataProps<T>

export function Combobox<T extends string = string>({
  options,
  groups,
  value,
  onValueChange,
  variant = 'outline',
  size = 'default',
  disabled,
  loading,
  error,
  errorText = 'An error occurred',
  searchable = true,
  placeholder = 'Select option...',
  emptyText = 'No option found.',
  searchPlaceholder = 'Search...',
  iconOnly = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const allOptions = React.useMemo(() => {
    if (options) return options
    if (groups) return groups.flatMap((group) => group.options)
    return []
  }, [options, groups])

  // TODO: Make the search more efficient and fuzzier
  const filteredItems = React.useMemo(() => {
    const items = groups || (options ? [{ label: '', options }] : [])
    if (!search) return items

    return items
      .map((group) => ({
        label: group.label,
        options: group.options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((group) => group.options.length > 0)
  }, [search, options, groups])

  const virtuosoHeight = React.useMemo(() => {
    const { row, header, padding, max } = COMBOBOX_CONFIG.heights
    const shouldShowHeaders = filteredItems.some((group) => group.label)
    const headerHeight = shouldShowHeaders ? filteredItems.length * header : 0
    const contentHeight = filteredItems.reduce(
      (sum, group) => sum + group.options.length * row,
      headerHeight
    )

    return Math.min(contentHeight + padding, max)
  }, [filteredItems])

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const newValue = currentValue === value ? undefined : (currentValue as T)
      onValueChange?.(newValue)
      setOpen(false)
      setSearch('')
    },
    [value, onValueChange]
  )

  const selectedOption = allOptions.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={iconOnly ? 'icon' : size}
          disabled={disabled}
          aria-expanded={open}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin">
              <Icon name="loader-circle" />
            </div>
          ) : (
            <div className="h-4 w-4 shrink-0 opacity-50">
              <Icon name="chevrons-up-down" />
            </div>
          )}
          {!iconOnly && <span>{selectedOption?.label || placeholder}</span>}
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
                itemContent={(_, group) => (
                  <CommandGroup heading={group.label}>
                    {group.options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        disabled={option.disabled}
                      >
                        <div
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === option.value ? 'opacity-100' : 'opacity-0'
                          )}
                        >
                          <Icon name="check" />
                        </div>
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
