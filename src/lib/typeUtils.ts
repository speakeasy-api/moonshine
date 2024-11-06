import { Breakpoints, ResponsiveValue, Size, sizes } from '@/types'

/**
 * Create a range of numbers from 0 to N
 * @example
 * type Range0to100 = Range<100> // [0, 1, 2, ..., 100]
 */
export type Range<
  N extends number,
  Arr extends unknown[] = [],
> = Arr['length'] extends N
  ? [...Arr, N][number]
  : Range<N, [...Arr, Arr['length']]>

export function isResponsiveValueObject<T>(
  value: unknown
): value is ResponsiveValue<T> & Record<Breakpoints, T> {
  return typeof value === 'object' && value !== null
}

export function isSize(value: unknown): value is Size {
  return (
    typeof value === 'string' && (sizes as readonly string[]).includes(value)
  )
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
