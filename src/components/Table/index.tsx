// TODO: https://linear.app/speakeasy/issue/SXF-170/table-component
import React, {
  forwardRef,
  PropsWithChildren,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { isGroupOf } from '@/lib/typeUtils'
import styles from './styles.module.css'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip'
import { Button } from '@/components/Button'
import { ExpandChevron } from '@/components/__beta__/CLIWizard'
import { TableProvider } from './context/tableProvider'
import { useTable } from './context/context'

export type Column<T extends object> = {
  key: keyof T | string
  header: ReactNode
  render?: (row: T) => ReactNode
  width?: `${number}fr` | `${number}px` | 'auto' | undefined
}

export type Group<T extends object> = {
  key: string
  items: T[]
  [k: string]: unknown
}

type CellPadding = 'normal' | 'condensed' | 'spacious'

type PropsWithChildrenAndClassName = PropsWithChildren<{ className?: string }>

export type TableProps<T extends object> = {
  columns: Column<T>[]
  data: T[] | Group<T>[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  renderGroupHeader?: (group: Group<T>) => ReactNode
  renderExpandedContent?: (row: T) => ReactNode
  onLoadMore?: () => Promise<void> | (() => void)
  hasMore?: boolean
  noResultsMessage?: ReactNode
  className?: string
  cellPadding?: CellPadding
  hideHeader?: boolean
}

export type TableWrapperProps<T extends object> =
  PropsWithChildrenAndClassName & {
    columns: Column<T>[]
    cellPadding?: CellPadding
  }

function expandColumn<T extends object>(): Column<T> {
  return {
    key: 'expand',
    header: '',
    width: `64px`, // 32px is padding, 32px is the width of the expand button
  }
}

type TableContainerProps = PropsWithChildrenAndClassName & {
  tableDepth: number
  colWidths: string
  cellPadding?: CellPadding
}

const TableContainer = forwardRef<HTMLTableElement, TableContainerProps>(
  ({ children, className, tableDepth, colWidths, cellPadding }, ref) => {
    return (
      <TableProvider depth={tableDepth}>
        <table
          style={
            { '--grid-template-columns': colWidths } as React.CSSProperties
          }
          ref={ref}
          className={cn(
            styles.table,
            'relative grid w-full caption-bottom overflow-x-auto overflow-y-hidden rounded-lg border text-sm [border-collapse:separate] [border-spacing:0] [grid-template-columns:var(--grid-template-columns)]',
            tableDepth > 1 && 'rounded-none border-none',
            className
          )}
          data-cell-padding={cellPadding}
        >
          {children}
        </table>
      </TableProvider>
    )
  }
)

function TableRoot<T extends object>(
  props: TableProps<T> | TableWrapperProps<T>
) {
  const { depth } = useTable()
  const tableDepth = depth + 1

  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)

  let columns = props.columns

  // We add the expand column here so that all parts of the table know about it, particularly needed for widths
  if (
    !propsHasChildren<TableWrapperProps<T>, TableProps<T>>(props) &&
    props.renderExpandedContent
  ) {
    columns = [expandColumn(), ...columns]
  }

  const colWidths = useMemo(
    () => columns.map((column) => column.width ?? '1fr').join(' '),
    [columns]
  )

  if (propsHasChildren<TableWrapperProps<T>, TableProps<T>>(props)) {
    return (
      <TableContainer
        className={props.className}
        colWidths={colWidths}
        tableDepth={tableDepth}
        cellPadding={props.cellPadding}
        ref={tableRef}
      >
        {props.children}
      </TableContainer>
    )
  }

  const {
    data,
    rowKey,
    onRowClick,
    onLoadMore,
    hasMore,
    noResultsMessage,
    renderGroupHeader,
    renderExpandedContent,
    className,
    hideHeader,
    cellPadding,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const handleLoadMore = async () => {
    setIsLoading(true)
    await onLoadMore?.()
    setIsLoading(false)
  }

  return (
    <TableContainer
      className={className}
      colWidths={colWidths}
      tableDepth={tableDepth}
      cellPadding={cellPadding}
      ref={tableRef}
    >
      {!hideHeader && <Table.Header columns={columns} />}
      <Table.Body
        data={data}
        ref={tableBodyRef}
        columns={columns}
        rowKey={rowKey}
        hasMore={hasMore}
        noResultsMessage={noResultsMessage}
        renderGroupHeader={renderGroupHeader}
        renderExpandedContent={renderExpandedContent}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
    </TableContainer>
  )
}

type HeaderProps<T extends object> = {
  columns: Column<T>[]
  className?: string
}

function HeaderContainer({
  className,
  children,
}: PropsWithChildrenAndClassName) {
  return (
    <thead
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className
      )}
    >
      {children}
    </thead>
  )
}

