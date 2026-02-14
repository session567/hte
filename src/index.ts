/**
 * Main entry point.
 *
 * Initializes and runs registered modules on applicable pages.
 */

import '@common/styles/global.css'

import type { Module } from '@common/types/module'
import { getCurrentPathname } from '@common/utils/location'
import { logger } from '@common/utils/logger'
import { isPage, pages } from '@common/utils/pages'
import { isLoggedIn } from '@common/utils/team/utils'
import denomination from '@modules/denomination'
import hteVersion from '@modules/hte-version'
import htmsPoints from '@modules/htms-points'
import links from '@modules/links'
import salary from '@modules/salary'
import skillBonus from '@modules/skill-bonus'
import weekNumber from '@modules/week-number'

if (isLoggedIn()) {
  // Modules are executed in the order they appear in this array
  const modules: Module[] = [
    links,
    skillBonus,
    htmsPoints,
    salary,
    denomination,
    weekNumber,
    hteVersion,
  ]

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
} else {
  logger.debug('Not logged in, skipping all modules')
}
