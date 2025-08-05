import { cn } from '@/lib/utils'
import React, {
  Children,
  isValidElement,
  PropsWithChildren,
  HTMLAttributes,
  useState,
} from 'react'
import { Icon } from '../Icon'
import { useAppLayout } from '@/hooks/useAppLayout'
import { motion } from 'framer-motion'
import { Logo } from '../Logo'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
  TooltipArrow,
} from '../Tooltip'
import { Key } from '../KeyHint'
import { useAppLayoutKeys } from './useAppLayoutKeys'
import { IconName } from '../Icon/names'

interface AppLayoutProps extends PropsWithChildren {
  className?: string
}

const AppLayoutBase = ({ children }: AppLayoutProps) => {
  const sidebar = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Sidebar'
  })

  const surface = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Surface'
  })

  const surfaceHeader = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.SurfaceHeader'
  })

  // primary header to render above the surface
  const header = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Header'
  })

  const { collapsed } = useAppLayout()

  return (
    <div
      className={cn('bg-surface-secondary flex min-h-svh w-full p-3 pr-0 pb-0')}
    >
      {sidebar}

      <motion.div
        layout
        className="flex w-full flex-1 flex-col"
        initial={{ left: collapsed ? '100%' : '0' }}
        animate={{ left: collapsed ? '100%' : '0' }}
        transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
      >
        {header}

        <div
          className={cn(
            'bg-surface-primary flex-1 overflow-hidden rounded-tl-xl border border-r-0 shadow will-change-transform'
          )}
        >
          <div className="flex w-full flex-1 items-center border-b p-2">
            {surfaceHeader}
          </div>

          {surface}
        </div>
      </motion.div>
    </div>
  )
}

AppLayoutBase.displayName = 'AppLayout'

interface AppLayoutSurfaceProps extends PropsWithChildren {
  className?: string
}

const AppLayoutSurface = ({ children, className }: AppLayoutSurfaceProps) => {
  return <div className={cn('flex-1', className)}>{children}</div>
}

AppLayoutSurface.displayName = 'AppLayout.Surface'

interface AppLayoutSidebarProps {
  className?: string
  children?: React.ReactNode
}

const AppLayoutSidebar = ({ children, className }: AppLayoutSidebarProps) => {
  const { collapsed } = useAppLayout()

  const nav = Children.toArray(children).find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Nav'
  })

  return (
    <div
      className={cn(
        'mt-4 mr-9 ml-2 flex w-fit flex-col gap-4',
        className,
        collapsed && 'mr-6'
      )}
    >
      {/* TODO: Gram will use a different logo so we need a way of making this dynamic */}
      <Logo
        variant={collapsed ? 'icon' : 'wordmark'}
        className={cn(!collapsed && 'min-w-[140px]')}
      />
      <div className={cn('flex flex-col')}>{nav}</div>
    </div>
  )
}
AppLayoutSidebar.displayName = 'AppLayout.Sidebar'

interface AppLayoutBreadcrumbProps extends PropsWithChildren {
  className?: string
}

const AppLayoutBreadcrumb = ({
  children,
  className,
}: AppLayoutBreadcrumbProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    const isValidSubType = type.displayName === 'AppLayout.BreadcrumbItem'
    if (!isValidSubType) {
      console.warn(
        `Invalid child type: ${type.displayName}. Must be one of: CodeEditor.Pane, CodeEditor.Tabs, CodeEditor.CommandBar, CodeEditor.Empty`
      )
    }
    return isValidSubType
  })
  return (
    <div
      className={cn(
        'bg-surface-primary flex flex-1 items-center gap-2',
        className
      )}
    >
      {validChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < validChildren.length - 1 && <AppLayoutBreadcrumbDivider />}
        </React.Fragment>
      ))}
    </div>
  )
}

AppLayoutBreadcrumb.displayName = 'AppLayout.Breadcrumb'

const AppLayoutBreadcrumbDivider = () => {
  return <span className="text-muted-foreground typography-body-lg">/</span>
}

interface AppLayoutBreadcrumbItemProps extends PropsWithChildren {
  className?: string
  active?: boolean
  onClick?: () => void
}

