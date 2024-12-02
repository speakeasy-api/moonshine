import { Grid } from '@/components/Grid'

/**
 * Create a list of sample children for testing and rendering in storybook
 */
export function createSampleChildren(count: number, attachTestIds?: boolean) {
  return Array.from({ length: count }).map((_, index) => {
    return (
      <div
        key={index}
        className="bg-muted text-muted-foreground flex min-w-[100px] items-center justify-center rounded-md p-4 text-center"
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
