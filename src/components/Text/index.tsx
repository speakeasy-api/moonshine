import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export type TextVariant = 'lg' | 'md' | 'sm' | 'xs'
type TextElement = 'p' | 'span' | 'div' | 'label'
type TextWhitespace = 'normal' | 'nowrap'

export interface TextProps {
  children: ReactNode
  variant?: TextVariant
  as?: TextElement
  muted?: boolean
  whiteSpace?: TextWhitespace
  className?: string
}

const variantStyles: Record<TextVariant, string> = {
  lg: 'typography-body-lg',
  md: 'typography-body-md',
  sm: 'typography-body-sm',
  xs: 'typography-body-xs',
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
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        whitespaceStyles[whiteSpace],
        muted ? 'text-muted' : 'text-body',
        className
      )}
    >
      {children}
    </Component>
  )
}
