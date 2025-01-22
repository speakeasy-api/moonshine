import { cn } from '@/lib/utils'
import { ProgrammingLanguage } from '@/types'
import {
  highlight,
  Pre,
  HighlightedCode,
  RawCode,
  BlockAnnotation,
  InlineAnnotation,
} from 'codehike/code'
import { useEffect, useState } from 'react'
import { diff, handlerName, mark } from './annotations'
import {
  InlineChange,
  isInlineChange,
  isMultiLineChange,
  isSingleLineChange,
  SingleLineChange,
} from './types'
import { MultiLineChange } from './types'
import { Icon } from '@/components/Icon'

interface GitDiffProps {
  className?: string
  sourceLines: string[]
  changes: (SingleLineChange | MultiLineChange | InlineChange)[]
  language: ProgrammingLanguage
  filePath: string
}

export function GitDiff({
  className,
  sourceLines,
  changes,
  language,
  filePath,
}: GitDiffProps) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  useEffect(() => {
    async function highlightCode() {
      const rawCode: RawCode = {
        value: sourceLines.join('\n'),
        lang: language as string,
        meta: '',
      }
      const value = await highlight(rawCode, 'github-dark', {})

      changes.forEach((change) => {
        if (isSingleLineChange(change)) {
          const line = change.line - 1
          const type = change.type
          const annotation: BlockAnnotation = {
            toLineNumber: line,
            fromLineNumber: line,
            name: handlerName,
            query: type,
            data: {
              changeType: type,
              content: change.content,
            },
          }
          value.annotations.push(annotation)
        }

        if (isMultiLineChange(change)) {
          const fromLine = change.fromLine - 1
          const toLine = change.toLine - 1
          const type = change.type
          const annotation: BlockAnnotation = {
            fromLineNumber: fromLine,
            toLineNumber: toLine,
            name: handlerName,
            query: type,
            data: {
              changeType: type,
              content: change.content,
            },
          }
          value.annotations.push(annotation)
        }
        if (isInlineChange(change)) {
          const line = change.line - 1
          const type = change.type
          const annotation: InlineAnnotation = {
            lineNumber: line,
            name: handlerName,
            query: type,
            fromColumn: change.columnStart,
            toColumn: change.columnEnd,
            data: {
              changeType: type,
              content: change.content,
            },
          }
          value.annotations.push(annotation)
        }
      })

      setHighlighted(value)
    }
    highlightCode()
  }, [sourceLines, language])

  if (!highlighted) return null

  return (
    <div className={cn('bg-card w-full rounded-lg border', className)}>
      <div
        className={cn(
          'bg-card flex flex-row justify-between gap-1.5 px-3 py-2',
          isExpanded && 'border-b'
        )}
      >
        <div
          className="text-muted hover:text-foreground cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon
            name={isExpanded ? 'chevron-down' : 'chevron-right'}
            className="h-4 w-4"
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <LineCount {...lineCounts(sourceLines, changes)} />
          <div className="text-muted font-mono text-xs font-medium">
            {filePath}
          </div>
          <div className="hover:text-foreground text-muted cursor-pointer">
            <Icon name="copy" className="h-3 w-3" />
          </div>
        </div>
      </div>
      {isExpanded && (
        <Pre
          code={highlighted}
          className="bg-background w-full text-sm"
          handlers={[mark, diff]}
        />
      )}
    </div>
  )
}

interface LineCounts {
  totalLines: number
  addedLines: number
  removedLines: number
}

function lineCounts(
  srcLines: string[],
  changes: (SingleLineChange | MultiLineChange | InlineChange)[]
): LineCounts {
  const totalLines = srcLines.length
  const addedLines = changes.filter((change) => change.type === 'add')
  const removedLines = changes.filter((change) => change.type === 'remove')

  const reducer = (
    acc: number,
    change: SingleLineChange | MultiLineChange | InlineChange
  ) => {
    if (isSingleLineChange(change)) {
      return acc + 1
    }
    if (isMultiLineChange(change)) {
      // inclusive of the last line
      return acc + change.toLine - change.fromLine + 1
    }
    return acc
  }

  return {
    totalLines,
    addedLines: addedLines.reduce(reducer, 0),
    removedLines: removedLines.reduce(reducer, 0),
  }
}

function LineCount({ totalLines, addedLines, removedLines }: LineCounts) {
  const totalSquares = 5
  const addedRatio = addedLines / totalLines
  const removedRatio = removedLines / totalLines
  const addedRange = [0, Math.floor(addedRatio * totalSquares)]
  const removedRange = [addedRange[1], Math.floor(removedRatio * totalSquares)]
  console.log('addedRange: ', addedRange)
  console.log('removedRange: ', removedRange)
  return (
    <div className="flex select-none flex-row items-center gap-2 text-xs">
      <div className="text-muted flex flex-row items-center gap-1 font-mono">
        <div className="text-muted font-mono font-semibold text-green-600">
          +{addedLines}
        </div>
        <div className="text-muted font-mono font-semibold text-red-400">
          -{removedLines}
        </div>
      </div>
      <span className="flex flex-row" style={{ gap: '1.5px' }}>
        {Array.from({ length: totalSquares }).map((_, index) => {
          let color = 'bg-zinc-200 dark:bg-zinc-800' // Default color for unfilled squares
          if (index < addedRange[1] - 1) {
            color = 'bg-green-600' // Green for added
          } else if (index >= addedRange[1] && index < removedRange[1] - 1) {
            color = 'bg-red-400' // Red for removed
          }
          return (
            <div
              key={index}
              className={`rounded-xs box-content h-2 w-2 ${color}`}
            />
          )
        })}
      </span>
    </div>
  )
}
