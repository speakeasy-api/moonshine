import { cn } from '@/lib/utils'
import React, { ReactElement, useState } from 'react'

interface TabProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

const Tab = function Tab({ children, active, onClick }: TabProps) {
  return (
    <div
      className={cn(
        'text-muted-foreground mb-[-1px] cursor-pointer px-4 py-2 text-sm',
        active &&
          'bg-background text-foreground rounded-t-lg border-l border-r border-t'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface TabsProps {
  children: Array<ReactElement<TabProps>>
  activeTabIndex?: number
}

type TypeWithDisplayName = {
  displayName?: string
}

export function Tabs({ children, activeTabIndex }: TabsProps) {
  const [activeTab, setActiveTab] = useState(activeTabIndex || 0)

  const validChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type as TypeWithDisplayName).displayName === 'Tabs.Tab'
  ) as Array<React.ReactElement<TabProps>>

  return (
    <div className="border-border flex select-none flex-row justify-start gap-2 border-b">
      {React.Children.map(validChildren, (child, index) => {
        return React.cloneElement(child, {
          ...child.props,
          active: index === activeTab,
          onClick: () => {
            setActiveTab(index)
            child.props.onClick?.()
          },
        })
      })}
    </div>
  )
}

Tab.displayName = 'Tabs.Tab'
Tabs.Tab = Tab
