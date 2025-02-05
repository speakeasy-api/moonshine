// TODO: https://linear.app/speakeasy/issue/SXF-170/table-component
import React, {
  PropsWithChildren,
  type ReactNode,
  RefObject,
  useMemo,
  useRef,
  useState,
} from 'react'
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

function TableRoot<T extends object>({
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
  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleLoadMore = async () => {
    setIsLoading(true)
    await onLoadMore?.()
    setIsLoading(false)
  }

  return (
    <Table.Wrapper
      ref={tableRef}
      className={className}
      columns={columns}
      cellPadding={cellPadding}
    >
      <Table.Header columns={columns} />
      <Table.Body
        ref={tableBodyRef}
        data={data}
        columns={columns}
        rowKey={rowKey}
        hasMore={hasMore}
        noResultsMessage={noResultsMessage}
        renderGroupHeader={renderGroupHeader}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
    </Table.Wrapper>
  )
}

interface TableWrapperProps<T extends object> extends PropsWithChildren {
  ref: RefObject<HTMLTableElement | null>
  columns: Column<T>[]
  className?: string
  cellPadding?: TableProps<T>['cellPadding']
}

function TableWrapper<T extends object>({
  ref,
  columns,
  className,
  cellPadding,
  children,
}: TableWrapperProps<T>) {
  const colWidths = useMemo(() => {
    return columns.map((column) => column.width ?? '1fr').join(' ')
  }, [columns])

  return (
    <table
      style={
        {
          '--grid-template-columns': `${colWidths}`,
        } as React.CSSProperties
      }
      ref={ref}
      className={cn(
        styles.table,
        'relative grid w-full caption-bottom overflow-x-auto overflow-y-hidden rounded-lg border text-sm [border-collapse:separate] [border-spacing:0] [grid-template-columns:var(--grid-template-columns)]',
        className ?? ''
      )}
      data-cell-padding={cellPadding}
    >
      {children}
    </table>
  )
}

interface HeaderRowProps<T extends object> {
  columns: Column<T>[]
  className?: string
}

function HeaderRowRoot<T extends object>({
  columns,
  className,
}: HeaderRowProps<T>) {
  return (
    <Header.Wrapper className={className}>
      {columns.map((column) => (
        <Header.Cell key={column.key}>{column.header}</Header.Cell>
      ))}
    </Header.Wrapper>
  )
}

interface HeaderRowWrapperProps extends PropsWithChildren {
  className?: string
}

function HeaderRowWrapper({ className, children }: HeaderRowWrapperProps) {
  return (
    <thead
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className ?? ''
      )}
    >
      <tr className="table-header grid border-b [grid-column:1/-1] [grid-template-columns:subgrid]">
        {children}
      </tr>
    </thead>
  )
}

interface HeaderCellProps extends PropsWithChildren {
  className?: string
}

function HeaderCell({ className, children }: HeaderCellProps) {
  return (
    <th
      className={cn(
        styles.tableHeader,
        'text-muted-foreground flex select-none items-center whitespace-nowrap align-middle font-medium',
        className ?? ''
      )}
    >
      {children}
    </th>
  )
}

export const Header = Object.assign(HeaderRowRoot, {
  displayName: 'Table.Header',
  Wrapper: HeaderRowWrapper,
  Cell: HeaderCell,
})

interface BodyProps<T extends object> {
  ref: RefObject<HTMLTableSectionElement | null>
  data: T[]
  columns: Column<T>[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  noResultsMessage?: ReactNode
  renderGroupHeader?: (group: Group<T>) => ReactNode
  hasMore?: boolean
  handleLoadMore?: () => void
  isLoading?: boolean
  className?: string
}

function BodyRoot<T extends object>({
  ref,
  data,
  columns,
  rowKey,
  hasMore,
  onRowClick,
  noResultsMessage,
  renderGroupHeader,
  handleLoadMore,
  isLoading,
  className,
}: BodyProps<T>) {
  return (
    <Body.Wrapper
      ref={ref}
      className={cn(
        // Account for the load more button
        hasMore ? 'pb-16' : '',
        className ?? ''
      )}
    >
      {data.length === 0 ? (
        <NoResultsMessage>{noResultsMessage}</NoResultsMessage>
      ) : (
        data.map((d) =>
          isGroupOf<T>(d) ? (
            <RowGroup
              group={d}
              columns={columns}
              rowKey={rowKey}
              renderGroupHeader={renderGroupHeader}
              key={rowKey(d)}
              onRowClick={onRowClick}
            />
          ) : (
            <Row
              row={d}
              key={rowKey(d)}
              columns={columns}
              onClick={onRowClick}
            />
          )
        )
      )}
      {hasMore && handleLoadMore && (
        <LoadMore
          columns={columns}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading ?? false}
        />
      )}
    </Body.Wrapper>
  )
}

interface BodyWrapperProps extends PropsWithChildren {
  ref: RefObject<HTMLTableSectionElement | null>
  className?: string
}

function BodyWrapper({ ref, className, children }: BodyWrapperProps) {
  return (
    <tbody
      ref={ref}
      className={cn(
        'relative grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className ?? ''
      )}
    >
      {children}
    </tbody>
  )
}

