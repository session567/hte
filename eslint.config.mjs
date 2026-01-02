// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierRecommended,
  globalIgnores(['.yarn/**', 'dist/**', 'node_modules/**']),
  {
    files: ['src/**/*.ts'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      tsdoc: eslintPluginTsdoc,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'tsdoc/syntax': 'warn',
    },
  },
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@common/test/*'],
              message: 'Test utilities should only be imported in test files',
            },
          ],
        },
      ],
    },
  },
)
