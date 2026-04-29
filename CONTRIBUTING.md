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
│   │   ├── content/             # The extension's content script
│   │   │   ├── common/          # Shared content script utilities
│   │   │   │   ├── styles/      # Global CSS styles
│   │   │   │   ├── types/       # TypeScript type definitions
│   │   │   │   └── utils/       # Utility functions
│   │   │   ├── modules/         # Modules
│   │   │   └── index.ts         # Content script entry point
│   │   └── popup/               # Extension popup UI
│   └── locales/                 # Translation files
```

Modules follow a consistent structure:

```
src/entrypoints/content/modules/example-module/
├── constants.ts     # Module constants (optional)
├── handlers/        # Page-specific handlers (optional, see below)
├── index.css        # Module-specific styles (optional)
├── index.ts         # Module definition (required)
├── metadata.ts      # Module metadata (required)
├── utils.test.ts    # Tests for utilities (optional)
└── utils.ts         # Shared logic and helpers (optional)
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

1. Create a `metadata.ts` file under `src/entrypoints/content/modules/example-module/`:

    ```typescript
    import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'
    
    const metadata = {
      id: 'example-module',
      name: 'Example Module',
      description: 'What this module does.',
      settings: {
        myOption: { label: 'Enable my option', default: true },
      },
    } as const satisfies ModuleMetadata

    export default metadata
    ```

   The file is used to display the module's name, description, and settings in the popup.

   Each module automatically gets an `enabled` setting; users can toggle any module on or off via the popup without any
   extra code. Any additional settings defined in `metadata.ts` are also shown in the popup automatically.

   Use `getSetting()` to access settings at runtime:

    ```typescript
    import { getSetting } from '@/common/utils/settings'

    const myOption = await getSetting('example-module', 'myOption')
    ```

2. Create `index.ts` in the same directory.

   This is the main module file. It defines which pages the module runs on.

   There are two module shapes:

   **Simple** — use when the module runs the same logic on every matching page:

    ```typescript
    import type { Module } from '@/entrypoints/content/common/types/module'
    import { pages } from '@/entrypoints/content/common/utils/pages'
    import metadata from '@/entrypoints/content/modules/example-module/metadata'

    const exampleModule: Module = {
      metadata,
      pages: [pages.club],
      run: () => {
        // Module logic here
      },
    }

    export default exampleModule
    ```

   For a simple module example, see
   [src/entrypoints/content/modules/hte-version/index.ts](https://github.com/session567/hte/blob/main/src/entrypoints/content/modules/hte-version/index.ts).

   **Dispatched** — use when the module needs different logic on different pages. Each page maps to a handler function.
   Simple handlers (a few lines calling into `utils.ts`) can be defined inline in `index.ts`. Extract a handler to
   `handlers/<page>.ts` when it has meaningful complexity of its own. Shared logic between handlers goes in `utils.ts`.

    ```typescript
    import type { Module } from '@/entrypoints/content/common/types/module'
    import { pages } from '@/entrypoints/content/common/utils/pages'
    import metadata from '@/entrypoints/content/modules/example-module/metadata'
    import { processClub, processPlayers } from '@/entrypoints/content/modules/example-module/utils'

    const runClub = (): void => {
      // Handler logic here
    }

    const runPlayers = (): void => {
      // Handler logic here
    }

    const exampleModule: Module = {
      metadata,
      pages: new Map([
        [pages.club, runClub],
        [pages.players, runPlayers],
      ]),
    }

    export default exampleModule
    ```

   For a dispatched module example, see
   [src/entrypoints/content/modules/hatstats/index.ts](https://github.com/session567/hte/blob/main/src/entrypoints/content/modules/hatstats/index.ts).

   All modules run concurrently by default. If your module must run after another (e.g. because both append to the same
   DOM element and the order matters), use `runAfter`:

    ```typescript
    import otherModule from '@/entrypoints/content/modules/other-module'

    const exampleModule: Module = {
      metadata,
      runAfter: [otherModule],
      pages: [...],
      run: () => { ... },
    }
    ```

3. Register your module in `src/entrypoints/content/index.ts`:

    ```typescript
    import exampleModule from '@/entrypoints/content/modules/example-module'

    const modules: Module[] = [
      // ... other modules
      exampleModule,
    ]
    ```

Modules only run when the user is logged in to Hattrick.

## Code Style

ESLint enforces most conventions automatically. Additional guidelines are documented in [CLAUDE.md](CLAUDE.md).

## Translations

We currently don't support translations, but HTE is built in a way that it could support translations in the future if
there's enough interest.

For now, all user-facing text should be defined in English in `src/_locales/en.json`, and retrieved using the `i18n.t()`
function from `#i18n` (alias).

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
