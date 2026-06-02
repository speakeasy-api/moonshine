import { useState } from 'react'
import { Draggable } from './Draggable'
import { DragNDropArea } from './DragNDropArea'
import { Droppable } from './Droppable'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DragEndEvent } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const meta: Meta<typeof Droppable> = {
  component: Droppable,
}

export default meta

type Story = StoryObj<typeof Droppable>

const DragNDropDemo = () => {
  const [droppedItems, setDroppedItems] = useState<Set<string>>(new Set())
  const [draggingOver, setDraggingOver] = useState<boolean>(false)
  const [validDrop, setValidDrop] = useState<boolean>(false)
  const checkDrop = (event: DragEndEvent) => {
    setDraggingOver(false)
    const { over, active } = event
    if (over) {
      const activeType = active.data.current?.type

      if (over.data.current?.acceptsType.includes(activeType)) {
        setDroppedItems((prev) => {
          const newSet = new Set(prev)
          newSet.add(activeType)
          return newSet
        })
      }
    }
  }

  return (
    <DragNDropArea className="flex flex-col gap-2" modifiers={[]}>
      <Draggable
        onDragEnd={checkDrop}
        onDragOver={(e) => {
          if (e.over) {
            setDraggingOver(true)
          } else {
            setDraggingOver(false)
          }

          if (
            e.over?.data.current?.acceptsType.includes(
              e.active.data.current?.type
            )
          ) {
            setValidDrop(true)
          } else {
            setValidDrop(false)
          }
        }}
        id="banana"
        data={{ type: '🍌' }}
      >
        <div>🍌 Banana</div>
      </Draggable>
      <Draggable onDragEnd={checkDrop} id="apple" data={{ type: '🍎' }}>
        <div>🍎 Apple</div>
      </Draggable>
      <Draggable onDragEnd={checkDrop} id="orange" data={{ type: '🍊' }}>
        <div>🍊 Orange</div>
      </Draggable>

      <Droppable id="droppable-1" data={{ acceptsType: ['🍌', '🍎'] }}>
        <div
          className={cn(
            'inline-flex flex-col rounded-md border-2 border-dashed border-gray-500 p-4',
            draggingOver && 'border-2 border-green-500',
            draggingOver &&
              !validDrop &&
              'cursor-not-allowed border-2 border-red-500'
          )}
        >
          Dropzone (accepts 🍌 and 🍎)
          <div>{Array.from(droppedItems).join(' ')}</div>
        </div>
      </Droppable>
    </DragNDropArea>
  )
}

export const Default: Story = {
  render: () => <DragNDropDemo />,
}
