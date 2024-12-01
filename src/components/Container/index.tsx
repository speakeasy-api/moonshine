import { paddingMapper } from '@/lib/responsiveMappers'
import { cn, getResponsiveClasses } from '@/lib/utils'
import { Padding, ResponsiveValue } from '@/types'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  flex?: boolean
  padding?: ResponsiveValue<Padding>
}

export function Container({ children, flex = false, padding }: ContainerProps) {
  return (
    <div
      className={cn(
        'container h-full w-full md:mx-auto',
        flex && 'flex',
        padding && getResponsiveClasses(padding, paddingMapper)
      )}
    >
      {children}
    </div>
  )
}
