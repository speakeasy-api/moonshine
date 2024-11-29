import { cn } from '@/lib/utils'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface SubnavItem {
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

  const handleItemClick = (href: string) => {
    setActiveItem(href)
  }

  const handleItemHover = (href: string | null) => {
    setHoveredItem(href)
  }

  const animateProps: TargetAndTransition | undefined = indicatorProps
    ? {
        translateX: indicatorProps.left,
        width: indicatorProps.width,
      }
    : undefined

  useEffect(() => {
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
  }, [hoveredItem, activeItem])

  return (
    <div ref={containerRef} className="relative flex">
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
