import {
  Active,
  DndMonitorListener,
  useDndMonitor,
  useDraggable,
  Over,
  Data,
  UniqueIdentifier,
} from '@dnd-kit/core'
import type { ClientRect } from '@dnd-kit/core/dist/types/rect'
import { CSS } from '@dnd-kit/utilities'
import { MutableRefObject } from 'react'

export interface DraggableChildrenProps {
  over: Over | null
  active: Active | null
  activeNodeRect: ClientRect | null
  isDragging: boolean
  node: MutableRefObject<HTMLElement | null> | null
}

interface DraggableProps<TData> extends DndMonitorListener {
  /**
   * The children to render.
   *
   * If a function is provided, it will be called with the current state of the draggable.
   */
  children:
    | React.ReactNode
    | ((props: DraggableChildrenProps) => React.ReactNode)

  /**
   * The unique identifier for the draggable.
   */
  id: UniqueIdentifier

  className?: string

  /**
   * The data to pass to the draggable of generic type TData.
   */
  data?: TData
}

export function Draggable<TData extends Data>({
  children,
  id,
  onDragEnd,
  onDragStart,
  onDragCancel,
  onDragOver,
  className,
  data,
}: DraggableProps<TData>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    over,
    transform,
    active,
    isDragging,
    activeNodeRect,
    node,
  } = useDraggable({
    id,
    data,
  })
  useDndMonitor({
    onDragEnd,
    onDragStart,
    onDragCancel,
    onDragOver,
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className}
    >
      {typeof children === 'function'
        ? children({ over, active, activeNodeRect, isDragging, node })
        : children}
    </div>
  )
}
