import { CollisionDetection, DndContext, Modifier } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

interface DragNDropAreaProps {
  children: React.ReactNode

  modifiers?: Modifier[]

  className?: string

  collisionDetectionAlgo?: CollisionDetection
}

const defaultModifiers: Modifier[] = [restrictToWindowEdges]

export function DragNDropArea({
  children,
  modifiers = defaultModifiers,
  className,
  collisionDetectionAlgo,
}: DragNDropAreaProps) {
  return (
    <DndContext
      collisionDetection={collisionDetectionAlgo}
      modifiers={modifiers}
    >
      <div className={className}>{children}</div>
    </DndContext>
  )
}
