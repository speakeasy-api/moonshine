import { cn } from '@/lib/utils'
import { motion, MotionProps } from 'framer-motion'
import React from 'react'
import styles from './index.module.css'

export interface SegmentedButtonProps {
  children: React.ReactNode
  className?: string
}

const SegmentedButtonBase = ({ children, className }: SegmentedButtonProps) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<SegmentedButtonItemProps>(child)) return child
    const childId: string | undefined = child.props.id

    const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      setHoveredId(childId ?? null)
      child.props.onMouseEnter?.(e)
    }

    const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (
      e
    ) => {
      setHoveredId((current) => (current === childId ? null : current))
      child.props.onMouseLeave?.(e)
    }

    const highlighted = hoveredId ? childId === hoveredId : child.props.active

    return React.cloneElement(
      child as React.ReactElement<SegmentedButtonItemProps>,
      {
        highlighted,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    )
  })

  return (
    <div
      className={cn(
        'border-neutral-softest relative inline-flex flex-row items-center overflow-hidden rounded-full border shadow-xs backdrop-blur-md',
        className
      )}
      onMouseLeave={() => setHoveredId(null)}
    >
      {enhancedChildren}
    </div>
  )
}

SegmentedButtonBase.displayName = 'SegmentedButton'

export interface SegmentedButtonItemProps extends MotionProps {
  children: React.ReactNode
  className?: string
  active?: boolean
  highlighted?: boolean
  id: string
  onClick?: () => void
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
}

const SegmentedButtonItem = ({
  children,
  className,
  highlighted,
  ...props
}: SegmentedButtonItemProps) => {
  return (
    <motion.button
      className="text-codeline-xs relative flex items-center rounded-full px-5 py-1 uppercase"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      {...props}
    >
      {highlighted && (
        <motion.span
          layoutId="segmented-highlight"
          className={cn(
            'absolute inset-0 -z-10 rounded-full shadow-sm',
            styles.active
          )}
          transition={{ type: 'easeInOut', stiffness: 300, damping: 40 }}
        />
      )}
      <span
        className={cn(
          'text-muted relative z-10',
          highlighted && 'text-highlight',
          className
        )}
      >
        {children}
      </span>
    </motion.button>
  )
}

SegmentedButtonItem.displayName = 'SegmentedButtonItem'

export const SegmentedButton = Object.assign(SegmentedButtonBase, {
  Item: SegmentedButtonItem,
})
