import { Page } from '@/entrypoints/content/common/utils/pages'

/**
 * Module-specific setting.
 */
export type ModuleSetting = {
  // Label shown in the popup UI
  label: string
  // Default value for the setting
  // Currently only boolean settings are supported
  default: boolean
}

/**
 * Metadata for a module.
 *
 * Used to display modules in the popup and control whether they run in the content script.
 */
export type ModuleMetadata = {
  // Unique identifier for the module
  id: string
  // The module's name
  name: string
  // The module's description
  description: string
  // Whether to exclude this module from the popup UI
  excludeFromPopup?: boolean
  // Module-specific settings (beyond the auto-injected 'enabled' setting)
  settings?: Record<string, ModuleSetting>
}

type BaseModule = {
  metadata: ModuleMetadata
  runAfter?: Module[]
}

export type Handler = () => void | Promise<void>

// Use for modules that run the same logic on every page
type SimpleModule = BaseModule & {
  // Pages where the module should run (see src/entrypoints/content/common/utils/pages/pages.ts for a list of pages)
  pages: Page[]
  // Executed whenever the user is on any of the module's pages
  run: Handler
}

// Use for modules that run different logic depending on the current page
type DispatchedModule = BaseModule & {
  // Each map entry associates a page with the handler to run on that page
  pages: Map<Page, Handler>
  run?: never
}

/**
 * Base type for every module.
 *
 * Each module represents a specific enhancement added to Hattrick.
 * Modules are registered in src/entrypoints/content/index.ts and automatically executed when the user navigates to a
 * matching page.
 */
export type Module = SimpleModule | DispatchedModule
