import { useMemo, type ReactNode, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export type Column<T extends object> = {
  /**
   * The key of the column.
   */
  key: keyof T | string

  /**
   * The header of the column.
   */
  header: ReactNode

  /**
   * The render function for the column.
   * If not provided, then the column will default to the value of the key.
   */
  render?: (row: T) => ReactNode

  /**
   * The fractional width of the column.
   * If not provided, then the column will default to 1fr.
   */
  width?: `${number}fr` | undefined
}

export type Group<T extends object> = {
  key: string
  items: T[]
  [k: string]: unknown
}

export type TableProps<T extends object> = {
  /**
   * The columns of the table.
   */
  columns: Column<T>[]

  /**
   * The data of the table.
   */
  data: T[] | Group<T>[]

  /**
   * A function that returns a unique key for the row.
   */
  rowKey: (row: T) => string | number

  /**
   * The function to call when a row is clicked.
   */
  onRowClick?: (row: T) => void

  /**
   * The function to render the group header.
   */
  renderGroupHeader?: (group: Group<T>) => ReactNode

  /**
   * The function to call when the load more button is clicked.
   */
  onLoadMore?: () => Promise<void> | (() => void)

  /**
   * Whether there are more rows to load.
   */
  hasMore?: boolean

  /**
   * No results message
   */
  noResultsMessage?: ReactNode
}

export function Table<T extends object>({
  columns,
  data,
  rowKey,
  onRowClick,
  onLoadMore,
  hasMore,
  noResultsMessage,
  renderGroupHeader,
}: TableProps<T>) {
  const colWidths = useMemo(() => {
    return columns.map((column) => column.width ?? '1fr').join(' ')
  }, [columns])
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleLoadMore = async () => {
    setIsLoading(true)
    await onLoadMore?.()
    setIsLoading(false)
  }

  const renderRow = (row: T) => {
    return (
      <tr
        className={cn(
          'hover:bg-muted/50 data-[state=selected]:bg-muted -z-0 grid max-w-full cursor-pointer border-b py-3 transition-colors [grid-column:1/-1] [grid-template-columns:subgrid]',
          onRowClick && 'cursor-pointer'
        )}
        key={rowKey(row)}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map((column) => (
          <td
            className="flex max-w-full items-center px-4 py-2"
            key={String(column.key)}
          >
            {column.render
              ? column.render(row)
              : isKeyOfT<T>(column.key, row)
                ? String(row[column.key])
                : ''}
          </td>
        ))}
      </tr>
    )
  }

  return (
    <table
      style={
        {
          '--grid-template-columns': `${colWidths}`,
        } as React.CSSProperties
      }
      ref={tableRef}
      className="relative grid w-full caption-bottom overflow-hidden rounded-lg border text-sm [border-collapse:separate] [border-spacing:0] [grid-template-columns:var(--grid-template-columns)]"
    >
      <thead className="grid h-14 [grid-column:1/-1] [grid-template-columns:subgrid]">
        <tr className="table-header grid border-b [grid-column:1/-1] [grid-template-columns:subgrid]">
          {columns.map((column) => (
            <th
              className="text-muted-foreground flex select-none items-center whitespace-nowrap px-4 align-middle font-medium"
              key={String(column.key)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        ref={tableBodyRef}
        className={cn(
          'relative grid [grid-column:1/-1] [grid-template-columns:subgrid]',

          // Account for the load more button
          hasMore && 'pb-16'
        )}
      >
        {data.length === 0 ? (
          <div className="grid [grid-column:1/-1] [grid-template-columns:subgrid]">
            <div className="[grid-column:1/-1]">{noResultsMessage}</div>
          </div>
        ) : (
          data.map((d) =>
            isGroupOf<T>(d) ? (
              <div className="grid [grid-column:1/-1] [grid-template-columns:subgrid]">
                <div className="[grid-column:1/-1]">
                  {renderGroupHeader?.(d)}
                </div>
                {d.items.map(renderRow)}
              </div>
            ) : (
              renderRow(d)
            )
          )
        )}
        {hasMore && (
          <tr
            style={
              {
                '--grid-template-columns': `${colWidths}`,
              } as React.CSSProperties
            }
            className={cn(
              'absolute bottom-0 left-0 right-0 -z-0 grid min-h-16 max-w-full cursor-pointer items-center border-b py-3 opacity-30 transition-colors [grid-column:1/-1] [grid-template-columns:var(--grid-template-columns)]',
              isLoading && 'animate-pulse opacity-100 duration-[2.5s]'
            )}
          >
            {columns.map((column) => (
              <td className="w-auto px-4" key={String(column.key)}>
                <div className="bg-muted h-4 rounded" />
              </td>
            ))}
          </tr>
        )}
      </tbody>
      {hasMore && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex min-h-14 w-full items-center justify-center py-4">
          <button
            className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 select-none items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium normal-case transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
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

function isKeyOfT<T extends object>(key: unknown, data: T): key is keyof T {
  return typeof key === 'string' && Object.keys(data).includes(key)
}

// eslint-disable-next-line react-refresh/only-export-components
export function isGroupOf<T extends object>(data: unknown): data is Group<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'key' in data &&
    'items' in data
  )
}
