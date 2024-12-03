import type { Preview } from '@storybook/react'
import '../src/global.css'
import React from 'react'
import { allModes } from './modes'
import { withThemeByClassName } from '@storybook/addon-themes'
import { ThemedDocsContainer } from './themedDocsContainer'

import { MoonshineConfigProvider } from '../src/context/ConfigContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moonshineConfigProviderDecorator = (story: any) => {
  return (
    <MoonshineConfigProvider themeElement={document.documentElement}>
      {story()}
    </MoonshineConfigProvider>
  )
}

export const decorators = [
  withThemeByClassName({
    themes: { light: 'light', dark: 'dark' },
    defaultTheme: 'dark',
  }),
  moonshineConfigProviderDecorator,
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
        { name: 'dark', value: 'hsl(0, 0%, 7%)' },
      ],
    },

    docs: {
      container: ThemedDocsContainer,
    },

    // Tells Chromatic to test each story in both light and dark modes
    chromatic: {
      modes: {
        'light desktop': allModes['light desktop'],
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
