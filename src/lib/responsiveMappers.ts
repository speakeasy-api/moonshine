import { Direction, Gap, Padding, PaddingPerSide } from '@/types'
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
