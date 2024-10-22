import { cn } from '@/lib/utils'
import { Range } from '@/lib/typeUtils'

interface GridProps {
  columns?: Columns
  gap?: Gap
  children: React.ReactNode
}

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const maxGridColumns = 12

type Columns = Exclude<Range<typeof maxGridColumns>, 0>

export default function Grid({ children, columns = 1, gap = 0 }: GridProps) {
  return (
    <div className={cn('grid', `grid-cols-${columns}`, `gap-${gap}`)}>
      {children}
    </div>
  )
}
