import { cn, getResponsiveClasses } from '@/lib/utils'
import { Columns, Gap, ResponsiveValue } from '@/types'

interface GridProps {
  columns?: ResponsiveValue<Columns>
  gap?: ResponsiveValue<Gap>
  children: React.ReactNode
}

const columnsMapper = (columns: Columns) => `grid-cols-${columns}`
const gapMapper = (gap: Gap) => `gap-${gap}`

export default function Grid({ children, columns = 1, gap = 0 }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        getResponsiveClasses(columns, columnsMapper),
        getResponsiveClasses(gap, gapMapper)
      )}
    >
      {children}
    </div>
  )
}
