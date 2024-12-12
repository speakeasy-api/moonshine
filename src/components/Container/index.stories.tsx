import { Container } from '.'
import { StoryObj, Meta } from '@storybook/react'
import { Card, Grid } from '#index'

const meta: Meta<typeof Container> = {
  component: Container,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: [
      <Grid columns={{ sm: 1, md: 2 }} gap={4}>
        <Grid.Item>
          <Card>
            <Card.Header>Card 1</Card.Header>
            <Card.Content>Card 1</Card.Content>
          </Card>
        </Grid.Item>
        <Grid.Item>
          <Card>
            <Card.Header>Card 2</Card.Header>
            <Card.Content>Card 2</Card.Content>
          </Card>
        </Grid.Item>
      </Grid>,
    ],
  },
}
