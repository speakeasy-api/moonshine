import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/**
 * Hook to get the current theme (light or dark) from the tailwind class element.
 */
export default function useTailwindTheme(tailwindClassElement: HTMLElement) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Set initial theme after render
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
  }, [tailwindClassElement])

  return theme
}
