import { createContext } from 'react'

export interface KeybindConfig {
  /**
   * The keybind to trigger the action
   * Will be CMDOrCTRL + key
   */
  key: string
  description: string
}

export interface AppLayoutContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void

  // keybind config
  keybinds: {
    toggle: KeybindConfig
  }

  /**
   * If the sidebar is collapsed, should it expand when hovered?
   */
  hoverExpandsSidebar: boolean

  // track if sidebar was expanded by hover vs manual toggle
  _expandedByHover: boolean
  _setExpandedByHover: (expandedByHover: boolean) => void

  // Used to auto-collapse other NavItems which have sub items when a new one is opened
  _activeNavItem: string | null
  _setActiveNavItem: (activeNavItem: string | null) => void
}

export const AppLayoutContext = createContext<AppLayoutContextType>({
  collapsed: false,
  setCollapsed: () => {},
  _activeNavItem: null,
  _setActiveNavItem: () => {},
  keybinds: {
    toggle: {
      key: 'L',
      description: 'Toggle',
    },
  },
  hoverExpandsSidebar: true,
  _expandedByHover: false,
  _setExpandedByHover: () => {},
})
