import { cn, getResponsiveClasses } from '@/lib/utils'
import { ResponsiveValue, Size } from '@/types'
import { sizeMap } from './sizeMap'
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint'
import { sizeMapper } from '@/lib/responsiveMappers'
import { resolveSizeForBreakpoint } from '@/lib/responsiveUtils'

export interface UserAvatarProps {
  name: string
  imageUrl?: string
  size?: ResponsiveValue<Size>
  border?: boolean
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
  border = false,
}: UserAvatarProps) {
  const breakpoint = useTailwindBreakpoint()

  const resolvedSize = resolveSizeForBreakpoint(breakpoint, size, 'medium')
  const sizeValue = sizeMap[resolvedSize]

  const hasImage = !!imageUrl

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-full bg-gray-200',
        getResponsiveClasses(size, sizeMapper),
        !hasImage && getFallbackColor(name),
        border && 'border-background border-2'
      )}
    >
      {hasImage ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full select-none object-cover object-center"
        />
      ) : (
        <svg
          className="h-full w-full select-none"
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
