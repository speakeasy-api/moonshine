import type { Preview } from '@storybook/react'
import '../src/global.css'
import { allModes } from './modes'
import { withThemeByClassName } from '@storybook/addon-themes'

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
    decorators: [
      withThemeByClassName({
        themes: {
          light: 'light',
          dark: 'dark',
        },
        defaultTheme: 'light',
      }),
    ],

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

    darkMode: {
      stylePreview: true,
      // Will apply .light or .dark to the iframe body element
      // which is an ancestor to the .storybook-preview-wrapper below
      classTarget: 'body',
    },
  },
}

export default preview
