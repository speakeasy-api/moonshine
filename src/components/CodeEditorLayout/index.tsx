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
import {
  Panel,
  PanelGroup,
  PanelProps,
  PanelResizeHandle,
} from 'react-resizable-panels'

export interface CodeEditorLayoutProps {
  children: ReactNode[]
  className?: string
}

const CodeEditorLayout = ({ children, className }: CodeEditorLayoutProps) => {
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    const isValidSubType =
      type.displayName === 'CodeEditor.Pane' ||
      type.displayName === 'CodeEditor.Tabs' ||
      type.displayName === 'CodeEditor.CommandBar' ||
      type.displayName === 'CodeEditor.Empty'

    if (!isValidSubType) {
      console.warn(
        `Invalid child type: ${type.displayName}. Must be one of: CodeEditor.Pane, CodeEditor.Tabs, CodeEditor.CommandBar, CodeEditor.Empty`
      )
    }

    return isValidSubType
  })

  const panes = validChildren.filter((child) => {
    if (!isValidElement(child)) return false
    const type = child.type as { displayName?: string }
    return type.displayName === 'CodeEditor.Pane'
  })

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
        className={cn('flex min-h-0 flex-row', className)}
        direction="horizontal"
      >
        {Children.map(panes, (pane, index) =>
          index < panes.length - 1 ? (
            <>
              {pane}

              <PanelResizeHandle className="bg-muted" />
            </>
          ) : (
            pane
          )
        )}
        {empty && <Panel>{empty}</Panel>}
      </PanelGroup>
    </div>
  )
}

CodeEditorLayout.displayName = 'CodeEditor'

export interface CodeEditorPaneProps extends PanelProps {
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
}

const CodeEditorPane = ({
  children,
  className,
  minSize,
  maxSize,
  containerRef,
  ...props
}: CodeEditorPaneProps) => {
  return (
    <Panel
      {...props}
      minSize={minSize}
      maxSize={maxSize}
      className={cn(className)}
    >
      <div
        className={cn(
          'bg-background [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:hover:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-card h-full flex-1 overflow-x-hidden overflow-y-scroll border',
          className
        )}
        ref={containerRef}
      >
        {children}
      </div>
    </Panel>
  )
}
CodeEditorPane.displayName = 'CodeEditor.Pane'

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
        'code-editor-tabs bg-background flex w-full flex-row overflow-x-scroll overflow-y-hidden border-b [&::-webkit-scrollbar]:hidden',
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
          'text-body-muted hover:text-foreground ml-auto h-full rounded-sm px-0.5',
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
        'code-editor-tab bg-background hover:bg-muted/50 flex w-fit cursor-pointer items-center justify-center gap-2.5 rounded-sm rounded-t-none border-r py-2 pr-2 pl-3 text-sm select-none first-of-type:border-l-0',
        active && 'text-foreground bg-foreground/5 hover:bg-foreground/10',
        !active && 'text-body-muted',
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

        <span title={typeof title === 'string' ? title : undefined}>
          {title}
        </span>
      </div>
      {closable && !dirty && closeButton}
      {dirty && (
        <span
          onMouseEnter={() => setHoveredCloseIntent(true)}
          className="text-body-muted ml-auto flex h-full w-3 items-center justify-center text-xs"
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
        'code-editor-command-bar bg-muted rounded-sm rounded-b-none px-3 py-1',
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
  Pane: CodeEditorPane,
  CommandBar: CodeEditorCommandBar,
  Empty: Empty,
  Tabs: CodeEditorTabs,
  Tab: CodeEditorTab,
})

export { CodeEditor }
