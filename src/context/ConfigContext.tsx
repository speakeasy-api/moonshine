import { createContext } from 'react'

export interface ConfigContextType {
  /**
   * The HTML element where the tailwind dark/light class is applied.
   */
  themeElement: HTMLElement
}

// eslint-disable-next-line react-refresh/only-export-components
export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined
)

interface MoonshineConfigProviderProps extends ConfigContextType {
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
  return (
    <ConfigContext.Provider value={{ themeElement }}>
      {children}
    </ConfigContext.Provider>
  )
}
