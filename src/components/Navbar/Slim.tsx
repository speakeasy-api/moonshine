import { Icon, IconName, Logo } from '@/index'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

export interface SlimProps {
  navItems?: NavItem[]
  className?: string
  children: React.ReactNode
  /**
   * Called when the user clicks the home button.
   */
  onHomeNavigation?: () => void
  onItemClick?: (item: NavItem) => void
}

export interface NavItem {
  id: string
  icon?: IconName
  label: string
  active?: boolean
  render?: (props: { active: boolean; onClick: () => void }) => React.ReactNode
}

export const Slim = ({
  onHomeNavigation,
  navItems = [],
  className,
  children,
  onItemClick,
}: SlimProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const PROXIMITY_THRESHOLD = 50
  const HIDE_DELAY = 400
  const NAV_WIDTH = 208 // w-52 in px
  const INDICATOR_WIDTH = 16
  const INDICATOR_RADIUS = 9999
  const INDICATOR_HEIGHT = 50
  const NAV_RADIUS = 0

  // Helper: open nav if mouse is over indicator or navbar
  const handleMouseMove = (e: MouseEvent) => {
    const isNearEdge = e.clientX < PROXIMITY_THRESHOLD
    const navbar = navbarRef.current
    const indicator = indicatorRef.current
    let isOverNavbar = false
    let isOverIndicator = false
    if (navbar) {
      const rect = navbar.getBoundingClientRect()
      isOverNavbar =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    }
    if (indicator) {
      const rect = indicator.getBoundingClientRect()
      isOverIndicator =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    }
    if (isNearEdge || isOverNavbar || isOverIndicator || isHovering) {
      setIsVisible(true)
      return
    }
    setIsVisible(false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })

  // Keep nav open while hovering indicator or navbar
  const handleIndicatorEnter = () => {
    setIsHovering(true)
    setIsVisible(true)
  }
  const handleIndicatorLeave = () => {
    setIsHovering(false)
    setTimeout(() => {
      setIsVisible(false)
    }, HIDE_DELAY)
  }
  const handleNavbarEnter = () => {
    setIsHovering(true)
    setIsVisible(true)
  }
  const handleNavbarLeave = () => {
    setIsHovering(false)
    setTimeout(() => {
      setIsVisible(false)
    }, HIDE_DELAY)
  }

  return (
    <div className="flex h-full w-full flex-row">
      {/* Morphing pill/nav: subtle, vertically centered pill expands to full nav */}
      <motion.div
        ref={navbarRef}
        id="navbar-gooey"
        initial={false}
        animate={{
          width: isVisible ? NAV_WIDTH : INDICATOR_WIDTH,
          height: isVisible ? '100vh' : INDICATOR_HEIGHT,
          borderRadius: isVisible ? NAV_RADIUS : INDICATOR_RADIUS,
          boxShadow: isVisible
            ? '0 4px 32px 0 #0002, 0 0 0 0 #fff2'
            : '0 0 32px 12px #18181b66, 0 0 0 8px #18181b33',
          background: isVisible ? 'rgba(24,24,27,0.85)' : 'rgba(24,24,27,0.5)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          left: 5,
          top: isVisible ? 0 : '50%',
          y: isVisible ? 0 : '-50%',
          position: 'fixed',
          zIndex: 50,
          border: `1.5px solid rgba(255,255,255,${isVisible ? 0 : 0.3})`,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 28,
          mass: 0.6,
        }}
        style={{
          overflow: 'hidden',
          minHeight: isVisible ? '100vh' : INDICATOR_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isVisible ? 'flex-start' : 'center',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
        onMouseEnter={handleNavbarEnter}
        onMouseLeave={handleNavbarLeave}
      >
        <AnimatePresence>
          {isVisible ? (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.08 } }}
              exit={{ opacity: 0 }}
              className={cn('flex h-full w-full flex-col', className)}
              style={{ pointerEvents: 'auto' }}
            >
              {/* Logo */}
              <div className="flex items-center justify-center py-5">
                <button
                  id="brand"
                  onClick={onHomeNavigation}
                  className="dark:text-primary text-black"
                >
                  <Logo variant="icon" className="size-7 fill-current" />
                </button>
              </div>
              {/* Divider */}
              <div className="border-border/30 mx-4 mb-4 border-b" />
              {/* Nav Items */}
              <nav className="flex flex-col gap-2 px-2">
                {navItems.map((item) => (
                  <div
                    className="hover:bg-muted/20 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 transition-colors"
                    key={item.label}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        strokeWidth={1.2}
                        className="size-6 text-current"
                      />
                    )}
                    <span
                      className={cn(
                        'text-base',
                        item.active
                          ? 'text-foreground font-semibold'
                          : 'text-body-muted'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </nav>
            </motion.div>
          ) : (
            <motion.div
              key="nav-indicator"
              ref={indicatorRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative cursor-pointer"
              style={{
                width: INDICATOR_WIDTH,
                height: INDICATOR_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={handleIndicatorEnter}
              onMouseLeave={handleIndicatorLeave}
            >
              {/* Gooey blur behind */}
              <span className="bg-background/60 absolute top-1/2 left-1/2 -z-10 block h-20 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ marginLeft: 0 }}
        animate={{ marginLeft: isVisible ? NAV_WIDTH : INDICATOR_WIDTH }}
        transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.6 }}
        className="min-h-screen flex-1"
      >
        {children}
      </motion.div>
    </div>
  )
}

Slim.displayName = 'Navbar.Slim'
