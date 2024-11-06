import { Direction, Gap, Padding, PaddingPerSide } from '@/types'
import { assert } from './typeUtils'

const directionClasses: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
}

export const directionMapper = (direction: Direction) =>
  directionClasses[direction]
export const gapMapper = (gap: Gap) => `gap-${gap}`

const paddingPerSideMapper = (padding: PaddingPerSide) => {
  const arrayLength = padding.length

  assert(
    arrayLength === 2 || arrayLength === 4,
    'Padding per side must be an array of length 2 or 4'
  )

  // x, y
  if (arrayLength === 2) {
    const [x, y] = padding
    return `px-${x} py-${y}`
  }

  // top, right, bottom, left
  const [top, right, bottom, left] = padding
  return `pt-${top} pr-${right} pb-${bottom} pl-${left}`
}

export const paddingMapper = (padding: Padding): string => {
  if (Array.isArray(padding)) return paddingPerSideMapper(padding)
  return `p-${padding}`
}
export const colSpanMapper = (colSpan: number) => `col-span-${colSpan}`
