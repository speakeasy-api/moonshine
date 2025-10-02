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

  /**
   * Prevents the sidebar from collapsing when interactive content
   * (like popovers, dropdowns) extends beyond the sidebar boundaries.
   * Returns a cleanup function to release the lock.
   */
  lockSidebarInteraction: () => () => void

  /**
   * Check if sidebar interaction is currently locked
   */
  isSidebarInteractionLocked: boolean
}

export const AppLayoutContext = createContext<AppLayoutContextType>({
  collapsed: false,
  setCollapsed: () => {},
  keybinds: {
    toggle: {
      key: 'L',
      description: 'Toggle',
    },
  },
  hoverExpandsSidebar: true,
  _expandedByHover: false,
  _setExpandedByHover: () => {},
  lockSidebarInteraction: () => () => {},
  isSidebarInteractionLocked: false,
})
