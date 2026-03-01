import { Page } from '@/entrypoints/content/common/utils/pages'

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
}

/**
 * Base type for every module.
 *
 * Each module represents a specific enhancement added to Hattrick. Modules are registered in src/index.ts and
 * automatically executed when the user navigates to a matching page.
 */
export type Module = {
  // Module metadata
  metadata: ModuleMetadata
  // Pages where the module should run (see @common/utils/pages.ts for a list of pages)
  pages: Page[]
  // Function containing the module's logic
  run: () => void
}
