# Contributing

Thank you for your interest in contributing to HTE! Please be sure to read these guidelines before making or requesting
a change.

## Before You Start

**Please discuss any changes before starting work.** Open an issue or contact the repository owner through Hattrick to
discuss your proposed change.

## Architecture Overview

HTE is a browser extension built with TypeScript, [WXT](https://wxt.dev/), [Vite](https://vite.dev/)
and [Vitest](https://vitest.dev/). The codebase follows a modular architecture where each feature is a self-contained
module.

Most contributions involve creating new modules or modifying existing ones in `src/entrypoints/content/modules/`, with
shared utilities available in `src/entrypoints/content/common/`.

Project structure:

```
hte/
├── .output/                     # Build output (generated)
├── .wxt/                        # WXT generated files
├── src/
│   ├── common/                  # Shared utilities
│   │   └── test/                # Test setup (global mocks)
│   ├── entrypoints/             # Contains all the entrypoints that get bundled into the extension
│   │   └── content/             # The extension's content script
│   │       ├── common/          # Shared content script utilities
│   │       │   ├── styles/      # Global CSS styles
│   │       │   ├── types/       # TypeScript type definitions
│   │       │   └── utils/       # Utility functions
│   │       ├── modules/         # Modules
│   │       └── index.ts         # Content script entry point
│   └── locales/                 # Translation files
```

Modules follow a consistent structure:

```
src/entrypoints/content/modules/example-module/
├── constants.ts     # Module constants (optional)
├── index.css        # Module-specific styles (optional)
├── index.test.ts    # Tests for the module (required)
├── index.ts         # Module definition and main logic (required)
├── utils.test.ts    # Tests for utilities (optional)
└── utils.ts         # Helper functions (optional)
```

## Local Development

1. Fork the repository, then clone or download your fork
2. Run `nvm use` to switch to the Node version specified in the `.nvmrc` file
   (install [nvm](https://github.com/nvm-sh/nvm))
3. Enable pnpm - `corepack enable pnpm`
4. Install dependencies - `pnpm install`
5. Run the extension in development mode (supports hot-reloading):
    - `pnpm dev` - Opens Chromium with the extension loaded
    - `pnpm dev:firefox` - Opens Firefox with the extension loaded

### pnpm Scripts

All pnpm scripts are located in [package.json](https://github.com/session567/hte/blob/main/package.json).

#### Development Scripts

- `pnpm dev` - Start development server for Chromium
- `pnpm dev:firefox` - Start development server for Firefox
- `pnpm build` - Build the extension for Chromium
- `pnpm build:firefox` - Build the extension for Firefox
- `pnpm zip` - Create distribution zip for Chromium
- `pnpm zip:firefox` - Create distribution zip for Firefox

#### Testing & Linting Scripts

- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Run ESLint
- `pnpm lint:css` - Run Stylelint

## Creating a Module

1. Create a new module under `src/entrypoints/content/modules/`.

   ```typescript
   import type { Module } from '@/entrypoints/content/common/types/module'
   import { pages } from '@/entrypoints/content/common/utils/pages'

   const exampleModule: Module = {
     name: 'Example Module', // The module's name
     pages: [pages.club], // Pages where this module runs
     run: () => {
       // Module logic here
     },
   }

   export default exampleModule
   ```

   For a simple module example, see
   [src/entrypoints/content/modules/hte-version/index.ts](https://github.com/session567/hte/blob/main/src/entrypoints/content/modules/hte-version/index.ts).

2. Register your module in `src/entrypoints/content/index.ts`:

   ```typescript
   import exampleModule from '@/entrypoints/content/modules/example'

   export const modules: Module[] = [
     // ... other modules
     exampleModule,
   ]
   ```

Modules only run when the user is logged in to Hattrick.

## Code Style

ESLint enforces most conventions automatically. Additional guidelines are documented in [AGENTS.md](AGENTS.md).

## Translations

We currently don't support translations, but HTE is built in a way that it could support translations in the future if
there's enough interest.

For now, all user-facing text should be defined in English in `src/_locales/en.json`, and retrieved using the `i18n.t()`
function from `#i18n` (alias).

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
