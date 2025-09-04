import { cn, partitionBy } from '@/lib/utils'
import React, {
  Children,
  isValidElement,
  PropsWithChildren,
  HTMLAttributes,
  useRef,
  useEffect,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
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
  const { collapsed } = useAppLayout()

  // Single pass through children to find all layout components
  const childComponents = Children.toArray(children).reduce(
    (acc, child) => {
      if (!isValidElement(child)) return acc
      const type = child.type as { displayName?: string }
      const displayName = type.displayName

      switch (displayName) {
        case 'AppLayout.Sidebar':
          acc.sidebar = child
          break
        case 'AppLayout.Surface':
          acc.surface = child
          break
        case 'AppLayout.SurfaceHeader':
          acc.surfaceHeader = child
          break
        case 'AppLayout.Header':
          acc.header = child
          break
      }

      return acc
    },
    {
      sidebar: null as React.ReactElement | null,
      surface: null as React.ReactElement | null,
      surfaceHeader: null as React.ReactElement | null,
      header: null as React.ReactElement | null,
    }
  )

  const { sidebar, surface, surfaceHeader, header } = childComponents

  return (
    <div
      className={cn(
        'bg-surface-secondary flex h-screen w-full gap-3 overflow-hidden p-2 pr-0 pb-0',
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

        <main
          className={cn(
            'bg-surface-primary mr-2 mb-2 flex h-full flex-col overflow-hidden rounded-xl shadow-sm'
          )}
        >
          <div className="flex w-full flex-shrink-0 items-center border-b p-2">
            {surfaceHeader}
          </div>

          <div className="min-h-0 flex-1">{surface}</div>
        </main>
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
  Logo?: React.ReactNode
}

const AppLayoutSidebar = ({ children, className }: AppLayoutSidebarProps) => {
  const {
    collapsed,
    setCollapsed,
    hoverExpandsSidebar,
    _expandedByHover,
    _setExpandedByHover,
  } = useAppLayout()

  const [nav, rest] = partitionBy(Children.toArray(children), (child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'AppLayout.Nav'
  })

  const sidebarRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const expandedByHoverRef = useRef(_expandedByHover)

  // Keep ref in sync with state
  useEffect(() => {
    expandedByHoverRef.current = _expandedByHover
  }, [_expandedByHover])

  // Handle hover intent when the sidebar is collapsed
  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar || !hoverExpandsSidebar) return

    const handleMouseEnter = () => {
      // Only expand if currently collapsed
      if (!collapsed) return
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      // Set a delay before expanding
      hoverTimeoutRef.current = setTimeout(() => {
        setCollapsed(false)
        _setExpandedByHover(true) // Mark as expanded by hover
        hoverTimeoutRef.current = null
      }, 250) // 250ms delay
    }

    const handleMouseLeave = () => {
      // Clear the timeout if mouse leaves before delay completes
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }

      // Only collapse if it was expanded by hover, not manually
      if (expandedByHoverRef.current) {
        setCollapsed(true)
        _setExpandedByHover(false)
      }
    }

    // Add listeners when hover expansion is enabled
    sidebar.addEventListener('mouseenter', handleMouseEnter)
    sidebar.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup function - always runs when effect re-runs or component unmounts
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      sidebar.removeEventListener('mouseenter', handleMouseEnter)
      sidebar.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hoverExpandsSidebar, collapsed, setCollapsed, _setExpandedByHover])

  return (
    <motion.div
      initial={false}
      layout="position"
      className={cn('mt-4 flex w-fit flex-col items-start', className)}
      ref={sidebarRef}
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

export interface AppLayoutBreadcrumbItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  active?: boolean
  children?: React.ReactNode
  disabled?: boolean
  asChild?: boolean
}

const AppLayoutBreadcrumbItem = React.forwardRef<
  HTMLAnchorElement,
  AppLayoutBreadcrumbItemProps
