import { cn } from '@/lib/utils'
import React, {
  Children,
  isValidElement,
  PropsWithChildren,
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
} from '../Tooltip'
import { Key } from '../KeyHint'
import { useAppLayoutKeys } from './useAppLayoutKeys'

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
  children?: React.ReactNode | ((collapsed: boolean) => React.ReactNode)
}

const AppLayoutSidebar = ({ children, className }: AppLayoutSidebarProps) => {
  const { collapsed } = useAppLayout()
  return (
    <div
      className={cn(
        'mt-4 mr-10 ml-2 flex w-fit flex-col gap-4',
        className,
        collapsed && 'mr-6'
      )}
    >
      <Logo
        variant={collapsed ? 'icon' : 'wordmark'}
        className={cn(!collapsed && 'min-w-[140px]')}
      />
      <div className={cn('flex flex-col')}>
        {typeof children === 'function' ? children(collapsed) : children}
      </div>
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
  return <span className="text-muted-foreground text-body-lg">/</span>
}

interface AppLayoutBreadcrumbItemProps extends PropsWithChildren {
  className?: string
  active?: boolean
}

const AppLayoutBreadcrumbItem = ({
  children,
  className,
  active = false,
}: AppLayoutBreadcrumbItemProps) => {
  return (
    <div
      className={cn(
        'text-body-md text-muted-foreground cursor-pointer',
        active && 'text-foreground cursor-default',
        !active && 'hover:text-foreground',
        className
      )}
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
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <button
              className="text-body-md hover:bg-accent rounded-md p-1.5"
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
              side="bottom"
              align="start"
              className="!z-50 flex flex-row items-center gap-2 px-2 py-1"
            >
              <span>{keybinds.toggle.description}</span>
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

export const AppLayout = Object.assign(AppLayoutBase, {
  Surface: AppLayoutSurface,
  SurfaceHeader: AppLayoutSurfaceHeader,
  Sidebar: AppLayoutSidebar,
  Breadcrumb: AppLayoutBreadcrumb,
  BreadcrumbItem: AppLayoutBreadcrumbItem,
  CollapseButton: AppLayoutCollapseButton,
  HeaderDivider: AppLayoutHeaderDivider,
  Header: AppLayoutHeader,
})
