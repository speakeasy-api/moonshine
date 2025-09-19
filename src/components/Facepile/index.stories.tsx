import { Meta, StoryObj } from '@storybook/react-vite'
import { Facepile } from '.'
import { sizes } from '@/types'

const meta: Meta<typeof Facepile> = {
  component: Facepile,
  tags: ['autodocs'],
  argTypes: {
    avatarSize: {
      control: 'select',
      options: sizes,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson' },
      { name: 'Bob Smith' },
      { name: 'Charlie Brown' },
      { name: 'Diana Ross' },
      { name: 'Edward Norton' },
      { name: 'Fiona Apple' },
      { name: 'George Clooney' },
    ],
  },
}

export const WithImages: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson', imageUrl: 'https://picsum.photos/id/10/200' },
      { name: 'Bob Smith', imageUrl: 'https://picsum.photos/id/20/200' },
      { name: 'Charlie Brown', imageUrl: 'https://picsum.photos/id/30/200' },
      { name: 'Diana Ross', imageUrl: 'https://picsum.photos/id/40/200' },
      { name: 'Edward Norton', imageUrl: 'https://picsum.photos/id/50/200' },
      { name: 'Fiona Apple', imageUrl: 'https://picsum.photos/id/60/200' },
      { name: 'George Clooney', imageUrl: 'https://picsum.photos/id/70/200' },
    ],
  },
}

export const ResponsveSizes: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson', imageUrl: 'https://picsum.photos/id/10/200' },
      { name: 'Bob Smith', imageUrl: 'https://picsum.photos/id/20/200' },
      { name: 'Charlie Brown', imageUrl: 'https://picsum.photos/id/30/200' },
      { name: 'Diana Ross', imageUrl: 'https://picsum.photos/id/40/200' },
      { name: 'Edward Norton', imageUrl: 'https://picsum.photos/id/50/200' },
      { name: 'Fiona Apple', imageUrl: 'https://picsum.photos/id/60/200' },
      { name: 'George Clooney', imageUrl: 'https://picsum.photos/id/70/200' },
    ],
    avatarSize: {
      xs: 'small',
      md: 'medium',
      lg: 'large',
    },
  },
}

export const WithLinks: Story = {
  args: {
    avatars: [
      {
        name: 'Alice Johnson',
        imageUrl: 'https://picsum.photos/id/10/200',
        href: '/',
      },
      {
        name: 'Bob Smith',
        imageUrl: 'https://picsum.photos/id/20/200',
        href: '/',
      },
      {
        name: 'Charlie Brown',
        imageUrl: 'https://picsum.photos/id/30/200',
        href: '/',
      },
      {
        name: 'Diana Ross',
        imageUrl: 'https://picsum.photos/id/40/200',
        href: '/',
      },
      {
        name: 'Edward Norton',
        imageUrl: 'https://picsum.photos/id/50/200',
        href: '/',
      },
      {
        name: 'Fiona Apple',
        imageUrl: 'https://picsum.photos/id/60/200',
        href: '/',
      },
      {
        name: 'George Clooney',
        imageUrl: 'https://picsum.photos/id/70/200',
        href: '/',
      },
    ],
  },
}

export const Static: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson' },
      { name: 'Bob Smith' },
      { name: 'Charlie Brown' },
      { name: 'Diana Ross' },
      { name: 'Edward Norton' },
      { name: 'Fiona Apple' },
      { name: 'George Clooney' },
    ],
    variant: 'static',
  },
}

export const StaticWithImages: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson', imageUrl: 'https://picsum.photos/id/10/200' },
      { name: 'Bob Smith', imageUrl: 'https://picsum.photos/id/20/200' },
      { name: 'Charlie Brown', imageUrl: 'https://picsum.photos/id/30/200' },
      { name: 'Diana Ross', imageUrl: 'https://picsum.photos/id/40/200' },
      { name: 'Edward Norton', imageUrl: 'https://picsum.photos/id/50/200' },
      { name: 'Fiona Apple', imageUrl: 'https://picsum.photos/id/60/200' },
      { name: 'George Clooney', imageUrl: 'https://picsum.photos/id/70/200' },
    ],
    variant: 'static',
  },
}

export const StaticWithResponsiveImages: Story = {
  args: {
    avatars: [
      { name: 'Alice Johnson', imageUrl: 'https://picsum.photos/id/10/200' },
      { name: 'Bob Smith', imageUrl: 'https://picsum.photos/id/20/200' },
      { name: 'Charlie Brown', imageUrl: 'https://picsum.photos/id/30/200' },
      { name: 'Diana Ross', imageUrl: 'https://picsum.photos/id/40/200' },
      { name: 'Edward Norton', imageUrl: 'https://picsum.photos/id/50/200' },
      { name: 'Fiona Apple', imageUrl: 'https://picsum.photos/id/60/200' },
      { name: 'George Clooney', imageUrl: 'https://picsum.photos/id/70/200' },
    ],
    avatarSize: {
      xs: 'small',
      md: 'medium',
      lg: 'large',
    },
    variant: 'static',
  },
}
