import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ButtonSize, ButtonVariant, ButtonContext } from '@/types'

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t
}

const useAnimationFrame = (
  callback: (timestamp: number, delta: number) => void
) => {
  const requestRef = React.useRef<number>()
  const previousTimeRef = React.useRef<number>()

  const animate = React.useCallback(
    (timestamp: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = timestamp - previousTimeRef.current
        callback(timestamp, deltaTime)
      }
      previousTimeRef.current = timestamp
      requestRef.current = requestAnimationFrame(animate)
    },
    [callback]
  )

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}

const ButtonLeftIcon = React.forwardRef<
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
ButtonLeftIcon.displayName = 'ButtonLeftIcon'

const ButtonRightIcon = React.forwardRef<
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
ButtonRightIcon.displayName = 'ButtonRightIcon'

const ButtonIcon = ButtonLeftIcon

const ButtonText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('flex-1', className)} {...props} />
))
ButtonText.displayName = 'ButtonText'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-mono uppercase transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-[var(--color-base-white)] dark:focus-visible:ring-offset-[var(--color-base-black)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      context: {
        product: 'rounded-sm',
        marketing: 'rounded-full',
      },
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
          'bg-btn-primary text-btn-primary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.2)_inset] hover:bg-btn-primary-hover hover:text-btn-primary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.08)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.25)_inset] active:bg-btn-primary-active active:text-btn-primary-active active:shadow-none disabled:bg-btn-primary-disabled disabled:text-btn-primary-disabled disabled:opacity-100',
        /** @deprecated Use 'destructive-primary' instead */
        destructive:
          'bg-btn-destructive text-btn-destructive-primary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.1)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.2)_inset] hover:bg-btn-destructive-hover hover:text-btn-destructive-primary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.08)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.25)_inset] active:bg-btn-destructive-active active:text-btn-destructive-primary-active active:shadow-none disabled:bg-btn-destructive-disabled disabled:text-btn-destructive-primary-disabled disabled:opacity-100',
        /** @deprecated Use 'secondary' instead */
        outline:
          'bg-btn-secondary text-btn-secondary shadow-[0px_2px_1px_0px_rgba(255,255,255,0.25)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.1)_inset] hover:bg-btn-secondary-hover hover:text-btn-secondary-hover hover:shadow-[0px_2px_1px_0px_rgba(255,255,255,0.2)_inset,0px_-2px_1px_0px_rgba(0,0,0,0.15)_inset] active:bg-btn-secondary-active active:text-btn-secondary-active active:shadow-none disabled:bg-btn-secondary-disabled disabled:text-btn-secondary-disabled disabled:opacity-100',
        /** @deprecated Use 'tertiary' instead */
        ghost:
          'bg-transparent text-btn-tertiary hover:bg-btn-secondary-hover hover:text-btn-tertiary-hover active:bg-btn-secondary-active active:text-btn-tertiary-active disabled:text-btn-tertiary-disabled disabled:opacity-100',
        /** @deprecated Links should be semantic HTML, not buttons */
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 px-2 py-1 text-xs gap-1 [&_svg]:size-3',
        sm: 'h-8 px-3 py-2 text-sm gap-1.5 [&_svg]:size-3.5',
        md: 'h-9 px-4 py-2 gap-2 [&_svg]:size-4',
        lg: 'h-10 px-6 py-2 text-lg gap-2.5 [&_svg]:size-5',
      },
    },
    compoundVariants: [
      {
        variant: 'brand',
        className:
          'before:inset-[-1px] active:before:inset-[-2px] after:inset-[-1px] active:after:inset-[-2px]',
      },
      {
        context: 'product',
        variant: 'brand',
        className:
          'before:rounded-[calc(theme(borderRadius.sm)+1px)] active:before:rounded-[calc(theme(borderRadius.sm)+2px)] after:rounded-[calc(theme(borderRadius.sm)+1px)] active:after:rounded-[calc(theme(borderRadius.sm)+2px)]',
      },
      {
        context: 'marketing',
        variant: 'brand',
        className: 'before:rounded-full after:rounded-full',
      },
    ],
    defaultVariants: {
      context: 'product',
      variant: 'primary',
      size: 'md',
    },
  }
)

type Attributes = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'disabled'
  | 'onClick'
  | 'type'
  | 'children'
  | 'role'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseDown'
  | 'onMouseUp'
>

