import { createContext, useContext } from 'react'
import type { AIChatContextValue } from './types'

export const AIChatContext = createContext<AIChatContextValue>({
  messages: [],
  isLoading: false,
})

export const useAIChat = () => {
  const context = useContext(AIChatContext)
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider')
  }
  return context
}
