import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

// Define the colors and styles for the theme
export const speakeasyTheme = create({
  base: 'dark',

  // Speakeasy's brand colors
  colorPrimary: 'hsl(53, 96%, 40%)', // Primary brand color
  colorSecondary: 'hsl(53, 96%, 40%)', // Accent color

  // UI elements
  appBg: 'hsl(54, 20%, 10%)',
  appContentBg: 'hsl(54, 20%, 10%)',
  appBorderColor: 'hsl(0, 0%, 20%)',
  appBorderRadius: 4,

  // Text colors
  textColor: 'hsl(0, 0%, 90%)',
  textInverseColor: 'hsl(0, 0%, 10%)',

  // Toolbar default and active colors
  barTextColor: 'hsl(0, 0%, 90%)',
  barSelectedColor: 'hsl(0, 0%, 90%)',
  barBg: 'hsl(54, 20%, 10%)',

  // Form colors
  inputBg: 'hsl(54, 20%, 10%)',
  inputBorder: 'hsl(0, 0%, 20%)',
  inputTextColor: 'hsl(0, 0%, 90%)',
  inputBorderRadius: 4,

  brandTitle: 'Speakeasy Moonshine',
  brandUrl: 'https://speakeasy.com',
})

addons.setConfig({
  theme: speakeasyTheme,
})
