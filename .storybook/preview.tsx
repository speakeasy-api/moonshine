import type { Preview } from '@storybook/react'
import '../src/global.css'
import { allModes } from './modes'
import { withThemeByClassName } from '@storybook/addon-themes'
import { ThemedDocsContainer } from './themedDocsContainer'

export const decorators = [
  withThemeByClassName({
    themes: { light: 'light', dark: 'dark' },
    defaultTheme: 'light',
  }),
]

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        small: { name: 'Small', styles: { width: '640px', height: '800px' } },
        large: {
          name: 'Large',
          styles: { width: '1024px', height: '1000px' },
        },
      },
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#1E293B' },
      ],
    },

    docs: {
      container: ThemedDocsContainer,
    },

    // Tells Chromatic to test each story in both light and dark modes
    chromatic: {
      modes: {
        'light mobile': allModes['light mobile'],
        'dark desktop': allModes['dark desktop'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
