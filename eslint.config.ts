import eslint from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores(['.output/**', '.wxt/**', 'coverage/**', 'node_modules/**', 'public/**']),
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierRecommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs'],
        },
      },
    },
  },

  // All files
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      tsdoc: eslintPluginTsdoc,
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Config files
  {
    files: ['*.config.ts', '*.config.mjs'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },

  // src files
  {
    files: ['./src/**/*.ts'],
    rules: {
      'tsdoc/syntax': 'warn',

      'no-restricted-properties': [
        'error',
        {
          object: 'document',
          property: 'getElementById',
          message: 'Use getElementById from @/entrypoints/content/common/utils/dom instead.',
        },
        {
          object: 'document',
          property: 'getElementsByName',
          message: 'Use getElementsByName from @/entrypoints/content/common/utils/dom instead.',
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use literal unions instead of enums.',
        },
        {
          selector: 'CallExpression[callee.property.name="querySelector"]',
          message: 'Use querySelector or querySelectorIn from @/entrypoints/content/common/utils/dom instead.',
        },
        {
          selector: 'CallExpression[callee.property.name="querySelectorAll"]',
          message: 'Use querySelectorAll or querySelectorAllIn from @/entrypoints/content/common/utils/dom instead.',
        },
      ],
    },
  },

  // Non-test files
  {
    files: ['./src/**/*.ts'],
    ignores: ['./src/**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/entrypoints/content/common/test/*'],
              message: 'Test utilities should only be imported in test files.',
            },
            {
              group: ['./**', '../**'],
              message: 'Use absolute imports with path aliases (@/entrypoints) instead of relative imports.',
            },
          ],
        },
      ],
    },
  },

  // Test files
  {
    files: ['./src/**/*.test.ts'],
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
              message: 'Use absolute imports with path aliases (@/entrypoints) instead of relative imports.',
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
    files: ['./src/entrypoints/content/common/utils/dom.ts'],
    rules: {
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    },
  },
)
