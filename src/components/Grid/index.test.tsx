import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid } from './'
import { createSampleChildren } from '@/lib/storybookUtils'

describe('Grid', () => {
  it('renders the children', () => {
    render(<Grid>{createSampleChildren(8, true)}</Grid>)

    expect(screen.getAllByTestId(/sample-child-\d+/).length).toBe(8)
  })
})
