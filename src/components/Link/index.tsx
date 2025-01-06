import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

type LinkVariant = 'primary' | 'secondary'
type LinkSize = 'lg' | 'md' | 'sm' | 'xs'

const linkVariants = cva(
  'hover:underline visited:hover:text-violet-400 visited:hover:text-violet-400 underline-offset-4',
  {
    variants: {
      variant: {
        primary: 'text-sky-500',
        secondary: 'text-white hover:decoration-slate-500',
      },
      size: {
        xs: 'typography-body-xs',
        sm: 'typography-body-sm',
        md: 'typography-body-md',
        lg: 'typography-body-lg',
      },
    },
  }
)

export interface LinkProps {
  to: string
  children: ReactNode
  variant?: LinkVariant
  size?: LinkSize
}

export function Link({
  to,
  children,
  variant = 'primary',
  size = 'md',
}: LinkProps) {
  return (
    <a href={to} className={cn(linkVariants({ variant, size }))}>
      {children}
    </a>
  )
}
