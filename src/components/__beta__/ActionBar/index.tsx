import { Icon } from '@/components/Icon'
import { IconName } from '@/components/Icon/names'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip'
import { cn } from '@/lib/utils'
import {
  useDraggable,
  DraggableAttributes,
  useDndMonitor,
  Translate,
  DragEndEvent,
  DragStartEvent,
  Modifier,
} from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { useState } from 'react'
import { DragNDropArea } from '../DragNDrop/DragNDropArea'

interface ActionBarProps {
  children: React.ReactNode
  id: string
  initialPosition: Translate
  onChangePosition?: (position: Translate) => void
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  draggable?: boolean

  /**
   * dnd-kit modifiers (https://docs.dndkit.com/api-documentation/modifiers)
   */
  modifiers?: Modifier[]
}

const ActionBarInternal = ({
  children,
  modifiers,
  ...props
}: ActionBarProps) => {
  return (
    <DragNDropArea modifiers={modifiers}>
      <Root {...props}>{children}</Root>
    </DragNDropArea>
  )
}

ActionBarInternal.displayName = 'ActionBar'

const Root = ({
  children,
  id,
  initialPosition = { x: 0, y: 0 },
  onChangePosition,
  draggable = true,
  onDragStart,
  onDragEnd,
}: ActionBarProps) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id,
  })

  const [state, setState] = useState<Translate>(initialPosition)

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      setState((prev) => ({
        x: prev.x + event.delta.x,
        y: prev.y + event.delta.y,
      }))
      onChangePosition?.({
        x: state.x + event.delta.x,
        y: state.y + event.delta.y,
      })
      onDragEnd?.(event)
    },
    onDragStart: (event: DragStartEvent) => {
      onDragStart?.(event)
    },
  })

  const transformStyle: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {}

  return (
    <div
      ref={setNodeRef}
      style={{
        top: state.y,
        left: state.x,
        ...transformStyle,
      }}
      className="bg-card fixed flex min-w-36 flex-row items-center justify-center gap-3 rounded-lg border py-2 pl-2 pr-2 shadow-lg shadow-white/5"
    >
      {draggable && (
        <>
          <ActionBarHandle listeners={listeners} attributes={attributes} />
          <ActionBarSeparator />
        </>
      )}
      {children}
    </div>
  )
}

Root.displayName = 'ActionBar.Root'

interface ActionBarItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  iconName: IconName
}

const ActionBarItem = ({
  children,
  onClick,
  disabled,
  className,
  iconName,
}: ActionBarItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger
          onClick={onClick}
          className={cn(
            'text-foreground flex cursor-pointer select-none items-center justify-center last-of-type:mr-1',
            'focus: focus:rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/70 focus:ring-offset-4 focus:ring-offset-slate-900',
            !disabled && 'hover:text-foreground cursor-pointer',
            disabled && 'text-muted/70 cursor-not-allowed',
            className
          )}
        >
          <Icon name={iconName} size="small" />
        </TooltipTrigger>
        <TooltipContent className="select-none border-zinc-100 px-2 py-1 text-xs shadow-none dark:border-zinc-900">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

ActionBarItem.displayName = 'ActionBar.Item'

const ActionBarSeparator = () => {
  return (
    <div className="h-full min-h-4 w-[0.5px] bg-zinc-200 dark:bg-zinc-700" />
  )
}

ActionBarSeparator.displayName = 'ActionBar.Separator'

const ActionBarHandle = ({
  listeners,
  attributes,
}: {
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes | undefined
}) => {
  return (
    <div
      {...listeners}
      {...attributes}
      className="text-muted hover:text-foreground active:text-foreground h-full cursor-move"
    >
      <Icon name="grip-vertical" className="h-4 w-4" />
    </div>
  )
}

export const ActionBar = Object.assign(ActionBarInternal, {
  Item: ActionBarItem,
  Separator: ActionBarSeparator,
})
