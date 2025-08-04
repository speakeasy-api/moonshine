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
})
