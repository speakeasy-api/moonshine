import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import React, { Children, isValidElement, useMemo } from 'react'
import { ComponentProps, ReactNode } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
interface ResizeHandleProps extends ComponentProps<typeof PanelResizeHandle> {
  children?: ReactNode
}

const ResizeHandle = ({ children, ...props }: ResizeHandleProps) => {
  return <PanelResizeHandle {...props}>{children}</PanelResizeHandle>
}

ResizeHandle.displayName = 'ResizablePanel.ResizeHandle'

export interface ResizablePanelProps extends ComponentProps<typeof PanelGroup> {
  children: ReactNode
  className?: string
  useDefaultHandle?: boolean
}

const ResizablePanel = ({
  children,
  className,
  useDefaultHandle = true,
  onResize,
  ...props
}: ResizablePanelProps) => {
  const validChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (!isValidElement(child)) return false
        const type = child.type as { displayName?: string }
        return (
          type.displayName === 'ResizablePanel.Pane' ||
          type.displayName === 'ResizablePanel.ResizeHandle'
        )
      }),
    [children]
  )

  return (
    <PanelGroup onResize={onResize} {...props} className={className}>
      {React.Children.map(validChildren, (child, index) => {
        if (!isValidElement(child)) return child
        return (
          <>
            {child}

            {index < validChildren.length - 1 && useDefaultHandle && (
              <DefaultResizeHandle direction={props.direction} />
            )}
          </>
        )
      })}
    </PanelGroup>
  )
}

interface PaneProps extends ComponentProps<typeof Panel> {
  children: ReactNode
  className?: string
}

const Pane = ({ children, className, ...props }: PaneProps) => {
  return (
    <Panel className={className} {...props}>
      {children}
    </Panel>
  )
}

Pane.displayName = 'ResizablePanel.Pane'

const DefaultResizeHandle = ({
  direction,
}: {
  direction: 'horizontal' | 'vertical'
}) => {
  return (
    <PanelResizeHandle className="bg-border relative w-px">
      <div
        className={cn(
          'bg-card text-muted hover:text-foreground absolute top-[50%] flex h-6 w-4 translate-x-[-50%] items-center justify-center rounded-md',
          direction === 'vertical' ? 'cursor-ns-resize' : 'cursor-ew-resize'
        )}
      >
        <Icon name="grip-vertical" size="small" />
      </div>
    </PanelResizeHandle>
  )
}

const ResizablePanelWithSubcomponents = Object.assign(ResizablePanel, {
  Pane,
  ResizeHandle,
})

export { ResizablePanelWithSubcomponents as ResizablePanel }
