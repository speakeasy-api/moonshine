import { Text } from '../Text'
import { ReactNode } from 'react'

type Level = 1 | 2 | 3 | 4

export interface HeadingProps {
  children: ReactNode
  level: Level
}

export function Heading({ children, level }: HeadingProps) {
  const variant = `h${level}` as const
  const tag = `h${level}` as const

  return (
    <Text variant={variant} as={tag}>
      {children}
    </Text>
  )
}
