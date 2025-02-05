import { cn } from '@/lib/utils'
import { Columns, Gap, Padding, ResponsiveValue, Breakpoint } from '@/types'
import { isValidElement, ReactElement } from 'react'
import styles from './grid.module.css'
import {
  isPaddingHorizontalOrVerticalAxis,
  isPaddingPerSideValue,
} from '@/lib/typeUtils'

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
   * <Grid columns={{ xs: 1, md: 2 }}>
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
   * <Grid gap={{ xs: 2, md: 4 }}>
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

  /**
   * Can be an object of responsive Padding values, or just Padding values.
   *
   * @example Simple Padding
   * padding: 10
   *
   * @example Responsive Padding
   * padding: { xs: 10, md: 20, lg: 30, xl: 40 }
   *
   * @example Padding per side
   * padding: { top: 10, right: 0, bottom: 10, left: 0 }
   *
   * @example Responsive Padding per side (just x and y axis)
   * padding: { xs: 0, md: 0, lg: 0, xl: { x: 10, y: 12 } }
   *
   * @example Responsive Padding per side with different values for each side
   * padding: { xs: 0, md: 0, lg: 0, xl: { top: 10, right: 0, bottom: 10, left: 0 } }
   */
  padding?: ResponsiveValue<Padding>

  className?: string
}

const mapColumns = (columns: Columns) => columns
const mapGap = (gap: Gap) => `${Number(gap) * 4}px`

const mapPadding = (padding: Padding): string => {
  if (isPaddingHorizontalOrVerticalAxis(padding)) {
    const { x, y } = padding
    return `${Number(y) * 4}px ${Number(x) * 4}px`
  }
  if (isPaddingPerSideValue(padding)) {
    const { top, right, bottom, left } = padding
    return `${Number(top) * 4}px ${Number(right) * 4}px ${Number(bottom) * 4}px ${Number(left) * 4}px`
  }
  return `${Number(padding) * 4}px`
}

const createResponsiveVars = <T extends string | number | boolean | object>(
  value: ResponsiveValue<T>,
  prefix: string,
  mapper: (val: T) => string | number
): React.CSSProperties => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    if ('x' in value || 'y' in value || 'top' in value) {
      // Handle padding object directly
      return { [`--grid-${prefix}`]: mapper(value as T) }
    }
    return (Object.entries(value) as [Breakpoint, T][]).reduce(
      (acc, [breakpoint, val]) => {
        if (val === undefined) return acc
        const cssVar =
          breakpoint === 'xs'
            ? `--grid-${prefix}`
            : `--${breakpoint}-grid-${prefix}`
        return { ...acc, [cssVar]: mapper(val) }
      },
      {}
    )
  }
  return value ? { [`--grid-${prefix}`]: mapper(value as T) } : {}
}

const isValidGridChild = (child: ReactElement) =>
  isValidElement(child) && child.type === GridItem

const Grid = ({
  children,
  columns = 1,
  gap = 0,
  wrap = true,
  padding = 0,
  className,
}: GridProps) => {
  const style = {
    ...createResponsiveVars(columns, 'columns', mapColumns),
    ...createResponsiveVars(gap, 'gap', mapGap),
    ...createResponsiveVars(padding, 'padding', mapPadding),
  }

  const validGridChildren = children.filter(isValidGridChild)
  return (
    <div
      className={cn(styles.grid, !wrap && styles['flow-col'], className)}
      style={style}
    >
      {validGridChildren}
    </div>
  )
}

type PermittedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
>

interface GridItemProps extends PermittedHTMLAttributes {
  children: React.ReactNode
  colSpan?: ResponsiveValue<number>
  padding?: ResponsiveValue<Padding>
  className?: string
}

const GridItem = ({
  children,
  colSpan,
  padding,
  className,
  ...props
}: GridItemProps) => {
  const style = {
    ...(colSpan
      ? createResponsiveVars(colSpan, 'item-col-span', (val) => val)
      : {}),
    ...(padding
      ? createResponsiveVars(padding, 'item-padding', mapPadding)
      : {}),
  }

  return (
    <div className={cn(styles.item, className)} style={style} {...props}>
      {children}
    </div>
  )
}

const GridWithSubcomponents = Object.assign(Grid, {
  Item: GridItem,
})

export { GridWithSubcomponents as Grid }
