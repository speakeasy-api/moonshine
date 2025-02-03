import { cn } from '@/lib/utils'

interface SkeletonProps {
  children: React.ReactNode
  className?: string
}

export function Skeleton({ children, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-muted flex h-auto max-h-5 w-fit animate-pulse gap-2 rounded-md',
        className
      )}
    >
      <div className="invisible">{children}</div>
    </div>
  )
}
