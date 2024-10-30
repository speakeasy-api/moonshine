import type { Meta, StoryObj } from '@storybook/react'
import { Column, Table, TableProps } from '.'

const meta: Meta<typeof Table> = {
  component: Table,
}

export default meta

interface Product {
  id: number
  name: string
  price: number
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Socks',
    price: 100,
    description: 'Socks are a type of clothing worn on the feet.',
  },
  {
    id: 2,
    name: 'Shirt',
    price: 200,
    description: 'A shirt is a type of clothing worn on the upper body.',
  },
  {
    id: 3,
    name: 'Pants',
    price: 300,
    description: 'Pants are a type of clothing worn on the lower body.',
  },
]

const defaultArgs: TableProps<Product> = {
  columns: [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'price', header: 'Price', render: (price) => `$${price}` },
    { key: 'description', header: 'Description' },
  ] as Column<Product>[],
  data: products,
  rowKey: (row: Product) => row.id,
}

export const Default: StoryObj<typeof Table<Product>> = {
  args: defaultArgs,
}
