import { cn } from '@/lib/utils'
import { Size } from '@/types'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { Separator } from '../Separator'
import { Icon } from '../Icon'

interface UserAvatarProps {
  name: string
  email: string
  imageUrl: string | undefined
  size?: Size
  onSignOut: () => void
}

const sizeMap: Record<Size, number> = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  '2xl': 32,
}

function UserAvatarMenu({
  email,
  onSignOut,
}: {
  email: string
  onSignOut: () => void
}) {
  return (
    <div className="flex flex-col p-0">
      <div
        className="text-muted-foreground break-words px-3 py-1 text-sm"
        title={email}
      >
        {email}
      </div>
      <Separator />
      <div
        className="text-muted-foreground hover:text-foreground flex cursor-pointer select-none flex-row items-center gap-2 px-3 py-1 text-sm"
        onClick={onSignOut}
      >
        <Icon name="log-out" />
        Logout
      </div>
    </div>
  )
}

const fallbackColors = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
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
  email,
  size = 'medium',
  onSignOut,
}: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const sizeValue = sizeMap[size]
  const hasImage = !!imageUrl

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            'flex items-center justify-center overflow-hidden rounded-full bg-gray-200',
            `size-${sizeValue}`,
            !hasImage && getFallbackColor(name)
          )}
          onClick={() => setIsOpen(true)}
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
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="relative top-1 w-fit max-w-48 px-0 py-2"
      >
        <UserAvatarMenu email={email} onSignOut={onSignOut} />
      </PopoverContent>
    </Popover>
  )
}
