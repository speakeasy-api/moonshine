import { Size } from '../../types'

export const userAvatarSizeMap: Record<Size, number> = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  '2xl': 32,
}

export const userAvatarSizeMapper = (size: Size) =>
  `size-${userAvatarSizeMap[size]}`
