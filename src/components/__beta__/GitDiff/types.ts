export type ChangeType = 'add' | 'remove'
export type ChangeTypeColor = 'green' | 'red' | 'yellow'

export interface SingleLineChange {
  line: number
  type: ChangeType
  content?: string
}

export interface MultiLineChange {
  fromLine: number
  toLine: number
  type: ChangeType
  content?: string
}

export interface InlineChange {
  line: number
  columnStart: number
  columnEnd: number
  type: ChangeType
  content?: string
}

export function isMultiLineChange(
  change: SingleLineChange | MultiLineChange | InlineChange
): change is MultiLineChange {
  return 'fromLine' in change
}

export function isSingleLineChange(
  change: SingleLineChange | MultiLineChange | InlineChange
): change is SingleLineChange {
  return 'line' in change
}

export function isInlineChange(
  change: SingleLineChange | MultiLineChange | InlineChange
): change is InlineChange {
  return 'columnStart' in change
}
