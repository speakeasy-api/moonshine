import type { Preview, Decorator } from '@storybook/react'
import '../src/global.css'
import './fonts.css'
import React from 'react'
import { allModes } from './modes'
import { withThemeByClassName } from '@storybook/addon-themes'
import { ThemedDocsContainer } from './themedDocsContainer'

import { MoonshineConfigProvider } from '../src/context/ConfigContext'

const moonshineConfigProviderDecorator: Decorator = (story, context) => {
  return (
    <MoonshineConfigProvider theme={context.globals.theme} setTheme={() => {}}>
      {story()}
    </MoonshineConfigProvider>
  )
}

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: { light: 'light', dark: 'dark' },
    defaultTheme: 'light',
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
      // Delay to allow for things to mount
      delay: 500,
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
