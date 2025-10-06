import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  GitPullRequest,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react'

import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Badge>

export const Neutral: Story = {
  args: {
    children: 'Neutral',
    variant: 'neutral',
  },
}

export const NeutralWithIcon: Story = {
  render: () => (
    <Badge variant="neutral">
      <Badge.LeftIcon>
        <GitPullRequest />
      </Badge.LeftIcon>
      <Badge.Text>Neutral</Badge.Text>
    </Badge>
  ),
}

export const Information: Story = {
  args: {
    children: 'Information',
    variant: 'information',
  },
}

export const InformationWithIcon: Story = {
  render: () => (
    <Badge variant="information">
      <Badge.LeftIcon>
        <Info />
      </Badge.LeftIcon>
      <Badge.Text>Information</Badge.Text>
    </Badge>
  ),
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
}

export const SuccessWithIcon: Story = {
  render: () => (
    <Badge variant="success">
      <Badge.LeftIcon>
        <CheckCircle />
      </Badge.LeftIcon>
      <Badge.Text>Success</Badge.Text>
    </Badge>
  ),
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
}

export const WarningWithIcon: Story = {
  render: () => (
    <Badge variant="warning">
      <Badge.LeftIcon>
        <AlertTriangle />
      </Badge.LeftIcon>
      <Badge.Text>Warning</Badge.Text>
    </Badge>
  ),
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const DestructiveWithIcon: Story = {
  render: () => (
    <Badge variant="destructive">
      <Badge.LeftIcon>
        <XCircle />
      </Badge.LeftIcon>
      <Badge.Text>Destructive</Badge.Text>
    </Badge>
  ),
}

export const WithBackground: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="neutral" background={true}>
        <Badge.LeftIcon>
          <GitPullRequest />
        </Badge.LeftIcon>
        <Badge.Text>Neutral</Badge.Text>
      </Badge>
      <Badge variant="information" background={true}>
        <Badge.LeftIcon>
          <Info />
        </Badge.LeftIcon>
        <Badge.Text>Information</Badge.Text>
      </Badge>
      <Badge variant="success" background={true}>
        <Badge.LeftIcon>
          <CheckCircle />
        </Badge.LeftIcon>
        <Badge.Text>Success</Badge.Text>
      </Badge>
      <Badge variant="warning" background={true}>
        <Badge.LeftIcon>
          <AlertTriangle />
        </Badge.LeftIcon>
        <Badge.Text>Warning</Badge.Text>
      </Badge>
      <Badge variant="destructive" background={true}>
        <Badge.LeftIcon>
          <XCircle />
        </Badge.LeftIcon>
        <Badge.Text>Destructive</Badge.Text>
      </Badge>
    </div>
  ),
}

export const WithoutBackground: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="neutral" background={false}>
        <Badge.LeftIcon>
          <GitPullRequest />
        </Badge.LeftIcon>
        <Badge.Text>Neutral</Badge.Text>
      </Badge>
      <Badge variant="information" background={false}>
        <Badge.LeftIcon>
          <Info />
        </Badge.LeftIcon>
        <Badge.Text>Information</Badge.Text>
      </Badge>
      <Badge variant="success" background={false}>
        <Badge.LeftIcon>
          <CheckCircle />
        </Badge.LeftIcon>
        <Badge.Text>Success</Badge.Text>
      </Badge>
      <Badge variant="warning" background={false}>
        <Badge.LeftIcon>
          <AlertTriangle />
        </Badge.LeftIcon>
        <Badge.Text>Warning</Badge.Text>
      </Badge>
      <Badge variant="destructive" background={false}>
        <Badge.LeftIcon>
          <XCircle />
        </Badge.LeftIcon>
        <Badge.Text>Destructive</Badge.Text>
      </Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Badge variant="neutral">
          <Badge.LeftIcon>
            <GitPullRequest />
          </Badge.LeftIcon>
          <Badge.Text>Neutral</Badge.Text>
        </Badge>
        <Badge variant="information">
          <Badge.LeftIcon>
            <Info />
          </Badge.LeftIcon>
          <Badge.Text>Information</Badge.Text>
        </Badge>
        <Badge variant="success">
          <Badge.LeftIcon>
            <CheckCircle />
          </Badge.LeftIcon>
          <Badge.Text>Success</Badge.Text>
        </Badge>
        <Badge variant="warning">
          <Badge.LeftIcon>
            <AlertTriangle />
          </Badge.LeftIcon>
          <Badge.Text>Warning</Badge.Text>
        </Badge>
        <Badge variant="destructive">
          <Badge.LeftIcon>
            <XCircle />
          </Badge.LeftIcon>
          <Badge.Text>Destructive</Badge.Text>
        </Badge>
      </div>
    </div>
  ),
}
