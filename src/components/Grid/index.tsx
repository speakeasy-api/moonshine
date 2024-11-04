import { cn, getResponsiveClasses } from '@/lib/utils'
import { Columns, Gap, ResponsiveValue } from '@/types'
import { isValidElement, ReactElement } from 'react'

interface GridProps {
  columns?: ResponsiveValue<Columns>
  gap?: ResponsiveValue<Gap>
  children: Array<ReactElement<typeof GridItem>>
}

const columnsMapper = (columns: Columns) => `grid-cols-${columns}`
const gapMapper = (gap: Gap) => `gap-${gap}`

const isValidGridChild = (child: ReactElement) =>
  isValidElement(child) && child.type === GridItem

const Grid = ({ children, columns = 1, gap = 0 }: GridProps) => {
  const validGridChildren = children.filter(isValidGridChild)
  return (
    <div
      className={cn(
        'grid',
        'grid-flow-col',
        getResponsiveClasses(columns, columnsMapper),
        getResponsiveClasses(gap, gapMapper)
      )}
    >
      {validGridChildren}
    </div>
  )
}

type GridItemBaseProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'className' | 'style'
>

interface GridItemProps extends GridItemBaseProps {
  children: React.ReactNode
  colSpan?: ResponsiveValue<number>
}

const colSpanMapper = (colSpan: number) => `col-span-${colSpan}`

const GridItem = ({ children, colSpan, ...props }: GridItemProps) => {
  return (
    <div
      className={cn(
        'grid-item',
        colSpan && getResponsiveClasses(colSpan, colSpanMapper)
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const GridWithSubcomponents = Object.assign(Grid, {
  Item: GridItem,
})

export { GridWithSubcomponents as Grid }