const AppLayoutBreadcrumbItem = ({
  children,
  className,
  active = false,
  onClick,
}: AppLayoutBreadcrumbItemProps) => {
  return (
    <div
      className={cn(
        'typography-body-md text-muted-foreground cursor-pointer',
        active && 'text-foreground cursor-default',
        !active && 'hover:text-foreground',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

AppLayoutBreadcrumbItem.displayName = 'AppLayout.BreadcrumbItem'

const AppLayoutHeaderDivider = () => {
  return <div className="bg-border h-full min-h-4 w-px" />
}

AppLayoutHeaderDivider.displayName = 'AppLayout.HeaderDivider'

interface AppLayoutCollapseButtonProps extends PropsWithChildren {
  className?: string
}

const AppLayoutCollapseButton = ({
  className,
}: AppLayoutCollapseButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { collapsed, setCollapsed, keybinds } = useAppLayout()
  useAppLayoutKeys()
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <TooltipProvider>
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <button
              className="typography-body-md hover:bg-accent rounded-md p-1.5"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon
                name="panel-left"
                className={cn('text-muted size-4', isHovered && 'text-primary')}
              />
            </button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side="right"
              align="start"
              className="!z-50 flex flex-row items-center gap-2 px-2 py-1"
            >
              <span className="text-body-md text-muted">
                {keybinds.toggle.description}
              </span>
              <div className="flex flex-row items-center gap-1 p-0.5">
                <Key value="⌘" />
                <span>+</span>
                <Key value={keybinds.toggle.key} />
              </div>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

AppLayoutCollapseButton.displayName = 'AppLayout.CollapseButton'

interface AppLayoutSurfaceHeaderProps extends PropsWithChildren {
  className?: string
}

const AppLayoutSurfaceHeader = ({
  children,
  className,
}: AppLayoutSurfaceHeaderProps) => {
  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      {children}
    </div>
  )
}

AppLayoutSurfaceHeader.displayName = 'AppLayout.SurfaceHeader'

interface AppLayoutHeaderProps extends PropsWithChildren {
  className?: string
}

const AppLayoutHeader = ({ children, className }: AppLayoutHeaderProps) => {
  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      {children}
    </div>
  )
}

AppLayoutHeader.displayName = 'AppLayout.Header'

interface AppLayoutNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const AppLayoutNav = ({ children, className, ...props }: AppLayoutNavProps) => {
  return (
    <nav className={cn('mt-3 flex flex-col', className)} {...props}>
      {children}
    </nav>
  )
}

AppLayoutNav.displayName = 'AppLayout.Nav'

interface AppLayoutNavItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  icon: IconName

  render?: ({
    title,
    icon,
    active,
  }: {
    title: string
    icon: React.ReactNode
    active?: boolean
  }) => React.ReactNode
  className?: string
  active?: boolean
}

const AppLayoutNavItem = ({
  title,
  icon,
  render,
  className,
  active,
  ...props
}: AppLayoutNavItemProps) => {
  const { collapsed } = useAppLayout()

  if (render) {
    return render({ title, icon, active, ...props })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'text-muted-foreground hover:text-foreground flex h-9 w-fit cursor-pointer items-center gap-3',
              active && 'text-foreground',
              className
            )}
            {...props}
          >
            <Icon name={icon} className="size-6" strokeWidth={1.3} />
            {collapsed ? null : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="typography-body-sm"
              >
                {title}
              </motion.span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="bg-foreground text-background border-foreground flex flex-row items-center gap-2 text-sm"
          side="right"
          hidden={!collapsed}
        >
          <TooltipArrow className="fill-foreground" />
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

AppLayoutNavItem.displayName = 'AppLayout.NavItem'

interface AppLayoutNavItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string

  /**
   * The name of the group.
   */
  name: string

  /**
   * Child AppLayout.NavItem components.
   */
  children: React.ReactNode
}

const AppLayoutNavItemGroup = ({
  children,
  className,
  name,
  ...props
}: AppLayoutNavItemGroupProps) => {
  const { collapsed } = useAppLayout()
  return (
    <div className={cn('mb-4 flex flex-col', className)} {...props}>
      {!collapsed && <div className="text-codeline-sm uppercase">{name}</div>}
      {children}
    </div>
  )
}

AppLayoutNavItemGroup.displayName = 'AppLayout.NavItemGroup'

export const AppLayout = Object.assign(AppLayoutBase, {
  Surface: AppLayoutSurface,
  SurfaceHeader: AppLayoutSurfaceHeader,
  Sidebar: AppLayoutSidebar,
  Breadcrumb: AppLayoutBreadcrumb,
  BreadcrumbItem: AppLayoutBreadcrumbItem,
  CollapseButton: AppLayoutCollapseButton,
  HeaderDivider: AppLayoutHeaderDivider,
  Header: AppLayoutHeader,

  // Nav
  Nav: AppLayoutNav,
  NavItem: AppLayoutNavItem,
  NavItemGroup: AppLayoutNavItemGroup,
})
