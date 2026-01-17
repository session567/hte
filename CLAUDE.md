# Project Info

**HTE** is a browser extension that provides various enhancements for [Hattrick](https://www.hattrick.org).

See [CONTRIBUTING.md](CONTRIBUTING.md) for additional context on project structure, module architecture, and contributor guidelines.

- Package manager: **pnpm**
- Test framework: **Vitest** with jsdom
- Build tool: **esbuild**

## TypeScript Guidelines

- Prefer `type` over `interface`
- Never use `enum`; always prefer literal unions instead
- Use TSDoc comments
- Max line length: 120 characters (applies to both code and comments)

## Testing Conventions

- All test files use `.test.ts` extension
- Use `test` instead of `it` for test descriptions
- Test descriptions should use present tense verbs (e.g., `test('adds element', ...)` not `test('should add element', ...)`)
- **Before writing tests, check `src/common/test/setup.ts` for global mocks** - don't re-mock what's already mocked
- Mocks are automatically cleared after each test

## Module Architecture

- Each module is self-contained in `src/modules/[module-name]/`
- Required files: `index.ts`, `index.test.ts`
- Optional files: `utils.ts`, `utils.test.ts`, `constants.ts`, `types.ts`, `index.css`
- Modules are registered in `src/index.ts`

## Path Aliases

- `@` → `src/`
- `@common` → `src/common/`
- `@modules` → `src/modules/`

**Always use absolute imports with path aliases** - never use relative imports (e.g., use `@common/utils/dom` instead of `../../common/utils/dom`)

  ## Common Utilities

  Check `src/common/utils/` for existing utilities before reimplementing
