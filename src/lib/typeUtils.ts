import { Breakpoints, ResponsiveValue, Size, sizes } from '@/types'

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
  return typeof value === 'string' && value in sizes
}
