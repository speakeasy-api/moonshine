import { RefObject } from "react";
import { Icon } from "../Icon";

interface SearchBoxProps {
  inputRef: RefObject<HTMLInputElement | null>;
  search: string;
  setSearch: (search: string) => void;
  placeholder: string;
}

export function SearchBox({
  inputRef,
  search,
  setSearch,
  placeholder,
}: SearchBoxProps) {
  return (
    <div className="relative flex items-center gap-2 border-b border-neutral-softest p-3">
      <Icon name="search" className="text-muted-foreground" />
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={search}
        className="flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="absolute right-3">
        {search && (
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:bg-accent"
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch("")}
          >
            <Icon name="x" size="small" />
          </button>
        )}
      </div>
    </div>
  );
}
