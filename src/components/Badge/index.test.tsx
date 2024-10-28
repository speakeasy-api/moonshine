import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Badge } from '.'

describe('Badge', () => {
  it('should render', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })
})
