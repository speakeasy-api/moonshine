import { cn } from '@/lib/utils'
import React, { Children, isValidElement, PropsWithChildren } from 'react'
import { AnimatedLogo } from '../Logo/Animated'

interface AppLayoutProps extends PropsWithChildren {
  className?: string
}

const AppLayoutBase = ({ children }: AppLayoutProps) => {
  return <div className="flex min-h-svh w-full p-3 pr-0">{children}</div>
}

interface AppLayoutSurfaceProps extends PropsWithChildren {
  className?: string
}

const AppLayoutSurface = ({ children, className }: AppLayoutSurfaceProps) => {
  return (
    <div
      className={cn(
        'bg-muted flex-1 overflow-hidden rounded-tl-xl border',
        className
      )}
    >
      {children}
    </div>
  )
}

interface AppLayoutSidebarProps extends PropsWithChildren {
  className?: string
}

const AppLayoutSidebar = ({ children, className }: AppLayoutSidebarProps) => {
  return (
    <div className={cn('mr-5 flex w-fit flex-col gap-4', className)}>
      <AnimatedLogo />
      <div className="flex flex-col">{children}</div>
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
        'bg-background flex items-center gap-2 border-b p-3',
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
  return <span className="text-muted-foreground text-sm">&gt;</span>
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
        'text-muted-foreground text-sm',
        active && 'text-foreground font-medium',
        className
      )}
    >
      {children}
    </div>
  )
}

AppLayoutBreadcrumbItem.displayName = 'AppLayout.BreadcrumbItem'

export const AppLayout = Object.assign(AppLayoutBase, {
  Surface: AppLayoutSurface,
  Sidebar: AppLayoutSidebar,
  Breadcrumb: AppLayoutBreadcrumb,
  BreadcrumbItem: AppLayoutBreadcrumbItem,
})
