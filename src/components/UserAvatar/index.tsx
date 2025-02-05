import { cn } from '@/lib/utils'
import { ResponsiveValue, Size, Breakpoint } from '@/types'
import { userAvatarSizeMap } from './sizeMap'
import styles from './userAvatar.module.css'

export interface UserAvatarProps {
  name: string
  imageUrl?: string
  size?: ResponsiveValue<Size>
  border?: boolean
  className?: string
}

const fallbackColors = [
  styles.fallbackRed,
  styles.fallbackOrange,
  styles.fallbackYellow,
  styles.fallbackGreen,
  styles.fallbackBlue,
  styles.fallbackPurple,
  styles.fallbackPink,
]

// deterministically returns a color based on the first letter of the name
function getFallbackColor(name: string | undefined) {
  if (!name) return styles.fallbackGray
  const firstLetter = name[0].toLowerCase()

  const index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0)
  return fallbackColors[index % fallbackColors.length]
}

const mapSize = (size: Size) => `${userAvatarSizeMap[size] * 0.25}rem`

const createResponsiveVars = <T extends string | number | boolean | object>(
  value: ResponsiveValue<T>,
  prefix: string,
  mapper: (val: T) => string
): React.CSSProperties => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return (Object.entries(value) as [Breakpoint, T][]).reduce(
      (acc, [breakpoint, val]) => {
        if (val === undefined) return acc
        const cssVar =
          breakpoint === 'xs'
            ? `--avatar-${prefix}`
            : `--${breakpoint}-avatar-${prefix}`
        return { ...acc, [cssVar]: mapper(val) }
      },
      {}
    )
  }
  return value ? { [`--avatar-${prefix}`]: mapper(value as T) } : {}
}

export function UserAvatar({
  name,
  imageUrl,
  size = 'medium',
  border = false,
  className,
}: UserAvatarProps) {
  const style = size ? createResponsiveVars(size, 'size', mapSize) : undefined
  const hasImage = !!imageUrl
  const sizeValue =
    userAvatarSizeMap[typeof size === 'string' ? size : 'medium']

  return (
    <div
      className={cn(
        styles.avatar,
        !hasImage && getFallbackColor(name),
        border && styles.border,
        className
      )}
      style={style}
    >
      {hasImage ? (
        <img src={imageUrl} alt={name} className={styles.image} />
      ) : (
        <svg
          className={styles.svg}
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
