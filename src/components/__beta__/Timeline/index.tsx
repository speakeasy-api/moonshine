import { Icon } from '@/components/Icon'
import { IconName } from '@/components/Icon/names'
import { cn } from '@/lib/utils'
import { PropsWithChildren, Children, isValidElement } from 'react'

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
  className,
  style,
}) => {
  return (
    <div
      style={{
        top: `${position.y}px`,
        ...style,
      }}
      className={cn(
        'bg-background absolute flex size-auto min-h-12 min-w-12 scale-[0.85] cursor-pointer items-center justify-center rounded-full border px-2 transition-transform duration-500',
        className
      )}
    >
      <Icon name={iconName} size="medium" />
    </div>
  )
}
Item.displayName = 'Timeline.Item'

interface RootProps extends PropsWithChildren {
  className?: string
}

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
        <div
          className="fixed bottom-0 top-0 z-10 h-full w-12"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, black 0%, transparent 5%, transparent 95%, black 100%)',
          }}
        ></div>
        <div className="h-full before:fixed before:right-16 before:-z-0 before:h-full before:w-[1px] before:-translate-x-1/2 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
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
