import { useMemo, type ReactNode, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export type Column<T> = {
  key: keyof T
  header: ReactNode
  render?: (value: T[keyof T], row: T) => ReactNode
  width: `${number}%`
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  onLoadMore?: () => void
  hasMore?: boolean
}

export function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  onLoadMore,
  hasMore,
}: TableProps<T>) {
  const colWidths = useMemo(() => {
    return columns.map((column) => column.width).join(' ')
  }, [columns])
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleLoadMore = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onLoadMore?.()
      if (tableBodyRef.current) {
        tableBodyRef.current.scrollIntoView({
          behavior: 'auto',
        })
      }
    }, 1000)
  }

  return (
    <table
      style={
        {
          '--grid-template-columns': `${colWidths}`,
        } as React.CSSProperties
      }
      className="relative grid w-full caption-bottom overflow-hidden rounded-lg border text-sm [border-collapse:separate] [border-spacing:0] [grid-template-columns:var(--grid-template-columns)]"
    >
      <thead className="grid [grid-column:1/-1] [grid-template-columns:subgrid]">
        <tr className="table-header grid border-b [grid-column:1/-1] [grid-template-columns:subgrid]">
          {columns.map((column) => (
            <th
              className="text-muted-foreground flex h-14 select-none items-center px-4 align-middle font-medium"
              key={String(column.key)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        ref={tableBodyRef}
        className="relative mb-14 grid [grid-column:1/-1] [grid-template-columns:subgrid] [&_tr:last-child]:border-0"
      >
        {data.map((row) => (
          <tr
            className={cn(
              'hover:bg-muted/50 data-[state=selected]:bg-muted -z-0 grid cursor-pointer border-b py-3 transition-colors [grid-column:1/-1] [grid-template-columns:subgrid]',
              onRowClick && 'cursor-pointer'
            )}
            key={rowKey(row)}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <td
                className="flex w-fit items-center px-4 py-2"
                key={String(column.key)}
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {hasMore && (
        <div className="from-background pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-14 bg-gradient-to-t to-transparent" />
      )}
      {hasMore && (
        <div className="bg-background absolute bottom-0 left-0 right-0 z-10 flex h-14 items-center justify-center border-t">
          <button
            className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={handleLoadMore}
          >
            {isLoading ? (
              <>
                Loading
                <Loader2 className="animate-spin" />
              </>
            ) : (
              'Load more'
            )}
          </button>
        </div>
      )}
    </table>
  )
}
