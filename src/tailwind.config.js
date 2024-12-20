// IMPORTANT: the tsconfig rootDir is set to src/ so we have the correct structure in the published package
// and additionally there is an issue with vite-dts-plugin generating incorrect types for class-variance-authority
// so we need to colocate the tailwind config within the src directory
// the postcss config points to this file so that tailwind is picked up by the build process
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
      transitionTimingFunction: {
        'ease-in-out-quad': 'var(--ease-in-out-quad)',
        'ease-in-out-cubic': 'var(--ease-in-out-cubic)',
        'ease-in-out-quart': 'var(--ease-in-out-quart)',
        'ease-in-out-quint': 'var(--ease-in-out-quint)',
        'ease-in-out-expo': 'var(--ease-in-out-expo)',
        'ease-in-out-circ': 'var(--ease-in-out-circ)',
        'ease-in-quad': 'var(--ease-in-quad)',
        'ease-in-cubic': 'var(--ease-in-cubic)',
        'ease-in-quart': 'var(--ease-in-quart)',
        'ease-in-quint': 'var(--ease-in-quint)',
        'ease-in-expo': 'var(--ease-in-expo)',
        'ease-in-circ': 'var(--ease-in-circ)',
        'ease-out-quad': 'var(--ease-out-quad)',
        'ease-out-cubic': 'var(--ease-out-cubic)',
        'ease-out-quart': 'var(--ease-out-quart)',
        'ease-out-quint': 'var(--ease-out-quint)',
        'ease-out-expo': 'var(--ease-out-expo)',
        'ease-out-circ': 'var(--ease-out-circ)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // TODO: update success, info, warning, danger to use the new color tokens
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        feature: {
          DEFAULT: 'hsl(var(--feature))',
          foreground: 'hsl(var(--feature-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontSize: {
        // TODO: Add token for text colors
        'heading-xl': [
          '2.0625rem',
          {
            lineHeight: '1.375',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#FAFAFA',
          },
        ],
        'heading-lg': [
          '1.8125rem',
          {
            lineHeight: '1.517',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#FAFAFA',
          },
        ],
        'heading-md': [
          '1.625rem',
          {
            lineHeight: '1.615',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#FAFAFA',
          },
        ],
        'heading-sm': [
          '1.4375rem',
          {
            lineHeight: '1.609',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#F4F4F5',
          },
        ],
        'heading-xs': [
          '1.25rem',
          {
            lineHeight: '1.75',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#F4F4F5',
          },
        ],
        'heading-xxs': [
          '1.125rem',
          {
            lineHeight: '1.778',
            letterSpacing: '0.0015em',
            fontWeight: '300',
            color: '#F4F4F5',
          },
        ],
        'body-lg': [
          '1.125rem',
          {
            lineHeight: '1.75',
            letterSpacing: '0.0025em',
            fontWeight: '400',
            color: '#E4E4E7',
          },
        ],
        'body-md': [
          '1rem',
          {
            lineHeight: '1.75',
            letterSpacing: '0.0025em',
            fontWeight: '400',
            color: '#E4E4E7',
          },
        ],
        'body-sm': [
          '0.875rem',
          {
            lineHeight: '1.75',
            letterSpacing: '0.0025em',
            fontWeight: '400',
            color: '#E4E4E7',
          },
        ],
        'body-xs': [
          '0.75rem',
          {
            lineHeight: '1.75',
            letterSpacing: '0.0025em',
            fontWeight: '400',
            color: '#E4E4E7',
          },
        ],
      },
    },
  },
  plugins: [animate],
}
