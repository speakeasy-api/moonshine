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
const mapGap = (gap: Gap) => `calc(var(--spacing) * ${Number(gap)})`
const mapWrap = (wrap: StackWrap) => wrap

const mapPadding = (padding: Padding): string => {
  if (isPaddingHorizontalOrVerticalAxis(padding)) {
    const { x, y } = padding
    return `calc(var(--spacing) * ${Number(y)}) calc(var(--spacing) * ${Number(x)})`
  }
  if (isPaddingPerSideValue(padding)) {
    const { top, right, bottom, left } = padding
    return `calc(var(--spacing) * ${Number(top)}) calc(var(--spacing) * ${Number(right)}) calc(var(--spacing) * ${Number(bottom)}) calc(var(--spacing) * ${Number(left)})`
  }
  return `calc(var(--spacing) * ${Number(padding)})`
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
