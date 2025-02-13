import { Breakpoint, ResponsiveValue } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isResponsiveValueObject } from './typeUtils'

const prefix = 'moonshine-'

/**
 * Combines and processes class names with Moonshine prefix handling.
 *
 * This function handles two cases:
 * 1. When called with multiple arguments, the last argument is treated as
 *    user-provided classes and all preceding arguments are treated as internal
 *    classes that get prefixed with 'moonshine-'
 *
 * 2. When called with a single argument, it's treated as user-provided classes
 *    and passed through without modification. Pass `false` if there are no
 *    user-provided classed to pass through.
 */
export function cn(...inputs: ClassValue[]) {
  // Assume that the sole param is a user class pass thru
  if (inputs.length >= 1) return twMerge(clsx(inputs))

  // Separate user classes (last argument) from internal classes
  const userClasses = inputs.slice(-1)[0]
  const internalClasses = inputs.slice(0, -1)

  // Prefix all internal classes
  const prefixedInternalClasses = clsx(internalClasses)
    .split(' ')
    .filter(Boolean)
    .map((cls) => `${prefix}${cls}`)

  return twMerge(clsx(...prefixedInternalClasses, userClasses))
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
 */\
export function getResponsiveClasses<T>(
  value: ResponsiveValue<T>,
  mapper: (val: T, breakpoint: Breakpoint) => string
): string {
  if (isResponsiveValueObject(value)) {
    return Object.entries(value)
      .filter(([, val]) => val !== undefined)
      .map(([breakpoint, val]) => {
        const resolvedClasses = mapper(val as T, breakpoint as Breakpoint)
        const classFragments = resolvedClasses.split(' ')

        return classFragments
          .map((fragment) => {
            return breakpoint === 'xs' ? fragment : `${breakpoint}:${fragment}`
          })
          .join(' ')
      })
      .join(' ')
  }
  return mapper(value as T, 'xs')
}
