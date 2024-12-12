import React from 'react'
import { Wizard, WizardStep } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Badge } from '#index'
import { Text } from '#@components/Text'

const meta: Meta<typeof Wizard> = {
  component: Wizard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Wizard>

const steps: WizardStep[] = [
  {
    title: 'Create your first SDK',
    description:
      'Generate an SDK, terraform provider, or documentation from your OpenAPI Spec.',
    commands: [
      {
        code: 'brew install speakeasy-api/homebrew-tap/speakeasy',
        label: 'Install Speakeasy',
        language: 'bash',
        id: 'install-speakeasy',
      },
      {
        code: 'speakeasy quickstart',
        label: 'Run quickstart',
        language: 'bash',
        id: 'run-quickstart',
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
        id: 'navigate-to-sdk-directory',
      },
      {
        code: 'speakeasy configure github',
        label: 'Configure GitHub',
        language: 'bash',
        id: 'configure-github',
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
        id: 'navigate-to-sdk-directory',
      },
      {
        code: 'speakeasy configure publishing',
        label: 'Configure publishing',
        language: 'bash',
        id: 'configure-publishing',
      },
    ],
  },
]

interface WizardWithStateProps {
  steps: WizardStep[]
  headerContent: (
    completedSteps: number[],
    steps: WizardStep[]
  ) => React.ReactNode
}

const WizardWithState = ({ steps, headerContent }: WizardWithStateProps) => {
  return (
    <Wizard
      steps={steps}
      headerContent={headerContent}
      currentStep={1}
      completedSteps={[]}
    />
  )
}

const GetStartedHeaderContent = (
  completedSteps: number[],
  steps: WizardStep[]
) => (
  <>
    <div className="flex items-center gap-2">
      <Text variant="h3">Get Started</Text>
      <Badge variant="default">
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

export const GetStarted: Story = {
  args: {
    steps,
    currentStep: 1,
    completedSteps: [],
    headerContent: GetStartedHeaderContent,
  },
  render: (args) => <WizardWithState {...args} />,
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
            id: 'basic-loop-structure',
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
            id: 'complete-fizzbuzz-solution',
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
            id: 'run-the-function',
          },
        ],
      },
    ],
    headerContent: () => (
      <>
        <p className="text-muted-foreground text-sm">
          Write a function that prints the numbers 1 to 100, but for multiples
          of 3 print "Fizz" instead of the number, for multiples of 5 print
          "Buzz", and for numbers which are multiples of both 3 and 5 print
          "FizzBuzz".
        </p>
      </>
    ),
  },
  render: (args) => <WizardWithState {...args} />,
}
