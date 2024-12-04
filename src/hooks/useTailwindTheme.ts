import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/**
 * Hook to get the current theme (light or dark) from the tailwind class element.
 */
export default function useTailwindTheme(tailwindClassElement: HTMLElement) {
  const [theme, setTheme] = useState<Theme>(() =>
    tailwindClassElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    const isDark = tailwindClassElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = tailwindClassElement.classList.contains('dark')
          setTheme(isDark ? 'dark' : 'light')
        }
      })
    })

    observer.observe(tailwindClassElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}
