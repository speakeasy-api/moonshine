import { cn } from '@/lib/utils'
import { motion, Transition, AnimatePresence } from 'framer-motion'
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
  memo,
} from 'react'

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

const POSITION_TRANSITION: Transition = {
  type: 'spring',
  bounce: 0.15,
  duration: 0.4,
}

const SCALE_TRANSITION: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.3,
}

const FADE_TRANSITION: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15,
}

const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(callback, delay)
  }, [callback, delay])
}

export function Subnav({ items, renderItem }: SubnavProps) {
  const [activeItem, setActiveItem] = useState<string | null>(
    items.find((item) => item.active)?.href ?? null
  )
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [baseWidth, setBaseWidth] = useState<number>(0)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const previousHoveredItem = useRef<string | null>(null)
  const isContainerHovered = useRef(false)

  const debouncedResize = useDebounce(
    () => setHoveredItem((current) => current),
    100
  )

  useLayoutEffect(() => {
    const newActiveItem: string =
      items.find((item) => item.active)?.href ?? items[0]?.href
    setActiveItem(newActiveItem)

    const element = itemRefs.current.get(newActiveItem)
    if (element) {
      setBaseWidth(element.offsetWidth)
    }
  }, [items])

  const indicatorProps: {
    scaleX: number
    left: number
  } | null = useMemo(() => {
    if (!hoveredItem || !baseWidth) return null

    const itemElement = itemRefs.current.get(hoveredItem)
    if (!itemElement) return null

    return {
      scaleX: itemElement.offsetWidth / baseWidth,
      left: itemElement.offsetLeft,
    }
  }, [hoveredItem, baseWidth])

  const activeIndicatorProps: {
    scaleX: number
    left: number
  } | null = useMemo(() => {
    if (!activeItem || !baseWidth) return null

    const itemElement = itemRefs.current.get(activeItem)
    if (!itemElement) return null

    return {
      scaleX: itemElement.offsetWidth / baseWidth,
      left: itemElement.offsetLeft,
    }
  }, [activeItem, baseWidth])

  const handleItemClick = useCallback((href: string) => {
    setActiveItem(href)
  }, [])

  const handleContainerMouseEnter = useCallback(() => {
    isContainerHovered.current = true
  }, [])

  const handleContainerMouseLeave = useCallback(() => {
    isContainerHovered.current = false
    previousHoveredItem.current = null
    setHoveredItem(null)
  }, [])

  const handleItemHover = useCallback(
    (href: string | null) => {
      if (href !== null) {
        previousHoveredItem.current = hoveredItem
      }
      setHoveredItem(href)
    },
    [hoveredItem]
  )

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize])

  const shouldSlide =
    previousHoveredItem.current !== null && isContainerHovered.current

  const getItemHandlers = useCallback(
    (href: string) => {
      return {
        onClick: () => handleItemClick(href),
        onMouseEnter: () => handleItemHover(href),
        onMouseLeave: () => handleItemHover(null),
      }
    },
    [handleItemClick, handleItemHover]
  )

  const SubnavItem = memo(function SubnavItem({
    item,
    isActive,
    isHovered,
    handlers,
    itemRef,
    renderItem,
  }: {
    item: SubnavItem
    isActive: boolean
    isHovered: boolean
    handlers: ReturnType<typeof getItemHandlers>
    itemRef: (el: HTMLDivElement | null) => void
    renderItem: (item: SubnavItem & { hovered: boolean }) => React.ReactNode
  }) {
    return (
      <div
        ref={itemRef}
        className={cn(
          'text-muted-foreground relative z-10 cursor-pointer select-none',
          isActive && 'text-foreground font-semibold'
        )}
        {...handlers}
      >
        {renderItem({ ...item, hovered: isHovered })}
      </div>
    )
  })

  return (
    <div
      className="relative flex"
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      <AnimatePresence>
        {indicatorProps && baseWidth > 0 && (
          <motion.div
            className="bg-secondary absolute inset-y-0 my-auto h-[calc(100%-10px)] origin-left rounded-md"
            style={{ width: baseWidth }}
            initial={shouldSlide ? false : { opacity: 0 }}
            animate={{
              translateX: indicatorProps.left,
              scaleX: indicatorProps.scaleX,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: FADE_TRANSITION,
              translateX: shouldSlide ? POSITION_TRANSITION : { duration: 0 },
              scaleX: shouldSlide ? SCALE_TRANSITION : { duration: 0 },
            }}
            layoutDependency={indicatorProps}
          />
        )}
      </AnimatePresence>

      {items.map((item) => (
        <SubnavItem
          key={item.href}
          item={item}
          isActive={activeItem === item.href}
          isHovered={hoveredItem === item.href}
          handlers={getItemHandlers(item.href)}
          itemRef={(el) => {
            if (el) {
              itemRefs.current.set(item.href, el)
            } else {
              itemRefs.current.delete(item.href)
            }
          }}
          renderItem={renderItem}
        />
      ))}

      {activeIndicatorProps && baseWidth > 0 && (
        <motion.div
          className="bg-primary absolute bottom-0 h-[2px] origin-left"
          style={{ width: baseWidth }}
          initial={false}
          animate={{
            translateX: activeIndicatorProps.left,
            scaleX: activeIndicatorProps.scaleX,
          }}
          transition={{
            translateX: POSITION_TRANSITION,
            scaleX: SCALE_TRANSITION,
          }}
          layoutDependency={activeIndicatorProps}
        />
      )}
    </div>
  )
}
