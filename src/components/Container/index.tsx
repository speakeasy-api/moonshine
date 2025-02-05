import { cn } from '@/lib/utils'
import { Padding, ResponsiveValue, Breakpoint } from '@/types'
import { ReactNode } from 'react'
import styles from './container.module.css'
import {
  isPaddingHorizontalOrVerticalAxis,
  isPaddingPerSideValue,
} from '@/lib/typeUtils'

interface ContainerProps {
  children: ReactNode
  flex?: boolean
  padding?: ResponsiveValue<Padding>
  className?: string
}

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
      return { [`--container-${prefix}`]: mapper(value as T) }
    }
    return (Object.entries(value) as [Breakpoint, T][]).reduce(
      (acc, [breakpoint, val]) => {
        if (val === undefined) return acc
        const cssVar =
          breakpoint === 'xs'
            ? `--container-${prefix}`
            : `--${breakpoint}-container-${prefix}`
        return { ...acc, [cssVar]: mapper(val) }
      },
      {}
    )
  }
  return value ? { [`--container-${prefix}`]: mapper(value as T) } : {}
}

export function Container({
  children,
  flex = false,
  padding,
  className,
}: ContainerProps) {
  const style = padding
    ? createResponsiveVars(padding, 'padding', mapPadding)
    : undefined

  return (
    <div
      className={cn(styles.container, flex && styles.flex, className)}
      style={style}
    >
      {children}
    </div>
  )
}
