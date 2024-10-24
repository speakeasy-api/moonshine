import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps {
  children: ReactNode
  level?: Level
}

const headingMap = new Map<Level, string>([
  [1, 'text-5xl'],
  [2, 'text-4xl'],
  [3, 'text-3xl'],
  [4, 'text-2xl'],
  [5, 'text-xl'],
  [6, 'text-lg'],
])

export default function Heading({ children, level = 1 }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const className = cn('font-semibold', headingMap.get(level))

  return <Tag className={className}>{children}</Tag>
}
