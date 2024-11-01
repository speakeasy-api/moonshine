export const allModes = {
  mobile: {
    viewport: 'small',
  },
  desktop: {
    viewport: 'large',
  },
  dark: {
    backgrounds: { value: 'hsl(54, 20%, 10%)' },
    theme: 'dark',
  },
  light: {
    backgrounds: { value: '#fff' },
    theme: 'light',
  },
  'dark desktop': {
    backgrounds: { value: 'hsl(54, 20%, 10%)' },
    theme: 'dark',
    viewport: 'large',
  },
  'light mobile': {
    backgrounds: { value: '#fff' },
    theme: 'light',
    viewport: 'small',
  },
}
