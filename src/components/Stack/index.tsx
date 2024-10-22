import React from 'react'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Gap, ResponsiveValue } from '@/types'

type Direction = 'row' | 'column'

interface StackProps {
  children: React.ReactNode
  direction?: ResponsiveValue<Direction>
  gap?: ResponsiveValue<Gap>
}

const directionClasses: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
}

const directionMapper = (direction: Direction) => directionClasses[direction]
const gapMapper = (gap: Gap) => `gap-${gap}`

export function Stack({ children, direction = 'column', gap = 0 }: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        getResponsiveClasses(direction, directionMapper),
        getResponsiveClasses(gap, gapMapper)
      )}
    >
      {children}
    </div>
  )
}
