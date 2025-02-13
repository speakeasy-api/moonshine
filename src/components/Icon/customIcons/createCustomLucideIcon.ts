import { cn, toKebabCase } from '@/lib/utils'
import { Icon, IconNode, LucideProps } from 'lucide-react'
import { createElement, forwardRef } from 'react'

const createCustomLucideIcon = (
  iconName: string,
  iconNode: IconNode,
  lucideProps?: Partial<LucideProps>
) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({ className, ...props }, ref) =>
      createElement(Icon, {
        ref,
        iconNode,
        className: cn(`lucide-${toKebabCase(iconName)}`, className),
        ...{ ...(lucideProps ?? {}), ...props },
      })
  )

  Component.displayName = `${iconName}`

  return Component
}

export default createCustomLucideIcon
