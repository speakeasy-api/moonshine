// IMPORTANT: the tsconfig rootDir is set to src/ so we have the correct structure in the published package
// and additionally there is an issue with vite-dts-plugin generating incorrect types for class-variance-authority
// so we need to colocate the tailwind config within the src directory
// the postcss config points to this file so that tailwind is picked up by the build process
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '&:where(.dark, .dark *)'],
  // Tailwind purges classnames that are not "used" in the codebase. This includes
  // any classnames that are interpolated such as: const className =
  // `grid-cols-${index + 1}` so we need to whitelist them here.
  safelist: [
    'dark',
    {
      pattern: /gap-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /grid-cols-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /flex-(row|col)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^line-clamp-/,
    },
    {
      pattern: /^col-span-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^p-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^p[x|y|t|r|b|l]-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^justify-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^items-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^size-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^h-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^w-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^border-\d+$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^flex-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^justify-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^items-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^flex-(nowrap|wrap|wrap-reverse)$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /bg-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
    },
    extend: {
      backgroundImage: ({ theme }) => ({
        mask: `linear-gradient(to bottom, ${theme('colors.background')} 0%, ${theme('colors.transparent')} 5%,${theme('colors.transparent')} 95%,${theme('colors.background')} 100%)`,
      }),
    },
  },
  plugins: [animate],
}
