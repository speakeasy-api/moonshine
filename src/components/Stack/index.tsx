import React from 'react'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Alignment, Direction, Gap, Padding, ResponsiveValue } from '@/types'
import {
  alignmentMapper,
  directionMapper,
  gapMapper,
  paddingMapper,
} from '@/lib/responsiveMappers'

interface StackProps {
  children: React.ReactNode

  /**
   * Can be a simple Direction value, or a responsive Direction value.
   *
   * @example Simple Direction
   * direction: 'row'
   *
   * @example Responsive Direction
   * direction: { sm: 'row', md: 'column', lg: 'row', xl: 'column' }
   */
  direction?: ResponsiveValue<Direction>

  /**
   * Can be a simple Gap value, or a responsive Gap value.
   *
   * @example Simple Gap
   * gap: 10
   *
   * @example Responsive Gap
   * gap: { sm: 10, md: 12, lg: 16, xl: 16 }
   */
  gap?: ResponsiveValue<Gap>

  /**
   * Can be an object of responsive Padding values, or just Padding values.
   *
   * @example Simple Padding
   * padding: 10
   *
   * @example Responsive Padding
   * padding: { sm: 10, md: 12, lg: 16, xl: 16 }
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

  /**
   * Can be a simple Alignment value, or a responsive Alignment value.
   *
   * @example Simple Alignment
   * horizontalAlignment: 'start'
   *
   * @example Responsive Alignment
   * horizontalAlignment: { sm: 'start', md: 'center', lg: 'end', xl: 'start' }
   */
  alignment?: ResponsiveValue<Alignment>
}

export function Stack({
  children,
  direction = 'column',
  gap = 0,
  padding = 0,
  alignment = undefined,
}: StackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full',
        getResponsiveClasses(direction, directionMapper),
        getResponsiveClasses(gap, gapMapper),
        getResponsiveClasses(padding, paddingMapper),
        alignment &&
          getResponsiveClasses(alignment, (val, breakpoint) =>
            // We need to pass the direction in here as well, because the alignment classes are different for row and column
            alignmentMapper(val, direction, breakpoint)
          )
      )}
    >
      {children}
    </div>
  )
}
