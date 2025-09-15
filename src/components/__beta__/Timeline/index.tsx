'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '../../Text'
import { Heading } from '../../Heading'

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

// Timeline context is no longer needed since we only support vertical layout

interface TimelineItemContextValue {
  index: number
  isLast: boolean
}

const TimelineItemContext =
  React.createContext<TimelineItemContextValue | null>(null)

const useTimelineItemContext = () => {
  const context = React.useContext(TimelineItemContext)
  if (!context) {
    throw new Error(
      'Timeline.Content and related components must be used within Timeline.Item'
    )
  }
  return context
}

interface TimelineItemProps {
  icon?: React.ReactNode
  children: React.ReactNode
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
  const itemContextValue: TimelineItemContextValue = {
    index,
    isLast,
  }

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <div className={cn('relative flex items-start gap-4', className)}>
        {/* Status indicator */}
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

        {children}
      </div>
    </TimelineItemContext.Provider>
  )
}

interface TimelineContentProps {
  children: React.ReactNode
  className?: string
}

function TimelineContent({ children, className }: TimelineContentProps) {
  const { isLast } = useTimelineItemContext()

  return (
    <div className={cn('min-w-0 flex-1', !isLast && 'pb-6', className)}>
      {children}
    </div>
  )
}

interface TimelineTitleProps {
  children: React.ReactNode
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

interface TimelineDescriptionProps {
  children: React.ReactNode
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

interface TimelineTimestampProps {
  children: React.ReactNode
  className?: string
}

function TimelineTimestamp({ children, className }: TimelineTimestampProps) {
  return (
    <Text
      variant="xs"
      muted
      className={cn(TIMELINE_STYLES.transition, 'text-right', className)}
    >
      {children}
    </Text>
  )
}

interface TimelineIconProps {
  children: React.ReactNode
  className?: string
}

function TimelineIcon({ children, className }: TimelineIconProps) {
  return (
    <div className={cn(TIMELINE_STYLES.iconIcon, className)}>{children}</div>
  )
}

interface TimelineSeparatorProps {
  className?: string
}

function TimelineSeparator({ className }: TimelineSeparatorProps) {
  return (
    <div
      className={cn('bg-border-neutral-softest mx-6 h-px w-full', className)}
    />
  )
}

interface TimelineRootProps {
  children: React.ReactNode
  className?: string
}

function TimelineRoot({ children, className }: TimelineRootProps) {
  const childrenArray = React.Children.toArray(children)
  const itemCount = childrenArray.length

  const enhancedChildren = childrenArray.map((child, index) => {
    if (React.isValidElement(child) && child.type === TimelineItem) {
      return React.cloneElement(child, {
        ...child.props,
        index,
        isLast: index === itemCount - 1,
      })
    }
    return child
  })

  return (
    <div className={cn('relative', className)}>
      {itemCount > 0 && (
        <div className="relative">
          {itemCount > 1 && (
            <div
              className={cn(TIMELINE_STYLES.line, 'absolute left-6 w-px')}
              style={{
                top: '1.5rem',
                bottom: '1.5rem',
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
  Icon: TimelineIcon,
  Separator: TimelineSeparator,
})

export { Timeline }

export {
  TimelineRoot,
  TimelineItem,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTimestamp,
  TimelineIcon,
  TimelineSeparator,
}
