import { cn } from '#lib/utils'
import { cva } from 'class-variance-authority'

type BadgeVariants =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'

type BadgeSizes = 'sm' | 'md' | 'lg'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  as?: React.ElementType
  variant?: BadgeVariants
  size?: BadgeSizes
}

type BadgeVariantsCva = {
  variant: {
    [key in BadgeVariants]: string
  }
  size: {
    [key in BadgeSizes]: string
  }
}

const badgeVariants = cva<BadgeVariantsCva>(
  'inline-flex text-xs rounded-full px-3 py-1',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        success: 'bg-green-600 text-green-100',
        warning: 'bg-yellow-600 text-yellow-100',
        danger: 'bg-red-600 text-red-100',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
  }
)

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  as = 'span',
  className,
}: BadgeProps) {
  const variantClass = badgeVariants({ variant, size })
  const Comp = as
  return <Comp className={cn(variantClass, className)}>{children}</Comp>
}
