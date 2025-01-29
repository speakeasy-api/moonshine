import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

interface HighlightedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  color?: Color
  muted?: boolean
  animate?: boolean

  animationDuration?: number

  /**
   * Whether the animation should trigger when the element is in view or immediately.
   */
  animationTrigger?: 'inView' | 'instant'

  className?: string
}

export function HighlightedText({
  children,
  color = 'green',
  muted = false,
  animate = true,
  className,
  animationTrigger = 'inView',
  animationDuration = 1,
}: HighlightedTextProps) {
  const chars = useMemo(() => children.split(''), [children])
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: animationTrigger === 'inView' })
  useEffect(() => {
    if (!animate) {
      setHighlightedIndex(chars.length)
      return
    }
    if (isInView || animationTrigger === 'instant') {
      setInterval(() => {
        if (highlightedIndex < chars.length) {
          setHighlightedIndex((prev) => prev + 1)
        }
      }, animationDuration)
    }
  }, [animate, isInView, animationTrigger, chars])

  const highlightedChars = useMemo(
    () =>
      chars.slice(0, highlightedIndex).map((char, index) => (
        <motion.span
          key={index}
          className={cn(
            'py-0.5 leading-7 first:pl-0.5',
            index === chars.length - 1 && 'pr-0.5'
          )}
          initial={{
            background: animate
              ? 'transparent'
              : muted
                ? mutedBgMap[color]
                : highlightBgMap[color],
            color: animate
              ? 'inherit'
              : muted
                ? mutedFgMap[color]
                : highlightFgMap[color],
          }}
          animate={
            animate
              ? {
                  background: muted ? mutedBgMap[color] : highlightBgMap[color],
                  color: muted ? mutedFgMap[color] : highlightFgMap[color],
                }
              : {}
          }
          transition={{
            background: { duration: animationDuration },
            color: { duration: animationDuration },
          }}
        >
          {char}
        </motion.span>
      )),
    [chars, highlightedIndex, animate, animationTrigger, isInView, muted, color]
  )

  return (
    <div ref={ref} className={cn('relative inline', className)}>
      {highlightedChars}

      {chars.slice(highlightedIndex).length > 0 && (
        <span className="border border-transparent box-decoration-clone">
          {chars.slice(highlightedIndex).map((char, index) => (
            <span key={index} className="py-0.5 leading-7">
              {char}
            </span>
          ))}
        </span>
      )}
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const highlightColors = [
  'green',
  'blue',
  'purple',
  'orange',
  'emerald',
] as const
export type Color = (typeof highlightColors)[number]

// TODO: replace these colors with new ones, and improve api for selecting/retrieving colors for consumers

// eslint-disable-next-line react-refresh/only-export-components
export const highlightBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,75%)',
  blue: 'hsl(200,100%,70%)',
  purple: 'hsl(300,100%,72%)',
  orange: 'hsl(400,100%,65%)',
  emerald: 'hsl(150, 100%, 65%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const mutedBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,90%)',
  blue: 'hsl(200,100%,90%)',
  purple: 'hsl(300,100%,90%)',
  orange: 'hsl(400,100%,90%)',
  emerald: 'hsl(150, 100%, 90%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const mutedFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 10%)',
  blue: 'hsl(0, 0%, 10%)',
  purple: 'hsl(0, 0%, 10%)',
  orange: 'hsl(0, 0%, 10%)',
  emerald: 'hsl(0, 0%, 10%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const highlightFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 20%)',
  blue: 'hsl(0, 0%, 20%)',
  purple: 'hsl(0, 0%, 100%)',
  orange: 'hsl(0, 0%, 20%)',
  emerald: 'hsl(0, 0%, 20%)',
}
