import { cn } from '@/lib/utils'
import { createBrushBackground } from './brush'
import styles from './styles.module.css'

interface HighlightedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: Color
}

export function HighlightedText({
  children,
  color = 'green',
  className,
  ...props
}: HighlightedTextProps) {
  return (
    <mark
      className={cn(styles.highlightedText, className)}
      style={{
        background: createBrushBackground(highlightBgMap[color]),
        color: highlightFgMap[color],
      }}
      {...props}
    >
      {children}
    </mark>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const highlightColors = [
  'green',
  'blue',
  'purple',
  'orange',
  'emerald',
] as const
export type Color = (typeof highlightColors)[number]

// eslint-disable-next-line react-refresh/only-export-components
export const highlightBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,75%)',
  blue: 'hsl(200,100%,70%)',
  purple: 'hsl(300,100%,72%)',
  orange: 'hsl(400,100%,65%)',
  emerald: 'hsl(150, 100%, 65%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const highlightFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 20%)',
  blue: 'hsl(0, 0%, 20%)',
  purple: 'hsl(300, 100%, 100%)',
  orange: 'hsl(0, 0%, 20%)',
  emerald: 'hsl(0, 0%, 20%)',
}
