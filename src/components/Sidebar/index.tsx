import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { iconNames } from '../Icon/names'

interface SidebarMenuItemProps {
  iconName: (typeof iconNames)[number]
  label: string
  badge?: number
  isSelected?: boolean
  onClick?: () => void
}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ iconName, label, badge, isSelected, onClick }, ref) => {
    return (
      <li ref={ref} data-sidebar="menu-item" className="relative">
        <button
          onClick={onClick}
          data-state={isSelected ? 'selected' : 'default'}
          aria-current={isSelected ? 'page' : undefined}
          className={cn(
            'flex w-full items-center gap-2 rounded-md border border-transparent p-2 text-left',
            'hover:bg-accent',
            'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2',
            'data-[state=selected]:border-primary/20 data-[state=selected]:text-primary data-[state=selected]:bg-primary/10 data-[state=selected]:border',
            'min-h-10',
            'text-muted-foreground'
          )}
        >
          {iconName && (
            <Icon name={iconName} stroke="currentColor" aria-hidden="true" />
          )}
          <Text
            variant="sm"
            muted={isSelected ? false : true}
            whiteSpace="nowrap"
          >
            {label}
          </Text>
          {badge && (
            <Badge variant={isSelected ? 'default' : 'secondary'}>
              <span className="sr-only">{label} has </span>
              {badge}
              <span className="sr-only"> items</span>
            </Badge>
          )}
        </button>
      </li>
    )
  }
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

interface SidebarProps {
  children: Array<React.ReactElement<typeof SidebarMenuItem>>
  label?: string
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, label = 'Main Navigation' }, ref) => {
    const isValidChild = (child: React.ReactElement): boolean =>
      child.type === SidebarMenuItem

    const validChildren = React.Children.toArray(children).filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && isValidChild(child)
    )

    return (
      <nav
        ref={ref}
        aria-label={label}
        className={cn('bg-background w-64 p-6', 'border-border border-r')}
      >
        <ul role="list" className="space-y-2">
          {validChildren}
        </ul>
      </nav>
    )
  }
)
Sidebar.displayName = 'Sidebar'

const SidebarWithSubcomponents = Object.assign(Sidebar, {
  Item: SidebarMenuItem,
})

export { SidebarWithSubcomponents as Sidebar }
