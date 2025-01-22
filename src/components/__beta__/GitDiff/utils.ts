import { ChangeType } from './types'

export function getChangeTypeGutterSymbol(type: ChangeType): string {
  switch (type) {
    case 'add':
      return '+'
    case 'remove':
      return '-'
  }
}
