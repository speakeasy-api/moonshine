import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ButtonSize, ButtonVariant } from '@/types'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-mono uppercase transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-[var(--color-base-white)] dark:focus-visible:ring-offset-[var(--color-base-black)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        brand:
          'relative bg-btn-brand hover:bg-btn-brand-hover text-btn-brand hover:text-btn-brand-hover disabled:bg-btn-brand-disabled disabled:text-btn-brand-disabled disabled:opacity-100 before:absolute before:content-[""] before:-z-10 before:pointer-events-none [--gradient-rotation:220deg] before:bg-[conic-gradient(from_var(--gradient-rotation),hsl(334,54%,13%),hsl(4,67%,47%),hsl(23,96%,62%),hsl(68,52%,72%),hsl(108,24%,41%),hsl(154,100%,7%),hsl(220,100%,12%),hsl(214,69%,50%),hsl(216,100%,80%),hsl(334,54%,13%))] after:absolute after:content-[""] after:-z-20 after:pointer-events-none after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:bg-[conic-gradient(from_var(--gradient-rotation),hsl(334,54%,13%),hsl(4,67%,47%),hsl(23,96%,62%),hsl(68,52%,72%),hsl(108,24%,41%),hsl(154,100%,7%),hsl(220,100%,12%),hsl(214,69%,50%),hsl(216,100%,80%),hsl(334,54%,13%))] after:blur-sm focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-[var(--color-base-white)] dark:focus-visible:ring-offset-[var(--color-base-black)]',
        primary:
          'bg-btn-primary text-btn-primary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.2)_inset] hover:bg-btn-primary-hover hover:text-btn-primary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.08)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.25)_inset] active:bg-btn-primary-active active:text-btn-primary-active active:shadow-none disabled:bg-btn-primary-disabled disabled:text-btn-primary-disabled disabled:opacity-100',
        secondary:
          'bg-btn-secondary text-btn-secondary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.25)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.1)_inset] hover:bg-btn-secondary-hover hover:text-btn-secondary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.2)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.15)_inset] active:bg-btn-secondary-active active:text-btn-secondary-active active:shadow-none disabled:bg-btn-secondary-disabled disabled:text-btn-secondary-disabled disabled:opacity-100',
        tertiary:
          'bg-transparent text-btn-tertiary hover:bg-btn-secondary-hover hover:text-btn-tertiary-hover active:bg-btn-secondary-active active:text-btn-tertiary-active disabled:text-btn-tertiary-disabled disabled:opacity-100',
        'destructive-primary':
          'bg-btn-destructive text-btn-destructive-primary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.2)_inset] hover:bg-btn-destructive-hover hover:text-btn-destructive-primary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.08)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.25)_inset] active:bg-btn-destructive-active active:text-btn-destructive-primary-active active:shadow-none disabled:bg-btn-destructive-disabled disabled:text-btn-destructive-primary-disabled disabled:opacity-100',
        'destructive-secondary':
          'bg-transparent text-btn-destructive-secondary hover:text-btn-destructive-secondary-hover active:text-btn-destructive-secondary-active disabled:text-btn-destructive-secondary-disabled disabled:opacity-100',

        /** @deprecated Use 'primary' instead */
        default:
          'bg-surface-primary-inverse text-default-inverse shadow-xs hover:bg-surface-tertiary-inverse',
        destructive:
          'bg-destructive-default text-destructive-foreground shadow-xs hover:bg-destructive-highlight',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-surface-tertiary-default text-secondary-foreground shadow-xs hover:bg-highlight',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type Attributes = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'onClick' | 'type' | 'children' | 'role'
>

export interface ButtonProps extends Attributes {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
