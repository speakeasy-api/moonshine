import { render, screen, fireEvent } from '@testing-library/react'
import { cloneElement } from 'react'
import { expect, describe, it, vi } from 'vitest'
import { Column, Table } from '.'

type RowData = { id: number; name: string }
const columns: Column<RowData>[] = [{ key: 'name', header: 'Name' }]
const data: RowData[] = [
  { id: 1, name: 'alpha' },
  { id: 2, name: 'beta' },
]

describe('Table renderRow', () => {
  it('renders rows unchanged without renderRow', () => {
    render(<Table columns={columns} data={data} rowKey={(r) => r.id} />)
    expect(screen.getByText('alpha')).toBeInTheDocument()
    expect(screen.getByText('beta')).toBeInTheDocument()
  })

  it('wraps every data row and forwards extra props onto the <tr>', () => {
    const onContextMenu = vi.fn((e: React.MouseEvent) => e.preventDefault())
    render(
      <Table
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        renderRow={(row, rowElement) =>
          cloneElement(rowElement, {
            'data-testid': `row-${row.id}`,
            onContextMenu,
          } as Partial<React.ComponentPropsWithoutRef<'tr'>>)
        }
      />
    )
    const row = screen.getByTestId('row-1')
    expect(row.tagName).toBe('TR')
    expect(screen.getByTestId('row-2')).toBeInTheDocument()
    fireEvent.contextMenu(row)
    expect(onContextMenu).toHaveBeenCalledTimes(1)
  })

  it('still calls onRowClick on a wrapped row', () => {
    const onRowClick = vi.fn()
    render(
      <Table
        columns={columns}
        data={data}
        rowKey={(r) => r.id}
        onRowClick={onRowClick}
        renderRow={(row, el) =>
          cloneElement(el, {
            'data-testid': `row-${row.id}`,
          } as Partial<React.ComponentPropsWithoutRef<'tr'>>)
        }
      />
    )
    fireEvent.click(screen.getByTestId('row-1'))
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })
})
