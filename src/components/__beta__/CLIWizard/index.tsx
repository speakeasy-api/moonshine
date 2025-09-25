'use client'

import * as React from 'react'
import { Check, ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Text } from '../../Text'
import { Heading } from '../../Heading'
import { TerminalCommand } from './terminal-command'
import { Terminal } from './terminal'
import { WizardStep } from '@/components/Wizard/types'

/**
 * TODO before moving out of beta:
 * - Replace all these hardcoded colors with our design tokens:
 *   bg-[#09090b], text-zinc-400, etc
 * - Make sure we're using our standard border radius
 * - Move the step circle sizes into our design tokens
 */

export interface CLIWizardProps {
  steps: WizardStep[]
  currentStep: number
  completedSteps: number[]
  onStepComplete?: (stepIndex: number) => void
}

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { delay: i * 0.1 },
})

const chevronVariants = {
  up: { rotate: 0 },
  down: { rotate: 180 },
}

export const ExpandChevron = ({
  isCollapsed,
}: {
  isCollapsed: boolean | undefined
}) => {
  return (
    <motion.div
      initial="up"
      animate={isCollapsed ? 'down' : 'up'}
      variants={chevronVariants}
      transition={{
        duration: 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      <ChevronUp className="text-default h-4 w-4" />
    </motion.div>
  )
}

export function CLIWizard({
  steps,
  currentStep,
  completedSteps,
  onStepComplete,
}: CLIWizardProps) {
  const [activeStep, setActiveStep] = React.useState(
    Math.min(currentStep - 1, steps.length - 1)
  )
  React.useEffect(() => {
    setActiveStep(Math.min(currentStep - 1, steps.length - 1))
  }, [currentStep, steps.length])

  const [copiedCommands, setCopiedCommands] = React.useState<Set<string>>(
    new Set()
  )

  const isStepComplete = (stepIndex: number) =>
    completedSteps.includes(stepIndex + 1)

  const currentStepCommands = steps[activeStep]?.commands || []
  const activeCommandIndex = React.useMemo(() => {
    return currentStepCommands.findIndex((cmd) => !copiedCommands.has(cmd.code))
  }, [copiedCommands, currentStepCommands])

  return (
    <motion.div
      layout
      className="relative overflow-hidden select-none"
      transition={{
        duration: 0.3,
        ease: [0.645, 0.045, 0.355, 1],
      }}
    >
      <div className="w-full py-6">
        <div className="flex items-center">
          <Heading variant="lg" as="h2">
            Getting Started
          </Heading>
        </div>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.645, 0.045, 0.355, 1],
          }}
          className="overflow-hidden"
        >
          <div className="mt-4 grid grid-cols-1 gap-8 pb-6 md:grid-cols-12">
            <SidebarSteps
              steps={steps}
              activeStep={activeStep}
              isStepComplete={isStepComplete}
              onSelectStep={setActiveStep}
            />

            <div className="md:col-span-7">
              <Terminal
                path={
                  currentStepCommands[activeCommandIndex]?.path ??
                  '~/sdk-project'
                }
              >
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.645, 0.045, 0.355, 1],
                  }}
                >
                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      {currentStepCommands.map((command, i) => (
                        <motion.div
                          key={`${activeStep}-${command.id}`}
                          {...fadeUp(i)}
                        >
                          <TerminalCommand
                            code={command.code}
                            language={command.language}
                            comment={command.comment}
                            copyable
                            fontSize="small"
                            path={command.path}
                            isActive={
                              !copiedCommands.has(command.code) &&
                              i === activeCommandIndex
                            }
                            onSelectOrCopy={() => {
                              const newCopied = new Set(copiedCommands)
                              newCopied.add(command.code)
                              setCopiedCommands(newCopied)

                              const allCommandsCopied =
                                currentStepCommands.every((c) =>
                                  newCopied.has(c.code)
                                )
                              if (
                                allCommandsCopied &&
                                !isStepComplete(activeStep)
                              ) {
                                onStepComplete?.(activeStep + 1)
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </Terminal>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

interface SidebarStepsProps {
  steps: WizardStep[]
  activeStep: number
  isStepComplete: (stepIndex: number) => boolean
  onSelectStep: (stepIndex: number) => void
}

function SidebarSteps({
  steps,
  activeStep,
  isStepComplete,
  onSelectStep,
}: SidebarStepsProps) {
  return (
    <div className="relative md:col-span-5">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const complete = isStepComplete(index)
          const active = activeStep === index
          // const isLastStep = index === steps.length - 1

          return (
            <div key={index}>
              <div className="flex items-stretch">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 items-center justify-center">
                    <CircleOrCheck
                      isComplete={complete}
                      isActive={active}
                      index={index}
                    />
                  </div>
                  {/* TODO: Add line between steps, layout still needs work */}
                  {/* {!isLastStep && (
                    <LineBetweenSteps
                      currentIndex={index}
                      activeStep={activeStep}
                      isStepComplete={isStepComplete}
                    />
                  )} */}
                </div>

                <div className="min-h-[48px] flex-1 pl-3">
                  <button
                    className="w-full text-left"
                    onClick={() => onSelectStep(index)}
                    aria-expanded={active}
                    aria-controls={`step-content-${index}`}
                  >
                    <div className="flex h-6 items-center justify-between">
                      <Heading variant="xs">{step.title}</Heading>
                    </div>
                  </button>

                  <AnimatePresence mode="sync">
                    {active && (
                      <motion.div
                        key={`desc-${index}`}
                        id={`step-content-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.645, 0.045, 0.355, 1],
                        }}
                        className="mt-2 overflow-hidden"
                      >
                        <Text muted>{step.description}</Text>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// TODO: Add line between steps, layout still needs work
// function LineBetweenSteps({
//   currentIndex,
//   activeStep,
//   isStepComplete,
// }: {
//   currentIndex: number
//   activeStep: number
//   isStepComplete: (i: number) => boolean
// }) {
//   const stepComplete = isStepComplete(currentIndex)
//   const nextIsActive = activeStep === currentIndex + 1

//   const lineColor =
//     stepComplete && nextIsActive ? 'bg-emerald-500' : 'bg-zinc-700'

//   return <div className={`w-[1px] flex-1 ${lineColor} my-1`} />
// }

function CircleOrCheck({
  isComplete,
  isActive,
  index,
}: {
  isComplete: boolean
  isActive: boolean
  index: number
}) {
  const variants = {
    complete: {
      circle: 'bg-emerald-600',
      text: 'text-white',
    },
    active: {
      circle: 'bg-surface-tertiary-inverse',
      text: 'text-default-inverse',
    },
    default: {
      circle: 'bg-surface-tertiary-default',
      text: 'text-default',
    },
  }

  const variant = isComplete ? 'complete' : isActive ? 'active' : 'default'
  const { circle, text } = variants[variant]

  return (
    <div className="relative z-20 flex h-6 w-6 items-center justify-center">
      <motion.div
        className={cn('absolute inset-0 rounded-full', circle)}
        initial={false}
      />
      <motion.div
        className={cn(
          'relative z-20 flex h-full w-full items-center justify-center rounded-full',
          circle,
          text
        )}
        initial={false}
      >
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="size-3" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex h-full w-full items-center justify-center text-xs font-medium"
            >
              {index + 1}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default CLIWizard
