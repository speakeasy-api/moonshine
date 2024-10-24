import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './'

describe('Card', () => {
  it('renders the children', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )

    expect(screen.getAllByText(/Header|Content|Footer/).length).toBe(3)
  })

  it('omits invalid children', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
        <div>Invalid child</div>
      </Card>
    )

    expect(screen.getAllByText(/Header|Content|Footer/).length).toBe(3)
    expect(screen.queryByText(/Invalid child/)).toBeNull()
  })
})
