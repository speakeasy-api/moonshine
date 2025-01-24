import { DndMonitorListener, useDndMonitor, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface DraggableProps<TData extends Record<string, unknown>>
  extends DndMonitorListener {
  children: React.ReactNode
  id: string
  className?: string
  data?: TData
}

export function Draggable<TData extends Record<string, unknown>>({
  children,
  id,
  onDragEnd,
  onDragStart,
  onDragCancel,
  onDragOver,
  className,
  data,
}: DraggableProps<TData>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  })
  useDndMonitor({
    onDragEnd,
    onDragStart,
    onDragCancel,
    onDragOver,
  })

  const style = {
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
      {children}
    </div>
  )
}
