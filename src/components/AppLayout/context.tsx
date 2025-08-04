import { createContext } from 'react'

export interface AppLayoutContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const AppLayoutContext = createContext<AppLayoutContextType>({
  collapsed: false,
  setCollapsed: () => {},
})
