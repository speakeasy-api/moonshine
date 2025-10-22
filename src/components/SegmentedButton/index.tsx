import { cn } from '@/lib/utils'
import { motion, MotionProps } from 'motion/react'
import React, { useMemo } from 'react'
import styles from './index.module.css'

export interface SegmentedButtonProps {
  children: React.ReactNode
  className?: string
}

const SegmentedButtonBase = ({ children, className }: SegmentedButtonProps) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  const enhancedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement<SegmentedButtonItemProps>(child)) return child
        const childId: string | undefined = child.props.id

        const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
          setHoveredId(childId ?? null)
          child.props.onClick?.(e)
        }

        const highlighted = hoveredId
          ? childId === hoveredId
          : child.props.active

        return React.cloneElement(
          child as React.ReactElement<SegmentedButtonItemProps>,
          {
            highlighted,
            onClick,
          }
        )
      }),
    [children]
  )

  return (
    <div
      className={cn(
        'border-neutral-softest relative inline-flex flex-row items-center overflow-hidden rounded-full border shadow-xs backdrop-blur-md',
        className
      )}
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SegmentedButtonItem = ({
  children,
  className,
  highlighted,
  ...props
}: SegmentedButtonItemProps) => {
  return (
    <motion.button
      className="text-codeline-xs hover:text-highlight relative flex items-center rounded-full px-5 py-1 uppercase"
      {...props}
    >
      {highlighted && (
        <motion.span
          layoutId="segmented-highlight"
          className={cn(
            'absolute inset-0 -z-10 rounded-full shadow-sm',
            styles.active
          )}
          transition={{ type: 'spring', duration: 0.7, bounce: 0.3 }}
        />
      )}
      <span
        className={cn(
          'relative z-10',
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
