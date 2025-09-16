import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Timeline } from './index'
import { Code, Database } from 'lucide-react'
import { describe, it, expect, vi } from 'vitest'

// Mock ResizeObserver for layout effect tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('Timeline Component', () => {
  describe('Composability and Content Organization', () => {
    it('automatically organizes title and timestamp in header layout', () => {
      render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Description>
                This should appear below
              </Timeline.Description>
              <Timeline.Title>Main Title</Timeline.Title>
              <Timeline.Timestamp>2 hours ago</Timeline.Timestamp>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      const content = screen
        .getByText('Main Title')
        .closest('[class*="min-w-0 flex-1"]')
      const timestamp = screen
        .getByText('2 hours ago')
        .closest('[class*="flex-shrink-0"]')
      const description = screen.getByText('This should appear below')

      // Title and timestamp should be in the same header container
      expect(content?.parentElement).toEqual(timestamp?.parentElement)

      // Description should be in separate content area below
      expect(description.parentElement).toHaveClass('space-y-1')
    })

    it('handles mixed content types correctly', () => {
      render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Task Complete</Timeline.Title>
              <div data-testid="custom-content">Custom React component</div>
              <Timeline.Description>Standard description</Timeline.Description>
              <Timeline.Timestamp>1 day ago</Timeline.Timestamp>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      // Title should be in header
      expect(screen.getByText('Task Complete')).toBeInTheDocument()

      // Timestamp should be in header
      expect(screen.getByText('1 day ago')).toBeInTheDocument()

      // Custom content and description should be in content area
      expect(screen.getByTestId('custom-content')).toBeInTheDocument()
      expect(screen.getByText('Standard description')).toBeInTheDocument()
    })

    it('gracefully handles missing title or timestamp', () => {
      const { rerender } = render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Only Title</Timeline.Title>
              <Timeline.Description>Description text</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      expect(screen.getByText('Only Title')).toBeInTheDocument()
      expect(screen.getByText('Description text')).toBeInTheDocument()

      rerender(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Timestamp>Only Timestamp</Timeline.Timestamp>
              <Timeline.Description>Description text</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      expect(screen.getByText('Only Timestamp')).toBeInTheDocument()
      expect(screen.getByText('Description text')).toBeInTheDocument()
    })
  })

  describe('Timeline Line and Layout Behavior', () => {
    it('does not render connecting line for single item', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Single Item</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      const line = container.querySelector('[class*="absolute"][class*="w-px"]')
      expect(line).not.toBeInTheDocument()
    })

    it('renders connecting line for multiple items', () => {
      const { container } = render(
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
        </Timeline>
      )

      const line = container.querySelector('[class*="absolute"][class*="w-px"]')
      expect(line).toBeInTheDocument()
    })

    it('applies correct line height calculation for hasMore prop', async () => {
      const { container, rerender } = render(
        <Timeline hasMore={false}>
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
        </Timeline>
      )

      const line = container.querySelector('[class*="absolute"][class*="w-px"]')
      expect(line).toHaveStyle({ height: 'calc(100% - 4.5rem)' })

      rerender(
        <Timeline hasMore={true}>
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
        </Timeline>
      )

      await waitFor(() => {
        const updatedLine = container.querySelector(
          '[class*="absolute"][class*="w-px"]'
        )
        // The dynamic calculation should result in a pixel value, not the fallback calc
        expect(updatedLine).toHaveAttribute('style')
        expect(updatedLine?.getAttribute('style')).toMatch(/height:\s*\d+px/)
      })
    })
  })

  describe('Icon and Index Behavior', () => {
    it('displays custom icons when provided', () => {
      render(
        <Timeline>
          <Timeline.Item icon={<Code data-testid="custom-icon" />}>
            <Timeline.Content>
              <Timeline.Title>With Icon</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('displays sequential numbers when no icons provided', () => {
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

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('mixes icons and numbers correctly', () => {
      render(
        <Timeline>
          <Timeline.Item icon={<Database data-testid="db-icon" />}>
            <Timeline.Content>
              <Timeline.Title>With Icon</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Without Icon</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      expect(screen.getByTestId('db-icon')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  describe('Timeline Separator Integration', () => {
    it('renders separators as non-timeline items', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Before Separator</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Separator />
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>After Separator</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      const separator = screen.getByTestId('timeline-separator')
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveClass('h-px', 'w-full')

      // Should still have connecting line for timeline items
      const line = container.querySelector('[class*="absolute"][class*="w-px"]')
      expect(line).toBeInTheDocument()
    })
  })

  describe('Content Spacing and Layout', () => {
    it('correctly identifies last timeline content item', () => {
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
              <Timeline.Title>Last</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      // Should have two non-last content items
      const regularContentElements = screen.getAllByTestId('timeline-content')
      expect(regularContentElements).toHaveLength(2)

      // Should have exactly one last content item
      const lastContentElement = screen.getByTestId('timeline-content-last')
      expect(lastContentElement).toBeInTheDocument()

      // Verify the last item contains the expected content
      expect(lastContentElement).toHaveTextContent('Last')
    })
  })

  describe('Dynamic Line Height Calculation', () => {
    it('updates line height when content changes', async () => {
      const { container, rerender } = render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Short</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Short</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      const initialLine = container.querySelector(
        '[class*="absolute"][class*="w-px"]'
      )
      expect(initialLine).toBeInTheDocument()

      // Rerender with more content
      rerender(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>
                Much Longer Title That Will Change Layout
              </Timeline.Title>
              <Timeline.Description>
                This is a very long description that will significantly increase
                the height of the timeline item and should trigger the dynamic
                line height calculation to adjust accordingly.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Another Long Item</Timeline.Title>
              <Timeline.Description>More content here too</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      // Line should still be present and potentially have different height
      await waitFor(() => {
        const updatedLine = container.querySelector(
          '[class*="absolute"][class*="w-px"]'
        )
        expect(updatedLine).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility and Data Attributes', () => {
    it('applies data-timeline-item attribute for layout calculations', () => {
      const { container } = render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Test Item</Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      const timelineItem = container.querySelector('[data-timeline-item]')
      expect(timelineItem).toBeInTheDocument()
      expect(timelineItem).toHaveClass(
        'relative',
        'flex',
        'items-start',
        'gap-4'
      )
    })

    it('maintains proper semantic structure', () => {
      render(
        <Timeline>
          <Timeline.Item>
            <Timeline.Content>
              <Timeline.Title>Semantic Test</Timeline.Title>
              <Timeline.Description>Description content</Timeline.Description>
              <Timeline.Timestamp>Time info</Timeline.Timestamp>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      )

      // Title should be rendered as h3
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Semantic Test')
    })
  })
})