export interface ButtonProps extends Attributes {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  context?: ButtonContext
  className?: string
  'aria-label'?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      context = 'product',
      asChild = false,
      className,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement | null>(null)

    if (process.env.NODE_ENV === 'development') {
      const validateChildren = () => {
        if (!props.children) return

        const childArray = React.Children.toArray(props.children)
        const hasButtonText = childArray.some(
          (child) =>
            (typeof child === 'string' && child.trim().length > 0) ||
            typeof child === 'number' ||
            (React.isValidElement(child) &&
              (child.type === ButtonText ||
                (child.type as { displayName?: string })?.displayName ===
                  'ButtonText'))
        )
        const hasAriaLabel = props['aria-label']

        if (!hasButtonText && !hasAriaLabel) {
          console.warn(
            'Button: Buttons should either contain Button.Text or have an aria-label for accessibility. Consider using IconButton for icon-only buttons.'
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
              'ButtonText',
              'ButtonLeftIcon',
              'ButtonRightIcon',
              'ButtonIcon',
            ].includes(displayName || '')
          }
          return true // Other types are invalid
        })

        if (invalidChildren.length > 0) {
          console.warn(
            'Button: Only Button.Text, Button.LeftIcon, Button.RightIcon, and raw text should be used as children.'
          )
        }
      }

      validateChildren()
    }

    const gradientRefs = React.useRef<{
      target: number
      current: number
    }>({
      target: 220,
      current: 220,
    })

    const isBrandVariant = variant === 'brand'

    useAnimationFrame(
      React.useCallback(
        (_timestamp: number, delta: number) => {
          if (!buttonRef.current || !isBrandVariant) return

          const gradientValues = gradientRefs.current

          if (Math.abs(gradientValues.target - gradientValues.current) < 0.01) {
            Object.assign(gradientValues, { current: gradientValues.target })
            return
          }

          const lerpValue = Math.min((delta / 1000) * 4, 1)

          const newCurrent = lerp(
            gradientValues.current,
            gradientValues.target,
            lerpValue
          )
          Object.assign(gradientValues, { current: newCurrent })

          buttonRef.current.style.setProperty(
            '--gradient-rotation',
            `${Math.round(newCurrent)}deg`
          )
        },
        [isBrandVariant]
      )
    )

    if (process.env.NODE_ENV === 'development') {
      const deprecatedVariants = {
        default: 'primary',
        destructive: 'destructive-primary',
        outline: 'secondary',
        ghost: 'tertiary',
        link: 'a semantic <a> tag',
      }

      if (variant && variant in deprecatedVariants) {
        console.warn(
          `Button: The variant "${variant}" is deprecated. Please use "${deprecatedVariants[variant as keyof typeof deprecatedVariants]}" instead.`
        )
      }
    }

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isBrandVariant) {
          gradientRefs.current.target = 320
        }
        onMouseEnter?.(e)
      },
      [isBrandVariant, onMouseEnter]
    )

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isBrandVariant) {
          gradientRefs.current.target = 220
          setIsPressed(false)
        }
        onMouseLeave?.(e)
      },
      [isBrandVariant, onMouseLeave]
    )

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(true)
        onMouseDown?.(e)
      },
      [onMouseDown]
    )

    const handleMouseUp = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false)
        onMouseUp?.(e)
      },
      [onMouseUp]
    )

    React.useEffect(() => {
      if (isBrandVariant && buttonRef.current) {
        buttonRef.current.style.setProperty('--gradient-rotation', '220deg')
        Object.assign(gradientRefs.current, { target: 220, current: 220 })
      }
    }, [isBrandVariant])

    const Comp = asChild ? Slot : 'button'
    const combinedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref && node) {
          ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node
        }
      },
      [ref]
    )

    // Auto-wrap raw text children in Button.Text
    const processedChildren = React.Children.map(props.children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return <ButtonText>{child}</ButtonText>
      }
      return child
    })

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, context }),
          isPressed && 'active:scale-[0.98] active:duration-75',
          className
        )}
        ref={combinedRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {processedChildren}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

const ButtonWithCompounds = Object.assign(Button, {
  Icon: ButtonIcon,
  LeftIcon: ButtonLeftIcon,
  RightIcon: ButtonRightIcon,
  Text: ButtonText,
})

export {
  ButtonWithCompounds as Button,
  ButtonIcon,
  ButtonLeftIcon,
  ButtonRightIcon,
  ButtonText,
}
