# Contributing

Thank you for your interest in contributing to HTE! Please be sure to read these guidelines before making or requesting
a change.

## Before You Start

**Please discuss any changes before starting work.** Open an issue or contact the repository owner through Hattrick to
discuss your proposed change.

## Architecture Overview

HTE is a browser extension written in TypeScript. The codebase follows a modular architecture where each feature is a
self-contained module.

Most contributions involve creating new modules or modifying existing ones in `src/modules/`, with shared utilities
available in `src/common/`.

Project structure:

```
hte/
├── _locales/                # Translation files
├── dist/                    # Build output (generated)
├── icons/                   # Extension icons
├── scripts/                 # Build scripts
├── src/
│   ├── common/              # Shared utilities
│   │   ├── styles/          # Global CSS styles
│   │   ├── test/            # Test setup and utilities
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── modules/             # Modules
│   └── index.ts             # Entry point - module registration and initialization
├── manifest.json            # Browser extension manifest
├── vitest.config.ts         # Test configuration
└── tsconfig.json            # TypeScript configuration
```

Modules follow a consistent structure:

```
modules/example-module/
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
5. Build the extension and watch for changes - `pnpm watch`
6. Load the extension in your browser
    - **Firefox**: Run `pnpm dev` to open Firefox with the extension loaded. On changes, the extension will be reloaded
      automatically.
    - **Chrome**: Go to `chrome://extensions`, enable "Developer mode", click "Load unpacked", and select this project's
      folder. On changes, you have to manually refresh the extension by clicking the refresh icon next to the on/off
      toggle.

### pnpm Scripts

All pnpm scripts are located in [package.json](https://github.com/session567/hte/blob/main/package.json).

#### Development Scripts

- `pnpm build` - Build the extension
- `pnpm build:extension` - Build a production-ready zip archive for publishing to browser extension stores
- `pnpm watch` - Build the extension and watch for changes
- `pnpm dev` - Open Firefox with the extension loaded (Hattrick production)
- `pnpm dev:stage` - Open Firefox with the extension loaded (Hattrick stage)
- `pnpm clean` - Remove build output

#### Testing Scripts

- `pnpm test` - Run tests with vitest
- `pnpm lint` - Run ESLint on the src/ folder

## Creating a Module

1. Create a new module under `src/modules/`.

   ```typescript
   // src/modules/example-module/index.ts
   
   import type {Module} from '@common/types/module'
   import {pages} from '@common/utils/pages'
   
   const exampleModule: Module = {
     name: 'Example Module', // The module's name
     pages: [pages.club], // Pages where this module runs
     run: () => {
       // Module logic here
     },
   }
   
   export default exampleModule
   ```

   For a simple module example,
   see [src/modules/denomination/index.ts](https://github.com/session567/hte/blob/main/src/modules/denomination/index.ts).

2. Register your module in `src/index.ts`:

   ```typescript
   import exampleModule from '@modules/example';
   
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

For now, all user-facing text should be defined in English in `_locales/en/messages.json`, and retrieved using the `t()`
function from `@common/utils/i18n`.

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
