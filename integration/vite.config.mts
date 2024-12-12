import { defineConfig } from 'vite'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js',
  },
  define: process.env.VITEST ? {} : { global: 'window' },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },
})
