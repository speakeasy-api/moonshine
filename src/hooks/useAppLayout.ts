import { useContext } from 'react'
import { AppLayoutContext } from '@/components/AppLayout/context'

export const useAppLayout = () => {
  const context = useContext(AppLayoutContext)
  if (!context) {
    throw new Error('useAppLayout must be used within an AppLayoutProvider')
  }
  return context
}
