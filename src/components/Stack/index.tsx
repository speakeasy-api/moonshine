import React from 'react'
import { cn, getResponsiveClasses } from '@/lib/utils'
import {
  Alignment,
  Direction,
  Gap,
  Pack,
  Padding,
  ResponsiveValue,
  Spacing,
  Wrap,
} from '@/types'
import {
  alignmentMapper,
  directionMapper,
  gapMapper,
  paddingMapper,
  packMapper,
  wrapMapper,
} from '@/lib/responsiveMappers'

interface StackProps {
  children: React.ReactNode

  /** @figma Orientation in Auto Layout */
  direction?: ResponsiveValue<Direction>

  /** @figma Spacing between items in Auto Layout */
  gap?: ResponsiveValue<Gap>

  /** @figma Space between items in Auto Layout */
  spacing?: ResponsiveValue<Spacing>

  /** @figma Alignment in Auto Layout */
  align?: ResponsiveValue<Alignment>

  /** @figma Alignment in Auto Layout when items are packed */
  mainAxisAlign?: ResponsiveValue<Pack>

  /** @figma Padding in Auto Layout */
  padding?: ResponsiveValue<Padding>

  /** @figma Fill container in Auto Layout */
  stretch?: boolean

  /** Controls item wrapping behavior */
  wrap?: ResponsiveValue<Wrap>
}

export function Stack({
  children,
  direction = 'column',
  gap = 0,
  padding = 0,
  align,
  spacing = 'packed',
  mainAxisAlign = 'start',
  stretch = false,
  wrap = 'nowrap',
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        stretch && direction === 'row' && 'h-full',
        stretch && direction === 'column' && 'w-full',
        getResponsiveClasses(direction, directionMapper),
        getResponsiveClasses(gap, gapMapper),
        getResponsiveClasses(padding, paddingMapper),
        getResponsiveClasses(wrap, wrapMapper),
        align && getResponsiveClasses(align, alignmentMapper),
        spacing === 'packed' && getResponsiveClasses(mainAxisAlign, packMapper),
        spacing === 'spaceBetween' && 'justify-between',
        spacing === 'spaceAround' && 'justify-around',
        spacing === 'spaceEvenly' && 'justify-evenly',
        stretch && 'items-stretch'
      )}
    >
      {children}
    </div>
  )
}
