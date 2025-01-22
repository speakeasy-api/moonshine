import { assertNever } from '@/lib/assert'
import { ChangeType } from './types'

export function getChangeTypeColor(type: ChangeType): string {
  switch (type) {
    case 'add':
      return '#3fb950'
    case 'remove':
      return '#f85149'
    default:
      assertNever(type)
  }
}

export function getChangeTypeGutterColor(type: ChangeType): string {
  switch (type) {
    case 'add':
      return '#23863E'
    case 'remove':
      return '#da3633'
    default:
      assertNever(type)
  }
}
