import { useState, useEffect } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { Breakpoints } from '@/types.js'

const fullConfig = resolveConfig(tailwindConfig)

const getBreakpoint = (width: number) => {
  const breakpoints = fullConfig.theme.screens
  const sortedBreakpoints = Object.entries(breakpoints)
    .map(([key, value]) => ({ key, minWidth: parseInt(value, 10) }))
    .sort((a, b) => a.minWidth - b.minWidth)

  for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
    if (width >= sortedBreakpoints[i].minWidth) return sortedBreakpoints[i].key
  }
  return 'xs'
}

const useTailwindBreakpoint = (): Breakpoints => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth))

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth)
      setBreakpoint(newBreakpoint)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint as Breakpoints
}

export default useTailwindBreakpoint
