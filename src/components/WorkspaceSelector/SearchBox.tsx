import { RefObject } from 'react'
import { CommandInput } from '../Command'
import { Icon } from '../Icon'

interface SearchBoxProps {
  inputRef: RefObject<HTMLInputElement>
  search: string
  setSearch: (search: string) => void
}

export function SearchBox({ inputRef, search, setSearch }: SearchBoxProps) {
  return (
    <div className="relative flex items-center gap-2 p-3">
      <CommandInput
        ref={inputRef}
        placeholder="Search workspaces..."
        value={search}
        className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50"
        onValueChange={setSearch}
      />

      <div className="absolute right-3">
        {search && (
          <button
            className="hover:bg-accent text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm"
            onClick={() => setSearch('')}
          >
            <Icon name="x" size="small" />
          </button>
        )}
      </div>
    </div>
  )
}
