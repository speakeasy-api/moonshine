import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Grid } from './'
import { createSampleGridChildren } from '@/lib/storybookUtils'

describe('Grid', () => {
  it('renders the children', () => {
    render(<Grid>{createSampleGridChildren(8)}</Grid>)

    expect(screen.getAllByTestId(/sample-child-\d+/).length).toBe(8)
  })
})
