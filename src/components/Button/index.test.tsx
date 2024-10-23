import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './'

describe('Button', () => {
  it('renders the children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
