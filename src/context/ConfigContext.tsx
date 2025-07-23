import { createContext } from 'react'
import { Theme } from './theme'

export interface ConfigContextType {
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
 * @param {Theme} theme - The current theme
 * @param {function(Theme): void} setTheme - Function to update the theme
 * @returns {React.ReactNode} - The components wrapped by the MoonshineConfigProvider.
 */
export function MoonshineConfigProvider({
  children,
  theme,
  setTheme,
}: MoonshineConfigProviderProps) {
  return (
    <ConfigContext.Provider value={{ theme, setTheme }}>
      {children}
    </ConfigContext.Provider>
  )
}
