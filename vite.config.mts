import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  assetsInclude: ['**/*.riv'],
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        titleProp: true,
        ref: true,
        svgo: true,
        exportType: 'default',
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    exclude: ['integration', 'node_modules', 'dist'],
  },
  base: './',
  define: process.env.VITEST ? {} : { global: 'window' },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
