import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CodeSnippet } from '@/index'
import { ProgrammingLanguage } from '@/types'

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
  footerContent: (
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
  footerContent,
}: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [openSteps, setOpenSteps] = React.useState<number[]>([currentStep])

  const getStepStatus = (index: number) => {
    if (completedSteps.includes(index + 1)) return 'completed'
    if (index + 1 === currentStep) return 'current'
    return 'upcoming'
  }

  const toggleStep = (stepNumber: number) => {
    setOpenSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((step) => step !== stepNumber)
        : [...prev, stepNumber]
    )
  }

  React.useEffect(() => {
    setOpenSteps([currentStep])
  }, [currentStep])

  const handleNextStep = () => {
    if (currentStep < 3) {
      onStepComplete(currentStep)
      onStepChange(currentStep + 1)
    } else if (currentStep === 3 && !completedSteps.includes(3)) {
      onStepComplete(currentStep)
    }
  }

  return (
    <div className="max-w-screen-x flex flex-col gap-2">
      <Card className="mx-autol">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {headerContent(completedSteps, steps)}
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isOpen ? 'Collapse' : 'Expand'} get started guide
                  </span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-6">
              <div className="relative">
                <div className="bg-border absolute bottom-0 left-4 top-0 w-px">
                  <div
                    className="bg-primary absolute left-0 top-0 w-full transition-all duration-500"
                    style={{
                      height: `${(completedSteps.length / steps.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const status = getStepStatus(index)
                    const stepNumber = index + 1
                    const isStepOpen = openSteps.includes(stepNumber)

                    return (
                      <Collapsible
                        key={index}
                        open={isStepOpen}
                        onOpenChange={() => toggleStep(stepNumber)}
                      >
                        <div
                          className={cn(
                            'relative pl-12',
                            status === 'completed' && 'text-muted-foreground'
                          )}
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex cursor-pointer items-center gap-2">
                              <div
                                className={cn(
                                  'absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium',
                                  status === 'completed' &&
                                    'bg-background text-foreground border',
                                  status === 'current' &&
                                    'border-blue-500 bg-blue-50 text-blue-700',
                                  status === 'upcoming' &&
                                    'border-border bg-background text-foreground'
                                )}
                              >
                                {status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  stepNumber
                                )}
                              </div>

                              <h3 className="font-semibold tracking-tight">
                                {step.title}
                              </h3>
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform',
                                  isStepOpen && 'rotate-180 transform'
                                )}
                              />
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <p className="text-muted-foreground mb-4 mt-2 text-sm">
                              {step.description}
                            </p>

                            {step.commands?.map((command, cmdIndex) => (
                              <div
                                key={cmdIndex}
                                className="group relative mb-2"
                              >
                                <CodeSnippet
                                  code={command.code}
                                  language={command.language}
                                  copyable
                                  fontSize="small"
                                />
                              </div>
                            ))}
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {footerContent(completedSteps, steps)}
      </Card>

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