function Header<T extends object>(
  props: HeaderProps<T> | PropsWithChildrenAndClassName
) {
  if (propsHasChildren<PropsWithChildrenAndClassName, HeaderProps<T>>(props)) {
    return (
      <HeaderContainer className={props.className}>
        {props.children}
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer className={props.className}>
      <tr className="table-header grid border-b [grid-column:1/-1] [grid-template-columns:subgrid]">
        {props.columns.map((column) => (
          <HeaderCell key={column.key.toString()}>{column.header}</HeaderCell>
        ))}
      </tr>
    </HeaderContainer>
  )
}

type BodyProps<T extends object> = {
  columns: Column<T>[]
  data: T[] | Group<T>[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  noResultsMessage?: ReactNode
  renderGroupHeader?: (group: Group<T>) => ReactNode
  renderExpandedContent?: (row: T) => ReactNode
  hasMore?: boolean
  handleLoadMore?: () => void
  isLoading?: boolean
  className?: string
}

const BodyContainer = forwardRef<
  HTMLTableSectionElement,
  PropsWithChildrenAndClassName
>(({ className, children }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn(
        'relative grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className
      )}
    >
      {children}
    </tbody>
  )
})

const Body = React.forwardRef(function Body<T extends object>(
  props: BodyProps<T> | PropsWithChildrenAndClassName,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  if (propsHasChildren<PropsWithChildrenAndClassName, BodyProps<T>>(props)) {
    return (
      <BodyContainer ref={ref} className={props.className}>
        {props.children}
      </BodyContainer>
    )
  }

  const {
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
    renderExpandedContent,
  } = props

  const renderRow = (row: T | Group<T>) => {
    if (isGroupOf<T>(row)) {
      return (
        <RowGroup
          group={row}
          columns={columns}
          rowKey={rowKey}
          renderGroupHeader={renderGroupHeader}
          key={row.key}
          onRowClick={onRowClick}
        />
      )
    } else if (renderExpandedContent) {
      return (
        <RowExpandable
          row={row}
          columns={columns}
          rowKey={rowKey}
          renderExpandedContent={renderExpandedContent}
          key={rowKey(row)}
          onClick={onRowClick}
        />
      )
    } else {
      return (
        <Row
          row={row}
          key={rowKey(row)}
          columns={columns}
          onClick={onRowClick}
        />
      )
    }
  }

  return (
    <BodyContainer ref={ref} className={cn(hasMore && 'pb-16', className)}>
      {data.length === 0 ? (
        <NoResultsMessage>{noResultsMessage}</NoResultsMessage>
      ) : (
        data.map(renderRow)
      )}
      {hasMore && handleLoadMore && (
        <LoadMore
          columns={columns}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      )}
    </BodyContainer>
  )
}) as <T extends object>(
  props: {
    ref?: React.ForwardedRef<HTMLTableSectionElement>
  } & (BodyProps<T> | PropsWithChildrenAndClassName)
) => JSX.Element

type RowProps<T extends object> = {
  row: T
  onClick?: (row: T) => void
  columns: Column<T>[]
  className?: string
}

type RowContainerProps = {
  onClick?: () => void
} & PropsWithChildrenAndClassName

function RowContainer({ className, children, onClick }: RowContainerProps) {
  return (
    <tr
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted -z-0 grid max-w-full border-b transition-colors [grid-column:1/-1] [grid-template-columns:subgrid] last:border-none',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

function Row<T extends object>(props: RowProps<T> | RowContainerProps) {
  if (propsHasChildren<RowContainerProps, RowProps<T>>(props)) {
    return (
      <RowContainer className={props.className} onClick={props.onClick}>
        {props.children}
      </RowContainer>
    )
  }

  const { row, onClick, columns, className } = props
  return (
    <RowContainer
      className={className}
      onClick={onClick ? () => onClick(row) : undefined}
    >
      {columns.map((column) => (
        <Cell key={column.key.toString()} column={column} row={row} />
      ))}
    </RowContainer>
  )
}

function RowExpandable<T extends object>({
  row,
  onClick,
  columns,
  rowKey,
  renderExpandedContent,
  className,
}: {
  row: T
  columns: Column<T>[]
  rowKey: (row: T) => string | number
  renderExpandedContent: (row: T) => ReactNode
  onClick?: (row: T) => void
  className?: string
}) {
  const { expandedRowKeys, toggleExpanded } = useTable()

  const isExpanded = expandedRowKeys.has(rowKey(row))

  const expand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleExpanded(rowKey(row))
  }

  const content = useMemo(
    () => renderExpandedContent(row),
    [renderExpandedContent, row]
  )

  const renderExpandCol = useCallback(() => {
    return content ? (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex w-full justify-end">
              <Button onClick={expand} variant={'ghost'} className={`h-6 w-6`}>
                <ExpandChevron isCollapsed={!isExpanded} />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>{isExpanded ? 'Collapse' : 'Expand'}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : null
  }, [expand, isExpanded, content])

  const expandCol = columns.find((column) => column.key === expandColumn().key)

  if (expandCol) {
    expandCol.render = renderExpandCol
  }

  let onClickFn = onClick

  // If there's some expanded content to show and onClick is not provided, let the row expand when clicked
  if (!onClick && content) {
    onClickFn = () => toggleExpanded(rowKey(row))
  }

  return (
    <>
      <Row
        row={row}
        onClick={onClickFn}
        columns={columns}
        className={className}
      />
      {/* This grid stuff is a cute way to make the height animate smoothly when expanding/collapsing */}
      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 [grid-column:1/-1]',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-auto">{content}</div>
      </div>
    </>
  )
}

function RowGroup<T extends object>({
  group,
  columns,
  rowKey,
  renderGroupHeader,
  className,
  onRowClick,
}: {
  group: Group<T>
  columns: Column<T>[]
  rowKey: (row: T) => string | number
  renderGroupHeader?: (group: Group<T>) => ReactNode
  className?: string
  onRowClick?: (row: T) => void
}) {
  return (
    <div
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className
      )}
    >
      <div className="[grid-column:1/-1]">{renderGroupHeader?.(group)}</div>
      {group.items.map((row) => (
        <Row
          row={row}
          key={rowKey(row)}
          columns={columns}
          onClick={onRowClick}
        />
      ))}
    </div>
  )
}

