import { useEffect, useState } from 'react'
import { useConfig } from './useConfig'

export type Theme = 'dark' | 'light'

/**
 * Hook to get the current theme (light or dark) from the tailwind class element.
 */
export function useTheme() {
  const { themeElement } = useConfig()
  const [theme, setTheme] = useState<Theme>(() =>
    themeElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    const isDark = themeElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = themeElement.classList.contains('dark')
          setTheme(isDark ? 'dark' : 'light')
        }
      })
    })

    observer.observe(themeElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}
