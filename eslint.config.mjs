// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'eslint-plugin-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      globals: {
        console: true,
      },
    },
  },
  {
    plugins: {
      prettier,
      'react-refresh': reactRefresh,
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Enable Prettier and ensure it uses .prettierrc

      // Ensure only components are exported in a component file
      // so that HMR doesn't break
      'react-refresh/only-export-components': 'error',
    },
  }
)
