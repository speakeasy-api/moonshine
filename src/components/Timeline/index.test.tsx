import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Database, CheckCircle } from 'lucide-react'
import { Timeline } from './'

describe('Timeline', () => {
  it('renders basic timeline with items', () => {
    render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>First Step</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Second Step</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(screen.getByText('First Step')).toBeInTheDocument()
    expect(screen.getByText('Second Step')).toBeInTheDocument()
  })

  it('renders timeline items with descriptions and timestamps', () => {
    render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Setup Database</Timeline.Title>
            <Timeline.Description>
              Configure PostgreSQL instance
            </Timeline.Description>
            <Timeline.Timestamp>Jan 15, 2024</Timeline.Timestamp>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(screen.getByText('Setup Database')).toBeInTheDocument()
    expect(
      screen.getByText('Configure PostgreSQL instance')
    ).toBeInTheDocument()
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
  })

  it('renders timeline items with custom icons', () => {
    render(
      <Timeline>
        <Timeline.Item icon={<Database data-testid="database-icon" />}>
          <Timeline.Content>
            <Timeline.Title>Database Setup</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item icon={<CheckCircle data-testid="check-icon" />}>
          <Timeline.Content>
            <Timeline.Title>Completed</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(screen.getByTestId('database-icon')).toBeInTheDocument()
    expect(screen.getByTestId('check-icon')).toBeInTheDocument()
  })

  it('renders default numbered icons when no icon is provided', () => {
    render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>First</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Second</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Third</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    // Check for numbered icons (1, 2, 3)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders timeline with separator', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Phase 1</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Separator className="custom-separator" />
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Phase 2</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(screen.getByText('Phase 1')).toBeInTheDocument()
    expect(screen.getByText('Phase 2')).toBeInTheDocument()

    // Check separator is rendered by looking for its className
    const separator = container.querySelector('.custom-separator')
    expect(separator).toBeInTheDocument()
  })

  it('applies custom className to timeline root', () => {
    const { container } = render(
      <Timeline className="custom-timeline">
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Test</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(container.firstChild).toHaveClass('custom-timeline')
  })

  it('applies custom className to timeline items', () => {
    render(
      <Timeline>
        <Timeline.Item className="custom-item">
          <Timeline.Content>
            <Timeline.Title>Test Item</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    const item = screen.getByText('Test Item').closest('.custom-item')
    expect(item).toBeInTheDocument()
  })

  it('applies custom className to timeline content', () => {
    render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content className="custom-content">
            <Timeline.Title>Test Content</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    const content = screen.getByText('Test Content').closest('.custom-content')
    expect(content).toBeInTheDocument()
  })

  it('handles single timeline item', () => {
    render(
      <Timeline>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Only Item</Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    expect(screen.getByText('Only Item')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() // Default numbered icon
  })

  it('renders complex timeline with all components', () => {
    render(
      <Timeline>
        <Timeline.Item icon={<Database />}>
          <Timeline.Content>
            <Timeline.Title>Database Setup</Timeline.Title>
            <Timeline.Description>
              PostgreSQL instance configured with optimized settings.
            </Timeline.Description>
            <Timeline.Timestamp>Jan 15, 2024</Timeline.Timestamp>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item icon={<CheckCircle />}>
          <Timeline.Content>
            <Timeline.Title>API Integration</Timeline.Title>
            <Timeline.Description>
              Connecting external services and third-party APIs.
            </Timeline.Description>
            <Timeline.Timestamp>Jan 17, 2024</Timeline.Timestamp>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Content>
            <Timeline.Title>Performance Testing</Timeline.Title>
            <Timeline.Description>
              Load testing and optimization.
            </Timeline.Description>
            <Timeline.Timestamp>Jan 20, 2024</Timeline.Timestamp>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    )

    // Check all titles are rendered
    expect(screen.getByText('Database Setup')).toBeInTheDocument()
    expect(screen.getByText('API Integration')).toBeInTheDocument()
    expect(screen.getByText('Performance Testing')).toBeInTheDocument()

    // Check descriptions are rendered
    expect(
      screen.getByText(
        'PostgreSQL instance configured with optimized settings.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText('Connecting external services and third-party APIs.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Load testing and optimization.')
    ).toBeInTheDocument()

    // Check timestamps are rendered
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 17, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 20, 2024')).toBeInTheDocument()

    // Check that third item gets numbered icon (3) since no icon provided
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('handles empty timeline gracefully', () => {
    const { container } = render(<Timeline>{[]}</Timeline>)

    // Should render without crashing
    expect(container.firstChild).toBeInTheDocument()
  })
})
