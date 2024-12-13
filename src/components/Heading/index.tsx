import { ReactNode } from 'react'

type HeadingVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps {
  children: ReactNode
  variant?: HeadingVariant
  as?: HeadingElement
}

const variantStyles: Record<HeadingVariant, string> = {
  xl: 'text-heading-lg md:text-heading-xl',
  lg: 'text-heading-md md:text-heading-lg',
  md: 'text-heading-sm md:text-heading-md',
  sm: 'text-heading-xs md:text-heading-sm',
  xs: 'text-heading-xxs md:text-heading-xs',
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
}: HeadingProps) {
  return <Component className={variantStyles[variant]}>{children}</Component>
}
