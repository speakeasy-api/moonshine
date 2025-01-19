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
      <Icon name={iconName} />
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
        'absolute bottom-0 right-20 top-0 min-h-svh w-auto min-w-12 rounded-2xl',
        className
      )}
    >
      <div
        className="fixed bottom-0 top-0 z-10 h-full min-w-12"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, black 0%, transparent 7%, transparent 93%, black 100%)',
        }}
      ></div>
      <div className="h-full before:absolute before:left-1/2 before:-z-0 before:h-full before:w-[1px] before:-translate-x-1/2 before:bg-gradient-to-b before:from-transparent before:via-zinc-600 before:to-transparent">
        {validChildren}
      </div>
    </div>
  )
}

export const Timeline = Object.assign(Root, {
  Item,
})
