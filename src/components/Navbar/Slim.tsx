import { Button, Icon, IconName, Logo } from '@/index'
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
import { Key } from '../__beta__/KeyHint'

export interface SlimProps {
  navItems?: NavItems[]
  className?: string
  children?: React.ReactNode
  defaultExpanded?: boolean
  /**
   * Called when the user clicks the home button.
   */
  onHomeNavigation?: () => void
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
  onHomeNavigation,
  navItems = [],
  className,
  children,
  defaultExpanded = true,
}: SlimProps) => {
  const containerClasses: string =
    'flex-col min-h-full border-r items-center p-4'
  const sidebarRef = useRef<ImperativePanelHandle>(null)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const transitionRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (transitionRef.current) {
      // Apply the transition after the component has mounted
      transitionRef.current.style.transition = '0.15s ease-in-out'
      transitionRef.current.style.transitionProperty = 'flex'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.metaKey && e.key === 'b') {
        onCollapse()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
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
        className="relative max-h-screen"
        panelRef={sidebarRef}
        style={{
          transition: 'none', // Initially set to none
          transitionProperty: 'none', // Initially set to none
        }}
        id="1"
        key="1"
        collapsible
        collapsedSize={5}
        minSize={5}
        maxSize={20}
      >
        <div
          ref={transitionRef}
          className={cn(
            'bg-background relative flex gap-5 px-2 py-4',
            containerClasses,
            className
          )}
        >
          <div className="mt-1 flex w-full flex-row items-center justify-center">
            <button
              id="brand"
              onClick={onHomeNavigation}
              className={cn(expanded ? 'self-center' : 'self-center')}
            >
              <Logo variant="icon" className="h-5 w-6" />
            </button>

            {expanded && (
              <div className="ml-auto">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        className="self-start"
                        variant="ghost"
                        size="sm"
                        onClick={onCollapse}
                      >
                        <Icon name="panel-left" className="text-muted" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-foreground text-background border-foreground flex flex-row items-center gap-2 text-sm"
                    >
                      <TooltipArrow className="fill-foreground" />
                      Collapse sidebar <Key
                        className="invert"
                        value="⌘"
                      /> + <Key className="invert" value="B" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-5">
            {navItems.map((item) => (
              <div
                className={cn(
                  'flex w-full flex-row justify-center',
                  expanded ? 'justify-start' : 'justify-center'
                )}
                key={item.label}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    {item.icon ? (
                      <TooltipTrigger>
                        <div className="flex items-start gap-2">
                          <Icon
                            name={item.icon}
                            strokeWidth={0.9}
                            className="text-muted hover:text-foreground size-6 self-center"
                          />
                          {expanded && item.label}
                        </div>
                      </TooltipTrigger>
                    ) : item.render ? (
                      item.render({
                        expanded,
                      })
                    ) : (
                      <TooltipTrigger>{item.label}</TooltipTrigger>
                    )}

                    <TooltipContent
                      side="right"
                      hidden={item.render !== undefined}
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

          {!expanded && (
            <div className="mt-auto cursor-pointer">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button variant="ghost" size="sm" onClick={onCollapse}>
                      <Icon name="panel-left" className="text-muted" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="start"
                    className="bg-foreground text-background border-foreground flex flex-row items-center gap-2 text-sm"
                  >
                    <TooltipArrow className="fill-foreground" />
                    Expand sidebar <Key className="invert" value="⌘" /> +{' '}
                    <Key className="invert" value="B" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          <ResizablePanel.ResizeHandle
            disabled
            hitAreaMargins={{
              coarse: 10,
              fine: 10,
            }}
            data-state={expanded ? 'expanded' : 'collapsed'}
            className={cn(
              'pointer-events-auto absolute inset-y-0 -right-px z-30 hidden w-[3px] !cursor-w-resize transition-all after:absolute after:-inset-x-1.5 after:inset-y-0 after:opacity-20 hover:bg-zinc-700 sm:flex [&[data-state="collapsed"]]:!cursor-e-resize'
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