export const Body = Object.assign(BodyRoot, {
  displayName: 'Table.Body',
  Wrapper: BodyWrapper,
})

interface RowProps<T extends object> {
  row: T
  onClick?: (row: T) => void
  columns: Column<T>[]
  className?: string
}

function RowRoot<T extends object>({
  row,
  onClick,
  columns,
  className,
}: RowProps<T>) {
  return (
    <Row.Wrapper onClick={() => onClick?.(row)} className={className}>
      {columns.map((column) => (
        <Cell key={column.key} column={column} row={row} />
      ))}
    </Row.Wrapper>
  )
}

interface RowWrapperProps extends PropsWithChildren {
  onClick?: () => void
  className?: string
}

function RowWrapper({ onClick, className, children }: RowWrapperProps) {
  return (
    <tr
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted -z-0 grid max-w-full border-b transition-colors [grid-column:1/-1] [grid-template-columns:subgrid] last:border-none',
        onClick ? 'cursor-pointer' : '',
        className ?? ''
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export const Row = Object.assign(RowRoot, {
  displayName: 'Table.Row',
  Wrapper: RowWrapper,
})

interface RowGroupProps<T extends object> {
  group: Group<T>
  columns: Column<T>[]
  rowKey: (row: T) => string | number
  renderGroupHeader?: (group: Group<T>) => ReactNode
  className?: string
  onRowClick?: (row: T) => void
}

function RowGroupRoot<T extends object>({
  group,
  columns,
  renderGroupHeader,
  rowKey,
  className,
  onRowClick,
}: RowGroupProps<T>) {
  return (
    <RowGroup.Wrapper className={className}>
      <RowGroup.Header>{renderGroupHeader?.(group)}</RowGroup.Header>
      {group.items.map((row) => (
        <Row
          row={row}
          key={rowKey(row)}
          columns={columns}
          onClick={onRowClick}
        />
      ))}
    </RowGroup.Wrapper>
  )
}

interface RowGroupWrapperProps extends PropsWithChildren {
  className?: string
}

function RowGroupWrapper({ className, children }: RowGroupWrapperProps) {
  return (
    <div
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className ?? ''
      )}
    >
      {children}
    </div>
  )
}

interface RowGroupHeaderProps extends PropsWithChildren {
  className?: string
}

function RowGroupHeader({ className, children }: RowGroupHeaderProps) {
  return (
    <div className={cn('[grid-column:1/-1]', className ?? '')}>{children}</div>
  )
}

export const RowGroup = Object.assign(RowGroupRoot, {
  displayName: 'Table.RowGroup',
  Wrapper: RowGroupWrapper,
  Header: RowGroupHeader,
})

interface CellProps<T extends object> {
  row: T
  column: Column<T>
  className?: string
}

function CellRoot<T extends object>({ row, column, className }: CellProps<T>) {
  return (
    <Cell.Wrapper className={className}>
      {column.render
        ? column.render(row)
        : isKeyOfT<T>(column.key, row)
          ? String(row[column.key])
          : ''}
    </Cell.Wrapper>
  )
}

interface CellWrapperProps extends PropsWithChildren {
  className?: string
}

export function CellWrapper({ className, children }: CellWrapperProps) {
  return (
    <td
      className={cn(
        styles.tableCell,
        'flex max-w-full items-center',
        className ?? ''
      )}
    >
      {children}
    </td>
  )
}

export const Cell = Object.assign(CellRoot, {
  displayName: 'Table.Cell',
  Wrapper: CellWrapper,
})

interface NoResultsMessageProps extends PropsWithChildren {
  className?: string
}

function NoResultsMessage({ className, children }: NoResultsMessageProps) {
  return (
    <div
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className ?? ''
      )}
    >
      <div className="[grid-column:1/-1]">{children}</div>
    </div>
  )
}

interface HasMoreProps<T extends object> {
  columns: Column<T>[]
  handleLoadMore: () => void
  isLoading: boolean
}

function LoadMore<T extends object>({
  columns,
  handleLoadMore,
  isLoading,
}: HasMoreProps<T>) {
  const colWidths = useMemo(() => {
    return columns.map((column) => column.width ?? '1fr').join(' ')
  }, [columns])

  return (
    <>
      <tr
        style={
          {
            '--grid-template-columns': `${colWidths}`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute bottom-0 left-0 right-0 -z-0 grid min-h-16 max-w-full cursor-pointer items-center border-b opacity-30 transition-colors [grid-column:1/-1] [grid-template-columns:var(--grid-template-columns)]',
          isLoading && 'animate-pulse opacity-100 duration-[2.5s]'
        )}
      >
        {columns.map((column) => (
          <Cell.Wrapper key={column.key}>
            <div className="bg-muted h-4 w-full rounded" />
          </Cell.Wrapper>
        ))}
      </tr>
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
    </>
  )
}

export const Table = Object.assign(TableRoot, {
  displayName: 'Table',
  Wrapper: TableWrapper,
  Row,
  RowGroup,
  Header,
  Body,
})

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
