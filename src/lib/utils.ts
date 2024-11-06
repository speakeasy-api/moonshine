import { Alignment, Breakpoint, Direction, ResponsiveValue } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isDirection, isResponsiveValueObject } from './typeUtils'

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
  mapper: (val: T, breakpoint: Breakpoint) => string
): string {
  if (isResponsiveValueObject(value)) {
    return Object.entries(value)
      .map(([breakpoint, val]) => {
        const resolvedClasses = mapper(val as T, breakpoint as Breakpoint)
        const classFragments = resolvedClasses.split(' ')

        return classFragments
          .map((fragment) => {
            return breakpoint === 'sm' ? fragment : `${breakpoint}:${fragment}`
          })
          .join(' ')
      })
      .join(' ')
  }
  return mapper(value as T, 'sm')
}

export function getAlignmentClasses(
  alignment: Alignment,
  direction: ResponsiveValue<Direction>,
  breakpoint: Breakpoint
) {
  // Flex class mappings based on alignment
  const alignmentMapper: Record<Alignment, Record<Direction, string>> = {
    start: {
      row: 'justify-start',
      column: 'items-start',
    },
    center: {
      row: 'justify-center',
      column: 'items-center',
    },
    end: {
      row: 'justify-end',
      column: 'items-end',
    },
    spaceBetween: {
      row: 'justify-between',
      column: 'justify-between', // spaceBetween works the same for both row and column
    },
    spaceAround: {
      row: 'justify-around',
      column: 'justify-around',
    },
  }

  const directionValue = (
    isResponsiveValueObject(direction)
      ? direction[breakpoint]
      : isDirection(direction)
        ? direction
        : 'row'
  ) as Direction

  // Select the correct alignment class based on direction
  return alignmentMapper[alignment][directionValue]
}
