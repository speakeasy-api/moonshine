import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './'

describe('Button', () => {
  it('renders the children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('ButtonText has text-trim-cap class for optical alignment', () => {
    render(
      <Button>
        <Button.Text>Click me</Button.Text>
      </Button>
    )
    const text = screen.getByText('Click me')
    expect(text).toHaveClass('text-trim-cap')
  })
})