>(
  (
    {
      asChild = false,
      children,
      className,
      active = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn(
          'typography-body-md text-muted-foreground cursor-pointer rounded-md px-1.5 text-lg font-light select-none',
          active && 'text-foreground cursor-default',
          !active && 'hover:text-foreground hover:bg-accent',
          disabled &&
            'hover:text-muted-foreground cursor-default opacity-50 hover:bg-transparent',
          className
        )}
        {...rest}
      >
        {children}
      </Comp>
    )
  }
)

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
  const { collapsed, setCollapsed, keybinds, _setExpandedByHover } =
    useAppLayout()
  useAppLayoutKeys()
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <TooltipProvider>
        <Tooltip delayDuration={800} disableHoverableContent>
          <TooltipTrigger asChild>
            <button
              className="group typography-body-md hover:bg-accent hover:text-primary rounded-md p-1.5"
              onClick={() => {
                setCollapsed(!collapsed)
                _setExpandedByHover(false) // Reset hover state on manual toggle
              }}
              aria-label="Toggle sidebar"
            >
              <Icon
                name="panel-left"
                className="text-muted group-hover:!text-primary size-4"
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

export interface AppLayoutNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
  asChild?: boolean
}

const AppLayoutNavItem = React.forwardRef<
  HTMLAnchorElement,
  AppLayoutNavItemProps
>(
  (
    {
      asChild = false,
      title,
      icon,
      render,
      className,
      active,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const { collapsed } = useAppLayout()

    if (render) {
      return render({ title, icon, active })
    }

    const Comp = asChild ? Slot : 'a'
    const iconElement = (
      <Icon name={icon} className="size-6" strokeWidth={1.3} />
    )
    const titleElement = collapsed ? null : (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="typography-body-sm"
      >
        {title}
      </motion.span>
    )

    const content = asChild ? (
      children
    ) : (
      <>
        {iconElement}
        {titleElement}
      </>
    )

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              ref={ref}
              className={cn(
                'text-muted-foreground hover:text-foreground flex h-9 w-fit cursor-pointer items-center gap-3',
                active && 'text-foreground',
                disabled &&
                  'hover:text-muted-foreground cursor-default opacity-50 hover:bg-transparent',
                className
              )}
              {...rest}
              {...(asChild && {
                'data-title': title,
                'data-icon': icon,
                'data-active': active,
                'data-disabled': disabled,
              })}
            >
              {content}
            </Comp>
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
)

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

const AppLayout = AppLayoutBase as typeof AppLayoutBase & {
  Surface: typeof AppLayoutSurface
  SurfaceHeader: typeof AppLayoutSurfaceHeader
  Sidebar: typeof AppLayoutSidebar
  Breadcrumb: typeof AppLayoutBreadcrumb
  BreadcrumbItem: typeof AppLayoutBreadcrumbItem
  CollapseButton: typeof AppLayoutCollapseButton
  HeaderDivider: typeof AppLayoutHeaderDivider
  Header: typeof AppLayoutHeader
  ThemeSwitcher: typeof AppLayoutThemeSwitcher
  Nav: typeof AppLayoutNav
  NavItem: typeof AppLayoutNavItem
  NavItemGroup: typeof AppLayoutNavItemGroup
}

AppLayout.Surface = AppLayoutSurface
AppLayout.SurfaceHeader = AppLayoutSurfaceHeader
AppLayout.Sidebar = AppLayoutSidebar
AppLayout.Breadcrumb = AppLayoutBreadcrumb
AppLayout.BreadcrumbItem = AppLayoutBreadcrumbItem
AppLayout.CollapseButton = AppLayoutCollapseButton
AppLayout.HeaderDivider = AppLayoutHeaderDivider
AppLayout.Header = AppLayoutHeader
AppLayout.ThemeSwitcher = AppLayoutThemeSwitcher
AppLayout.Nav = AppLayoutNav
AppLayout.NavItem = AppLayoutNavItem
AppLayout.NavItemGroup = AppLayoutNavItemGroup

export { AppLayout }
