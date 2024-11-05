import { cn } from '@/lib/utils'
import { motion, Transition } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface SubnavItem {
  label: string
  href: string
  active?: boolean
}

interface SubnavProps {
  items: SubnavItem[]
  renderItem: (item: SubnavItem) => React.ReactNode
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

  useEffect(() => {
    if (!containerRef.current) return

    const currentHref = hoveredItem || activeItem
    if (currentHref) {
      const itemElement = containerRef.current.querySelector<HTMLDivElement>(
        `[data-href="${currentHref}"]`
      )
      if (itemElement) {
        const { offsetWidth: width, offsetLeft: left } = itemElement
        setIndicatorProps({ width, left })
      }
    } else {
      setIndicatorProps(null)
    }
  }, [hoveredItem, activeItem])

  const transitionProps: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 30,
    duration: 0.05,
  }

  return (
    <div ref={containerRef} className="relative flex">
      {indicatorProps && (
        <motion.div
          className="bg-muted absolute h-full rounded-md"
          initial={false}
          animate={{
            left: indicatorProps.left,
            width: indicatorProps.width,
          }}
          transition={transitionProps}
        />
      )}

      {items.map((item) => (
        <div
          key={item.href}
          data-href={item.href}
          className={cn(
            'text-muted-foreground relative z-10 cursor-pointer select-none px-4 py-2',
            activeItem === item.href && 'text-foreground font-semibold'
          )}
          onClick={() => handleItemClick(item.href)}
          onMouseEnter={() => handleItemHover(item.href)}
          onMouseLeave={() => handleItemHover(null)}
        >
          {renderItem(item)}
        </div>
      ))}

      {indicatorProps && (
        <motion.div
          className="bg-primary absolute bottom-[-9px] h-[2.75px]"
          initial={false}
          animate={{
            left: indicatorProps.left,
            width: indicatorProps.width,
          }}
          transition={transitionProps}
        />
      )}
    </div>
  )
}
