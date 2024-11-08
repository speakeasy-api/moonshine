import {
  Alignment,
  Direction,
  Gap,
  Justify,
  Padding,
  PaddingPerSide,
} from '@/types'
import {
  isPaddingHorizontalOrVerticalAxis,
  isPaddingPerSide,
} from './typeUtils'

const directionClasses: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
}

export const directionMapper = (direction: Direction) =>
  directionClasses[direction]
export const gapMapper = (gap: Gap) => `gap-${gap}`

const paddingPerSideMapper = (padding: PaddingPerSide) => {
  // x, y
  if (isPaddingHorizontalOrVerticalAxis(padding)) {
    const { x, y } = padding
    return `px-${x} py-${y}`
  }

  // top, right, bottom, left
  const { top, right, bottom, left } = padding
  return `pt-${top} pr-${right} pb-${bottom} pl-${left}`
}

export const paddingMapper = (padding: Padding): string => {
  if (isPaddingPerSide(padding)) return paddingPerSideMapper(padding)
  return `p-${padding}`
}
export const colSpanMapper = (colSpan: number) => `col-span-${colSpan}`

const alignmentClasses: Record<Alignment, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

export const alignmentMapper = (alignment: Alignment) =>
  alignmentClasses[alignment]

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  spaceBetween: 'justify-between',
  spaceAround: 'justify-around',
  spaceEvenly: 'justify-evenly',
}

export const justifyMapper = (justify: Justify) => justifyClasses[justify]
