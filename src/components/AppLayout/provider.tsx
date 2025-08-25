import { PropsWithChildren, useState } from 'react'
import { AppLayoutContext, AppLayoutContextType } from './context'

interface AppLayoutProviderProps extends PropsWithChildren {
  defaultCollapsed?: boolean
  keybinds?: AppLayoutContextType['keybinds']
}

const defaultKeybinds = {
  toggle: {
    key: 'B',
    description: 'Toggle',
  },
}

export const AppLayoutProvider = ({
  children,
  defaultCollapsed = false,
  keybinds,
}: AppLayoutProviderProps) => {
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
