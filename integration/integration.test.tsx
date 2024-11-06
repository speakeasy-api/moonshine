import { render, screen } from '@testing-library/react'
import {
  Card,
  Grid,
  Separator,
  Button,
  Icon,
  Stack,
  Badge,
  Heading,
  Text,
  Logo,
  Score,
  Container,
  Combobox,
} from '@speakeasy-api/moonshine'
import { describe, it, expect } from 'vitest'

// This is a sense check that the components in the **PUBLISHED** package are working

describe('Card', () => {
  it('renders', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer content={{ text: 'Footer' }} />
      </Card>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})

describe('Grid', () => {
  it('renders', () => {
    render(
      <Grid>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    )
  })
})

describe('Separator', () => {
  it('renders', () => {
    render(<Separator />)
  })
})

describe('Button', () => {
  it('renders', () => {
    render(<Button>Click me</Button>)
  })
})

describe('Icon', () => {
  it('renders', () => {
    render(<Icon name="plus" />)
  })
})

describe('Stack', () => {
  it('renders', () => {
    render(
      <Stack>
        <div>1</div>
        <div>2</div>
      </Stack>
    )
  })
})

describe('Badge', () => {
  it('renders', () => {
    render(<Badge>Default</Badge>)
  })
})

describe('Heading', () => {
  it('renders', () => {
    render(<Heading level={1}>Heading</Heading>)
  })
})

describe('Score', () => {
  it('renders', () => {
    render(<Score score={75} />)
  })
})

describe('Text', () => {
  it('renders', () => {
    render(<Text>Text</Text>)
  })
})

describe('Logo', () => {
  it('renders', () => {
    render(<Logo variant="wordmark" />)
  })
})

describe('Container', () => {
  it('renders', () => {
    render(<Container>Container</Container>)
  })
})

describe('Combobox', () => {
  it('renders', () => {
    render(<Combobox options={[]} />)
  })
})
