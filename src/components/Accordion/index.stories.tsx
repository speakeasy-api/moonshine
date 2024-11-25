import React from 'react'
import { Accordion, AccordionStep } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Badge } from '@/index'
import { CardTitle } from '../ui/card'
import { CheckCircle } from 'lucide-react'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Accordion>

const steps: AccordionStep[] = [
  {
    title: 'Create your first SDK',
    description:
      'Generate an SDK, terraform provider, or documentation from your OpenAPI Spec.',
    commands: [
      {
        code: 'brew install speakeasy-api/homebrew-tap/speakeasy',
        label: 'Install Speakeasy',
        language: 'bash',
      },
      {
        code: 'speakeasy quickstart',
        label: 'Run quickstart',
        language: 'bash',
      },
    ],
  },
  {
    title: 'Run your first GitHub Action',
    description: 'Set up automated SDK updates with GitHub Actions.',
    commands: [
      {
        code: 'cd your_sdk_directory',
        label: 'Navigate to SDK directory',
        language: 'bash',
      },
      {
        code: 'speakeasy configure github',
        label: 'Configure GitHub',
        language: 'bash',
      },
    ],
  },
  {
    title: 'Publish your SDK',
    description: 'Configure and publish your SDK to package managers.',
    commands: [
      {
        code: 'cd your_sdk_directory',
        label: 'Navigate to SDK directory',
        language: 'bash',
      },
      {
        code: 'speakeasy configure publishing',
        label: 'Configure publishing',
        language: 'bash',
      },
    ],
  },
]

interface AccordionWithStateProps {
  steps: AccordionStep[]
  headerContent: (
    completedSteps: number[],
    steps: AccordionStep[]
  ) => React.ReactNode
  footerContent: (
    completedSteps: number[],
    steps: AccordionStep[]
  ) => React.ReactNode
}

const AccordionWithState = ({
  steps,
  headerContent,
  footerContent,
}: AccordionWithStateProps) => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])
  return (
    <Accordion
      steps={steps}
      headerContent={headerContent}
      footerContent={footerContent}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepComplete={(step) => setCompletedSteps([...completedSteps, step])}
      onStepChange={(step) => setCurrentStep(step)}
    />
  )
}

const GetStartedHeaderContent = (
  completedSteps: number[],
  steps: AccordionStep[]
) => (
  <>
    <div className="flex items-center gap-2">
      <CardTitle>Get Started</CardTitle>
      <Badge variant="secondary">
        {completedSteps.length === steps.length
          ? 'Completed'
          : `${completedSteps.length} of ${steps.length} steps`}
      </Badge>
    </div>
    <p className="text-muted-foreground text-sm">
      {completedSteps.length === steps.length
        ? "Congratulations! You've completed all steps."
        : 'Welcome to Speakeasy! Follow these steps to create, automate, and publish your SDK.'}
    </p>
  </>
)

const GetStartedFooterContent = (
  completedSteps: number[],
  steps: AccordionStep[]
) => {
  if (completedSteps.length === steps.length) {
    return (
      <div className="rounded-b-lg border-t border-green-100 bg-green-50 p-4 text-sm">
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
          <p className="text-green-700">
            Congratulations! You've completed all steps. Your SDK is now set up,
            automated, and ready for use.
          </p>
        </div>
      </div>
    )
  }
}

export const GetStarted: Story = {
  args: {
    steps,
    currentStep: 1,
    completedSteps: [],
    onStepComplete: () => {},
    onStepChange: () => {},
    headerContent: GetStartedHeaderContent,
    footerContent: GetStartedFooterContent,
  },
  render: (args) => <AccordionWithState {...args} />,
}

export const FizzBuzz: Story = {
  args: {
    steps: [
      {
        title: 'Create the FizzBuzz function',
        description:
          'Write the basic function structure that loops from 1 to 100.',
        commands: [
          {
            code: `function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    // We'll add logic here
    console.log(i);
  }
}`,
            label: 'Basic loop structure',
            language: 'javascript',
          },
        ],
      },
      {
        title: 'Add Fizz and Buzz conditions',
        description: 'Add the logic to check for multiples of 3 and 5.',
        commands: [
          {
            code: `function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    console.log(output || i);
  }
}`,
            label: 'Complete FizzBuzz solution',
            language: 'javascript',
          },
        ],
      },
      {
        title: 'Run the function',
        description: 'Run the function to see the output.',
        commands: [
          {
            code: 'fizzBuzz()',
            label: 'Run the function',
            language: 'javascript',
          },
        ],
      },
    ],
    headerContent: () => (
      <>
        <CardTitle>FizzBuzz</CardTitle>
        <p className="text-muted-foreground text-sm">
          Write a function that prints the numbers 1 to 100, but for multiples
          of 3 print "Fizz" instead of the number, for multiples of 5 print
          "Buzz", and for numbers which are multiples of both 3 and 5 print
          "FizzBuzz".
        </p>
      </>
    ),
    footerContent: (completedSteps, steps) =>
      completedSteps.length === steps.length ? (
        <div className="rounded-b-lg border-t border-green-100 bg-green-50 p-4 text-sm">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            <p className="text-green-700">
              Congratulations! You've completed the FizzBuzz tutorial.
            </p>
          </div>
        </div>
      ) : null,
  },
  render: (args) => <AccordionWithState {...args} />,
}
