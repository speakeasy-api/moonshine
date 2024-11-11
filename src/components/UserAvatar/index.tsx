import { cn } from '@/lib/utils'
import { Size } from '@/types'

const sizeMap: Record<Size, number> = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  '2xl': 32,
}

export interface UserAvatarProps {
  name: string
  imageUrl: string | undefined
  size?: Size
}

const fallbackColors = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
]

// deterministically returns a color based on the first letter of the name
function getFallbackColor(name: string | undefined) {
  if (!name) return 'bg-gray-900'
  const firstLetter = name[0].toLowerCase()

  const index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0)
  return fallbackColors[index % fallbackColors.length]
}

export function UserAvatar({
  name,
  imageUrl,
  size = 'medium',
}: UserAvatarProps) {
  const sizeValue = sizeMap[size]
  const hasImage = !!imageUrl

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-full bg-gray-200',
        `size-${sizeValue}`,
        !hasImage && getFallbackColor(name)
      )}
    >
      {hasImage ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${sizeValue} ${sizeValue}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="white"
            fontSize={sizeValue * 0.75}
            dy="0.075em"
            fontWeight="semibold"
          >
            {name[0] || '✖️'}
          </text>
        </svg>
      )}
    </div>
  )
}
