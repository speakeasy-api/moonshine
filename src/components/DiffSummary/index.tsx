import { cn } from '@/lib/utils'

interface DiffSummaryProps {
  addedLines: number
  removedLines: number
  squareCount?: number
  squareClassName?: string
  showLabel?: boolean
}

export default function DiffSummary({
  addedLines,
  removedLines,
  squareCount = 5,
  squareClassName,
  showLabel = true,
}: DiffSummaryProps) {
  const totalLines = addedLines + removedLines
  const filledAddedSquares =
    totalLines > 0 ? Math.round((addedLines / totalLines) * squareCount) : 0
  const filledRemovedSquares =
    totalLines > 0 ? Math.round((removedLines / totalLines) * squareCount) : 0

  // Ensure the total does not exceed squareCount
  let greenCount = filledAddedSquares
  let redCount = filledRemovedSquares
  if (greenCount + redCount > squareCount) {
    const overflow = greenCount + redCount - squareCount
    if (greenCount > redCount) {
      greenCount -= overflow
    } else {
      redCount -= overflow
    }
  }

  const baseSquareClasses = cn('w-3.5 h-3.5 rounded-sm', squareClassName)

  const squares = Array.from({ length: squareCount }, (_, index) => {
    if (index < greenCount) {
      return (
        <div
          key={index}
          className={cn(
            baseSquareClasses,
            'bg-emerald-500 dark:bg-emerald-400'
          )}
        />
      )
    } else if (index < greenCount + redCount) {
      return (
        <div
          key={index}
          className={cn(baseSquareClasses, 'bg-rose-500 dark:bg-rose-400')}
        />
      )
    } else {
      return (
        <div
          key={index}
          className={cn(baseSquareClasses, 'bg-gray-200 dark:bg-gray-200')}
        />
      )
    }
  })

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && (
        <span className="flex flex-row gap-1.5 text-sm font-semibold">
          <span className="text-emerald-500 dark:text-emerald-400">
            +{addedLines}
          </span>
          <span className="text-rose-500 dark:text-rose-400">
            -{removedLines}
          </span>
        </span>
      )}
      <div className="flex items-center gap-0.5">{squares}</div>
    </div>
  )
}
