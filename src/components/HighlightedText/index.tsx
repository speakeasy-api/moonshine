import { cn } from '@/lib/utils'
import { createBrushBackground } from './brush'
import styles from './styles.module.css'

interface HighlightedTextProps {
  children: React.ReactNode
  color?: Color
  className?: string
}

export function HighlightedText({
  children,
  color = 'green',
  className,
}: HighlightedTextProps) {
  return (
    <mark
      className={cn(styles.highlightedText, className)}
      style={{
        background: createBrushBackground(highlightBgMap[color]),
        color: highlightFgMap[color],
      }}
    >
      {children}
    </mark>
  )
}

export type Color = 'green' | 'blue' | 'purple' | 'orange'

// eslint-disable-next-line react-refresh/only-export-components
export const highlightBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,65%)',
  blue: 'hsl(200,100%,55%)',
  purple: 'hsl(300,100%,65%)',
  orange: 'hsl(400,100%,65%)',
}

const highlightFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 20%)',
  blue: 'hsl(200, 100%, 100%)',
  purple: 'hsl(300, 100%, 100%)',
  orange: 'hsl(0, 0%, 20%)',
}