type CellProps<T extends object> = {
  row: T
  column: Column<T>
  className?: string
}

function CellContainer({ children, className }: PropsWithChildrenAndClassName) {
  return (
    <td
      className={cn(
        styles.tableCell,
        `flex max-w-full items-center`,
        className
      )}
    >
      <SubtableIndendation />
      {children}
    </td>
  )
}

function Cell<T extends object>(
  props: CellProps<T> | PropsWithChildrenAndClassName
) {
  if (propsHasChildren<PropsWithChildrenAndClassName, CellProps<T>>(props)) {
    return (
      <CellContainer className={props.className}>
        {props.children}
      </CellContainer>
    )
  }

  const { row, column, className } = props
  const content = column.render
    ? column.render(row)
    : isKeyOfT<T>(column.key, row)
      ? String(row[column.key])
      : ''

  return <CellContainer className={className}>{content}</CellContainer>
}

function NoResultsMessage({
  className,
  children,
}: PropsWithChildrenAndClassName) {
  const Wrapper = ({ children, className }: PropsWithChildrenAndClassName) => (
    <div
      className={cn(
        'grid [grid-column:1/-1] [grid-template-columns:subgrid]',
        className
      )}
    >
      {children}
    </div>
  )

  const ContentWrapper = ({ children }: PropsWithChildren) => (
    <div className="[grid-column:1/-1]">{children}</div>
  )

  return (
    <Wrapper className={className}>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  )
}

function LoadMore<T extends object>({
  columns,
  handleLoadMore,
  isLoading,
}: {
  columns: Column<T>[]
  handleLoadMore: () => void
  isLoading?: boolean
}) {
  const RowWrapper = ({
    children,
    className,
  }: PropsWithChildren<{ className?: string }>) => {
    const colWidths = columns.map((column) => column.width ?? '1fr').join(' ')
    return (
      <tr
        style={{ '--grid-template-columns': colWidths } as React.CSSProperties}
        className={cn(
          'absolute bottom-0 left-0 right-0 -z-0 grid min-h-16 max-w-full cursor-pointer items-center border-b opacity-30 transition-colors [grid-column:1/-1] [grid-template-columns:var(--grid-template-columns)]',
          className
        )}
      >
        {children}
      </tr>
    )
  }

  const ButtonWrapper = ({ children }: PropsWithChildren) => (
    <div className="absolute bottom-0 left-0 right-0 z-10 flex min-h-14 w-full items-center justify-center py-4">
      {children}
    </div>
  )

  return (
    <>
      <RowWrapper
        className={cn(isLoading && 'animate-pulse opacity-100 duration-[2.5s]')}
      >
        {columns.map((column) => (
          <Cell key={column.key.toString()}>
            <div className="bg-muted h-4 w-full rounded" />
          </Cell>
        ))}
      </RowWrapper>
      <ButtonWrapper>
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
      </ButtonWrapper>
    </>
  )
}

function HeaderCell({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <th
      className={cn(
        styles.tableHeader,
        'text-muted-foreground flex select-none items-center whitespace-nowrap align-middle font-medium',
        className
      )}
    >
      <SubtableIndendation />
      {children}
    </th>
  )
}

// Has the effect of "indenting" subtables while still allowing them to occupy the full width of the parent table
function SubtableIndendation() {
  const { depth } = useTable()
  return depth > 1 ? (
    <div style={{ minWidth: `${16 * (depth - 1)}px` }} />
  ) : null
}

function propsHasChildren<P extends PropsWithChildren, Q extends object>(
  props: P | Q
): props is P {
  return 'children' in props && props.children !== undefined
}

function isKeyOfT<T extends object>(key: unknown, data: T): key is keyof T {
  return typeof key === 'string' && Object.keys(data).includes(key)
}

export const Table = Object.assign(TableRoot, {
  Header: Object.assign(Header, { Cell: HeaderCell }),
  Body,
  Row,
  Cell,
  RowGroup,
  NoResultsMessage,
})
