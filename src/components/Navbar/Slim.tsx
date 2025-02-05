import { Icon, IconName, Logo } from '@/index'
import { NavbarProps } from './types'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip'
import { ResizablePanel } from '../__beta__/ResizablePanel'
import {
  ImperativePanelHandle,
  disableGlobalCursorStyles,
} from 'react-resizable-panels'

export interface SlimProps extends NavbarProps {
  orientation?: 'horizontal' | 'vertical'
  navItems?: NavItems[]
  className?: string
  children?: React.ReactNode
  defaultExpanded?: boolean
}

export interface NavItems {
  icon?: IconName
  label: string
  render?: ({ expanded }: { expanded: boolean }) => React.ReactNode
  onClick: () => void
}

disableGlobalCursorStyles()
/**
 * A slim version of the Navbar.
 * To be used on full screen pages.
 *
 */
export const Slim = ({
  orgs,
  onSelect,
  onHomeNavigation,
  orientation = 'horizontal',
  navItems = [],
  className,
  children,
  defaultExpanded = true,
}: SlimProps) => {
  const containerClasses: string =
    orientation === 'vertical'
      ? 'flex-col min-h-svh border-r items-center p-4'
      : 'min-w-svw flex-row border-b items-center py-3 px-4'
  const sidebarRef = useRef<ImperativePanelHandle>(null)
  const [expanded, setExpanded] = useState(defaultExpanded)

  useEffect(() => {
    if (defaultExpanded) {
      console.log('expanding')
      sidebarRef.current?.expand()
      setExpanded(true)
    } else {
      sidebarRef.current?.collapse()
      setExpanded(false)
    }
  }, [])

  const onCollapse = () => {
    if (sidebarRef.current) {
      if (sidebarRef.current.isCollapsed()) {
        sidebarRef.current.expand()
        setExpanded(true)
      } else {
        sidebarRef.current.collapse()
        setExpanded(false)
      }
    }
  }

  return (
    <ResizablePanel
      data-panel="navsidebar"
      useDefaultHandle={false}
      direction="horizontal"
    >
      <ResizablePanel.Pane
        className="relative min-h-screen"
        panelRef={sidebarRef}
        id="1"
        key="1"
        collapsible
        collapsedSize={8}
        minSize={8}
        maxSize={20}
      >
        <div
          className={cn(
            'bg-background relative flex gap-5 px-2 py-4',
            containerClasses,
            className
          )}
        >
          <div id="brand" className="flex w-full place-self-start">
            <button onClick={onHomeNavigation}>
              <Logo variant="icon" className="h-5 w-6" />
            </button>
          </div>
          <div className="flex w-full flex-col gap-5">
            {navItems.map((item) => (
              <div
                className={cn(
                  'flex w-full flex-row',
                  expanded ? 'justify-start' : 'justify-center'
                )}
                key={item.label}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button className="w-full" onClick={item.onClick}>
                        {item.icon ? (
                          <div className="flex items-start gap-2">
                            <Icon
                              name={item.icon}
                              className="text-foreground hover:text-foreground size-6 self-center"
                            />
                            {expanded && item.label}
                          </div>
                        ) : item.render ? (
                          item.render({
                            expanded,
                          })
                        ) : (
                          item.label
                        )}
                      </button>
                    </TooltipTrigger>

                    <TooltipContent
                      side="right"
                      className="bg-foreground text-background border-foreground"
                    >
                      <TooltipArrow className="fill-foreground" />
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
          <ResizablePanel.ResizeHandle
            data-state={expanded ? 'expanded' : 'collapsed'}
            className={cn(
              'pointer-events-auto absolute inset-y-0 -right-px z-30 hidden w-[3px] !cursor-w-resize transition-all after:absolute after:-inset-x-1.5 after:inset-y-0 after:opacity-20 hover:bg-zinc-800 sm:flex [&[data-state="collapsed"]]:!cursor-e-resize'
            )}
            onClick={onCollapse}
          ></ResizablePanel.ResizeHandle>
        </div>
      </ResizablePanel.Pane>

      <ResizablePanel.Pane order={2}>{children}</ResizablePanel.Pane>
    </ResizablePanel>
  )
}

Slim.displayName = 'Navbar.Slim'
