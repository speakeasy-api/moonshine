import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import {
  isValidElement,
  ReactNode,
  Children,
  PropsWithChildren,
  useState,
  useMemo,
  HTMLAttributes,
} from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export interface CodeEditorLayoutProps {
  children: ReactNode[]
  className?: string
  order?: 'sidebar-first' | 'sidebar-last'
  showEmptyState?: boolean
}

const CodeEditorLayout = ({
  children,
  className,
  order = 'sidebar-first',
  showEmptyState = false,
}: CodeEditorLayoutProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    const isValidSubType =
      type.displayName === 'CodeEditor.Sidebar' ||
      type.displayName === 'CodeEditor.Content' ||
      type.displayName === 'CodeEditor.Tabs' ||
      type.displayName === 'CodeEditor.CommandBar' ||
      type.displayName === 'CodeEditor.Empty'

    if (!isValidSubType) {
      console.warn(
        `Invalid child type: ${type.displayName}. Must be one of: CodeEditor.Sidebar, CodeEditor.Content, CodeEditor.Tabs, CodeEditor.CommandBar, CodeEditor.Empty, CodeEditor.CustomElement`
      )
    }

    return isValidSubType
  })

  const sidebar = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Sidebar'
  })

  const contentPane = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Content'
  })

  const minContentWidth = useMemo(() => {
    if (!contentPane) return undefined
    if (!isValidElement(contentPane)) return undefined
    const minWidth = contentPane.props.minWidth
    return minWidth ? minWidth : undefined
  }, [contentPane])

  const maxContentWidth = useMemo(() => {
    if (!contentPane) return undefined
    if (!isValidElement(contentPane)) return undefined
    const maxWidth = contentPane.props.maxWidth
    return maxWidth ? maxWidth : undefined
  }, [contentPane])

  const sidebarMinWidth = useMemo(() => {
    if (!sidebar) return undefined
    if (!isValidElement(sidebar)) return undefined
    const minWidth = sidebar.props.minWidth
    return minWidth ? minWidth : undefined
  }, [sidebar])

  const sidebarMaxWidth = useMemo(() => {
    if (!sidebar) return undefined
    if (!isValidElement(sidebar)) return undefined
    const maxWidth = sidebar.props.maxWidth
    return maxWidth ? maxWidth : undefined
  }, [sidebar])

  const tabs = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Tabs'
  })

  const hasActiveTab = useMemo(() => {
    if (!tabs) return false
    if (!isValidElement(tabs)) return false

    const arr = Children.toArray(tabs.props.children)
    if (!Array.isArray(arr)) return false
    return arr.some((child) => {
      if (!isValidElement(child)) return false
      const type = child.type as { displayName?: string }
      return type.displayName === 'CodeEditor.Tab' && child.props.active
    })
  }, [tabs])

  const empty = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Empty'
  })

  const commandBar = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.CommandBar'
  })

  return (
    <div className="flex h-full w-full flex-col rounded-lg">
      {commandBar}
      <PanelGroup
        className={cn('flex min-h-0 flex-row border', className)}
        direction="horizontal"
      >
        {order === 'sidebar-first' && (
          <Panel
            order={1}
            minSize={sidebarMinWidth}
            defaultSize={sidebarMinWidth}
            maxSize={sidebarMaxWidth}
          >
            {sidebar}
          </Panel>
        )}
        {order === 'sidebar-first' && <PanelResizeHandle className="h-full" />}
        <Panel
          defaultSize={minContentWidth}
          maxSize={maxContentWidth}
          className="flex w-full min-w-0 flex-col"
          order={order === 'sidebar-first' ? 1 : 2}
        >
          {hasActiveTab && tabs}
          {!showEmptyState ? contentPane : empty}
        </Panel>
        {order === 'sidebar-last' && <PanelResizeHandle />}
        {order === 'sidebar-last' && (
          <Panel
            order={2}
            minSize={sidebarMinWidth}
            defaultSize={sidebarMinWidth}
            maxSize={sidebarMaxWidth}
          >
            {sidebar}
          </Panel>
        )}
      </PanelGroup>
    </div>
  )
}

CodeEditorLayout.displayName = 'CodeEditor'

export interface CodeEditorSidebarProps
  extends PropsWithChildren,
    ResizablePanelProps,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CodeEditorSidebar = ({
  children,
  className,
  minWidth = 20,
  maxWidth,
  ...props
}: CodeEditorSidebarProps) => {
  return (
    <div
      {...props}
      data-min-width={minWidth}
      data-max-width={maxWidth}
      className={cn(
        'code-editor-sidebar bg-background h-full w-full flex-none border-l border-r p-3',
        className
      )}
    >
      {children}
    </div>
  )
}
CodeEditorSidebar.displayName = 'CodeEditor.Sidebar'

export interface ResizablePanelProps {
  className?: string
  minWidth: number
  maxWidth?: number
}

export interface CodeEditorContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ResizablePanelProps {
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
}

