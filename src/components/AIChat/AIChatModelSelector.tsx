import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { Icon } from '../Icon'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

interface ModelSelectorConfig {
  model: string
  onModelChange: (v: string) => void
  availableModels: { label: string; value: string }[]
}

interface AIChatModelSelectorProps {
  modelSelector?: ModelSelectorConfig
  className?: string
}

const AnimatedLabel = React.memo(function AnimatedLabel({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  const parent = {
    visible: {
      transition: { staggerChildren: 0.03 },
    },
  }

  const char = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  }

  return (
    <motion.span
      className={cn('inline-flex', className)}
      variants={parent}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ willChange: 'transform, opacity' }}
    >
      {label.split('').map((c, i) => (
        <motion.span
          key={`${label}-${i}`}
          variants={char}
          className="block"
          style={{ willChange: 'transform, opacity' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.span>
  )
})

export function AIChatModelSelector({
  modelSelector,
  className,
}: AIChatModelSelectorProps) {
  if (!modelSelector) return null
  const { model, onModelChange, availableModels } = modelSelector
  const [open, setOpen] = useState(false)
  const current = availableModels.find((m) => m.value === model) || {
    label: 'Unknown',
    value: '',
  }

  const prevLabelRef = useRef(current.label)
  const [outgoingLabel, setOutgoingLabel] = useState<string | null>(null)

  useEffect(() => {
    if (current.label !== prevLabelRef.current) {
      const prev = prevLabelRef.current
      prevLabelRef.current = current.label

      setOutgoingLabel(prev)

      requestAnimationFrame(() => {
        setOutgoingLabel(null)
      })
    }
  }, [current.label])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-8 items-center rounded-md px-1 text-xs',
            className
          )}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 320, damping: 50 }}
            className="relative inline-flex items-center gap-1 overflow-hidden whitespace-nowrap"
          >
            <AnimatePresence initial={false}>
              {outgoingLabel && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-none absolute top-0 left-0 select-none"
                >
                  <AnimatedLabel key={outgoingLabel} label={outgoingLabel} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatedLabel key={current.value} label={current.label} />

            <span>
              <Icon name="chevron-down" className="size-3" />
            </span>
          </motion.div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[220px] rounded-[7px] border p-0 shadow-lg"
        side="top"
        sideOffset={8}
      >
        <div className="flex flex-col py-1">
          {availableModels.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => {
                onModelChange(m.value)
                setOpen(false)
              }}
              className={cn(
                'flex items-center justify-between gap-2 px-5 py-2 text-xs transition-colors'
              )}
            >
              <span>{m.label}</span>
              {m.value === model && <Icon name="check" className="size-3" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
