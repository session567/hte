// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'

export default defineConfig(
  globalIgnores(['dist/**', 'node_modules/**', 'coverage/**']),
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierRecommended,

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

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@common/test/*'],
              message: 'Test utilities should only be imported in test files.',
            },
            {
              group: ['./*', '../*'],
              message: 'Use absolute imports with path aliases (@common, @modules) instead of relative imports.',
            },
          ],
        },
      ],

      'no-restricted-properties': [
        'error',
        {
          object: 'document',
          property: 'getElementById',
          message: 'Use getElementById from @common/utils/dom instead.',
        },
        {
          object: 'document',
          property: 'getElementsByName',
          message: 'Use getElementsByName from @common/utils/dom instead.',
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.property.name="querySelector"]',
          message: 'Use querySelector from @common/utils/dom instead.',
        },
        {
          selector: 'CallExpression[callee.property.name="querySelectorAll"]',
          message: 'Use querySelectorAll from @common/utils/dom instead.',
        },
      ],
    },
  },

  {
    files: ['src/**/*.test.ts'],
    rules: {
      'no-restricted-imports': 'off',
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
    },
  },

  {
    files: ['src/common/utils/dom.ts'],
    rules: {
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
    },
  },
)
