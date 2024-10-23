function generateDarkPastelColor(index: number) {
  const hue = (index * 137) % 360
  const saturation = 40 + Math.random() * 20
  const lightness = 30 + Math.random() * 10
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
        }}
        data-testid={attachTestIds ? `sample-child-${index + 1}` : undefined}
      >
        {index + 1}
      </div>
    )
  })
}
