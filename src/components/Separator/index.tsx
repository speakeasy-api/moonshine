import { cn } from '@/lib/utils'
import { Orientation } from '@/types'

interface SeparatorProps {
  orientation?: Orientation
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'h-[1px] w-full bg-border'
          : 'h-full w-[1px] bg-border'
      )}
    />
  )
}
