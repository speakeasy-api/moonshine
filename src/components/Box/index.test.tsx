import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Box } from './'

// TODO: This is just a placeholder test. Box will be removed
describe('Box', () => {
  it('renders the children', () => {
    render(<Box>Hello</Box>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
