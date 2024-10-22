import type { Preview } from '@storybook/react'

// TODO: may be a better way to load variables.css
// in storybook
import '@/variables.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
