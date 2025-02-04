import { useEffect, useRef, useState } from 'react'
import { SelectionBox } from '.'
import { StoryObj, Meta } from '@storybook/react'
import React from 'react'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof SelectionBox> = {
  title: 'Components/Beta/SelectionBox',
  component: SelectionBox,
}

export default meta

type Story = StoryObj<typeof SelectionBox>

export const Inline: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <div className="flex max-w-sm flex-col gap-4">
        <p className="inline-block w-fit pr-4 pl-2" ref={ref}>
          Lorem ipsum dolor sit amet
        </p>
        <SelectionBox targetRef={ref} display="inline" />
      </div>
    )
  },
}

const BlockWithState = () => {
  const totalLines = 20
  const transformedLineIndex = useRef(0)
  const ancestorContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [allRefs, setAllRefs] = useState<
    Map<number, React.RefObject<HTMLParagraphElement>>
  >(new Map())

  useEffect(() => {
    if (allRefs.size !== totalLines) return
    const interval = setInterval(() => {
      if (activeIndex < totalLines - 1) {
        setActiveIndex((prev) => prev + 1)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [allRefs.size, activeIndex])

  useEffect(() => {
    for (const [index, ref] of allRefs.entries()) {
      if (transformedLineIndex.current > index) continue
      const element = ref.current
      if (element && index <= activeIndex) {
        element.innerHTML = faker.lorem.sentence({ min: 3, max: 5 })
        transformedLineIndex.current++
      }
    }
  }, [activeIndex])

  return (
    <div
      ref={ancestorContainerRef}
      className="h-screen/2 container m-auto flex flex-col gap-1 rounded-lg bg-zinc-900 px-6 py-4"
    >
      {Array.from({ length: totalLines }).map((_, index) => (
        <p
          key={index}
          className="inline-block w-fit px-2"
          ref={(el) => {
            if (el) {
              setAllRefs((prev) => prev.set(index, { current: el }))
            }
          }}
        >
          Lorem ipsum dolor sit amet
        </p>
      ))}
      {allRefs.size > 0 && (
        <SelectionBox
          targetRef={allRefs.get(activeIndex)}
          display="block"
          ancestorContainerRef={ancestorContainerRef}
          className="flex items-center opacity-100"
        />
      )}
    </div>
  )
}

export const Block: Story = {
  render: () => <BlockWithState />,
}
