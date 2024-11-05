import { lazy, Suspense } from 'react'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { ResponsiveValue, Size } from '@/types'
import useTailwindBreakpoint from '@/hooks'
import { isResponsiveValueObject, isSize } from '@/lib/typeUtils'

// TODO: Use skeleton
function Skeleton() {
  return <div />
}

// Skeleton fallback
const fallback = <Skeleton />

type SvgProps = Pick<
  LucideProps,
  | 'stroke'
  | 'strokeWidth'
  | 'strokeOpacity'
  | 'size'
  | 'viewBox'
  | 'fill'
  | 'fillOpacity'
>

const sizeMap: Record<Size, number> = {
  small: 16,
  medium: 24,
  large: 32,
  xl: 48,
  '2xl': 64,
}

export interface IconProps extends Omit<SvgProps, 'size'> {
  name: keyof typeof dynamicIconImports
  size?: ResponsiveValue<Size>
}

const iconCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType<LucideProps>>
>()

function tryGetIcon(
  name: string
): React.LazyExoticComponent<React.ComponentType<LucideProps>> {
  if (iconCache.has(name)) {
    return iconCache.get(name) as React.LazyExoticComponent<
      React.ComponentType<LucideProps>
    >
  }

  const LucideIcon = lazy(
    dynamicIconImports[name as keyof typeof dynamicIconImports]
  )
  iconCache.set(name, LucideIcon)
  return LucideIcon
}

export function Icon({ name, size = 'small', ...props }: IconProps) {
  const LucideIcon = tryGetIcon(name)
  const breakpoint = useTailwindBreakpoint()
  const resolvedSize = isResponsiveValueObject<Size>(size)
    ? size[breakpoint]
    : isSize(size)
      ? size
      : 'small'
  const sizeNumber = sizeMap[resolvedSize]

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} size={sizeNumber} />
    </Suspense>
  )
}
