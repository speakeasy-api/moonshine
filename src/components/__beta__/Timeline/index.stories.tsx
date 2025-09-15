import React from 'react'
import { Timeline } from '.'
import { StoryObj, Meta } from '@storybook/react'
import {
  Code,
  Palette,
  Hammer,
  TestTube,
  Rocket,
  GitBranch,
  Database,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react'

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    chromatic: {
      delay: 1000,
    },
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Timeline>

// Composable API Stories
export const ComposableBasic: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item icon={<Code />}>
        <Timeline.Content>
          <Timeline.Title>Planning</Timeline.Title>
          <Timeline.Description>
            Project requirements and technical planning.
          </Timeline.Description>
          <Timeline.Timestamp>Week 1</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<Palette />}>
        <Timeline.Content>
          <Timeline.Title>Design</Timeline.Title>
          <Timeline.Description>
            UI/UX design and system architecture.
          </Timeline.Description>
          <Timeline.Timestamp>Week 2</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<Hammer />}>
        <Timeline.Content>
          <Timeline.Title>Development</Timeline.Title>
          <Timeline.Description>
            Feature implementation and coding.
          </Timeline.Description>
          <Timeline.Timestamp>Week 3-4</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<TestTube />}>
        <Timeline.Content>
          <Timeline.Title>Testing</Timeline.Title>
          <Timeline.Description>
            Quality assurance and bug fixes.
          </Timeline.Description>
          <Timeline.Timestamp>Week 5</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<Rocket />}>
        <Timeline.Content>
          <Timeline.Title>Deployment</Timeline.Title>
          <Timeline.Description>
            Production release and monitoring.
          </Timeline.Description>
          <Timeline.Timestamp>Week 6</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Composable Timeline API with full control over content structure.',
      },
    },
  },
}

export const ComposableCustomContent: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item icon={<Database />}>
        <Timeline.Content>
          <Timeline.Title>Database Setup</Timeline.Title>
          <Timeline.Description>
            PostgreSQL instance configured with optimized settings.
          </Timeline.Description>
          <div className="text-success-default mt-2 text-xs font-medium">
            ✓ Performance: 95ms avg query time
          </div>
          <Timeline.Timestamp>Jan 15, 2024</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<GitBranch />}>
        <Timeline.Content>
          <Timeline.Title>API Integration</Timeline.Title>
          <Timeline.Description>
            Connecting external services and third-party APIs.
          </Timeline.Description>
          <div className="bg-warning-softest border-warning-softest mt-2 rounded border p-2">
            <div className="text-warning-default text-xs">
              ⚠️ Rate limit: 450/500 requests
            </div>
          </div>
          <Timeline.Timestamp>Jan 17, 2024</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title>Performance Testing</Timeline.Title>
          <Timeline.Description>
            Load testing and optimization.
          </Timeline.Description>
          <div className="text-muted mt-2 text-xs">
            Estimated duration: 2-3 days
          </div>
          <Timeline.Timestamp>Jan 20, 2024</Timeline.Timestamp>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Timeline with custom content including status indicators and rich formatting.',
      },
    },
  },
}

export const ComposableMinimal: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title>Setup Complete</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title>In Progress</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title>Coming Next</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Minimal timeline with just titles, showcasing default icons and numbering.',
      },
    },
  },
}

export const ComposableWithSeparator: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item icon={<CheckCircle />}>
        <Timeline.Content>
          <Timeline.Title>Phase 1 Complete</Timeline.Title>
          <Timeline.Description>
            All initial requirements met.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Separator />

      <Timeline.Item icon={<Clock />}>
        <Timeline.Content>
          <Timeline.Title>Phase 2 Active</Timeline.Title>
          <Timeline.Description>
            Currently in development phase.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item icon={<AlertCircle />}>
        <Timeline.Content>
          <Timeline.Title>Phase 3 Pending</Timeline.Title>
          <Timeline.Description>
            Waiting for Phase 2 completion.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timeline with custom separators to divide phases or sections.',
      },
    },
  },
}
