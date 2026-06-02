import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Badge } from '.'

describe('Badge', () => {
  it('should render', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  describe('size prop', () => {
    it('defaults to md size classes', () => {
      const { container } = render(<Badge>Default</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('h-5')
      expect(badge).toHaveClass('text-[12px]')
    })

    it('applies sm size classes', () => {
      const { container } = render(<Badge size="sm">Small</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('h-[15px]')
      expect(badge).toHaveClass('text-[9px]')
    })

    it('applies lg size classes', () => {
      const { container } = render(<Badge size="lg">Large</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('h-[25px]')
      expect(badge).toHaveClass('text-[15px]')
    })

    it('sm does not have md size classes', () => {
      const { container } = render(<Badge size="sm">Small</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).not.toHaveClass('h-5')
    })

    it('lg does not have md size classes', () => {
      const { container } = render(<Badge size="lg">Large</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).not.toHaveClass('h-5')
    })
  })
})
