import { ResponsiveValue } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Given an object of responsive values for T and a mapper function, return a string of class names
 * that correspond to the responsive values.
 *
 * @param value - The responsive value
 * @param mapper - A function that takes the value and returns a string of class names
 * @returns A string of class names
 * @example
 * const gapMapper = (gap: number) => `gap-${gap}`
 * const gap = getResponsiveClasses({ sm: 0, md: 10 }, gapMapper)
 * // => 'gap-0 md:gap-10'
 */
export function getResponsiveClasses<T>(
  value: ResponsiveValue<T>,
  mapper: (val: T) => string
): string {
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value)
      .map(
        ([breakpoint, val]) =>
          `${breakpoint === 'sm' ? '' : breakpoint + ':'}${mapper(val)}`
      )
      .join(' ')
  }
  return mapper(value)
}
