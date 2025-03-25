import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export type TextVariant = 'lg' | 'md' | 'sm' | 'xs'
type TextElement = 'p' | 'span' | 'div' | 'label'
type TextWhitespace = 'normal' | 'nowrap'

export type TextProps = {
  children: ReactNode
  variant?: TextVariant
  muted?: boolean
  whiteSpace?: TextWhitespace
  className?: string
} & (
  | {
      as?: Exclude<TextElement, 'label'>
      htmlFor?: never
    }
  | {
      as: 'label'
      htmlFor?: string
    }
)

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
  htmlFor,
}: TextProps) {
  return (
    <Component
      htmlFor={htmlFor}
      className={cn(
        variantStyles[variant],
        whitespaceStyles[whiteSpace],
        muted ? 'text-body-muted' : 'text-body',
        className
      )}
    >
      {children}
    </Component>
  )
}
