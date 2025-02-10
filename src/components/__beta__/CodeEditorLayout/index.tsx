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

interface CodeEditorLayoutProps {
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
    return (
      type.displayName === 'CodeEditor.Sidebar' ||
      type.displayName === 'CodeEditor.Content' ||
      type.displayName === 'CodeEditor.Tabs' ||
      type.displayName === 'CodeEditor.CommandBar'
    )
  })

  const sidebar = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Sidebar'
  })

  const contentPanes = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Content'
  })

  const tabs = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Tabs'
  })

  const commandBar = validChildren.find((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.CommandBar'
  })

  return (
    <div className="flex h-full w-full flex-col rounded-lg">
      {commandBar}
      <div className={cn('flex min-h-0 flex-row border', className)}>
        {order === 'sidebar-first' && sidebar}
        <div className="flex w-full min-w-0 flex-col">
          {tabs}
          {contentPanes}
        </div>
        {order === 'sidebar-last' && sidebar}
      </div>
    </div>
  )
}

CodeEditorLayout.displayName = 'CodeEditor'

interface CodeEditorSidebarProps extends PropsWithChildren {
  className?: string
}

const CodeEditorSidebar = ({ children, className }: CodeEditorSidebarProps) => {
  return (
    <div
      className={cn(
        'code-editor-sidebar bg-background min-w-52 max-w-60 flex-none border-l border-r p-3',
        className
      )}
    >
      {children}
    </div>
  )
}
CodeEditorSidebar.displayName = 'CodeEditor.Sidebar'

interface CodeEditorContentProps extends PropsWithChildren {
  className?: string
}

const CodeEditorContent = ({ children, className }: CodeEditorContentProps) => {
  return (
    <div
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

interface CodeEditorTabsProps extends PropsWithChildren {
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
        'code-editor-tabs bg-background flex max-w-full flex-row overflow-y-hidden overflow-x-scroll border-b [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {validChildren}
    </div>
  )
}
CodeEditorTabs.displayName = 'CodeEditor.Tabs'

interface CodeEditorTabProps {
  id: string
  title?: string
  className?: string
  active?: boolean
  closable?: boolean
  grow?: boolean
  dirty?: boolean
  onClick?: (id: string) => void
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
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </button>
    ),
    [active, hoveredCloseIntent]
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

interface CodeEditorCommandBarProps extends PropsWithChildren {
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

const CodeEditor = Object.assign(CodeEditorLayout, {
  Sidebar: CodeEditorSidebar,
  Content: CodeEditorContent,
  Tabs: CodeEditorTabs,
  Tab: CodeEditorTab,
  CommandBar: CodeEditorCommandBar,
})

export { CodeEditor }
