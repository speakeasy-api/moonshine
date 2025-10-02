import {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
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

  // Track active interaction locks using a ref to avoid re-renders
  const interactionLocksRef = useRef(new Set<symbol>())
  const [isSidebarInteractionLocked, setIsSidebarInteractionLocked] =
    useState(false)

  // respond to defaultCollapsed changes
  useEffect(() => {
    setCollapsed(defaultCollapsed)
    setExpandedByHover(false) // Reset hover state when default changes
  }, [defaultCollapsed])

  const lockSidebarInteraction = useCallback(() => {
    const lockId = Symbol('sidebar-interaction-lock')
    interactionLocksRef.current.add(lockId)
    setIsSidebarInteractionLocked(true)

    // Return cleanup function
    return () => {
      interactionLocksRef.current.delete(lockId)
      setIsSidebarInteractionLocked(interactionLocksRef.current.size > 0)
    }
  }, [])

  return (
    <AppLayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        keybinds: finalKeybinds,
        hoverExpandsSidebar,
        _expandedByHover: expandedByHover,
        _setExpandedByHover: setExpandedByHover,
        lockSidebarInteraction,
        isSidebarInteractionLocked,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  )
}
