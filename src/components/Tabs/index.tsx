import { cn } from '@/lib/utils'
import React, { ReactElement, useEffect, useState } from 'react'

export interface TabProps<I extends string> {
  children: React.ReactNode
  active?: boolean
  id: I
  onClick?: () => void
  className?: string
}

interface TabComponent {
  <I extends string>(props: TabProps<I>): React.ReactNode
  displayName: string
}

const Tab = function Tab<I extends string>({
  children,
  active,
  onClick,
  className,
}: TabProps<I>) {
  return (
    <div
      className={cn(
        'text-muted-foreground mb-[-1px] cursor-pointer px-4 py-2 text-sm',
        active &&
          'bg-background text-foreground rounded-t-lg border-l border-r border-t',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
} as TabComponent

export interface TabsProps<I extends string> {
  children: Array<ReactElement<TabProps<I>>>
  selectedTab: I
  onTabChange: (identifier: I) => void
  className?: string
}

type TypeWithDisplayName = {
  displayName?: string
}

interface TabsComponent {
  <I extends string>(props: TabsProps<I>): React.ReactNode
  Tab: TabComponent
}

export const Tabs = function Tabs<I extends string>({
  children,
  selectedTab,
  onTabChange,
  className,
}: TabsProps<I>) {
  const [activeTab, setActiveTab] = useState<I>(
    selectedTab || children[0].props.id
  )

  useEffect(() => {
    setActiveTab(selectedTab || children[0].props.id)
  }, [selectedTab])

  const validChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as TypeWithDisplayName).displayName === 'Tabs.Tab'
  ) as Array<React.ReactElement<TabProps<I>>>

  return (
    <div
      className={cn(
        'border-border flex select-none flex-row justify-start gap-2 border-b',
        className
      )}
    >
      {React.Children.map(validChildren, (child) => {
        // Clone the child element with React 19 compatible approach
        return React.cloneElement(child, {
          ...child.props,
          active: child.props.id === activeTab,
          onClick: () => {
            setActiveTab(child.props.id)
            child.props.onClick?.()
            onTabChange?.(child.props.id)
          },
        })
      })}
    </div>
  )
} as TabsComponent

Tab.displayName = 'Tabs.Tab'
Tabs.Tab = Tab
