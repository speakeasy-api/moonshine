import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type TextVariant = 'lg' | 'md' | 'sm' | 'xs'
type TextElement = 'p' | 'span' | 'div' | 'label'
type TextWhitespace = 'normal' | 'nowrap'

export interface TextProps {
  children: ReactNode
  variant?: TextVariant
  as?: TextElement
  muted?: boolean
  whiteSpace?: TextWhitespace
}

const variantStyles: Record<TextVariant, string> = {
  lg: 'text-body-lg',
  md: 'text-body-md',
  sm: 'text-body-sm',
  xs: 'text-body-xs',
}

const whitespaceStyles: Record<TextWhitespace, string> = {
  normal: 'whitespace-normal',
  nowrap: 'whitespace-nowrap',
}

export function Text({
  children,
  variant = 'md',
  as: Component = 'span',
  muted = false,
  whiteSpace = 'normal',
}: TextProps) {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        // TODO: update this to use one of our own variables
        muted && 'text-muted-foreground',
        whiteSpace && whitespaceStyles[whiteSpace]
      )}
    >
      {children}
    </Component>
  )
}
