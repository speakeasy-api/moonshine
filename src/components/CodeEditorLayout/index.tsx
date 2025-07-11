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
  children: ReactNode[] | ReactNode
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

              <PanelResizeHandle className="bg-background" />
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

  /**
   * Optional tabs to display above the scrolling pane
   */
  tabs?: React.ReactNode
}

const CodeEditorPane = ({
  children,
  className,
  minSize,
  maxSize,
  containerRef,
  tabs,
  ...props
}: CodeEditorPaneProps) => {
  return (
    <Panel
      {...props}
      minSize={minSize}
      maxSize={maxSize}
      className={cn(className)}
    >
      {tabs}
      <div
        className={cn(
          'bg-background [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:hover:bg-foreground/20 [&::-webkit-scrollbar-track]:bg-card border-neutral-softest h-full flex-1 overflow-x-hidden overflow-y-scroll border',
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
      type.displayName === 'CodeEditor.CustomTabElement'
    )
  })

  return (
    <div
      {...props}
      className={cn(
        'code-editor-tabs bg-background border-neutral-softest flex w-full flex-row overflow-x-scroll overflow-y-hidden border-b [&::-webkit-scrollbar]:hidden',
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

  /**
   * Custom styles for the tab
   */
  customStyles?: CodeEditorTabStateCustomStyles
}

/**
 * Allows for custom styles to be applied to the tab based on its state
 *
 * @example
 * <CodeEditor.Tab
 *   customStyles={{
 *     active: 'text-foreground bg-background',
 *     inactive: 'text-body-muted bg-muted',
 *     dirty: 'text-yellow-700/90 italic dark:text-yellow-300/70',
 *     invalid: 'text-red-700 dark:text-red-400',
 *     disabled: 'cursor-not-allowed opacity-75',
 *   }}
 * />
 */
type CodeEditorTabStateCustomStyles = {
  active?: string
  inactive?: string
  dirty?: string
  invalid?: string
  disabled?: string
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
  customStyles,
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
          'text-body-muted hover:bg-muted hover:dark:bg-foreground/15 hover:text-foreground ml-auto h-full rounded-sm p-0.5',
          hoveredCloseIntent && 'bg-background/80',
          hoveredCloseIntent &&
            dirty &&
            `!bg-foreground/5 dark:!bg-foreground/10`
        )}
        onMouseEnter={() => setHoveredCloseIntent(true)}
        onMouseLeave={() => setHoveredCloseIntent(false)}
        onClick={handleClose}
      >
        <Icon name="x" className="h-3.5 w-3.5" />
      </button>
    ),
    [hoveredCloseIntent, onClose, id, active]
  )

  return (
    <div
      {...props}
      className={cn(
        'code-editor-tab bg-background border-neutral-softest flex w-fit cursor-pointer items-center justify-start gap-2.5 rounded-sm rounded-t-none border-r py-2 pr-2 pl-3 text-sm whitespace-nowrap select-none first-of-type:border-l-0',
        grow && 'flex-1',
        active && 'text-foreground bg-background',
        !active && 'text-body-muted bg-muted',
        dirty && 'text-warning',
        invalid && 'text-destructive-foreground dark:text-destructive',
        disabled && 'cursor-not-allowed opacity-75',
        className,

        // Override styles
        customStyles && customStyles.active,
        customStyles && customStyles.inactive,
        customStyles && customStyles.dirty,
        customStyles && customStyles.invalid,
        customStyles && customStyles.disabled
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

export interface CodeEditorCustomElementProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string
}

const CustomTabElement = ({
  children,
  className,
  ...props
}: CodeEditorCustomElementProps) => {
  return (
    <div className={cn('h-full w-full', className)} {...props}>
      {children}
    </div>
  )
}
CustomTabElement.displayName = 'CodeEditor.CustomTabElement'

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
  CustomTabElement: CustomTabElement,
})

export { CodeEditor }
