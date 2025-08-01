'use client'

import { ReactNode, useId, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useConfig } from '@/hooks/useConfig'
import { Theme } from '@/context/theme'
import { motion } from 'motion/react'

const THEMES: { key: Theme; icon: ReactNode }[] = [
  { key: 'light', icon: <Sun /> },
  { key: 'dark', icon: <Moon /> },
]

export interface ThemeSwitcherProps {
  onThemeSwitch?: (theme: string) => void
  className?: string
}

export function ThemeSwitcher({
  className,
  onThemeSwitch,
}: ThemeSwitcherProps) {
  const isMounted = useIsMounted()
  const { theme, setTheme } = useConfig()
  const rId = useId()

  const posX = useMemo(() => {
    const themeIndex = THEMES.findIndex((opt) => opt.key === theme)
    return 100 * themeIndex
  }, [theme])

  if (!isMounted)
    return <div className="h-[2.125rem] w-[calc(2.125rem*3+2px)]" />

  return (
    <div className="relative h-fit w-fit overflow-hidden rounded-full border border-neutral-300 bg-neutral-100 p-0 dark:border-neutral-800/30 dark:bg-neutral-900">
      <fieldset className={cn('group m-0 flex items-center', className)}>
        <legend className="sr-only">Select a display theme:</legend>
        {THEMES.map(({ key, icon }) => {
          const checked = key === theme
          const id = `theme-toggle-${key}-${rId}`
          return (
            <span key={key} className="h-full">
              <input
                tabIndex={checked ? -1 : 0}
                className="peer absolute appearance-none outline-0"
                aria-label={key}
                checked={checked}
                id={id}
                onChange={(): void => {
                  setTheme(key)
                  onThemeSwitch?.(key)
                }}
                type="radio"
                value={key}
                suppressHydrationWarning
              />
              <label
                className={cn(
                  // Base
                  'text-foreground relative flex size-[2.125rem] cursor-pointer items-center justify-center rounded-full opacity-50 transition-opacity duration-300 dark:text-neutral-300 dark:opacity-70',
                  // Checked
                  'peer-checked:cursor-default peer-checked:!opacity-100',
                  // Hover
                  'peer-interact:!opacity-100',
                  // Focus
                  'peer-focus-visible:ring-foreground peer-checked:!inset-ring-0 peer-focus-visible:inset-ring-2',
                  // Icon
                  'relative z-[1] [&_svg]:size-4 [&_svg]:text-current'
                )}
                htmlFor={id}
              >
                <span className="sr-only">{key}</span>
                {icon}
              </label>
            </span>
          )
        })}
      </fieldset>
      <motion.div
        initial={{ transform: `translateX(${posX}%)` }}
        animate={{
          transform: `translateX(${posX}%)`,
        }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.3 }}
        className="absolute top-0 left-0 z-[10] size-[2.125rem] rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10),0px_2px_1px_0px_#FFF_inset,0px_-2px_1px_0px_rgba(0,0,0,0.05)_inset] dark:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.60),0px_2px_1px_0px_#282828_inset,0px_-2px_1px_0px_rgba(0,0,0,0.05)_inset]"
        suppressHydrationWarning
      />
    </div>
  )
}
