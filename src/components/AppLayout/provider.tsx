import { PropsWithChildren, useState, useEffect } from 'react'
import { AppLayoutContext, AppLayoutContextType } from './context'

interface AppLayoutProviderProps extends PropsWithChildren {
  defaultCollapsed?: boolean
  keybinds?: AppLayoutContextType['keybinds']
  hoverExpandsSidebar?: boolean
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
  hoverExpandsSidebar = true,
}: AppLayoutProviderProps) => {
  const finalKeybinds = keybinds ?? defaultKeybinds
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [expandedByHover, setExpandedByHover] = useState(false)

  // Used to auto-collapse other NavItems which have sub items when a new one is opened
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null)

  // respond to defaultCollapsed changes
  useEffect(() => {
    setCollapsed(defaultCollapsed)
    setExpandedByHover(false) // Reset hover state when default changes
  }, [defaultCollapsed])

  return (
    <AppLayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        keybinds: finalKeybinds,
        hoverExpandsSidebar,
        _expandedByHover: expandedByHover,
        _setExpandedByHover: setExpandedByHover,
        _activeNavItem: activeNavItem,
        _setActiveNavItem: setActiveNavItem,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  )
}
