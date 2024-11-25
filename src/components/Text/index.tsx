import React from 'react'
import { cn } from '@/lib/utils'

type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'list' | 'span'
type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'list'
  | 'inlineCode'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'

type TextAlign = 'left' | 'center' | 'right'
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase'

interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  as?: TextAs
  truncate?: boolean | number
  align?: TextAlign
  transform?: TextTransform
  monospace?: boolean
  'aria-label'?: string
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl',
  h3: 'scroll-m-20 text-xl font-semibold tracking-tight sm:text-2xl',
  h4: 'scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl',
  p: 'text-base leading-7 [&:not(:first-child)]:mt-6',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  list: 'my-6 ml-6 list-disc [&>li]:mt-2',
  inlineCode:
    'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  lead: 'text-lg text-muted-foreground sm:text-xl',
  large: 'text-lg font-semibold',
  small: 'text-sm font-normal leading-none',
  muted: 'text-sm text-muted-foreground',
}

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const transformClasses: Record<TextTransform, string> = {
  none: '',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
}

export function Text({
  children,
  variant = 'p',
  as,
  truncate = false,
  align,
  transform = 'none',
  monospace = false,
  'aria-label': ariaLabel,
}: TextProps) {
  const Component = as || (variant as TextAs)

  const classes = cn(
    variantClasses[variant],
    align && alignClasses[align],
    transformClasses[transform],
    monospace && 'font-mono',
    typeof truncate === 'number'
      ? `line-clamp-${truncate}`
      : truncate
        ? 'truncate'
        : ''
  )
  return React.createElement(
    Component,
    { className: classes, 'aria-label': ariaLabel },
    children
  )
}
