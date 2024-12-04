import { cn } from '@/lib/utils'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'

export interface SubnavItem {
  label: string
  href: string
  active?: boolean

  [key: string]: unknown
}

interface SubnavProps {
  items: SubnavItem[]
  renderItem: (item: SubnavItem) => React.ReactNode
}

const transitionProps: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  duration: 0.05,
}

export function Subnav({ items, renderItem }: SubnavProps) {
  const [activeItem, setActiveItem] = useState<string | null>(
    items.find((item) => item.active)?.href ?? null
  )
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [indicatorProps, setIndicatorProps] = useState<{
    width: number
    left: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerMouseEnterTime = useRef<number | null>(null)
  const isContainerHovered = useRef(false)

  const handleItemClick = (href: string) => {
    setActiveItem(href)
  }

  const handleContainerMouseEnter = useCallback(() => {
    containerMouseEnterTime.current = Date.now()
    isContainerHovered.current = true
  }, [])

  const handleContainerMouseLeave = useCallback(() => {
    containerMouseEnterTime.current = null
    isContainerHovered.current = false
    setHoveredItem(null)
  }, [])

  const handleItemHover = useCallback((href: string | null) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    if (href === null) {
      setHoveredItem(null)
    } else {
      const timeInContainer = containerMouseEnterTime.current
        ? Date.now() - containerMouseEnterTime.current
        : 0

      if (timeInContainer < 100) {
        hoverTimerRef.current = setTimeout(() => {
          if (isContainerHovered.current) {
            setHoveredItem(href)
          }
        }, 50)
      } else {
        hoverTimerRef.current = setTimeout(() => {
          if (isContainerHovered.current) {
            setHoveredItem(href)
          }
        }, 100)
      }
    }
  }, [])

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [])

  const animateProps: TargetAndTransition | undefined = indicatorProps
    ? {
        translateX: indicatorProps.left,
        width: indicatorProps.width,
      }
    : undefined

  useEffect(() => {
    const updateIndicator = () => {
      if (!containerRef.current) return

      const currentHref = hoveredItem || activeItem
      if (currentHref) {
        const itemElement = containerRef.current.querySelector<HTMLDivElement>(
          `[data-href="${currentHref}"]`
        )
        if (itemElement) {
          const { offsetWidth: width, offsetLeft: left } = itemElement
          setIndicatorProps({
            width,
            left,
          })
        }
      } else {
        setIndicatorProps(null)
      }
    }

    // Initial update
    updateIndicator()

    // Add resize listener
    window.addEventListener('resize', updateIndicator)

    // Cleanup
    return () => window.removeEventListener('resize', updateIndicator)
  }, [hoveredItem, activeItem])

  useEffect(() => {
    const newActiveItem = items.find((item) => item.active)?.href ?? null
    setActiveItem(newActiveItem)
  }, [items])

  return (
    <div
      ref={containerRef}
      className="relative flex"
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      {indicatorProps && (
        <motion.div
          className="bg-muted absolute h-full rounded-md"
          initial={false}
          animate={animateProps}
          transition={transitionProps}
        />
      )}

      {items.map((item) => (
        <div
          key={item.href}
          data-href={item.href}
          className={cn(
            'text-muted-foreground relative z-10 cursor-pointer select-none',
            activeItem === item.href && 'text-foreground font-semibold'
          )}
          onClick={() => handleItemClick(item.href)}
          onMouseEnter={() => handleItemHover(item.href)}
          onMouseLeave={() => handleItemHover(null)}
        >
          {renderItem({ ...item, hovered: hoveredItem === item.href })}
        </div>
      ))}

      {indicatorProps && (
        <motion.div
          className="bg-primary absolute bottom-0 h-[2.75px]"
          initial={false}
          animate={animateProps}
          transition={transitionProps}
        />
      )}
    </div>
  )
}
