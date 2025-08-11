import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

const packageName = 'moonshine'

export default defineConfig({
  assetsInclude: ['**/*.riv'],
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
  build: {
    outDir: 'dist',
    emptyOutDir: process.env.CI ? true : false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: packageName,
      fileName: (format) => `${packageName}.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      // Ensure consumers provide these deps. Also treat subpath imports as external
      // e.g. `lucide-react/dynamicIconImports`.
      external: (id) => {
        const externals = [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'lucide-react',
        ]
        return externals.some((pkg) => id === pkg || id.startsWith(pkg + '/'))
      },
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    target: 'esnext',
    minify: process.env.CI ? 'esbuild' : false,
    reportCompressedSize: process.env.CI ? true : false,
    cssMinify: process.env.CI ? true : false,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
