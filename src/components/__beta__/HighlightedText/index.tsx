import { cn } from '@/lib/utils'
import { createBrushBackground } from './brush'
import styles from './styles.module.css'

interface HighlightedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: Color
  muted?: boolean
}

export function HighlightedText({
  children,
  color = 'green',
  muted = false,
  className,
  ...props
}: HighlightedTextProps) {
  return (
    <mark
      className={cn(styles.highlightedText, className)}
      style={{
        background: createBrushBackground(
          muted ? mutedBgMap[color] : highlightBgMap[color]
        ),
        color: muted ? mutedFgMap[color] : highlightFgMap[color],
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

// TODO: replace these colors with new ones, and improve api for selecting/retrieving colors for consumers

// eslint-disable-next-line react-refresh/only-export-components
export const highlightBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,75%)',
  blue: 'hsl(200,100%,70%)',
  purple: 'hsl(300,100%,72%)',
  orange: 'hsl(400,100%,65%)',
  emerald: 'hsl(150, 100%, 65%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const mutedBgMap: Record<Color, string> = {
  green: 'hsl(500,100%,90%)',
  blue: 'hsl(200,100%,90%)',
  purple: 'hsl(300,100%,90%)',
  orange: 'hsl(400,100%,90%)',
  emerald: 'hsl(150, 100%, 90%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const mutedFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 10%)',
  blue: 'hsl(0, 0%, 10%)',
  purple: 'hsl(0, 0%, 10%)',
  orange: 'hsl(0, 0%, 10%)',
  emerald: 'hsl(0, 0%, 10%)',
}

// eslint-disable-next-line react-refresh/only-export-components
export const highlightFgMap: Record<Color, string> = {
  green: 'hsl(0, 0%, 20%)',
  blue: 'hsl(0, 0%, 20%)',
  purple: 'hsl(300, 100%, 100%)',
  orange: 'hsl(0, 0%, 20%)',
  emerald: 'hsl(0, 0%, 20%)',
}
