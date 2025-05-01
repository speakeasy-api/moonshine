import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

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
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          'react-dom': 'ReactDOM',
          'lucide-react': 'LucideReact',
        },
        manualChunks: {
          // lucide-react is a barrel file, so we need to split it into a separate chunk
          // https://github.com/vitejs/vite/issues/8237
          'lucide-icons': ['lucide-react'],
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
