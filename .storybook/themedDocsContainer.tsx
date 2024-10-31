import { DocsContainer } from '@storybook/blocks'
import React from 'react'
import { themes } from '@storybook/theming'

export const ThemedDocsContainer = ({ children, context }) => {
  return (
    <DocsContainer
      context={context}
      theme={
        // This is a bit of a hack to get the theme from the global state
        // for autodocs previews to properly respect the theme
        // Ref: https://github.com/storybookjs/storybook/issues/28758#issuecomment-2380062194
        context.store.userGlobals.globals.theme === 'dark'
          ? themes.dark
          : themes.light
      }
    >
      {children}
    </DocsContainer>
  )
}
