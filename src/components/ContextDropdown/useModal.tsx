import { useContext } from 'react'
import { ContextDropdownContext } from './provider'

export function useModal() {
  const context = useContext(ContextDropdownContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
