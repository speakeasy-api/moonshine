import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/global.css'
import './storybook-preview-wrapper.css'
import { themes } from '@storybook/theming'
import { allModes } from './modes'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',

    // Tells Chromatic to test each story in both light and dark modes
    chromatic: {
      modes: {
        light: allModes.light,
        dark: allModes.dark,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // TODO: figure out how to make this work with autodocs
    // Couldn't easily get it to work :(
    docs: { theme: themes.dark },
    darkMode: {
      stylePreview: true,
      // Will apply .light or .dark to the iframe body element
      // which is an ancestor to the .storybook-preview-wrapper below
      classTarget: 'body',
    },
  },
  decorators: [
    (Story) => <div className="storybook-preview-wrapper">{Story()}</div>,
  ],
}

export default preview
