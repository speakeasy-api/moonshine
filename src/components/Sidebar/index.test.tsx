import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Sidebar } from '.'

describe('Sidebar', () => {
  it('renders', () => {
    render(
      <Sidebar>
        <Sidebar.Item iconName="layout-dashboard" label="Overview" />
        <Sidebar.Item iconName="gauge" label="SDK Quality" />
      </Sidebar>
    )
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('SDK Quality')).toBeInTheDocument()
  })
})
