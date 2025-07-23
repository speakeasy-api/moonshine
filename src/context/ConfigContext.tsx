import { createContext } from 'react'
import { Theme } from './theme'

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

export interface MoonshineConfigProviderProps extends ConfigContextType {
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
  theme,
  setTheme,
}: MoonshineConfigProviderProps) {
  return (
    <ConfigContext.Provider value={{ themeElement, theme, setTheme }}>
      {children}
    </ConfigContext.Provider>
  )
}
