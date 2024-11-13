'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { ScrollArea } from '../ScrollArea'
import { ChevronsUpDown, Plus } from 'lucide-react'

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }
}

export interface ComboboxOption<T extends string = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface ComboboxGroup<T extends string = string> {
  label: string
  options: ComboboxOption<T>[]
}

interface ComboboxProps<T extends string = string> {
  groups: ComboboxGroup<T>[]
  value?: T
  onValueChange: (value: T | undefined) => void
  onCreateNewItem: (groupLabel: string, newItemLabel: string) => void
  placeholder?: string
  emptyText?: string
}

export function WorkspaceSelector<T extends string = string>({
  groups,
  value,
  onValueChange,
  onCreateNewItem,
  placeholder = 'Select option...',
  emptyText = 'No option found.',
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedGroup, setSelectedGroup] =
    React.useState<ComboboxGroup<T> | null>(groups[0])
  const [focusIndex, setFocusIndex] = React.useState(-1)
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const createInputRef = React.useRef<HTMLInputElement>(null)
  const [newWorkspaceName, setNewWorkspaceName] = React.useState('')

  const filteredGroups = React.useMemo(() => {
    if (!search) return groups
    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((group) => group.options.length > 0)
  }, [groups, search])

  const allItems = React.useMemo(() => {
    return filteredGroups.flatMap((group) => [
      { type: 'group', label: group.label },
      ...group.options.map((option) => ({ type: 'option', ...option })),
      { type: 'create', label: 'Create new item' },
    ])
  }, [filteredGroups])

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      onValueChange(currentValue as T)
      setOpen(false)
      setSearch('')
    },
    [onValueChange]
  )

  // const handleCreateNewItem = React.useCallback(() => {
  //   if (selectedGroup && newItemLabel) {
  //     onCreateNewItem(selectedGroup.label, newItemLabel)
  //     setNewItemLabel('')
  //     setIsDialogOpen(false)
  //   }
  // }, [selectedGroup, newItemLabel, onCreateNewItem])

  const selectedOption = React.useMemo(() => {
    if (!groups) return null
    for (const group of groups) {
      const option = group.options.find((option) => option.value === value)
      if (option) return option
    }
    return null
  }, [groups, value])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          setFocusIndex((prev) => (prev + 1) % allItems.length)
          event.preventDefault()
          break
        case 'ArrowUp':
          setFocusIndex(
            (prev) => (prev - 1 + allItems.length) % allItems.length
          )
          event.preventDefault()
          break
        case 'Enter':
          if (focusIndex !== -1) {
            const item = allItems[focusIndex]
            if (item.type === 'option') {
              // todo use value
              handleSelect(item.label)
            } else if (item.type === 'create') {
              // setIsDialogOpen(true)
            } else if (item.type === 'group') {
              setSelectedGroup(
                groups.find((g) => g.label === item.label) || null
              )
            }
          }
          event.preventDefault()
          break
      }
    },
    [allItems, focusIndex, handleSelect, groups]
  )

  const handleCreateDialogOpen = React.useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setCreateDialogOpen(true)
      })
    } else {
      setCreateDialogOpen(true)
    }
  }, [])

  React.useEffect(() => {
    if (createDialogOpen) {
      // Wait for the transition to complete
      setTimeout(() => {
        createInputRef.current?.focus()
      }, 300) // matches the animation duration
    }
  }, [createDialogOpen])

  const handleClose = () => {
    setCreateDialogOpen(false)
    setNewWorkspaceName('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-popover text-popover-foreground w-[500px] overflow-hidden p-0">
        <style>
          {`
            @keyframes slide-fade-in {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes slide-fade-out {
              from {
                opacity: 1;
                transform: translateX(0);
              }
              to {
                opacity: 0;
                transform: translateX(-100%);
              }
            }

            ::view-transition-group(workspace-content) {
              overflow: hidden;
            }

            ::view-transition-old(workspace-content) {
              animation: 300ms ease-out slide-fade-out;
            }

            ::view-transition-new(workspace-content) {
              animation: 300ms ease-out slide-fade-in;
            }
          `}
        </style>
        <div style={{ viewTransitionName: 'workspace-content' }}>
          {createDialogOpen ? (
            <div style={{ viewTransitionName: 'create-dialog' }}>
              <Command>
                <CommandList>
                  <div className="flex flex-col gap-2 p-6">
                    <div className="flex flex-row items-center gap-2 p-4">
                      <h1 className="text-md font-semibold">
                        {selectedGroup?.label}
                      </h1>
                      <span className="text-muted-foreground text-sm">/</span>
                      <input
                        ref={createInputRef}
                        type="text"
                        placeholder="New workspace name"
                        value={newWorkspaceName}
                        onChange={(e) => setNewWorkspaceName(e.target.value)}
                        className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="secondary"
                        disabled={!newWorkspaceName}
                        onClick={() => {
                          {
                            onCreateNewItem(
                              selectedGroup?.label || '',
                              newWorkspaceName
                            )
                            handleClose()
                          }
                        }}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </CommandList>
              </Command>
            </div>
          ) : (
            <Command shouldFilter={false}>
              <CommandInput
                ref={inputRef}
                placeholder="Enter new item name..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandList onKeyDown={handleKeyDown}>
                <CommandEmpty className="text-gray-500">
                  {emptyText}
                </CommandEmpty>
                {filteredGroups.length > 0 ? (
                  <div className="flex">
                    <ScrollArea className="border-border h-[200px] w-[35%] border-r">
                      {filteredGroups.map((group, groupIndex) => (
                        <CommandItem
                          key={group.label}
                          onSelect={() => setSelectedGroup(group)}
                          aria-selected={selectedGroup?.label === group.label}
                          className={cn(
                            'hover:bg-popover/30 cursor-pointer gap-1.5 p-2 first:mt-1 last:mb-1', // lighter hover style
                            selectedGroup?.label === group.label &&
                              'bg-accent text-accent-foreground font-semibold'
                          )}
                          data-focused={focusIndex === groupIndex}
                          data-selected={
                            selectedGroup?.label === group.label
                              ? 'true'
                              : undefined
                          }
                        >
                          <GradientCircle orgName={group.label} />
                          {group.label}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                    <ScrollArea className="h-[200px] w-[65%]">
                      {selectedGroup && (
                        <CommandGroup>
                          {selectedGroup.options.map((option, optionIndex) => (
                            <CommandItem
                              key={option.value}
                              onSelect={() => handleSelect(option.label)}
                              className="cursor-pointer hover:bg-gray-100"
                              data-focused={
                                focusIndex ===
                                filteredGroups.length + optionIndex
                              }
                            >
                              <GradientCircle orgName={option.label} />
                              {option.label}
                            </CommandItem>
                          ))}
                          <CommandItem
                            onSelect={handleCreateDialogOpen}
                            className="cursor-pointer !items-center hover:bg-gray-100"
                            data-focused={focusIndex === allItems.length - 1}
                          >
                            <Plus className="h-4 w-4" />
                            Create new item
                          </CommandItem>
                        </CommandGroup>
                      )}
                    </ScrollArea>
                  </div>
                ) : (
                  <CommandItem className="text-gray-500">
                    {emptyText}
                  </CommandItem>
                )}
              </CommandList>
            </Command>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function GradientCircle({ orgName }: { orgName: string }) {
  // First hash using djb2
  const hash1 = orgName.split('').reduce((acc, char) => {
    const charCode = char.charCodeAt(0)
    return (acc << 5) + acc + charCode
  }, 5381)

  // Second hash using a different initial value and bit rotation
  const hash2 = orgName.split('').reduce((acc, char) => {
    const charCode = char.charCodeAt(0)
    return ((acc >> 2) + acc) ^ charCode
  }, 7919) // Different prime number

  // Ensure colors are in different parts of the color spectrum
  const fromColor = `#${Math.abs(hash1 % 0xffffff)
    .toString(16)
    .padStart(6, '0')}`
  const toColor = `#${Math.abs((hash2 * 0xfff) % 0xffffff)
    .toString(16)
    .padStart(6, '0')}`

  return (
    <div
      className="h-4 w-4 rounded-full border-[1px] border-white"
      style={{
        background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
      }}
    />
  )
}
