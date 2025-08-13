import { cn, partitionBy } from '@/lib/utils'
import React, {
  Children,
  isValidElement,
  PropsWithChildren,
  HTMLAttributes,
  useState,
  ElementType,
  ComponentPropsWithoutRef,
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
import { ThemeSwitcher } from '../ThemeSwitcher'

interface AppLayoutProps extends PropsWithChildren {
  className?: string
}

const AppLayoutBase = ({ children, className }: AppLayoutProps) => {
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
      className={cn(
        'bg-surface-secondary flex h-screen w-full gap-3 overflow-hidden p-3 pr-0 pb-0',
        className
      )}
    >
      {sidebar}

      <motion.div
        layout
        className="flex w-full flex-col"
        initial={{ left: collapsed ? '100%' : '0' }}
        animate={{ left: collapsed ? '100%' : '0' }}
        transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
      >
        {header}

        <div
          className={cn(
            'bg-surface-primary flex h-full flex-col overflow-hidden rounded-tl-xl border border-r-0 shadow will-change-transform'
          )}
        >
          <div className="flex w-full flex-shrink-0 items-center border-b p-2">
            {surfaceHeader}
          </div>

          <div className="min-h-0 flex-1">{surface}</div>
        </div>
      </motion.div>
    </div>
  )
}

AppLayoutBase.displayName = 'AppLayout'

interface AppLayoutSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const AppLayoutSurface = ({
  children,
  className,
  ...props
}: AppLayoutSurfaceProps) => {
  return (
    <div className={cn('h-full overflow-auto', className)} {...props}>
      {children}
    </div>
  )
}

AppLayoutSurface.displayName = 'AppLayout.Surface'

interface AppLayoutSidebarProps {
  className?: string
  children?: React.ReactNode
}

const AppLayoutSidebar = ({ children, className }: AppLayoutSidebarProps) => {
  const { collapsed } = useAppLayout()

  const [nav, rest] = partitionBy(Children.toArray(children), (child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Nav'
  })

  return (
    <motion.div
      initial={false}
      layout="position"
      className={cn(
        'mt-4 flex w-fit flex-col items-start',
        className,
        !collapsed && 'mr-5'
      )}
      transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
    >
      <div className="flex flex-col gap-4 px-2">
        {/* TODO: Gram will use a different logo so we need a way of making this dynamic */}
        <Logo
          variant={collapsed ? 'icon' : 'wordmark'}
          className={cn(!collapsed && 'min-w-[140px]')}
        />
        {nav}
      </div>
      {rest}
    </motion.div>
  )
}
AppLayoutSidebar.displayName = 'AppLayout.Sidebar'

interface AppLayoutThemeSwitcherProps {
  className?: string
}

const AppLayoutThemeSwitcher = ({ className }: AppLayoutThemeSwitcherProps) => {
  const { collapsed } = useAppLayout()
  return (
    <motion.div className={cn('mt-auto mb-6', className)}>
      <ThemeSwitcher orientation={collapsed ? 'vertical' : 'horizontal'} />
    </motion.div>
  )
}

AppLayoutThemeSwitcher.displayName = 'AppLayout.ThemeSwitcher'

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
        'bg-surface-primary flex min-h-8 items-center gap-1.5',
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
  return (
    <span className="text-muted-foreground typography-body-lg select-none">
      /
    </span>
  )
}

type AppLayoutBreadcrumbItemOwnProps = {
  className?: string
  active?: boolean
  children?: React.ReactNode
  disabled?: boolean
}

export type AppLayoutBreadcrumbItemProps<E extends ElementType = 'a'> = {
  as?: E
} & AppLayoutBreadcrumbItemOwnProps &
  Omit<
    ComponentPropsWithoutRef<E>,
    keyof AppLayoutBreadcrumbItemOwnProps | 'as'
  >

const AppLayoutBreadcrumbItem = <E extends ElementType = 'a'>({
  as,
  children,
  className,
  active = false,
  disabled = false,
  ...rest
}: AppLayoutBreadcrumbItemProps<E>) => {
  const Component = (as || 'a') as ElementType

  return (
    <Component
      aria-disabled={disabled || undefined}
      className={cn(
        'typography-body-md text-muted-foreground cursor-pointer rounded-md px-1.5 select-none',
        active && 'text-foreground cursor-default',
        !active && 'hover:text-foreground hover:bg-accent',
        disabled &&
          'hover:text-muted-foreground cursor-default opacity-50 hover:bg-transparent',
        className
      )}
      {...(rest as unknown as Record<string, unknown>)}
    >
      {children}
    </Component>
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
        <Tooltip delayDuration={800} disableHoverableContent>
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
    <nav className={cn('mt-3 flex flex-col items-start', className)} {...props}>
      {children}
    </nav>
  )
}

AppLayoutNav.displayName = 'AppLayout.Nav'

type AppLayoutNavItemOwnProps = {
  title: string
  icon: IconName
  children?: React.ReactNode
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
  disabled?: boolean
}

export type AppLayoutNavItemProps<E extends ElementType = 'a'> = {
  as?: E
} & AppLayoutNavItemOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof AppLayoutNavItemOwnProps | 'as'>

const AppLayoutNavItem = <E extends ElementType = 'a'>({
  as,
  title,
  icon,
  render,
  className,
  active,
  disabled,
  ...rest
}: AppLayoutNavItemProps<E>) => {
  const { collapsed } = useAppLayout()

  if (render) {
    return render({ title, icon, active, ...rest })
  }

  const Component = (as || 'a') as ElementType

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Component
            aria-disabled={disabled || undefined}
            className={cn(
              'text-muted-foreground hover:text-foreground flex h-9 w-fit cursor-pointer items-center gap-3',
              active && 'text-foreground',
              disabled &&
                'hover:text-muted-foreground cursor-default opacity-50 hover:bg-transparent',
              className
            )}
            {...(rest as unknown as Record<string, unknown>)}
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
          </Component>
        </TooltipTrigger>
        <TooltipContent
          className="bg-foreground text-background border-foreground flex flex-row items-center gap-2 text-sm"
          side="right"
          hidden={!collapsed || disabled}
        >
          <TooltipArrow className="fill-foreground" />
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

AppLayoutNavItem.displayName = 'AppLayout.NavItem'

export interface AppLayoutNavItemGroupProps
  extends HTMLAttributes<HTMLDivElement> {
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
  ThemeSwitcher: AppLayoutThemeSwitcher,
  // Nav
  Nav: AppLayoutNav,
  NavItem: AppLayoutNavItem,
  NavItemGroup: AppLayoutNavItemGroup,
})
