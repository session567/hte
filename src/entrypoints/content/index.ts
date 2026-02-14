/**
 * Main entry point.
 *
 * Initializes and runs registered modules on applicable pages.
 */

import '@/entrypoints/content/common/styles/global.css'

import { defineContentScript } from 'wxt/utils/define-content-script'

import type { Module } from '@/entrypoints/content/common/types/module'
import { getCurrentPathname } from '@/entrypoints/content/common/utils/location'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { isPage, pages } from '@/entrypoints/content/common/utils/pages'
import { isLoggedIn } from '@/entrypoints/content/common/utils/team/utils'
import denomination from '@/entrypoints/content/modules/denomination'
import hteVersion from '@/entrypoints/content/modules/hte-version'
import htmsPoints from '@/entrypoints/content/modules/htms-points'
import links from '@/entrypoints/content/modules/links'
import salary from '@/entrypoints/content/modules/salary'
import skillBonus from '@/entrypoints/content/modules/skill-bonus'
import weekNumber from '@/entrypoints/content/modules/week-number'

export default defineContentScript({
  matches: ['https://*.hattrick.org/*'],
  main() {
    if (!isLoggedIn()) {
      logger.debug('Not logged in, skipping all modules')
      return
    }

    // Modules are executed in the order they appear in this array
    const modules: Module[] = [links, skillBonus, htmsPoints, salary, denomination, weekNumber, hteVersion]

    logger.debug('Running HTE')
    logger.debug(`Current pathname: ${getCurrentPathname()}`)

    modules.forEach((module) => {
      const isAll = module.pages.includes(pages.all)
      const matchesPage = isAll || module.pages.some((page) => isPage(page))
      const isExcluded = isAll && module.excludePages?.some((page) => isPage(page))
      if (!matchesPage || isExcluded) return

      logger.debug(`Running module: ${module.name}`)

      try {
        module.run()
      } catch (err) {
        logger.error(`Module ${module.name} failed`, err)
      }
    })
  },
})
