import * as React from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { CodeSnippet } from '@/index'
import { ProgrammingLanguage } from '@/types'
import { useMemo } from 'react'

export interface AccordionCommand {
  code: string
  language: ProgrammingLanguage
  label: string
}

export interface AccordionStep {
  title: string
  description: string
  commands?: AccordionCommand[]
}

interface AccordionProps {
  steps: AccordionStep[]
  currentStep: number
  completedSteps: number[]
  onStepComplete: (step: number) => void
  onStepChange: (step: number) => void
  headerContent: (
    completedSteps: number[],
    steps: AccordionStep[]
  ) => React.ReactNode
}

export function Accordion({
  steps,
  currentStep,
  completedSteps,
  onStepComplete,
  onStepChange,
  headerContent,
}: AccordionProps) {
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

  const handleNextStep = () => {
    if (currentStep < 3) {
      onStepComplete(currentStep)
      onStepChange(currentStep + 1)
    } else if (currentStep === 3 && !completedSteps.includes(3)) {
      onStepComplete(currentStep)
    }
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

      <div className="p-6">
        <div className="relative">
          <div className="bg-border absolute bottom-0 left-4 top-0 w-px overflow-y-hidden">
            <div
              className="bg-primary absolute left-0 top-0 w-full transition-all duration-500"
              style={{
                height: trackHeight,
              }}
            />
          </div>

          <div>
            {steps.map((step, index) => {
              const status = getStepStatus(index)
              const stepNumber = index + 1

              return (
                <div
                  key={index}
                  className="py-4"
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
                          status === 'completed' &&
                            'bg-primary text-foreground dark:text-background',
                          status === 'current' &&
                            'scale-125 bg-blue-500 text-white',
                          status === 'upcoming' && 'bg-zinc-400 text-white'
                        )}
                      >
                        {stepNumber}
                      </div>

                      <h3
                        className={cn(
                          'font-semibold tracking-tight',
                          status === 'upcoming' && 'opacity-50'
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className={cn(
                        'mb-4 mt-2 text-sm',
                        status === 'upcoming' && 'opacity-50'
                      )}
                    >
                      {step.description}
                    </p>

                    <div
                      className={cn(
                        'flex w-max flex-col gap-5',
                        status === 'upcoming' && 'opacity-50'
                      )}
                    >
                      {status === 'current' &&
                        step.commands?.map((command, cmdIndex) => (
                          <CodeSnippet
                            key={cmdIndex}
                            code={command.code}
                            language={command.language}
                            copyable
                            fontSize="small"
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

      {currentStep <= steps.length &&
        completedSteps.length !== steps.length && (
          <div className="mx-auto mt-4">
            <Button variant="secondary" onClick={handleNextStep}>
              {currentStep === steps.length ? 'Finish' : 'Next'}
            </Button>
          </div>
        )}
    </div>
  )
}
