import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import {
  isValidElement,
  ReactNode,
  Children,
  PropsWithChildren,
  useState,
  useMemo,
} from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

export interface CodeEditorLayoutProps {
  children: ReactNode[]
  className?: string
  order?: 'sidebar-first' | 'sidebar-last'
}

const CodeEditorLayout = ({
  children,
  className,
  order = 'sidebar-first',
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
        `Invalid child type: ${type.displayName}. Must be one of: CodeEditor.Sidebar, CodeEditor.Content, CodeEditor.Tabs, CodeEditor.CommandBar`
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

    if (!Array.isArray(tabs.props.children)) return false
    return tabs.props.children.some(
      (child: { props: { active: boolean } }) => child.props.active
    )
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
          {hasActiveTab ? contentPane : empty}
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
    ResizablePanelProps {
  className?: string
}

const CodeEditorSidebar = ({
  children,
  className,
  minWidth = 20,
  maxWidth,
}: CodeEditorSidebarProps) => {
  return (
    <div
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
  extends PropsWithChildren,
    ResizablePanelProps {
  className?: string
}

const CodeEditorContent = ({
  children,
  className,
  minWidth,
  maxWidth,
}: CodeEditorContentProps) => {
  return (
    <div
      data-min-width={minWidth}
      data-max-width={maxWidth}
      className={cn(
        'code-editor-content bg-background [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:hover:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-card flex-1 overflow-x-hidden overflow-y-scroll px-3 [&::-webkit-scrollbar]:w-2',
        className
      )}
    >
      {children}
    </div>
  )
}
CodeEditorContent.displayName = 'CodeEditor.Content'

export interface CodeEditorTabsProps extends PropsWithChildren {
  className?: string
}

const CodeEditorTabs = ({ children, className }: CodeEditorTabsProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Tab'
  })

  return (
    <div
      className={cn(
        'code-editor-tabs bg-background flex max-w-full flex-row overflow-y-hidden overflow-x-scroll border-b [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {validChildren}
    </div>
  )
}
CodeEditorTabs.displayName = 'CodeEditor.Tabs'

export interface CodeEditorTabProps {
  id: string
  title?: string
  className?: string
  active?: boolean
  closable?: boolean
  grow?: boolean
  dirty?: boolean
  onClick?: (id: string) => void
  onClose?: (id: string) => void
}

const CodeEditorTab = ({
  id,
  title,
  className,
  active,
  closable,
  grow,
  dirty,
  onClick,
  onClose,
}: CodeEditorTabProps) => {
  const [hoveredCloseIntent, setHoveredCloseIntent] = useState(false)
  const closeButton = useMemo(
    () => (
      <button
        className={cn(
          'text-muted hover:text-foreground ml-auto h-full rounded-sm px-0.5',
          hoveredCloseIntent && 'bg-background/50'
        )}
        onMouseEnter={() => setHoveredCloseIntent(true)}
        onMouseLeave={() => setHoveredCloseIntent(false)}
        onClick={() => onClose?.(id)}
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </button>
    ),
    [hoveredCloseIntent, onClose, id]
  )
  return (
    <div
      className={cn(
        'code-editor-tab bg-background flex flex-shrink cursor-pointer select-none items-center justify-center gap-2.5 rounded-sm rounded-t-none border border-b-0 border-t-0 py-2 pl-3 pr-2 text-sm first-of-type:border-l-0 [&:not(:last-child)]:border-r-0',
        active && 'text-foreground bg-foreground/10',
        !active && 'hover:bg-muted/75',
        grow && 'flex-1',
        dirty && 'italic text-yellow-700 dark:text-yellow-400',
        className
      )}
      key={id}
      onClick={() => onClick?.(id)}
    >
      <span title={title} className="max-w-44 truncate">
        {title}
      </span>
      {closable && !dirty && closeButton}
      {dirty && (
        <span
          onMouseEnter={() => setHoveredCloseIntent(true)}
          className="text-muted ml-auto flex h-full w-3 items-center justify-center text-xs"
        >
          {!hoveredCloseIntent ? (
            <Icon name="circle" className="fill-foreground h-2.5 w-2.5" />
          ) : (
            closeButton
          )}
        </span>
      )}
    </div>
  )
}
CodeEditorTab.displayName = 'CodeEditor.Tab'

export interface CodeEditorCommandBarProps extends PropsWithChildren {
  className?: string
}

const CodeEditorCommandBar = ({
  children,
  className,
}: CodeEditorCommandBarProps) => {
  return (
    <div
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

export interface CodeEditorEmptyProps extends PropsWithChildren {
  className?: string
}

const Empty = ({ children, className }: CodeEditorEmptyProps) => {
  return <div className={cn('h-full w-full', className)}>{children}</div>
}

Empty.displayName = 'CodeEditor.Empty'

const CodeEditor = Object.assign(CodeEditorLayout, {
  Sidebar: CodeEditorSidebar,
  Content: CodeEditorContent,
  Tabs: CodeEditorTabs,
  Tab: CodeEditorTab,
  CommandBar: CodeEditorCommandBar,
  Empty: Empty,
})

export { CodeEditor }
