import { Alert } from '.'
import { Meta, StoryObj } from '@storybook/react-vite'
import { variants } from './types'
import { Button } from '../Button'

const defaultDecorators = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Story: any) => (
    <div className="m-auto flex h-screen max-w-3xl items-center">{Story()}</div>
  ),
]
const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'default',
    children: [
      <Alert.Icon name="info" />,
      <Alert.Title>Default Alert</Alert.Title>,
      <Alert.Description>This is a default alert message.</Alert.Description>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const DefaultWithCTA: Story = {
  args: {
    variant: 'default',
    children: [
      <Alert.Icon name="info" />,
      <Alert.Title>Default Alert</Alert.Title>,
      <Alert.Description>This is a default alert message.</Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Got it</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: [
      <Alert.Icon name="check" />,
      <Alert.Title>Success!</Alert.Title>,
      <Alert.Description>
        Your changes have been saved successfully.
      </Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Continue</Button.Text>
        </Button>
        <Button variant="secondary" size="sm">
          <Button.Text>View Changes</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: [
      <Alert.Icon name="circle-alert" />,
      <Alert.Title>Error</Alert.Title>,
      <Alert.Description>
        Something went wrong. Please try again.
      </Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Retry</Button.Text>
        </Button>
        <Button variant="secondary" size="sm">
          <Button.Text>Cancel</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: [
      <Alert.Icon name="circle-alert" />,
      <Alert.Title>Warning</Alert.Title>,
      <Alert.Description>This action cannot be undone.</Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Confirm</Button.Text>
        </Button>
        <Button variant="secondary" size="sm">
          <Button.Text>Cancel</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: [
      <Alert.Icon name="info" />,
      <Alert.Title>Information</Alert.Title>,
      <Alert.Description>
        Here's some helpful information for you.
      </Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Learn More</Button.Text>
        </Button>
        <Button variant="secondary" size="sm">
          <Button.Text>Dismiss</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Multiline: Story = {
  args: {
    variant: 'error',
    children: [
      <Alert.Icon name="circle-alert" />,
      <Alert.Title>Whoops!</Alert.Title>,
      <Alert.Description>
        We couldn't find the API you were looking for.
      </Alert.Description>,
      <Alert.Footer>
        <Button variant="primary" size="sm">
          <Button.Text>Go Back</Button.Text>
        </Button>
        <Button variant="secondary" size="sm">
          <Button.Text>Report Issue</Button.Text>
        </Button>
      </Alert.Footer>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}

export const Brand: Story = {
  args: {
    variant: 'brand',
    children: [
      <Alert.Icon name="star" />,
      <Alert.Title>Brand Alert</Alert.Title>,
      <Alert.Description>
        This alert features our signature rainbow border.
      </Alert.Description>,
      <Alert.Dismiss />,
    ],
  },
  decorators: defaultDecorators,
}
