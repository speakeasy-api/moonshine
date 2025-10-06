import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { BadgeVariant } from '@/types'

const BadgeLeftIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex shrink-0 items-center justify-center',
      className
    )}
    {...props}
  />
))
BadgeLeftIcon.displayName = 'BadgeLeftIcon'

const BadgeRightIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex shrink-0 items-center justify-center',
      className
    )}
    {...props}
  />
))
BadgeRightIcon.displayName = 'BadgeRightIcon'

const BadgeIcon = BadgeLeftIcon

const BadgeText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('flex-1', className)} {...props} />
))
BadgeText.displayName = 'BadgeText'

const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap select-none font-mono uppercase tracking-[0.03em] rounded-xs border transition-colors h-5 px-1 py-1 text-[12px] leading-[12px] gap-1 [&_svg]:size-3',
  {
    variants: {
      variant: {
        neutral: 'text-default border-neutral-softest',
        destructive: 'text-default-destructive border-destructive-softest',
        information: 'text-default-information border-information-softest',
        success: 'text-default-success border-success-softest',
        warning: 'text-default-warning border-warning-softest',
      },
      background: {
        true: '',
        false: 'bg-transparent',
      },
    },
    compoundVariants: [
      {
        variant: 'neutral',
        background: true,
        className: 'bg-surface-secondary-default',
      },
      {
        variant: 'destructive',
        background: true,
        className: 'bg-destructive-softest',
      },
      {
        variant: 'information',
        background: true,
        className: 'bg-information-softest',
      },
      {
        variant: 'success',
        background: true,
        className: 'bg-success-softest',
      },
      {
        variant: 'warning',
        background: true,
        className: 'bg-warning-softest',
      },
    ],
    defaultVariants: {
      variant: 'neutral',
      background: true,
    },
  }
)

type Attributes = Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'>

export interface BadgeProps extends Attributes {
  asChild?: boolean
  variant?: BadgeVariant
  background?: boolean
  className?: string
  'aria-label'?: string
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      background = true,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    if (process.env.NODE_ENV === 'development' && !asChild) {
      const validateChildren = () => {
        if (!props.children) return

        const childArray = React.Children.toArray(props.children)
        const hasBadgeText = childArray.some(
          (child) =>
            (typeof child === 'string' && child.trim().length > 0) ||
            typeof child === 'number' ||
            (React.isValidElement(child) &&
              (child.type === BadgeText ||
                (child.type as { displayName?: string })?.displayName ===
                  'BadgeText'))
        )
        const hasAriaLabel = props['aria-label']

        if (!hasBadgeText && !hasAriaLabel) {
          console.warn(
            'Badge: Badges should either contain Badge.Text or have an aria-label for accessibility.'
          )
        }

        const invalidChildren = childArray.filter((child) => {
          if (typeof child === 'string' || typeof child === 'number') {
            return false // Raw text is OK - we'll auto-wrap it
          }
          if (React.isValidElement(child)) {
            const displayName = (child.type as { displayName?: string })
              ?.displayName
            return ![
              'BadgeText',
              'BadgeLeftIcon',
              'BadgeRightIcon',
              'BadgeIcon',
            ].includes(displayName || '')
          }
          return true // Other types are invalid
        })

        if (invalidChildren.length > 0) {
          console.warn(
            'Badge: Only Badge.Text, Badge.LeftIcon, Badge.RightIcon, and raw text should be used as children.'
          )
        }
      }

      validateChildren()
    }

    if (process.env.NODE_ENV === 'development') {
      const deprecatedVariants = {
        default: 'neutral',
        secondary: 'neutral',
        tertiary: 'neutral',
        danger: 'destructive',
        outline: 'neutral',
      }

      if (variant && variant in deprecatedVariants) {
        console.warn(
          `Badge: The variant "${variant}" is deprecated. Please use "${deprecatedVariants[variant as keyof typeof deprecatedVariants]}" instead.`
        )
      }
    }

    const Comp = asChild ? Slot : 'span'

    // Auto-wrap raw text children in Badge.Text (only when not using asChild)
    const processedChildren = React.useMemo(() => {
      if (asChild) {
        // When asChild is true, return children as-is for Slot to handle
        return props.children
      }

      return React.Children.map(props.children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return <BadgeText>{child}</BadgeText>
        }
        return child
      })
    }, [props.children, asChild])

    return (
      <Comp
        className={cn(badgeVariants({ variant, background }), className)}
        ref={ref}
        {...props}
      >
        {processedChildren}
      </Comp>
    )
  }
)
Badge.displayName = 'Badge'

const BadgeWithCompounds = Object.assign(Badge, {
  Icon: BadgeIcon,
  LeftIcon: BadgeLeftIcon,
  RightIcon: BadgeRightIcon,
  Text: BadgeText,
})

export {
  BadgeWithCompounds as Badge,
  BadgeIcon,
  BadgeLeftIcon,
  BadgeRightIcon,
  BadgeText,
}
