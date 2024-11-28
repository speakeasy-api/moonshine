import React from 'react'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Direction, Gap, Padding, ResponsiveValue } from '@/types'
import {
  directionMapper,
  gapMapper,
  paddingMapper,
  wrapMapper,
} from '@/lib/responsiveMappers'

interface StackProps {
  children: React.ReactNode

  /** Layout direction */
  direction?: ResponsiveValue<Direction>

  /** Space between items */
  gap?: ResponsiveValue<Gap>

  /** Container padding */
  padding?: ResponsiveValue<Padding>

  /** Controls flex-grow behavior */
  flex?: number | boolean

  /** Aligns items along the cross axis (align-items) */
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>

  /** Aligns items along the main axis (justify-content) */
  justify?: ResponsiveValue<
    'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  >

  /** Whether items should wrap */
  wrap?: ResponsiveValue<'wrap' | 'nowrap'>
}

export function Stack({
  children,
  direction = 'column',
  gap = 0,
  padding = 0,
  flex,
  align = 'stretch',
  justify = 'start',
  wrap = 'nowrap',
}: StackProps) {
  const alignMapper = (val: 'start' | 'center' | 'end' | 'stretch') => {
    return val === 'stretch' ? 'items-stretch' : `items-${val}`
  }

  const justifyMapper = (
    val: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  ) => {
    return `justify-${val}`
  }

  return (
    <div
      className={cn(
        'flex',
        // Handle flex values with Tailwind classes
        typeof flex === 'number' && flex === 1 && 'flex-1',
        typeof flex === 'number' && flex === 2 && 'flex-2',
        typeof flex === 'boolean' && flex && 'flex-1',
        getResponsiveClasses(direction, directionMapper),
        getResponsiveClasses(gap, gapMapper),
        getResponsiveClasses(padding, paddingMapper),
        getResponsiveClasses(wrap, wrapMapper),
        getResponsiveClasses(align, alignMapper),
        getResponsiveClasses(justify, justifyMapper)
      )}
    >
      {children}
    </div>
  )
}
