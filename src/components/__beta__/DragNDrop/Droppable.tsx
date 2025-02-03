import { Over, UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import type { ClientRect } from '@dnd-kit/core/dist/types/rect'
import type { MutableRefObject, ReactNode } from 'react'

interface DroppableData {
  isOver: boolean
  over: Over | null
  rect: MutableRefObject<ClientRect | null>
  node: MutableRefObject<HTMLElement | null>
}

interface DroppableProps<TData extends Record<string, unknown>> {
  /**
   * A function that returns a React node or a React node.
   * If a function is provided, it will be called with the droppable data.
   */
  children: ReactNode | ((props: DroppableData) => ReactNode)

  /**
   * The unique identifier for the droppable container.
   */
  id: UniqueIdentifier

  /**
   * The data to pass to the droppable container.
   * Will be returned in any dragOver events for draggables that are over this droppable.
   */
  data?: TData

  className?: string
}

export function Droppable<TData extends Record<string, unknown>>({
  children,
  id,
  data,
  className,
}: DroppableProps<TData>) {
  const { setNodeRef, isOver, over, rect, node } = useDroppable({
    id,
    data,
  })

  return (
    <div ref={setNodeRef} className={className}>
      {typeof children === 'function'
        ? children({ isOver, over, rect, node })
        : children}
    </div>
  )
}
