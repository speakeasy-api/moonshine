import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  flex?: boolean
}

export function Container({ children, flex = false }: ContainerProps) {
  return (
    <div
      className={cn('h-full w-full md:container md:mx-auto', flex && 'flex')}
    >
      {children}
    </div>
  )
}
