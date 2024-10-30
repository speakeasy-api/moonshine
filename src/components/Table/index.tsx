import { type ReactNode } from 'react'

export type Column<T> = {
  key: keyof T
  header: ReactNode
  render?: (value: T[keyof T]) => ReactNode
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  caption?: ReactNode
}

export function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  caption,
}: TableProps<T>) {
  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr>
          {columns.map((column) => (
            <th
              className='text-muted-foreground [&>[role=checkbox]]:translate-y-[2px]", h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0'
              key={String(column.key)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {data.map((row) => (
          <tr
            className="hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer border-b transition-colors"
            key={rowKey(row)}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <td
                className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                key={String(column.key)}
              >
                {column.render
                  ? column.render(row[column.key])
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {caption && (
        <caption className="text-muted-foreground mt-4 text-sm">
          {caption}
        </caption>
      )}
    </table>
  )
}
