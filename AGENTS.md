# AGENTS.md - Guidelines for AI Agents

This file provides guidelines for AI agents working on the HTE codebase.

## Project Overview

HTE is a browser extension providing enhancements for Hattrick. Built with TypeScript, WXT, Vite and Vitest.

## Commands

### Running Tests

- `pnpm test` - Run all tests
- `pnpm test <file>` - Run tests in a specific file
- `pnpm test --testNamePattern "<pattern>"` - Run tests matching a pattern

### Linting & Building

- `pnpm lint` - Run ESLint on all files
- `pnpm lint --fix` - Auto-fix lint issues
- `pnpm lint:css` - Run Stylelint on CSS files
- `pnpm build` - Build the extension

## Code Style Guidelines

### Imports

**Always use absolute path aliases** - never relative imports. Use `@` for `src/` and `#i18n` for translations.

```typescript
// Good
import { pages } from '@/entrypoints/content/common/utils/pages'
import exampleModule from '@/entrypoints/content/modules/example'
import { t } from '#i18n/content'

// Bad
import { pages } from '../../common/utils/pages'
```

### Formatting

- Max line length: **120 characters** (code and comments)
- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **Trailing commas** in multiline objects/arrays

### TypeScript

- Use `type` over `interface` for type definitions
- Use literal unions instead of enums
- Enable `strict` mode - avoid `any`
- Use TSDoc comments

```typescript
// Good
type ModuleStatus = 'active' | 'inactive'

// Bad
enum ModuleStatus {
  Active,
  Inactive,
}
```

### Naming Conventions

- **Files**: kebab-case (`my-module.ts`, `utils.ts`)
- **Functions**: camelCase (`getElement`, `fetchData`)
- **Constants**: SCREAMING_SNAKE_CASE for config values
- **Types**: PascalCase (`UserData`, `ModuleConfig`)

### Error Handling

- Return early when conditions aren't met rather than nesting
- Reserve `throw` for truly exceptional/unrecoverable cases

### DOM Manipulation

Use utilities from `@/entrypoints/content/common/utils/dom` instead of native methods:

```typescript
// Good - uses library utilities
const element = getElementById('my-id')
const elements = querySelectorAll('.items')

// Bad - restricted by ESLint
document.getElementById('my-id')
document.querySelectorAll('.items')
```

### Testing

- Test files: `*.test.ts` extension
- Test descriptions: use present tense (`it('adds element', ...)`)
- Check `src/common/test/setup.ts` for global mocks before adding new ones
- Mocks are automatically cleared after each test
- Test behavior, not implementation details

### CSS

- Use CSS variables from `_colors.css`
- Use kebab-case for class names (Hattrick's existing classes may be camelCase)
- Modules have their own `index.css` file

## Project Structure

```
src/
├── common/                   # Shared utilities
├── entrypoints/content/      # Content script entry
│   ├── common/               # Shared utilities for content scripts
│   │   ├── styles/           # Global CSS styles
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── index.ts              # Content script entry point
│   └── modules/              # Feature modules
└── locales/                  # Translation files
```

## Architecture Notes

- Modules are self-contained in `src/entrypoints/content/modules/`
- Each module has `index.ts` (logic), optional `utils.ts`, and `*.test.ts`
- Modules register in `src/entrypoints/content/index.ts`

## Key Dependencies

- **WXT**: Web extension build framework
- **Vitest**: Test runner with jsdom environment
- **ESLint**: Linting with TypeScript support
- **Stylelint**: CSS linting
