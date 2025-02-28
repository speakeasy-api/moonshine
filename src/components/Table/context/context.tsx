import { createContext } from 'react'

type TableContextValue = {
  expandedRowKeys: Set<string | number>
  toggleExpanded: (rowKey: string | number) => void
}

export const TableContext = createContext<TableContextValue | undefined>(
  undefined
)
