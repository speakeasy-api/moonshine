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
import React, { Children, Fragment, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LoggedInUserProps extends UserAvatarProps {
  email: string
  children?: ReactNode | ReactNode[]
  onSignOut: () => void
}

const Root: React.FC<LoggedInUserProps> = ({
  email,
  name,
  onSignOut,
  imageUrl,
  size = 'small',
  children,
}) => {
  const validChildren = Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === MenuItem
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <UserAvatar name={name} imageUrl={imageUrl} size={size} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 max-w-64 p-0">
        <LoggedInMenuContent name={name} email={email} onSignOut={onSignOut}>
          {validChildren}
        </LoggedInMenuContent>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Root.displayName = 'LoggedInUserMenu'

interface LoggedInMenuContentProps extends Omit<LoggedInUserProps, 'imageUrl'> {
  email: string
  children?: ReactNode | ReactNode[]
  onSignOut: () => void
}

const LoggedInMenuContent: React.FC<LoggedInMenuContentProps> = ({
  email,
  name,
  children,
  onSignOut,
}) => {
  return (
    <>
      <Stack padding={3}>
        <div className="truncate text-sm font-semibold">{name}</div>
        <div className="text-muted-foreground truncate text-sm" title={email}>
          {email}
        </div>
      </Stack>
      <DropdownMenuSeparator />
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {child}
          <DropdownMenuSeparator />
        </Fragment>
      ))}
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

interface LoggedInMenuItemProps {
  onSelect: () => void
  children?: ReactNode | ReactNode[]
  className?: string
}

const MenuItem: React.FC<LoggedInMenuItemProps> = ({
  onSelect,
  children,
  className,
}) => {
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className={cn('cursor-pointer px-3 py-2', className)}
    >
      {children}
    </DropdownMenuItem>
  )
}
MenuItem.displayName = 'LoggedInUserMenu.MenuItem'

export const LoggedInUserMenu = Object.assign(Root, {
  MenuItem,
})
