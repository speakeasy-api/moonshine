import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './'

describe('Text', () => {
  it('renders the children', () => {
    render(<Text>Hello, world!</Text>)

    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })
})
