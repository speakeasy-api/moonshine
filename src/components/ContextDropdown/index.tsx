'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../Icon'
import { useModal } from './useModal'
import { Screen } from './provider'
import { assert } from '@/lib/typeUtils'

const animationDuration = 0.15

interface ContextDropdownProps {
  renderTitle?: (screen: Screen, index: number) => React.ReactNode
}

export function ContextDropdown({ renderTitle }: ContextDropdownProps) {
  const {
    screens,
    currentIndex,
    isOpen,
    close,
    popScreen,
    navigationDirection,
  } = useModal()

  // Animation variants for title and content
  const slideVariants = {
    enter: (isForward: boolean) => ({
      x: isForward ? '100%' : '-100%',
      opacity: 0,
      width: '100%',
    }),
    center: {
      x: 0,
      opacity: 1,
      width: '100%',
    },
    exit: (isForward: boolean) => ({
      x: isForward ? '-100%' : '100%',
      opacity: 0,
      width: '100%',
    }),
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, close])

  if (!isOpen) return null

  const currentScreen = screens[currentIndex]
  assert(currentScreen, 'No current screen')
  const isForward = navigationDirection === 'forward'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration }}
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              {currentIndex > 0 && (
                <button
                  onClick={popScreen}
                  className="hover:bg-muted mr-2 rounded-full border p-2 disabled:opacity-50 disabled:hover:bg-transparent"
                  aria-label="Go back"
                >
                  <Icon name="chevron-left" className="size-4" />
                </button>
              )}

              {/* Animated title */}
              <div className="relative h-7 w-fit min-w-xs overflow-x-hidden">
                <AnimatePresence initial={false} mode="sync" custom={isForward}>
                  <motion.h2
                    key={`title-${currentIndex}`}
                    className="text-md absolute font-medium"
                    custom={isForward}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'tween', duration: animationDuration }}
                  >
                    {renderTitle
                      ? renderTitle(currentScreen, currentIndex)
                      : currentScreen.title}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            {/* Static right side with close button */}
            <button
              onClick={close}
              className="hover:bg-muted rounded-full border p-2"
              aria-label="Close modal"
            >
              <Icon name="x" className="size-4" />
            </button>
          </div>

          {/* Modal Content with Animation */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} mode="wait" custom={isForward}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0 overflow-auto"
                custom={isForward}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', duration: animationDuration }}
              >
                {currentScreen.component}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