const CodeEditorContent = ({
  children,
  className,
  minWidth,
  maxWidth,
  containerRef,
  ...props
}: CodeEditorContentProps) => {
  return (
    <div
      {...props}
      data-min-width={minWidth}
      data-max-width={maxWidth}
      className={cn(
        'code-editor-content bg-background [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:hover:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-card flex-1 overflow-x-hidden overflow-y-scroll px-3 [&::-webkit-scrollbar]:w-2',
        className
      )}
      ref={containerRef}
    >
      {children}
    </div>
  )
}
CodeEditorContent.displayName = 'CodeEditor.Content'

export interface CodeEditorTabsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CodeEditorTabs = ({
  children,
  className,
  ...props
}: CodeEditorTabsProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return (
      type.displayName === 'CodeEditor.Tab' ||
      type.displayName === 'CodeEditor.CustomElement'
    )
  })

  return (
    <div
      {...props}
      className={cn(
        'code-editor-tabs bg-background flex w-full flex-row overflow-y-hidden overflow-x-scroll border-b [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {validChildren}
    </div>
  )
}
CodeEditorTabs.displayName = 'CodeEditor.Tabs'

export interface CodeEditorTabProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  id: string
  title?: string | ReactNode
  className?: string
  active?: boolean
  closable?: boolean
  grow?: boolean
  icon?: ReactNode
  invalid?: boolean
  dirty?: boolean
  onClick?: (id: string) => void
  onClose?: (id: string) => void

  /**
   * If true, the tab will not be interactive
   * Useful for loading states
   */
  disabled?: boolean
}

const CodeEditorTab = ({
  id,
  title,
  className,
  active,
  closable,
  grow,
  dirty,
  invalid,
  onClick,
  onClose,
  icon,
  disabled,
  ...props
}: CodeEditorTabProps) => {
  const [hoveredCloseIntent, setHoveredCloseIntent] = useState(false)
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stop the event from bubbling up to the parent tab click handler
    e.stopPropagation()
    onClose?.(id)
    setHoveredCloseIntent(false)
  }
  const closeButton = useMemo(
    () => (
      <button
        className={cn(
          'text-muted hover:text-foreground ml-auto h-full rounded-sm px-0.5',
          hoveredCloseIntent && 'bg-background/80'
        )}
        onMouseEnter={() => setHoveredCloseIntent(true)}
        onMouseLeave={() => setHoveredCloseIntent(false)}
        onClick={handleClose}
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </button>
    ),
    [hoveredCloseIntent, onClose, id]
  )
  return (
    <div
      {...props}
      className={cn(
        'code-editor-tab bg-background hover:bg-muted/50 flex w-fit cursor-pointer select-none items-center justify-center gap-2.5 rounded-sm rounded-t-none border-r py-2 pl-3 pr-2 text-sm first-of-type:border-l-0',
        active && 'text-foreground bg-foreground/5 hover:bg-foreground/10',
        !active && 'text-muted',
        grow && 'flex-1',
        dirty && 'italic',
        invalid && 'text-red-700 dark:text-red-400',
        disabled && 'cursor-not-allowed opacity-75',
        className
      )}
      key={id}
      onClick={() => onClick?.(id)}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="flex items-center">{icon}</span>}

        <span
          title={typeof title === 'string' ? title : undefined}
          className="max-w-44 truncate"
        >
          {title}
        </span>
      </div>
      {closable && !dirty && closeButton}
      {dirty && (
        <span
          onMouseEnter={() => setHoveredCloseIntent(true)}
          className="text-muted ml-auto flex h-full w-3 items-center justify-center text-xs"
        >
          {!hoveredCloseIntent ? (
            <Icon name="circle" className="fill-foreground h-2.5 w-2.5" />
          ) : closable ? (
            closeButton
          ) : (
            <Icon name="circle" className="fill-foreground h-2.5 w-2.5" />
          )}
        </span>
      )}
    </div>
  )
}
CodeEditorTab.displayName = 'CodeEditor.Tab'

export interface CodeEditorCustomElementProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CodeEditorCustomElement = ({
  children,
  className,
  ...props
}: CodeEditorCustomElementProps) => {
  return (
    <div className={cn('code-editor-custom-element', className)} {...props}>
      {children}
    </div>
  )
}
CodeEditorCustomElement.displayName = 'CodeEditor.CustomElement'

export interface CodeEditorCommandBarProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CodeEditorCommandBar = ({
  children,
  className,
  ...props
}: CodeEditorCommandBarProps) => {
  return (
    <div
      {...props}
      className={cn(
        'code-editor-command-bar bg-muted rounded-sm rounded-b-none border-l border-r border-t px-3 py-1',
        className
      )}
    >
      {children}
    </div>
  )
}
CodeEditorCommandBar.displayName = 'CodeEditor.CommandBar'

export interface CodeEditorEmptyProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Empty = ({ children, className, ...props }: CodeEditorEmptyProps) => {
  return (
    <div className={cn('h-full w-full', className)} {...props}>
      {children}
    </div>
  )
}

Empty.displayName = 'CodeEditor.Empty'

const CodeEditor = Object.assign(CodeEditorLayout, {
  Sidebar: CodeEditorSidebar,
  Content: CodeEditorContent,
  Tabs: CodeEditorTabs,
  Tab: CodeEditorTab,
  CommandBar: CodeEditorCommandBar,
  Empty: Empty,
  CustomElement: CodeEditorCustomElement,
})

export { CodeEditor }
