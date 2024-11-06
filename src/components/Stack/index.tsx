import React from 'react'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Direction, Gap, Padding, ResponsiveValue } from '@/types'
import {
  directionMapper,
  gapMapper,
  paddingMapper,
} from '@/lib/responsiveMappers'

interface StackProps {
  children: React.ReactNode
  direction?: ResponsiveValue<Direction>
  gap?: ResponsiveValue<Gap>

  /**
   * Can be an object of responsive Padding values, or just Padding values.
   *
   * @example Simple Padding
   * padding: 10
   *
   * @example Responsive Padding
   * padding: { sm: 10, md: 20, lg: 30, xl: 40 }
   *
   * @example Padding per side
   * padding: { top: 10, right: 0, bottom: 10, left: 0 }
   *
   * @example Responsive Padding per side (just x and y axis)
   * padding: { sm: 0, md: 0, lg: 0, xl: { x: 10, y: 12 } }
   *
   * @example Responsive Padding per side with different values for each side
   * padding: { sm: 0, md: 0, lg: 0, xl: { top: 10, right: 0, bottom: 10, left: 0 } }
   */
  padding?: ResponsiveValue<Padding>
}

export function Stack({
  children,
  direction = 'column',
  gap = 0,
  padding = 0,
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        getResponsiveClasses(direction, directionMapper),
        getResponsiveClasses(gap, gapMapper),
        getResponsiveClasses(padding, paddingMapper)
      )}
    >
      {children}
    </div>
  )
}
