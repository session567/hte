# Project Info

**HTE** is a browser extension that provides various enhancements for [Hattrick](https://www.hattrick.org).

- Package manager: **pnpm**
- Test framework: **Vitest** with jsdom
- Build tool: **esbuild**

## General Guidelines

- See [CONTRIBUTING.md](CONTRIBUTING.md) for additional context on the project structure and module architecture
- Check `src/common/utils/` for existing utilities before reimplementing
- Use TSDoc comments
- Max line length: 120 characters (applies to both code and comments)

## Testing Conventions

- All test files use `.test.ts` extension
- Test descriptions should use present tense verbs (e.g., `it('adds element', ...)` not `it('should add element', ...)`)
- **Before writing tests, check `src/common/test/setup.ts` for global mocks** - don't re-mock what's already mocked
- Mocks are automatically cleared after each test

## Path Aliases

**Always use absolute imports with path aliases** - never use relative imports (e.g. use `@common/utils/dom` instead of
`../../common/utils/dom`)

- `@` → `src/`
- `@common` → `src/common/`
- `@modules` → `src/modules/`
