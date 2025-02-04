// TODO: https://linear.app/speakeasy/issue/SXF-170/table-component
import { useMemo, type ReactNode, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import styles from './styles.module.css'

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
  width?: `${number}fr` | 'auto' | undefined
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

  /**
   * The class name to apply to the table.
   */
  className?: string

  /**
   * Specify the amount of space that should be available around the contents of
   * a cell
   */
  cellPadding?: 'condensed' | 'normal' | 'spacious'
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
  className,
  cellPadding = 'normal',
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
          'hover:bg-muted/50 data-[state=selected]:bg-muted -z-0 [grid-column:1/-1] grid max-w-full [grid-template-columns:subgrid] border-b transition-colors last:border-none',
          onRowClick && 'cursor-pointer'
        )}
        key={rowKey(row)}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map((column) => (
          <td
            className={cn(styles.tableCell, 'flex max-w-full items-center')}
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
      className={cn(
        styles.table,
        'relative grid w-full caption-bottom [border-collapse:separate] [border-spacing:0] [grid-template-columns:var(--grid-template-columns)] overflow-x-auto overflow-y-hidden rounded-lg border text-sm',
        className
      )}
      data-cell-padding={cellPadding}
    >
      <thead className="[grid-column:1/-1] grid [grid-template-columns:subgrid]">
        <tr className="table-header [grid-column:1/-1] grid [grid-template-columns:subgrid] border-b">
          {columns.map((column) => (
            <th
              className={cn(
                styles.tableHeader,
                'text-muted-foreground flex items-center align-middle font-medium whitespace-nowrap select-none'
              )}
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
          'relative [grid-column:1/-1] grid [grid-template-columns:subgrid]',

          // Account for the load more button
          hasMore && 'pb-16'
        )}
      >
        {data.length === 0 ? (
          <div className="[grid-column:1/-1] grid [grid-template-columns:subgrid]">
            <div className="[grid-column:1/-1]">{noResultsMessage}</div>
          </div>
        ) : (
          data.map((d) =>
            isGroupOf<T>(d) ? (
              <div className="[grid-column:1/-1] grid [grid-template-columns:subgrid]">
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
              'absolute right-0 bottom-0 left-0 -z-0 [grid-column:1/-1] grid min-h-16 max-w-full cursor-pointer [grid-template-columns:var(--grid-template-columns)] items-center border-b opacity-30 transition-colors',
              isLoading && 'animate-pulse opacity-100 duration-[2.5s]'
            )}
          >
            {columns.map((column) => (
              <td
                className={cn(styles.tableCell, 'w-auto')}
                key={String(column.key)}
              >
                <div className="bg-muted h-4 rounded" />
              </td>
            ))}
          </tr>
        )}
      </tbody>
      {hasMore && (
        <div className="absolute right-0 bottom-0 left-0 z-10 flex min-h-14 w-full items-center justify-center py-4">
          <button
            className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap normal-case transition-colors select-none focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
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
