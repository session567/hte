/**
 * Main entry point.
 *
 * Initializes and runs registered modules on applicable pages.
 */

import '@/common/styles/common.css'

import { defineContentScript } from 'wxt/utils/define-content-script'

import { getSetting } from '@/common/utils/settings'
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

const modules: Module[] = [links, skillBonus, htmsPoints, salary, denomination, weekNumber, hteVersion]

export default defineContentScript({
  matches: ['https://*.hattrick.org/*'],
  async main() {
    if (!isLoggedIn()) {
      logger.debug('Not logged in, skipping all modules')
      return
    }

    logger.debug('Running HTE')
    logger.debug(`Current pathname: ${getCurrentPathname()}`)

    for (const module of modules) {
      const enabled = await getSetting(module.metadata.id, 'enabled')
      if (!enabled) {
        logger.debug(`Skipping disabled module: ${module.metadata.name}`)
        continue
      }

      const isAll = module.pages.includes(pages.all)
      const matchesPage = isAll || isPage(...module.pages)
      if (!matchesPage) continue

      logger.debug(`Running module: ${module.metadata.name}`)

      try {
        await module.run()
      } catch (err) {
        logger.error(`Module ${module.metadata.name} failed`, err)
      }
    }
  },
})
