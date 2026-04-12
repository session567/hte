# CLAUDE.md - Guidelines for AI Agents

## Commands

- `pnpm test` - Run all tests
- `pnpm test <file>` - Run tests in a specific file
- `pnpm lint` - Run ESLint (`--fix` to auto-fix)
- `pnpm lint:css` - Run Stylelint on CSS files
- `pnpm build` - Build the extension

## Code Style

### Imports

Always use absolute path aliases — never relative imports.

```typescript
import { pages } from '@/entrypoints/content/common/utils/pages'
import { t } from '#i18n/content'
```

### DOM Manipulation

Use utilities from `@/common/utils/dom` and `@/entrypoints/content/common/utils/dom` instead of native methods. Direct `document.getElementById` / `document.querySelectorAll` etc. are restricted by ESLint.

### Testing

- Test files use `*.test.ts` extension
- Descriptions in present tense: `it('adds element', ...)`
- Check `src/common/test/setup.ts` for existing global mocks before adding new ones

## Module Structure

Each module lives in `src/entrypoints/content/modules/<name>/` and requires:

- `metadata.ts` — id, name, description (and optional `settings`, `excludeFromPopup`)
- `index.ts` — `Module` object referencing the metadata
- `index.test.ts` — tests

Modules are auto-discovered for the popup via `metadata.ts`. Each module gets a free `enabled` toggle; add a `settings` map to `metadata.ts` for extra boolean settings.

Modules register in `src/entrypoints/content/index.ts`.
