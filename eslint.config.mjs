// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'
import vitest from '@vitest/eslint-plugin'

export default defineConfig(
  globalIgnores(['coverage/**', 'dist/**', 'node_modules/**', 'scripts/**']),
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierRecommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs', '*.ts'],
        },
      },
    },
  },

  // All files
  {
    files: ['src/**/*.ts'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      tsdoc: eslintPluginTsdoc,
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
          message: 'Use querySelector or querySelectorIn from @common/utils/dom instead.',
        },
        {
          selector: 'CallExpression[callee.property.name="querySelectorAll"]',
          message: 'Use querySelectorAll or querySelectorAllIn from @common/utils/dom instead.',
        },
      ],
    },
  },

  // Non-test files
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@common/test/*'],
              message: 'Test utilities should only be imported in test files.',
            },
            {
              group: ['./**', '../**'],
              message: 'Use absolute imports with path aliases (@common, @modules) instead of relative imports.',
            },
          ],
        },
      ],
    },
  },

  // Test files
  {
    files: ['src/**/*.test.ts'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      'vitest/max-expects': 'off',
      'vitest/no-hooks': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/valid-title': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./**', '../**'],
              message: 'Use absolute imports with path aliases (@common, @modules) instead of relative imports.',
            },
          ],
        },
      ],
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
    },
  },

  // Specific files
  {
    files: ['src/common/utils/dom.ts'],
    rules: {
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
)
