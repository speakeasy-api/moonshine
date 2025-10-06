import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Modifier, Variant } from './types'
import { Icon } from '@/components/Icon'
import { iconNames } from '../Icon/names'
import { cn } from '@/lib/utils'

const alertVariants = cva<{
  variant: {
    [k in Variant]: string
  }
  modifiers: {
    [k in Modifier]: string
  }
}>(
  cn(
    'relative flex flex-row items-center gap-3 p-4 w-full border rounded-xs text-sm tracking-[0.03em] subpixel-antialiased'
  ),
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border-neutral-softest',
        success:
          'bg-success-softest text-default-success border-success-softest',
        error:
          'bg-destructive-softest text-default-destructive border-destructive-softest',
        warning:
          'bg-warning-softest text-default-warning border-warning-softest',
        info: 'bg-information-softest text-default-information border-information-softest',
        brand:
          'bg-transparent text-card-foreground border-transparent before:absolute before:content-[""] before:-z-10 before:pointer-events-none before:bg-[conic-gradient(from_220deg,hsl(334,54%,13%),hsl(4,67%,47%),hsl(23,96%,62%),hsl(68,52%,72%),hsl(108,24%,41%),hsl(154,100%,7%),hsl(220,100%,12%),hsl(214,69%,50%),hsl(216,100%,80%),hsl(334,54%,13%))] after:absolute after:content-[""] after:bg-card after:inset-[0px] after:-z-[5]',
      },
      modifiers: {
        inline: 'inline-flex',
      },
    },
    compoundVariants: [
      {
        variant: 'brand',
        className:
          'before:inset-[-1px] before:rounded-[calc(theme(borderRadius.xs))] after:rounded-[calc(theme(borderRadius.xs))]',
      },
    ],
  }
)

// Alert subcomponents
const AlertIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    name?: (typeof iconNames)[number]
    size?: 'small' | 'medium' | 'large'
  }
>(({ className, name, size = 'medium', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-2 size-6 flex-shrink-0 self-start', className)}
    {...props}
  >
    {name && <Icon name={name} size={size} strokeWidth={1.75} />}
  </div>
))
AlertIcon.displayName = 'Alert.Icon'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn('text-heading-xs', className)} {...props} />
))
AlertTitle.displayName = 'Alert.Title'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-body-md', className)} {...props} />
))
AlertDescription.displayName = 'Alert.Description'

const AlertFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-2 flex items-center gap-2', className)}
    {...props}
  />
))
AlertFooter.displayName = 'Alert.Footer'

const AlertDismiss = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onDismiss?: () => void
  }
>(({ className, onDismiss, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'hover:bg-accent/10 flex-shrink-0 self-start p-1 transition-colors hover:rounded-sm',
      className
    )}
    onClick={onDismiss}
    {...props}
  >
    <Icon name="x" size="small" />
  </button>
))
AlertDismiss.displayName = 'Alert.Dismiss'

export type AlertProps = {
  variant?: NonNullable<VariantProps<typeof alertVariants>['variant']>
  children: React.ReactNode
  inline?: boolean
  useContainer?: boolean
  className?: string
}

const BaseAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { variant = 'default', children, inline = false, className, ...props },
    ref
  ) => {
    const childArray = React.Children.toArray(children)

    const iconChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === AlertIcon ||
          (child.type as { displayName?: string })?.displayName ===
            'Alert.Icon')
    )

    const dismissChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === AlertDismiss ||
          (child.type as { displayName?: string })?.displayName ===
            'Alert.Dismiss')
    )

    const titleChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === AlertTitle ||
          (child.type as { displayName?: string })?.displayName ===
            'Alert.Title')
    )

    const descriptionChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === AlertDescription ||
          (child.type as { displayName?: string })?.displayName ===
            'Alert.Description')
    )

    const footerChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === AlertFooter ||
          (child.type as { displayName?: string })?.displayName ===
            'Alert.Footer')
    )

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex flex-row items-center gap-3',
          alertVariants({ variant, modifiers: inline ? 'inline' : undefined }),
          className
        )}
        {...props}
      >
        {iconChild}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-col">
            {titleChild}
            {descriptionChild}
          </div>
          {footerChild}
        </div>
        {dismissChild}
      </div>
    )
  }
)

// Create compound component
export const Alert = Object.assign(BaseAlert, {
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
  Footer: AlertFooter,
  Dismiss: AlertDismiss,
})
