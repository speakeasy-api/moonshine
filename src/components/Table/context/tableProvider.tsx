import { useCallback, useState } from 'react'
import { TableContext } from './context'

export interface TableProviderProps {
  children: React.ReactNode
  depth: number
  expandedRowKeys?: Set<string | number>
}

export function TableProvider({ children, depth, expandedRowKeys: defaultExpanded }: TableProviderProps) {
  const [expandedRowKeys, setExpandedRowKeys] = useState<Set<string | number>>(
    defaultExpanded ?? new Set()
  )

  const toggleExpanded = useCallback(
    (rowKey: string | number) => {
      setExpandedRowKeys((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(rowKey)) {
          newSet.delete(rowKey)
        } else {
          newSet.add(rowKey)
        }
        return newSet
      })
    },
    [expandedRowKeys, setExpandedRowKeys]
  )

  return (
    <TableContext.Provider value={{ depth, expandedRowKeys, toggleExpanded }}>
      {children}
    </TableContext.Provider>
  )
}
