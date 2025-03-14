import { Button, Icon, IconName, Logo } from '@/index'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip'
import { Key } from '../KeyHint'

export interface SlimProps {
  navItems?: NavItem[]
  className?: string
  children?: React.ReactNode
  defaultExpanded?: boolean
  /**
   * Called when the user clicks the home button.
   */
  onHomeNavigation?: () => void

  onItemClick?: (item: NavItem) => void
}

export interface RenderNavItemProps {
  expanded: boolean
  active: boolean
  onClick: () => void
}

export interface NavItem {
  id: string
  icon?: IconName
  label: string
  active?: boolean
  render?: (props: RenderNavItemProps) => React.ReactNode
}

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
  defaultExpanded = false,
  onItemClick,
}: SlimProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  useEffect(() => {
    if (defaultExpanded) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [defaultExpanded])

  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'b') {
        e.preventDefault()
        onCollapse()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const onCollapse = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [expanded])

  return (
    <div className={cn('flex h-full w-full flex-row', className)}>
      <div
        className={cn(
          'bg-background relative flex flex-col gap-8 border-r px-3 py-4',
          className,
          expanded && 'min-w-48 px-4'
        )}
      >
        <div className="relative left-2 mt-1 flex w-full flex-row items-center">
          <button
            id="brand"
            onClick={onHomeNavigation}
            className="dark:text-primary text-black"
          >
            <Logo variant="icon" className="size-6 fill-current" />
          </button>
        </div>
        <div className="relative left-2 flex w-full flex-col gap-5">
          {navItems.map((item) => (
            <div className="flex w-full flex-row" key={item.label}>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  {item.icon ? (
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'flex cursor-pointer items-start gap-2',
                          item.active ? 'text-foreground' : 'text-muted'
                        )}
                        onClick={() => onItemClick?.(item)}
                      >
                        <Icon
                          name={item.icon}
                          strokeWidth={0.9}
                          className="size-6 self-center text-current"
                        />
                        {expanded && item.label}
                      </div>
                    </TooltipTrigger>
                  ) : item.render ? (
                    item.render({
                      expanded,
                      active: item.active ?? false,
                      onClick: () => onItemClick?.(item),
                    })
                  ) : (
                    <TooltipTrigger
                      onClick={() => onItemClick?.(item)}
                      className={cn(
                        'cursor-pointer',
                        item.active && 'text-foreground'
                      )}
                    >
                      {item.label}
                    </TooltipTrigger>
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
                {expanded ? 'Collapse sidebar' : 'Expand sidebar'}
                <Key className="invert" value="⌘" /> +{' '}
                <Key className="invert" value="B" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className={cn(
            'absolute inset-y-0 -right-0.5 z-30 hidden w-[2px] !cursor-w-resize transition-all after:absolute after:-inset-x-1.5 after:inset-y-0 after:opacity-20 hover:bg-zinc-700 sm:flex [&[data-state="collapsed"]]:!cursor-e-resize',
            expanded ? 'cursor-e-resize' : 'cursor-w-resize'
          )}
          data-state={expanded ? 'expanded' : 'collapsed'}
          onClick={onCollapse}
        />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

Slim.displayName = 'Navbar.Slim'
