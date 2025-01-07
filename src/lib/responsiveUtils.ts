import { Breakpoint, breakpoints, Gap, ResponsiveValue, Size } from '@/types'
import { isResponsiveValueObject, isSize } from './typeUtils'

export const gapMapper = (gap: Gap) => `gap-${gap}`

export const resolveSizeForBreakpoint = (
  currentBreakpoint: Breakpoint,
  size: ResponsiveValue<Size>,
  fallback: Size = 'medium'
): Size => {
  if (!isResponsiveValueObject<Size>(size)) {
    return isSize(size) ? size : fallback
  }

  const currentBreakpointIndex = breakpoints.indexOf(currentBreakpoint)

  for (let i = currentBreakpointIndex; i >= 0; i--) {
    const breakpoint = breakpoints[i]
    if (size[breakpoint]) return size[breakpoint]
  }

  return fallback
}
