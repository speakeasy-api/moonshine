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
    expect(text.tagName).toBe('SPAN')
    expect(text).toHaveClass('text-trim-cap')
    expect(text).not.toHaveClass('relative') // button wrapper has 'relative', text span does not
  })
})
