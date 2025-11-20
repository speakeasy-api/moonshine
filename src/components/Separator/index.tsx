import { cn } from '../../lib/utils'
import { Orientation } from '../../types'

export interface SeparatorProps {
  orientation?: Orientation
  className?: string
}

export function Separator({
  orientation = 'horizontal',
  className,
}: SeparatorProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'bg-border h-[1px] w-full'
          : 'bg-border h-full w-[1px]',
        className
      )}
    />
  )
}
