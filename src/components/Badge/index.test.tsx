import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Badge } from '.'

describe('Badge', () => {
  it('should render', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  it('accepts size prop without type error', () => {
    // This test is a compile-time check; runtime just verifies it renders
    const { container } = render(<Badge size="sm">Test</Badge>)
    expect(container.firstChild).toBeInTheDocument()
  })
})
