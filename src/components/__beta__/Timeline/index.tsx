import { Icon } from '@/components/Icon'
import { IconName } from '@/components/Icon/names'
import { cn } from '@/lib/utils'
import {
  PropsWithChildren,
  Children,
  isValidElement,
  useState,
  useEffect,
} from 'react'

interface Position {
  y: number // pixels from top of page
}

interface ItemProps extends PropsWithChildren {
  title: string
  description: string
  position: Position
  iconName: IconName
  className?: string
  style?: React.CSSProperties
}

const Item: React.FC<ItemProps> = ({
  position,
  iconName,
  title,
  className,
  style,
}) => {
  // Force re-render on scroll
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      style={{
        top: ((position.y - scrollY) / window.innerHeight) * window.innerHeight,
        ...style,
      }}
      title={`${((position.y - scrollY) / window.innerHeight) * 100}`}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'bg-background relative flex size-auto min-h-12 min-w-12 scale-[0.85] cursor-pointer items-center justify-center rounded-full border p-2 transition-transform duration-500',
        isHovered && 'border-primary/70 scale-100',
        className
      )}
    >
      <Icon name={iconName} />
      {position.y}
    </div>
  )
}
Item.displayName = 'Timeline.Item'

interface RootProps extends PropsWithChildren {
  className?: string
}

const Root: React.FC<RootProps> = ({ children, className }) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'Timeline.Item'
  })

  return (
    <div
      className={cn(
        'fixed bottom-0 right-10 top-0 h-full w-auto min-w-10 rounded-2xl',
        className
      )}
    >
      <div className="h-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_90%,transparent_100%)] before:absolute before:left-1/2 before:-z-10 before:h-full before:w-[1px] before:-translate-x-1/2 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
        {validChildren}
      </div>
    </div>
  )
}

export const Timeline = Object.assign(Root, {
  Item,
})
