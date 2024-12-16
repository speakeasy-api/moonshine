import * as React from 'react'
import { cn } from '@/lib/utils'
import { CodeSnippet, Heading, Text } from '@/index'
import { ProgrammingLanguage } from '@/types'
import { useMemo } from 'react'

export interface WizardCommand {
  id: string
  code: string
  language: ProgrammingLanguage
  label: string
  active?: boolean
  onSelectOrCopy?: (id: string) => void
}

export interface WizardStep {
  title: string
  description: string
  commands?: WizardCommand[]
}

interface WizardProps {
  /**
   * The steps to display in the wizard
   */
  steps: WizardStep[]

  /**
   * The current step number, starting from 1
   */
  currentStep: number

  /**
   * The steps that have been completed, starting from 1
   */
  completedSteps: number[]

  headerContent: (
    completedSteps: number[],
    steps: WizardStep[]
  ) => React.ReactNode
}

export function Wizard({
  steps,
  currentStep,
  completedSteps,
  headerContent,
}: WizardProps) {
  const [stepHeights, setStepHeights] = React.useState<Map<number, number>>(
    new Map()
  )
  const stepRefs = React.useRef<Map<number, HTMLDivElement | null>>(new Map())

  React.useEffect(() => {
    const currentElement = stepRefs.current.get(currentStep)
    if (currentElement) {
      setStepHeights((prev) => {
        const newMap = new Map(prev)
        newMap.set(currentStep, currentElement.clientHeight)
        return newMap
      })
    }
  }, [currentStep, completedSteps])

  // Add ResizeObserver to monitor size changes
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const stepNumber = Array.from(stepRefs.current.entries()).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, el]) => el === entry.target
        )?.[0]

        if (stepNumber) {
          setStepHeights((prev) => {
            const newMap = new Map(prev)
            newMap.set(stepNumber, entry.target.clientHeight)
            return newMap
          })
        }
      })
    })

    // Observe all step elements
    stepRefs.current.forEach((element) => {
      if (element) {
        resizeObserver.observe(element)
      }
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, []) // Empty dependency array since we want to set up the observer once

  const getStepStatus = (index: number) => {
    if (completedSteps.includes(index + 1)) return 'completed'
    if (index + 1 === currentStep) return 'current'
    return 'upcoming'
  }

  const trackHeight = useMemo(() => {
    return Array.from(
      {
        length:
          completedSteps.length === steps.length
            ? currentStep
            : currentStep - 1,
      },
      (_, i) => i + 1
    )
      .map((step) => {
        const height = stepHeights.get(step) || 0
        // Add the top and bottom padding (py-4 = 1rem * 2 = 32px total)
        return height + 16
      })
      .reduce((acc, curr) => acc + curr, 0)
  }, [currentStep, stepHeights])

  return (
    <div className="max-w-screen-x flex flex-col gap-2">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {headerContent(completedSteps, steps)}
          </div>
        </div>
      </div>

      <div className="relative mt-8 pl-3">
        <div className="bg-border absolute bottom-0 left-7 top-0 w-px overflow-y-hidden">
          <div
            className="bg-primary absolute left-0 top-0 w-full transition-all duration-500"
            style={{
              height: trackHeight,
            }}
          />
        </div>

        <div className="flex flex-col gap-8">
          {steps.map((step, index) => {
            const status = getStepStatus(index)
            const stepNumber = index + 1

            return (
              <div
                key={index}
                ref={(el) => stepRefs.current.set(stepNumber, el)}
              >
                <div
                  className={cn(
                    'relative pl-16',
                    status === 'completed' && 'text-muted-foreground'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                        // TODO: update these to use new color tokens
                        status === 'completed' && 'bg-emerald-500 text-black',
                        status === 'current' &&
                          'scale-110 bg-zinc-400 text-zinc-800',
                        status === 'upcoming' && 'bg-zinc-900 text-zinc-400'
                      )}
                    >
                      {stepNumber}
                    </div>

                    {/* TODO: is this the best way to handle the opacity? */}
                    <div className={cn(status === 'upcoming' && 'opacity-50')}>
                      <Heading variant="md" as="h2">
                        {step.title}
                      </Heading>
                    </div>
                  </div>

                  {/* TODO: is this the best way to handle the opacity? */}
                  <div
                    className={cn(
                      'mb-4 mt-2',
                      status === 'upcoming' && 'opacity-50'
                    )}
                  >
                    <Text muted>{step.description}</Text>
                  </div>

                  <div
                    className={cn(
                      'mt-8 flex w-full flex-col gap-5',
                      status === 'upcoming' && 'opacity-50'
                    )}
                  >
                    {/* TODO: update this to CodeBlock component */}
                    {status === 'current' &&
                      step.commands?.map((command, cmdIndex) => (
                        <CodeSnippet
                          key={cmdIndex}
                          code={command.code}
                          language={command.language}
                          onSelectOrCopy={() =>
                            command.onSelectOrCopy?.(command.id)
                          }
                          copyable
                          fontSize="small"
                          shimmer={command.active}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
