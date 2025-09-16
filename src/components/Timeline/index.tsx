'use client'

import React, {
  useLayoutEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
  Children,
} from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Text } from '../Text'
import { Heading } from '../Heading'

const TIMELINE_STYLES = {
  line: 'bg-surface-tertiary-default',
  iconContainer:
    'relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full',
  iconBackground:
    'bg-surface-primary-default border-border-neutral-softest absolute inset-0 rounded-full border-2 transition-all duration-300',
  iconContent: 'relative z-10 flex h-full w-full items-center justify-center',
  iconIcon:
    'text-muted flex items-center justify-center transition-colors duration-300 [&>svg]:h-4 [&>svg]:w-4',
  iconNumber: 'text-muted text-sm font-medium transition-colors duration-300',
  transition: 'transition-opacity duration-300',
} as const

export interface TimelineItemProps {
  icon?: ReactNode
  children: ReactNode
  className?: string
  index?: number
  isLast?: boolean
}

function TimelineItem({
  icon,
  children,
  className,
  index = 0,
  isLast = false,
}: TimelineItemProps) {
  // Pass isLast prop to TimelineContent children
  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === TimelineContent) {
      return cloneElement(child, {
        ...child.props,
        isLast,
      })
    }
    return child
  })

  return (
    <div
      className={cn('relative flex items-start gap-4', className)}
      data-timeline-item
    >
      <div className={TIMELINE_STYLES.iconContainer}>
        <div className={TIMELINE_STYLES.iconBackground} />
        <div className={TIMELINE_STYLES.iconContent}>
          {icon ? (
            <div className={TIMELINE_STYLES.iconIcon}>{icon}</div>
          ) : (
            <div className={TIMELINE_STYLES.iconNumber}>{index + 1}</div>
          )}
        </div>
      </div>

      {enhancedChildren}
    </div>
  )
}

export interface TimelineContentProps {
  children: ReactNode
  className?: string
  isLast?: boolean
}

function TimelineContent({
  children,
  className,
  isLast,
}: TimelineContentProps) {
  // Extract title and timestamp from children to create header layout
  const childrenArray = Children.toArray(children)
  let titleElement: React.ReactNode = null
  let timestampElement: React.ReactNode = null
  const otherChildren: React.ReactNode[] = []

  childrenArray.forEach((child) => {
    if (isValidElement(child)) {
      if (child.type === TimelineTitle) {
        titleElement = child
      } else if (child.type === TimelineTimestamp) {
        timestampElement = child
      } else {
        otherChildren.push(child)
      }
    } else {
      otherChildren.push(child)
    }
  })

  return (
    <div
      className={cn('min-w-0 flex-1', !isLast && 'pb-6', className)}
      data-testid={isLast ? 'timeline-content-last' : 'timeline-content'}
    >
      {/* Header with title and timestamp */}
      {(titleElement || timestampElement) && (
        <div className="mb-1 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">{titleElement}</div>
          {timestampElement && (
            <div className="flex-shrink-0">{timestampElement}</div>
          )}
        </div>
      )}

      {/* Other content (description, etc.) */}
      {otherChildren.length > 0 && (
        <div className="space-y-1">{otherChildren}</div>
      )}
    </div>
  )
}

export interface TimelineTitleProps {
  children: ReactNode
  className?: string
}

function TimelineTitle({ children, className }: TimelineTitleProps) {
  return (
    <Heading
      variant="xs"
      as="h3"
      className={cn(TIMELINE_STYLES.transition, className)}
    >
      {children}
    </Heading>
  )
}

export interface TimelineDescriptionProps {
  children: ReactNode
  className?: string
}

function TimelineDescription({
  children,
  className,
}: TimelineDescriptionProps) {
  return (
    <Text
      variant="sm"
      muted
      className={cn('leading-relaxed', TIMELINE_STYLES.transition, className)}
    >
      {children}
    </Text>
  )
}

export interface TimelineTimestampProps {
  children: ReactNode
  className?: string
}

function TimelineTimestamp({ children, className }: TimelineTimestampProps) {
  return (
    <Text
      variant="xs"
      muted
      className={cn(TIMELINE_STYLES.transition, className)}
    >
      {children}
    </Text>
  )
}

export interface TimelineSeparatorProps {
  className?: string
}

function TimelineSeparator({ className }: TimelineSeparatorProps) {
  return (
    <div
      className={cn('bg-border-neutral-softest mx-6 h-px w-full', className)}
      data-testid="timeline-separator"
    />
  )
}

export interface TimelineRootProps {
  children: ReactNode
  className?: string
  hasMore?: boolean
}

function TimelineRoot({
  children,
  className,
  hasMore = false,
}: TimelineRootProps) {
  const childrenArray = Children.toArray(children)
  const itemCount = childrenArray.length
  const timelineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState<number | null>(null)

  const enhancedChildren = childrenArray.map((child, index) => {
    if (isValidElement(child) && child.type === TimelineItem) {
      return cloneElement(child, {
        ...child.props,
        index,
        isLast: index === itemCount - 1,
      })
    }
    return child
  })

  useLayoutEffect(() => {
    if (timelineRef.current && itemCount > 1) {
      const timelineItems = timelineRef.current.querySelectorAll(
        '[data-timeline-item]'
      )
      if (timelineItems.length >= 2) {
        const lastItem = timelineItems[timelineItems.length - 1] as HTMLElement

        // Calculate distance from center of first icon to center of last icon
        const firstIconCenter = 24 // 1.5rem (top-6) + 0.75rem (half of 3rem icon height)
        const lastItemTop = lastItem.offsetTop
        const baseHeight = lastItemTop + 24 - firstIconCenter // 24px = center of last icon

        // If hasMore is true, extend the line by an additional 2rem (32px) past the last icon
        const calculatedHeight = hasMore ? baseHeight + 32 : baseHeight

        setLineHeight(calculatedHeight)
      }
    }
  }, [itemCount, children, hasMore])

  return (
    <div className={cn('relative', className)}>
      {itemCount > 0 && (
        <div className="relative" ref={timelineRef}>
          {itemCount > 1 && (
            <div
              className={cn(TIMELINE_STYLES.line, 'absolute top-6 left-6 w-px')}
              style={{
                height: lineHeight
                  ? `${lineHeight}px`
                  : hasMore
                    ? `calc(100% - 2.5rem)`
                    : `calc(100% - 4.5rem)`,
              }}
            />
          )}
          <div className="space-y-6">{enhancedChildren}</div>
        </div>
      )}
    </div>
  )
}

const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
  Timestamp: TimelineTimestamp,
  Separator: TimelineSeparator,
})

export { Timeline }
