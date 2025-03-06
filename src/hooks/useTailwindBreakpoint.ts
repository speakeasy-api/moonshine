import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { Breakpoint } from '@/types.js'
import debounce from '@/lib/debounce'
import { useLayoutEffect, useState } from 'react'

const fullConfig = resolveConfig(tailwindConfig)

const sortedBreakpoints = Object.entries(fullConfig.theme.screens)
  .map(([key, value]) => ({ key, minWidth: parseInt(value, 10) }))
  .sort((a, b) => a.minWidth - b.minWidth)

const getBreakpoint = (width: number): Breakpoint => {
  for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
    if (width >= sortedBreakpoints[i].minWidth)
      return sortedBreakpoints[i].key as Breakpoint
  }
  return 'xs'
}

const useTailwindBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')

  useLayoutEffect(() => {
    // Set initial breakpoint after render
    setBreakpoint(getBreakpoint(window.innerWidth))

    const handleResize = debounce(() => {
      const newBreakpoint = getBreakpoint(window.innerWidth)
      setBreakpoint(newBreakpoint)
    }, 100)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

export default useTailwindBreakpoint
