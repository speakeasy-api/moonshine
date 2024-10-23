import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stack } from '.'

describe('Stack', () => {
  it('should render', () => {
    render(
      <Stack>
        <div>Hello</div>
      </Stack>
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
