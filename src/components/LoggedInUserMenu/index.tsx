import { Icon } from '../Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../Dropdown'
import { Stack } from '../Stack'
import { UserAvatar } from '../UserAvatar'
import { UserAvatarProps } from '../UserAvatar'

interface LoggedInUserProps extends UserAvatarProps {
  email: string
  onSignOut: () => void
}

export function LoggedInUserMenu({
  email,
  name,
  onSignOut,
  imageUrl,
}: LoggedInUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <UserAvatar name={name} imageUrl={imageUrl} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 max-w-64 p-0">
        <LoggedInMenuContent name={name} email={email} onSignOut={onSignOut} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface LoggedInMenuContentProps extends Omit<LoggedInUserProps, 'imageUrl'> {
  email: string
  onSignOut: () => void
}

function LoggedInMenuContent({
  email,
  name,
  onSignOut,
}: LoggedInMenuContentProps) {
  return (
    <>
      <Stack padding={3} direction="column">
        <div className="truncate text-sm font-semibold">{name}</div>
        <div className="text-muted-foreground truncate text-sm" title={email}>
          {email}
        </div>
      </Stack>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onSelect={onSignOut}
        className="cursor-pointer px-3 py-2"
      >
        <Icon name="log-out" />
        Logout
      </DropdownMenuItem>
    </>
  )
}
