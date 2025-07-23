import { createContext, useCallback, useEffect } from 'react'
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'

export type Theme = 'light' | 'dark'
const THEME_KEY = 'moonshine-theme'

/*
 * TODO: remove the 'sandbox-theme' initial value after it has been implemented in the sand box for a while
 * The check is there to pick up old values in local storage as the storage key will be updated to 'moonshine-theme'
 */
const appTheme = atomWithStorage<Theme | null>(
  THEME_KEY,
  localStorage.getItem('sandbox-theme') as Theme | null
)

export interface ConfigContextType {
  /**
   * The HTML element where the tailwind dark/light class is applied.
   */
  themeElement: HTMLElement

  /*
   * The current theme
   */
  theme: Theme

  /*
   * Update the current theme
   */
  setTheme: (theme: Theme) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined
)

export interface MoonshineConfigProviderProps
  extends Pick<ConfigContextType, 'themeElement'> {
  children: React.ReactNode
}

/**
 * Configures Speakeasy's design system, Moonshine, within a consuming application.
 *
 * @param {React.ReactNode} children - The components to be wrapped by the MoonshineConfigProvider.
 * @param {HTMLElement} themeElement - The HTML element where the tailwind dark/light class is applied.
 * @returns {React.ReactNode} - The components wrapped by the MoonshineConfigProvider.
 */
export function MoonshineConfigProvider({
  children,
  themeElement,
}: MoonshineConfigProviderProps) {
  const [theme, setTheme] = useAtom(appTheme)

  // Set body class for theme
  useEffect(() => {
    themeElement.classList.toggle('dark', theme === 'dark')
    themeElement.classList.toggle('light', theme === 'light')
  }, [theme])

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme)
    },
    [setTheme]
  )

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (themeElement.classList.contains('dark') && theme !== 'dark') {
            setTheme('dark')
          } else if (
            themeElement.classList.contains('light') &&
            theme !== 'light'
          ) {
            setTheme('light')
          }
        }
      })
    })

    observer.observe(themeElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Only run OS preference logic if there is NO theme in localStorage
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) return // User has set a theme, do nothing

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    handleThemeChange(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      handleThemeChange(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [handleThemeChange])

  if (!theme) return null

  return (
    <ConfigContext.Provider value={{ themeElement, theme, setTheme }}>
      {children}
    </ConfigContext.Provider>
  )
}
