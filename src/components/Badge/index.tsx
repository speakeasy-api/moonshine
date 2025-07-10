import { cn } from '@/lib/utils'
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

type BadgeSizes = 'xs' | 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
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
  'inline-flex text-xs select-none rounded-full px-3 py-1',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger: 'bg-destructive text-destructive-foreground',
      },
      size: {
        xs: 'text-[11px]',
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
