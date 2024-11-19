import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import dynamicImport from 'vite-plugin-dynamic-import'

const packageName = 'moonshine'

export default defineConfig({
  plugins: [
    react(),
    dts(),
    svgr({
      svgrOptions: {
        titleProp: true,
        ref: true,
        svgo: true,
        exportType: 'default',
      },
    }),
    dynamicImport({
      filter(id) {
        if (id.includes('@speed-highlight/core')) return true
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    exclude: ['integration', 'node_modules', 'dist'],
  },
  base: './',
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: packageName,
      fileName: (format) => `${packageName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'lucide-react': 'LucideReact',
        },
      },
    },
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
  },
  optimizeDeps: {
    include: ['@speed-highlight/core'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
