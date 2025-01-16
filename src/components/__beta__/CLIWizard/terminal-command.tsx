/**
 * TODO: Clean up before moving out of beta
 * - Replace hardcoded colors with our tokens (the green highlight, hover states, etc)
 * - Use our standard font size tokens instead of hardcoding small/medium/large
 * - Add loading state for copy action
 * - Add an animation around the active command
 */

import React from 'react'
import { Check, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import { TerminalPrompt, TerminalOutput } from './terminal'
import { cn } from '@/lib/utils'

interface TerminalCommandProps {
  code: string
  language: string
  onSelectOrCopy?: () => void
  copyable?: boolean
  fontSize?: 'small' | 'medium' | 'large'
  isActive?: boolean
  comment?: string
  path?: string
}

export function TerminalCommand({
  code,
  onSelectOrCopy,
  copyable = true,
  fontSize = 'medium',
  isActive = false,
  comment,
  path,
}: TerminalCommandProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    onSelectOrCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      <TerminalPrompt path={path} branch="main">
        <button
          onClick={handleCopy}
          className="w-full text-left"
          aria-label={copied ? 'Copied' : 'Copy command'}
        >
          <div
            className={cn(
              'relative -mx-2 rounded-md px-2 py-0.5 transition-colors',
              isActive && 'bg-emerald-500/10',
              !isActive && 'hover:bg-zinc-800'
            )}
          >
            <div className="flex items-start gap-2">
              <span className="select-none text-emerald-500">$</span>
              <span
                className={cn(
                  'mt-0.5 flex-1 select-text font-mono font-medium tracking-normal text-[#e4e4e7]',
                  fontSize === 'small' && 'text-sm',
                  fontSize === 'medium' && 'text-base',
                  fontSize === 'large' && 'text-lg'
                )}
              >
                {code}
              </span>
              {copyable && (
                <span
                  className={cn('mt-1.5 shrink-0', isActive && 'opacity-100')}
                >
                  {copied ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <Copy
                      className={cn(
                        'h-3.5 w-3.5 transition-colors',
                        'text-muted group-hover:text-muted-foreground'
                      )}
                    />
                  )}
                </span>
              )}
            </div>
          </div>
        </button>
      </TerminalPrompt>
      {comment && (
        <TerminalOutput>
          <span className="text-xs text-zinc-400"># {comment}</span>
        </TerminalOutput>
      )}
    </div>
  )
}
