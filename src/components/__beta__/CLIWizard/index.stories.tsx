import type { Meta, StoryObj } from '@storybook/react'
import CLIWizard from './index'
import { Container } from '@/components/Container'

const steps = [
  {
    title: 'Create your first SDK',
    description:
      'Generate an SDK, terraform provider, or documentation from your OpenAPI Spec.',
    commands: [
      {
        id: 'brew-install',
        code: 'brew install speakeasy-api/homebrew-tap/speakeasy',
        comment: 'Install Speakeasy',
        language: 'bash',
        path: '~',
      },
      {
        id: 'quickstart',
        code: 'speakeasy quickstart',
        comment: 'Run quickstart',
        language: 'bash',
        path: '~',
      },
    ],
  },
  {
    title: 'Run your first GitHub Action',
    description: 'Set up automated SDK updates with GitHub Actions.',
    commands: [
      {
        id: 'navigate-to-sdk-directory',
        code: 'cd your_sdk_directory',
        label: 'Navigate to SDK directory',
        language: 'bash',
        path: '~',
      },
      {
        id: 'configure-github',
        code: 'speakeasy configure github',
        label: 'Configure GitHub',
        language: 'bash',
        path: '~/your_sdk_directory',
      },
    ],
  },
  {
    title: 'Publish your SDK',
    description: 'Configure and publish your SDK to package managers.',
    commands: [
      {
        id: 'configure-publishing',
        code: 'speakeasy configure publishing',
        label: 'Configure publishing',
        language: 'bash',
        path: '~/your_sdk_directory',
      },
    ],
  },
]

const meta: Meta<typeof CLIWizard> = {
  component: CLIWizard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Container className="mt-16">
        <Story />
      </Container>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CLIWizard>

export default meta
type Story = StoryObj<typeof CLIWizard>

export const Default: Story = {
  args: {
    steps,
    currentStep: 1,
    completedSteps: [],
    onStepComplete: (stepIndex) => {
      console.log(`Step ${stepIndex} completed!`)
    },
  },
}

export const WithCompletedSteps: Story = {
  args: {
    steps,
    currentStep: 2,
    completedSteps: [1],
    onStepComplete: (stepIndex) => {
      console.log(`Step ${stepIndex} completed!`)
    },
  },
}

export const AllStepsCompleted: Story = {
  args: {
    steps,
    currentStep: 3,
    completedSteps: [1, 2, 3],
    onStepComplete: (stepIndex) => {
      console.log(`Step ${stepIndex} completed!`)
    },
  },
}

export const MobileView: Story = {
  args: {
    steps,
    currentStep: 1,
    completedSteps: [],
    onStepComplete: (stepIndex) => {
      console.log(`Step ${stepIndex} completed!`)
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
