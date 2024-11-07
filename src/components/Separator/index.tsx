import { cn } from '@/lib/utils'
import { Orientation, Size } from '@/types'

interface SeparatorProps {
  orientation?: Orientation
  yMargin?: Size
}

export function Separator({
  orientation = 'horizontal',
  yMargin = 'medium',
}: SeparatorProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'bg-border h-[1px] w-full'
          : 'bg-border h-full w-[1px]',
        yMargin === 'small' && 'my-2',
        yMargin === 'medium' && 'my-3',
        yMargin === 'large' && 'my-4',
        yMargin === 'xl' && 'my-5',
        yMargin === '2xl' && 'my-6'
      )}
    />
  )
}
