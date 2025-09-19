import { create } from 'storybook/theming'

// Define the colors and styles for the theme
export const speakeasyTheme = create({
  base: 'light',

  // Speakeasy's brand colors
  colorPrimary: 'hsl(53, 96%, 40%)', // Primary brand color
  colorSecondary: 'hsl(53, 96%, 40%)', // Accent color

  // UI elements
  appBg: 'hsl(0, 0%, 100%)',

  // Docs bg
  appContentBg: 'hsl(0, 0%, 100%)',
  appBorderColor: 'hsl(0, 0%, 20%)',
  appBorderRadius: 4,

  // Text colors
  textColor: 'hsl(0, 0%, 10%)',
  textInverseColor: 'hsl(0, 0%, 100%)',

  // Toolbar default and active colors
  barTextColor: 'hsl(0, 0%, 10%)',
  barSelectedColor: 'hsl(0, 0%, 10%)',
  barBg: 'hsl(0, 0%, 100%)',

  // Form colors
  inputBg: 'hsl(0, 0%, 100%)',
  inputBorder: 'hsl(0, 0%, 20%)',
  inputTextColor: 'hsl(0, 0%, 10%)',
  inputBorderRadius: 4,

  brandTitle: 'Speakeasy Moonshine',
  brandUrl: 'https://speakeasy.com',
})

// addons.setConfig({
//   theme: speakeasyTheme,
// })
