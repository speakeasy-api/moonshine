import { AvatarStack } from '.'
import { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof AvatarStack> = {
  component: AvatarStack,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AvatarStack>

export const Default: Story = {
  args: {
    users: [
      {
        name: 'John Doe',
        imageUrl: 'https://robohash.org/1',
        href: 'https://google.com',
      },
      {
        name: 'Ben Doe',
        imageUrl: 'https://robohash.org/2',
        href: 'https://google.com',
      },
      {
        name: 'Charlie Doe',
        imageUrl: 'https://robohash.org/3',
        href: 'https://google.com',
      },
    ],
  },
}

export const WithMoreLink: Story = {
  ...Default.parameters,
  args: {
    ...Default.args,
    users: [
      {
        name: 'Dave Doe',
        imageUrl: 'https://robohash.org/4',
        href: 'https://google.com/1',
      },
      {
        name: 'Eve Doe',
        imageUrl: 'https://robohash.org/5',
        href: 'https://google.com/2',
      },
      {
        name: 'Frank Doe',
        imageUrl: 'https://robohash.org/6',
        href: 'https://google.com/3',
      },
      {
        name: 'Grace Doe',
        imageUrl: 'https://robohash.org/7',
        href: 'https://google.com',
      },
      {
        name: 'Hank Doe',
        imageUrl: 'https://robohash.org/8',
        href: 'https://google.com',
      },
      {
        name: 'Ivy Doe',
        imageUrl: 'https://robohash.org/9',
        href: 'https://google.com',
      },
      {
        name: 'Jack Doe',
        imageUrl: 'https://robohash.org/10',
        href: 'https://google.com',
      },
      {
        name: 'Jill Doe',
        imageUrl: 'https://robohash.org/11',
        href: 'https://google.com',
      },
      {
        name: 'Kyle Doe',
        imageUrl: 'https://robohash.org/12',
        href: 'https://google.com',
      },
      {
        name: 'Liam Doe',
        imageUrl: 'https://robohash.org/13',
        href: 'https://google.com',
      },
      {
        name: 'Mia Doe',
        imageUrl: 'https://robohash.org/14',
        href: 'https://google.com',
      },
      {
        name: 'Noah Doe',
        imageUrl: 'https://robohash.org/15',
        href: 'https://google.com',
      },
    ],
    moreLinkHref: 'https://google.com/imfeelinglucky',
  },
}
