import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers'
import { Draggable, DraggableChildrenProps } from '../DragNDrop/Draggable'
import { DragNDropArea } from '../DragNDrop/DragNDropArea'
import { cn } from '@/lib/utils'
import { Droppable } from '../DragNDrop/Droppable'
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { useCallback, useEffect, useState } from 'react'
import { KeyHint } from '../KeyHint'
import { Icon } from '@/components/Icon'
import { motion } from 'framer-motion'

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
  const [showManualMode, setShowManualMode] = useState(false)
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      if (event.key === 'g' && (event.metaKey || event.ctrlKey)) {
        setShowManualMode(true)
      } else if (event.key === 'Escape') {
        setShowManualMode(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const calculateDragPreviewBackgroundGradient = useCallback(
    (props: DraggableChildrenProps) => {
      const { activeNodeRect, over, active, node, isDragging } = props

      if (!isDragging) return 'transparent'

      if (!activeNodeRect || !over || !active || !node) {
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
      const nextGroupRect =
        over.data.current?.groupId !== active.data.current?.groupId
          ? over.rect
          : undefined

      if (!initialRect || !translatedRect) {
        return 'transparent'
      }

      const withinOriginalGroup = originalGroup.id === targetGroup.id
      const firstColor = originalGroup.color
      const secondColor = withinOriginalGroup
        ? nextGroup?.color
        : targetGroup.color

      if (!nextGroupRect) {
        return `linear-gradient(
      to bottom,
      ${firstColor},
      ${firstColor}
        )`
      }

      const centerY = nextGroupRect.top + nextGroupRect.height / 2
      const isAboveCenter = translatedRect.bottom <= centerY

      const overlay = isAboveCenter
        ? translatedRect.bottom - nextGroupRect.top
        : nextGroupRect.bottom - translatedRect.top

      // take into account height of translatedRect
      const translatedHeight = translatedRect.bottom - translatedRect.top
      const overlayPercentage = Math.round(
        Math.max(0, Math.min(1, overlay / translatedHeight)) * 100
      )

      console.log('overlayPercentage', overlayPercentage)
      let stops = `${firstColor} 0%,
      ${firstColor} ${100 - overlayPercentage}%,
      ${secondColor} ${100 - overlayPercentage}%,
      ${secondColor} 100%`

      if (!isAboveCenter) {
        stops = `${secondColor} 0%,
        ${secondColor} ${overlayPercentage}%,
        ${firstColor} ${overlayPercentage}%,
        ${firstColor} 100%`
      }

      // Create a gradient that transitions from oldGroupColor to newGroupColor
      return `linear-gradient(
        to bottom,
        ${stops}
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
      <KeyHint
        modifiers={!showManualMode ? ['ctrlorcommand'] : ['esc']}
        keys={!showManualMode ? ['g'] : []}
        className="mb-10"
        actionText={
          showManualMode
            ? 'to exit manual grouping'
            : 'to enter manual grouping'
        }
      />
      <div className="flex max-w-screen-lg flex-col gap-8 overflow-y-auto">
        {groups.map((group, index) => (
          <Droppable
            key={group.id}
            id={group.id}
            data={{
              groupId: group.id,
              nextGroupId: groups[index + 1]?.id,
            }}
          >
            <div
              className="flex flex-col gap-2 rounded-md border px-2 py-4 shadow-lg shadow-white/10"
              style={{ borderColor: group.color }}
            >
              <h2 className="text-lg font-semibold">{group.name}</h2>

              <div className="flex flex-col gap-2">
                {group.operations.map((operation) => (
                  <Draggable
                    key={operation.id}
                    id={operation.id}
                    disabled={!showManualMode}
                    onDragEnd={(event) => {
                      handleDragEnd(event, operation, group)
                    }}
                    data={{
                      groupId: group.id,
                    }}
                  >
                    {(props) => (
                      <motion.div
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1',
                          showManualMode &&
                            !props.isDragging &&
                            'animate-wiggle border bg-gradient-to-br duration-500',
                          props.isDragging && 'z-10',
                          !props.isDragging && '-z-10',
                          false
                        )}
                        style={{
                          backgroundImage:
                            calculateDragPreviewBackgroundGradient(props),
                        }}
                      >
                        {showManualMode && (
                          <Icon
                            name="grip-vertical"
                            className={cn(
                              'text-muted size-4',
                              props.isDragging && 'text-foreground',
                              false
                            )}
                          />
                        )}
                        <div>{operation.name}</div>
                      </motion.div>
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
