import { Grid } from '@/components/Grid'

function generateDarkPastelColor(index: number) {
  const hue = (index * 137) % 360
  const saturation = 30
  const lightness = 45
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

/**
 * Create a list of sample children for testing and rendering in storybook
 */
export function createSampleChildren(count: number, attachTestIds?: boolean) {
  return Array.from({ length: count }).map((_, index) => {
    const backgroundColor = generateDarkPastelColor(index)
    return (
      <div
        key={index}
        style={{
          backgroundColor,
          padding: '10px',
          borderRadius: '5px',
          color: 'white',
          minWidth: '100px',
          textAlign: 'center',
        }}
        data-testid={attachTestIds ? `sample-child-${index + 1}` : undefined}
      >
        {index + 1}
      </div>
    )
  })
}

export function createSampleGridChildren(count: number) {
  return createSampleChildren(count).map((child) => (
    <Grid.Item key={child.key} {...child.props}>
      {child}
    </Grid.Item>
  ))
}
