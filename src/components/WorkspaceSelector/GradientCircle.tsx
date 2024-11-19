import { cn } from '@/lib/utils'
import { Size } from '@/types'

interface GradientCircleProps {
  name: string
  size?: Size
}

const sizeMap: Record<Size, number> = {
  small: 6,
  medium: 8,
  large: 10,
  xl: 12,
  '2xl': 20,
}

const borderSizeMap: Record<Size, number> = {
  small: 2,
  medium: 2,
  large: 3,
  xl: 4,
  '2xl': 4,
}

export function GradientCircle({ name, size = 'small' }: GradientCircleProps) {
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
        'rounded-full border-white',
        sizeValue && `h-${sizeValue} w-${sizeValue}`,
        borderSize && `border-${borderSize}`
      )}
      style={{
        background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
      }}
    />
  )
}
