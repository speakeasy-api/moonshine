import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type HeadingVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps {
  children: ReactNode
  variant?: HeadingVariant
  as?: HeadingElement
  className?: string
}

const variantStyles: Record<HeadingVariant, string> = {
  xl: cn('typography-heading-xl text-heading-xl'),
  lg: cn('typography-heading-lg text-heading-lg'),
  md: cn('typography-heading-md text-heading-md'),
  sm: cn('typography-heading-sm text-heading-sm'),
  xs: cn('typography-heading-xs text-heading-xs'),
}

const variantToElement: Record<HeadingVariant, HeadingElement> = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h5',
}

export function Heading({
  children,
  variant = 'md',
  as: Component = variantToElement[variant],
  className,
}: HeadingProps) {
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  )
}
