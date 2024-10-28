import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

interface BadgeProps
  extends VariantProps<typeof badgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const badgeVariants = cva('inline-flex text-xs rounded-full px-3 py-1', {
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
})

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClass = badgeVariants({ variant })

  return <div className={cn(variantClass)}>{children}</div>
}
