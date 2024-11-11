import { UserAvatar, UserAvatarProps } from '../UserAvatar'

interface AvatarStackProps {
  users: (UserAvatarProps & { href: string })[]
  maxVisible?: number
  moreLinkHref?: string
}

export function AvatarStack({
  users,
  maxVisible = 3,
  moreLinkHref,
}: AvatarStackProps) {
  const remainingUsers = users.length - maxVisible

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {users.slice(0, maxVisible).map((user, index) => (
        <a
          className={
            'border-background flex size-12 w-fit items-center justify-center rounded-full border-2 transition-colors'
          }
          style={{ zIndex: users.length - index }}
          href={user.href}
        >
          <UserAvatar key={user.name} {...user} />
        </a>
      ))}
      {remainingUsers > 0 && moreLinkHref && (
        <a
          className="text-md border-background flex flex-shrink-0 items-center justify-center rounded-full border-2 bg-gray-200 font-semibold text-gray-500 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-yellow-500/20 hover:text-gray-600"
          href={moreLinkHref}
          style={{ zIndex: 0 }}
        >
          <svg viewBox="0 0 48 48" height={48} width={48}>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="currentColor"
            >
              +{remainingUsers}
            </text>
          </svg>
        </a>
      )}
    </div>
  )
}
