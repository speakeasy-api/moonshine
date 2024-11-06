import { gapMapper } from '@/lib/responsiveUtils'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Columns, Gap, ResponsiveValue } from '@/types'
import { isValidElement, ReactElement } from 'react'

interface GridProps {
  /**
   * The number of columns in the grid.
   * @default 1
   * @example Default
   * <Grid columns={2}>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item>Item 2</Grid.Item>
   * </Grid>
   * @example With responsive columns
   * <Grid columns={{ sm: 1, md: 2 }}>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item>Item 2</Grid.Item>
   * </Grid>
   */
  columns?: ResponsiveValue<Columns>

  /**
   * The gap between the grid items.
   * @default 0
   * @example Default
   * <Grid gap={4}>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item>Item 2</Grid.Item>
   * </Grid>
   * @example With responsive gap
   * <Grid gap={{ sm: 2, md: 4 }}>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item>Item 2</Grid.Item>
   * </Grid>
   */
  gap?: ResponsiveValue<Gap>

  /**
   * The Grid.Item children of the grid.
   * @example
   * <Grid>
   *   <Grid.Item>Item 1</Grid.Item>
   *   <Grid.Item>Item 2</Grid.Item>
   * </Grid>
   */
  children: Array<ReactElement<typeof GridItem>>

  /**
   * If true, the grid will wrap its children.
   * @default false
   */
  wrap?: boolean
}

const columnsMapper = (columns: Columns) => `grid-cols-${columns}`

const isValidGridChild = (child: ReactElement) =>
  isValidElement(child) && child.type === GridItem

const Grid = ({ children, columns = 1, gap = 0, wrap = false }: GridProps) => {
  const validGridChildren = children.filter(isValidGridChild)
  return (
    <div
      className={cn(
        'grid',
        getResponsiveClasses(columns, columnsMapper),
        getResponsiveClasses(gap, gapMapper),
        !wrap && 'grid-flow-col'
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
