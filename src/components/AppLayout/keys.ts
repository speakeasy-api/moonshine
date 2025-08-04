import { useAppLayout } from '@/hooks/useAppLayout'
import { useCallback, useEffect } from 'react'

export function useAppLayoutKeys() {
  const { keybinds, collapsed, setCollapsed } = useAppLayout()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === keybinds.toggle.key.toLowerCase()
      ) {
        event.preventDefault()
        setCollapsed(!collapsed)
      }
    },
    [keybinds, collapsed, setCollapsed]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keybinds, collapsed, setCollapsed])
}
