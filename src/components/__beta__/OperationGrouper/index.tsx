import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers'
import { Draggable, DraggableChildrenProps } from '../DragNDrop/Draggable'
import { DragNDropArea } from '../DragNDrop/DragNDropArea'
import { cn } from '@/lib/utils'
import { Droppable } from '../DragNDrop/Droppable'
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { useCallback } from 'react'
// TODO: move these types
export interface Group {
  id: UniqueIdentifier
  name: string
  operations: Operation[]
  path: string
  color: string
}

export interface Operation {
  id: UniqueIdentifier
  name: string
  path: string
}

export interface OperationGrouperProps {
  groups: Group[]
  onItemMove: (operation: Operation, oldGroup: Group, newGroup: Group) => void
}

export function OperationGrouper({
  groups,
  onItemMove,
}: OperationGrouperProps) {
  const handleDragEnd = useCallback(
    (event: DragEndEvent, operation: Operation, originalGroup: Group) => {
      const { over } = event
      if (!over) {
        return
      }
      const newGroup = groups.find(
        (group) => group.id === over.data.current?.groupId
      )
      if (!newGroup) {
        return
      }
      onItemMove(operation, originalGroup, newGroup)
    },
    [groups, onItemMove]
  )

  const calculateDragPreviewBackgroundGradient = useCallback(
    (props: DraggableChildrenProps) => {
      const { activeNodeRect, over, active, node, isDragging } = props

      if (!isDragging || !activeNodeRect || !over || !active || !node) {
        return 'transparent'
      }

      const originalGroupId = active.data.current?.groupId
      const overGroupId = over.data.current?.groupId
      const nextGroupId = over.data.current?.nextGroupId

      const targetGroup = getGroup(overGroupId)
      const originalGroup = getGroup(originalGroupId)
      const nextGroup = getGroup(nextGroupId)

      if (!targetGroup || !originalGroup) {
        return 'transparent'
      }

      const activeRect = active.rect.current
      const initialRect = activeRect?.initial
      const translatedRect = activeRect?.translated

      if (!initialRect || !translatedRect) {
        return 'transparent'
      }

      // console.log('--------------------------------')
      // console.log('over-id', overGroup.id)
      // console.log('over', over.rect.top)
      // console.log('over-bottom', over.rect.bottom)
      // console.log('active', translatedRect.top)
      // console.log('active-id', active.id)
      // console.log('initial', initialRect.top)

      // console.log('--------------------------------')

      const firstColor = originalGroup.color
      const secondColor =
        originalGroup.id === targetGroup.id
          ? nextGroup?.color
          : targetGroup.color

      // console.log('originalGroup', originalGroup.color)
      // console.log('targetGroup', targetGroup.color)
      // console.log('nextGroup', nextGroup?.color)
      // // Create a gradient that transitions from oldGroupColor to newGroupColor
      return `linear-gradient(
      to bottom,
      ${firstColor},
      ${secondColor}
        )`
    },
    [groups, onItemMove]
  )

  const getGroup = useCallback(
    (groupId: UniqueIdentifier): Group | undefined => {
      return groups.find((group) => group.id === groupId)
    },
    [groups]
  )

  return (
    <DragNDropArea modifiers={[restrictToFirstScrollableAncestor]}>
      <div className="flex flex-col gap-14 overflow-y-auto">
        {groups.map((group, index) => (
          <Droppable
            key={group.id}
            id={group.id}
            data={{
              groupId: group.id,
              nextGroupId: groups[index + 1]?.id,
            }}
          >
            <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-2">
              <h2 className="text-lg font-semibold">
                {group.name} ({group.id})
              </h2>

              <div className="flex flex-col gap-2">
                {group.operations.map((operation) => (
                  <Draggable
                    key={operation.id}
                    id={operation.id}
                    onDragEnd={(event) => {
                      handleDragEnd(event, operation, group)
                    }}
                    data={{
                      groupId: group.id,
                    }}
                  >
                    {(props) => (
                      <div
                        className={cn('inline-flex items-center rounded-md')}
                        style={{
                          backgroundImage:
                            calculateDragPreviewBackgroundGradient(props),
                        }}
                      >
                        <div>{operation.name}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          </Droppable>
        ))}
      </div>
    </DragNDropArea>
  )
}
