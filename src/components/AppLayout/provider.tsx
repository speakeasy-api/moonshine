import { PropsWithChildren, useState } from 'react'
import { AppLayoutContext } from './context'

interface AppLayoutProviderProps extends PropsWithChildren {
  defaultCollapsed?: boolean
}

export const AppLayoutProvider = ({
  children,
  defaultCollapsed = false,
}: AppLayoutProviderProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <AppLayoutContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </AppLayoutContext.Provider>
  )
}
