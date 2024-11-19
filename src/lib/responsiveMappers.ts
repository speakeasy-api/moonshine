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
  isPaddingPerSideValue,
} from './typeUtils'

const directionClasses: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
}

export const directionMapper = (direction: Direction) =>
  directionClasses[direction]
export const gapMapper = (gap: Gap) => `gap-${gap}`

const paddingPerSideMapper = (padding: PaddingPerSide): string => {
  if (isPaddingHorizontalOrVerticalAxis(padding)) {
    const { x, y } = padding
    return `px-${x} py-${y}`
  }

  if (isPaddingPerSideValue(padding)) {
    const { top, right, bottom, left } = padding
    return `pt-${top} pr-${right} pb-${bottom} pl-${left}`
  }

  return ''
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

const packClasses: Record<'start' | 'center' | 'end', string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
}

export const packMapper = (pack: 'start' | 'center' | 'end') =>
  packClasses[pack]

const wrapClasses: Record<'nowrap' | 'wrap' | 'wrap-reverse', string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

export const wrapMapper = (wrap: 'nowrap' | 'wrap' | 'wrap-reverse') =>
  wrapClasses[wrap]
