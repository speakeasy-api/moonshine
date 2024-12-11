import React, { useState, useEffect } from 'react'
import { Icon as FallbackIcon } from '../Icon'

type AllExternalIcons =
  | 'github'
  | 'npm'
  | 'rubygems'
  | 'nuget'
  | 'maven'
  | 'pypi'
  | 'packagist'
  | 'terraform'
const supportedExternals = ['github', 'npm', 'rubygems']

interface ExternalPillProps {
  href: string
  icon: AllExternalIcons
  text: React.ReactNode
  title?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export function ExternalPill({
  href,
  icon,
  text,
  target = '_blank',
  title,
}: ExternalPillProps) {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    if (supportedExternals.includes(icon)) {
      import(`../../assets/icons/external/${icon}.svg?react`).then((module) =>
        setIcon(module.default)
      )
    }
  }, [icon])

  return (
    <a
      href={href}
      target={target}
      title={title}
      className="inline-flex flex-row items-center gap-1.5 rounded-xl border px-3.5 py-2 text-zinc-700 transition-colors duration-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-black dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 hover:dark:text-white"
    >
      {Icon ? <Icon /> : <FallbackIcon name="external-link" />}
      <p className="text-xs font-normal">{text}</p>
    </a>
  )
}
