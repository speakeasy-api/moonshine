import { lazy, Suspense, useMemo } from 'react'
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
  /**
   * The name of the icon to render
   * For a full list of available icons, see [Lucide Icons](https://lucide.dev/icons/)
   */
  name: keyof typeof dynamicIconImports

  /**
   * Provide different icon sizes for different breakpoints
   */
  size?: ResponsiveValue<Size>
}

const defaultSize = 'small'

export function Icon({ name, size = defaultSize, ...props }: IconProps) {
  const LucideIcon = useMemo(() => lazy(dynamicIconImports[name]), [name])
  const breakpoint = useTailwindBreakpoint()
  const resolvedSize = isResponsiveValueObject<Size>(size)
    ? size[breakpoint]
    : isSize(size)
      ? size
      : defaultSize
  const sizeNumber = sizeMap[resolvedSize]

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} size={sizeNumber} />
    </Suspense>
  )
}
