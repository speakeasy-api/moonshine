import { PropsWithChildren, useState } from 'react'
import { AppLayoutContext, AppLayoutContextType } from './context'

interface AppLayoutProviderProps extends PropsWithChildren {
  defaultCollapsed?: boolean
  keybinds?: AppLayoutContextType['keybinds']
}

export const AppLayoutProvider = ({
  children,
  defaultCollapsed = false,
  keybinds,
}: AppLayoutProviderProps) => {
  const defaultKeybinds = {
    toggle: {
      key: 'B',
      description: 'Toggle',
    },
  }
  const finalKeybinds = keybinds ?? defaultKeybinds
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <AppLayoutContext.Provider
      value={{ collapsed, setCollapsed, keybinds: finalKeybinds }}
    >
      {children}
    </AppLayoutContext.Provider>
  )
}
