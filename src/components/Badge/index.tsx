import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

type BadgeVariants =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'

interface BadgeProps
  extends VariantProps<typeof badgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  as?: React.ElementType
  variant?: BadgeVariants
}

type BadgeVariantsCva = {
  variant: {
    [key in BadgeVariants]: string
  }
}

const badgeVariants = cva<BadgeVariantsCva>(
  'inline-flex text-xs rounded-full px-3 py-1',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        success: 'bg-green-600 text-green-100',
        warning: 'bg-yellow-600 text-yellow-100',
        danger: 'bg-red-600 text-red-100',
      },
    },
  }
)

export function Badge({
  children,
  variant = 'default',
  as = 'span',
}: BadgeProps) {
  const variantClass = badgeVariants({ variant })
  const Comp = as
  return <Comp className={cn(variantClass)}>{children}</Comp>
}
