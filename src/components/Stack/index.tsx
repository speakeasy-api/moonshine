import React from 'react'
import { cn } from '@/lib/utils'
import { Gap, Padding, ResponsiveValue, Breakpoint } from '@/types'
import styles from './stack.module.css'
import {
  isPaddingHorizontalOrVerticalAxis,
  isPaddingPerSideValue,
} from '@/lib/typeUtils'

type StackDirection = 'horizontal' | 'vertical'
type StackAlign = 'stretch' | 'start' | 'center' | 'end' | 'baseline'
type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-evenly'
type StackWrap = 'wrap' | 'nowrap'

interface StackProps {
  children: React.ReactNode
  direction?: ResponsiveValue<StackDirection>
  gap?: ResponsiveValue<Gap>
  padding?: ResponsiveValue<Padding>
  align?: ResponsiveValue<StackAlign>
  justify?: ResponsiveValue<StackJustify>
  wrap?: ResponsiveValue<StackWrap>
  className?: string
}

const mapDirection = (direction: StackDirection) =>
  direction === 'horizontal' ? 'row' : 'column'
const mapAlign = (align: StackAlign) => align
const mapJustify = (justify: StackJustify) => justify
const mapGap = (gap: Gap) => `${Number(gap) * 4}px` // Ensure gap is treated as a number
const mapWrap = (wrap: StackWrap) => wrap

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
  mapper: (val: T) => string
): React.CSSProperties => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    if ('x' in value || 'y' in value || 'top' in value) {
      // Handle padding object directly
      return { [`--stack-${prefix}`]: mapper(value as T) }
    }
    return (Object.entries(value) as [Breakpoint, T][]).reduce(
      (acc, [breakpoint, val]) => {
        if (val === undefined) return acc
        const cssVar =
          breakpoint === 'xs'
            ? `--stack-${prefix}`
            : `--${breakpoint}-stack-${prefix}`
        return { ...acc, [cssVar]: mapper(val) }
      },
      {}
    )
  }
  return value ? { [`--stack-${prefix}`]: mapper(value as T) } : {}
}

export function Stack({
  children,
  direction = 'vertical',
  gap = 0,
  padding = 0,
  align = 'stretch',
  justify = 'start',
  wrap = 'nowrap',
  className,
}: StackProps) {
  const style = {
    ...createResponsiveVars(direction, 'direction', mapDirection),
    ...createResponsiveVars(gap, 'gap', mapGap),
    ...createResponsiveVars(padding, 'padding', mapPadding),
    ...createResponsiveVars(align, 'align', mapAlign),
    ...createResponsiveVars(justify, 'justify', mapJustify),
    ...createResponsiveVars(wrap, 'wrap', mapWrap),
  }

  return (
    <div className={cn(styles.stack, className)} style={style}>
      {children}
    </div>
  )
}

interface StackItemProps {
  children: React.ReactNode
  grow?: ResponsiveValue<boolean>
  className?: string
}

Stack.Item = function StackItem({ children, grow, className }: StackItemProps) {
  const style = grow
    ? createResponsiveVars(grow, 'flex', (val) => (val ? '1' : 'initial'))
    : undefined

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  )
}
