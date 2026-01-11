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
├── scripts/                 # esbuild scripts
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

### Creating a Module

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

2. Register your mudule in `src/index.ts`:

   ```typescript
   import exampleModule from '@modules/example';
   
   const modules: Module[] = [
     // ... other modules
     exampleModule,
   ]
   ```

Modules only run when the user is logged in to Hattrick.

## Local Development

1. Fork the repository, then clone or download your fork.
2. Run `nvm use` to switch to the Node version specified in `.nvmrc` file (
   install [nvm](https://github.com/nvm-sh/nvm)).
3. Enable pnpm - `corepack enable pnpm`
4. Install dependencies - `pnpm install`
5. Build the extension and watch for changes - `pnpm watch`
6. Open Firefox with the extension loaded - `pnpm dev`

### pnpm Scripts

All pnpm scripts are located in [package.json](https://github.com/session567/hte/blob/main/package.json).

#### Development Scripts

- `pnpm build` - Build the extension for production
- `pnpm watch` - Build the extension and watch for changes
- `pnpm dev` - Open Firefox with the extension loaded (Hattrick production)
- `pnpm dev:stage` - Open Firefox with the extension loaded (Hattrick stage)
- `pnpm clean` - Remove build output

#### Testing Scripts

- `pnpm test` - Run tests with vitest
- `pnpm lint` - Run ESLint on the src/ folder

## Translations

We use [Crowdin](https://crowdin.com/project/hte) for community-driven translations. Translators work in Crowdin's web
interface, and Crowdin automatically creates pull requests with updated translations.

Translation strings are stored in `_locales/[language]/messages.json` files.

### Adding Translation Strings

When adding user-facing text in your module, use the `t()` function from `@common/utils/i18n`:

```typescript
import {t} from '@common/utils/i18n';

const message = t('my_module_greeting'); // Simple translation
const messageWithParam = t('my_module_welcome', 'John'); // With placeholder
```

Then add the English translation to `_locales/en/messages.json`:

```json
  {
  "my_module_greeting": {
    "message": "Hello!"
  },
  "my_module_welcome": {
    "message": "Welcome, $1!"
  }
}
```

General guidelines:

- Use descriptive keys with the module's name as the prefix: `module_name_description`.
- Use `$1`, `$2`, etc. for placeholders in messages.
- Only edit `_locales/en/messages.json`; other languages are managed via Crowdin.

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
