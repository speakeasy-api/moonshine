'use client'

/**
 * TODO: Before moving out of beta
 * - Need to replace these hardcoded colors with our tokens:
 *   - All the terminal chrome colors (#27272a, #000000, etc)
 *   - Use different colors for the termainal window, may offend windows users
 */

import * as React from 'react'
import { TerminalIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface TerminalProps {
  children: React.ReactNode
  path?: string
}

export function Terminal({ children, path = '~' }: TerminalProps) {
  return (
    <div className="bg-surface-secondary-default border-neutral-softest flex h-full flex-col overflow-hidden rounded-lg border">
      {/* Header */}
      <div className="bg-surface-tertiary-default flex h-10 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <div className="ml-3 flex items-center gap-2 text-zinc-400">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{path}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow space-y-6 overflow-y-auto p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  )
}

interface TerminalPromptProps {
  path?: string
  branch?: string
  children: React.ReactNode
  isActive?: boolean
  time?: string
}

export function TerminalPrompt({
  path = '~',
  branch,
  children,
  time,
}: TerminalPromptProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <span className="text-zinc-500">{path}</span>
        {branch && (
          <>
            <span>git:</span>
            <span className="text-emerald-500">({branch})</span>
          </>
        )}
        {time && <span className="text-zinc-400">({time})</span>}
      </div>
      <div className="rounded-lg">{children}</div>
    </div>
  )
}

interface TerminalOutputProps {
  children: React.ReactNode
  className?: string
}

export function TerminalOutput({ children, className }: TerminalOutputProps) {
  return <div className={cn('pl-4 text-zinc-400', className)}>{children}</div>
}
