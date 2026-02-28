import { Page } from '@/entrypoints/content/common/utils/pages'

type PageOrPageArray = Page | Page[]
type PageList = PageOrPageArray[]

/**
 * Base type for every module.
 *
 * Each module represents a specific enhancement added to Hattrick. Modules are registered in src/index.ts and
 * automatically executed when the user navigates to a matching page.
 */
export type Module = {
  // The module's name
  name: string
  // Pages where the module should run (see @common/utils/pages.ts for a list of pages)
  pages: PageList
  // Function containing the module's logic
  run: () => void
}
