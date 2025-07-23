import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { Icon } from '../Icon'
import { useConfig } from '@/hooks/useConfig'

type ThemeSwitcherProps = {
  iconClassName?: string
  strokeWidth?: number
}

export function ThemeSwitcher({
  iconClassName,
  strokeWidth = 1.5,
}: ThemeSwitcherProps) {
  const { theme: currentTheme, setTheme } = useConfig()

  const handleThemeChange = useCallback(() => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [currentTheme, setTheme])

  return (
    <motion.button
      // Dont play the animation on mount
      initial={false}
      animate={{ rotate: currentTheme === 'dark' ? -360 : 360 }}
      transition={{ duration: 0.5 }}
      className="text-muted hover:text-highlight! cursor-pointer rounded-full"
      onClick={handleThemeChange}
    >
      <Icon
        name={currentTheme === 'dark' ? 'sun' : 'moon'}
        strokeWidth={strokeWidth}
        className={cn(
          'size-5',
          currentTheme === 'dark' ? '' : 'fill-current',
          iconClassName
        )}
      />
    </motion.button>
  )
}
