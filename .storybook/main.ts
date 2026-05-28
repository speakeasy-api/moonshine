import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  staticDirs: ['./public'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')

    return mergeConfig(config, {
      plugins: [
        {
          // MDX compiler generates file:// imports for pnpm virtual store paths
          // that Vite can't resolve. Normalize them to absolute paths.
          name: 'resolve-file-protocol-imports',
          resolveId(id) {
            if (!id.startsWith('file://')) return
            const path = id.slice('file://'.length)
            return path.startsWith('/') ? path : resolve(process.cwd(), path)
          },
        },
      ],
      optimizeDeps: {
        // https://github.com/storybookjs/storybook/issues/28542#issuecomment-2268031095
        exclude: [
          'node_modules/.cache/sb-vite',
          'node_modules/.cache/storybook',
        ],
      },
    })
  },
}
export default config
