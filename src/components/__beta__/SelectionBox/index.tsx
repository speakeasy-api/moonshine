import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface SelectionBoxProps<T extends HTMLElement> {
  targetRef: React.RefObject<T> | undefined
  display: 'block' | 'inline'
  ancestorContainerRef?: React.RefObject<HTMLElement>
  className?: string
}

export const SelectionBox = <T extends HTMLElement>({
  targetRef,
  display = 'block',
  ancestorContainerRef,
  className,
}: SelectionBoxProps<T>) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const recalc = useCallback(() => {
    if (!targetRef) return

    const element = targetRef.current
    if (element) {
      const { width, height, y, x } = element.getBoundingClientRect()

      if (ancestorContainerRef?.current && display === 'block') {
        const { width: ancestorWidth, x: ancestorX } =
          ancestorContainerRef.current.getBoundingClientRect()
        setWidth(ancestorWidth)
        setX(ancestorX)
      } else {
        setWidth(width)
        setY(y)
        setX(x)
      }

      setY(y)
      setHeight(height)
    }
  }, [targetRef, ancestorContainerRef, display])

  useEffect(() => {
    window.addEventListener('resize', recalc)
    window.addEventListener('scroll', recalc)
    window.addEventListener('orientationchange', recalc)

    return () => {
      window.removeEventListener('resize', recalc)
      window.removeEventListener('scroll', recalc)
      window.removeEventListener('orientationchange', recalc)
    }
  }, [recalc])

  useEffect(() => {
    recalc()
  }, [recalc])

  const basePositionProps: React.CSSProperties = useMemo(
    () => ({
      width: width,
      height: height,
      top: y,
      left: x,
    }),
    [width, height, x, y]
  )

  const bgColorProps: React.CSSProperties = useMemo(() => {
    return {
      backgroundColor: 'hsl(200,100%,70%, 0.4)',
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed rounded-sm border border-blue-500 box-decoration-clone py-0.5',
        className
      )}
      style={{ ...basePositionProps, ...bgColorProps }}
    >
      <span className="absolute bottom-[-5px] right-[-5px] z-10 h-4 w-4 touch-none select-none rounded-full border-blue-500 bg-blue-500 content-[''] dark:border-blue-50 dark:bg-zinc-100">
        <span className="flex h-full w-full items-center justify-center">
          <Icon
            name="loader-circle"
            className="h-2.5 w-2.5 animate-spin text-zinc-50 dark:text-zinc-800"
          />
        </span>
      </span>
    </div>
  )
}
