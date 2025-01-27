import { Icon } from '@/components/Icon'
import { IconName } from '@/components/Icon/names'
import debounce from '@/lib/debounce'
import { cn } from '@/lib/utils'
import {
  PropsWithChildren,
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  iconName: IconName
  className?: string
  style?: React.CSSProperties
  anchorElement: HTMLElement
}

function calculateNormalisedOffset(anchorElement: HTMLElement) {
  const { top, height } = anchorElement.getBoundingClientRect()
  return top - height / 2
}

const Item: React.FC<ItemProps> = ({
  anchorElement,
  iconName,
  className,
  style,
  ...props
}) => {
  const [top, setTop] = useState(0)

  const updateTop = debounce(() => {
    if (anchorElement) {
      const normalisedOffset = calculateNormalisedOffset(anchorElement)
      setTop(normalisedOffset)
    }
  }, 10)

  useEffect(() => {
    updateTop()

    window.addEventListener('resize', updateTop)
    return () => window.removeEventListener('resize', updateTop)
  }, [anchorElement])

  return (
    <div
      style={{
        top: `${top}px`,
        ...style,
      }}
      {...props}
      className={cn(
        'bg-background absolute flex size-auto min-h-12 min-w-12 scale-[0.85] cursor-pointer items-center justify-center rounded-full border px-2 transition-transform duration-500',
        className
      )}
    >
      <Icon name={iconName} size="medium" className="h-4 w-4" />
    </div>
  )
}
Item.displayName = 'Timeline.Item'

interface RootProps extends PropsWithChildren {
  className?: string
}

export type { RootProps, ItemProps }

const Root: React.FC<RootProps> = ({ children, className }) => {
  const timelineItems = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'Timeline.Item'
  })

  const timelineContent = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'Timeline.Content'
  })

  return (
    <div className="flex h-svh">
      <div className="min-h-full flex-grow">{timelineContent}</div>
      <div
        className={cn(
          'absolute bottom-0 right-10 top-0 min-h-svh w-auto min-w-12 rounded-2xl',
          className
        )}
      >
        <div className="bg-mask pointer-events-none fixed bottom-0 top-0 z-10 h-full w-12"></div>
        <div className="h-full before:fixed before:right-16 before:-z-0 before:h-full before:w-[1px] before:-translate-x-1/2 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent dark:before:via-zinc-700">
          {timelineItems}
        </div>
      </div>
    </div>
  )
}

const TimelineContent = ({ children }: PropsWithChildren) => {
  return <div className="mr-36 h-full">{children}</div>
}

TimelineContent.displayName = 'Timeline.Content'

export const Timeline = Object.assign(Root, {
  Item,
  Content: TimelineContent,
})
