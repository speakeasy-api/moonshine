import { useEffect, useRef } from 'react'
import { useAppLayout } from './useAppLayout'

/**
 * Hook to prevent sidebar from collapsing when interactive content
 * (like popovers, dropdowns) extends beyond the sidebar boundaries.
 *
 * @param isActive - Whether the interaction lock should be active
 *
 * @example
 * ```tsx
 * function SidebarPopover() {
 *   const [isOpen, setIsOpen] = useState(false)
 *
 *   // Prevent sidebar from collapsing when popover is open
 *   useSidebarInteractionLock(isOpen)
 *
 *   return (
 *     <Popover open={isOpen} onOpenChange={setIsOpen}>
 *       <PopoverTrigger>Open</PopoverTrigger>
 *       <PopoverContent>Content that extends beyond sidebar</PopoverContent>
 *     </Popover>
 *   )
 * }
 * ```
 */
export function useSidebarInteractionLock(isActive: boolean) {
  const { lockSidebarInteraction } = useAppLayout()
  const unlockRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (isActive) {
      // Acquire lock
      unlockRef.current = lockSidebarInteraction()
    } else {
      // Release lock
      if (unlockRef.current) {
        unlockRef.current()
        unlockRef.current = null
      }
    }

    // Cleanup on unmount
    return () => {
      if (unlockRef.current) {
        unlockRef.current()
        unlockRef.current = null
      }
    }
  }, [isActive, lockSidebarInteraction])
}
