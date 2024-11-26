import { cn } from '@/lib/utils'
import { Size } from '@/types'
import './gradientCircle.css'
import { useMemo } from 'react'

interface GradientCircleProps {
  name: string
  size?: Size
  transition?: boolean
  showInitial?: boolean
}

const sizeMap: Record<Size, number> = {
  small: 6,
  medium: 8,
  large: 10,
  xl: 12,
  '2xl': 20,
}

const initialSizeMap: Record<Size, number> = {
  small: 16,
  medium: 24,
  large: 24,
  xl: 32,
  '2xl': 48,
}

const borderSizeMap: Record<Size, number> = {
  small: 2,
  medium: 2,
  large: 4,
  xl: 4,
  '2xl': 4,
}

export function GradientCircle({
  name,
  size = 'small',
  transition = false,
  showInitial = false,
}: GradientCircleProps) {
  const initial = useMemo<string | undefined>(
    () => (name.length > 0 ? name[0].toUpperCase() : undefined),
    [name]
  )
  // Define vibrant base colors (in HSL)
  const baseColors = [
    0, // Red
    30, // Orange
    60, // Yellow
    120, // Green
    180, // Cyan
    210, // Blue
    270, // Purple
    300, // Pink
    330, // Magenta
  ]

  // Generate hash for color selection
  const hash = name.split('').reduce((acc, char, i) => {
    const charCode = char.charCodeAt(0)
    return (acc * 31 + charCode * (i + 1)) >>> 0
  }, 5381)

  // Select two different base colors
  const colorIndex1 = hash % baseColors.length
  const colorIndex2 =
    (colorIndex1 + 1 + (hash % (baseColors.length - 1))) % baseColors.length

  const hue1 = baseColors[colorIndex1]
  const hue2 = baseColors[colorIndex2]

  // High saturation and balanced lightness for bold colors
  const fromColor = `hsl(${hue1}, 85%, 60%)`
  const toColor = `hsl(${hue2}, 85%, 55%)`

  const sizeValue = sizeMap[size]
  const borderSize = borderSizeMap[size]

  return (
    <div
      className={cn(
        'gradient-circle relative min-h-6 min-w-6 rounded-full border-white',
        sizeValue && `h-${sizeValue} w-${sizeValue}`,
        borderSize && `border-${borderSize}`
      )}
      style={
        {
          '--from-color': fromColor,
          '--to-color': toColor,
          transition: transition
            ? '--from-color 0.5s, --to-color 2s'
            : undefined,
        } as React.CSSProperties
      }
    >
      {showInitial && name.length > 0 && (
        <div
          className="gradient-circle-initial"
          style={
            {
              '--translate': initial
                ? getInitialTranslateY(initial)
                : undefined,
              fontSize: initialSizeMap[size],
            } as React.CSSProperties
          }
        >
          {name[0].toUpperCase()}
        </div>
      )}
    </div>
  )
}

/**
 * every letter has a different central focal point
 * so may need some adjustment in order to center them
 */
function getInitialTranslateY(letter: string): [string, string] {
  switch (letter) {
    case 'A':
      return ['-50%', '-55%']
    case 'B':
      return ['-50%', '-55%']
    case 'C':
      return ['-54%', '-50%']
    case 'D':
      return ['-46%', '-50%']
    case 'E':
      return ['-52%', '-50%']
    case 'F':
      return ['-50%', '-52%']
    case 'G':
      return ['-52%', '-52%']
    case 'J':
      return ['-55%', '-52%']
    case 'L':
      return ['-47%', '-54%']
    case 'Q':
      return ['-53%', '-55%']
    case 'R':
      return ['-52%', '-55%']
    default:
      return ['-50%', '-50%']
  }
}
