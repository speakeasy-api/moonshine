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

export function MoonshineConfigProvider({
  children,
  themeElement,
}: {
  children: React.ReactNode
  themeElement: HTMLElement
}) {
  return (
    <ConfigContext.Provider value={{ themeElement }}>
      {children}
    </ConfigContext.Provider>
  )
}
