import '@common/styles/global.css'

import type { Module } from '@common/types/module'
import { getCurrentPathname } from '@common/utils/location'
import { logger } from '@common/utils/logger'
import { isPage, pages } from '@common/utils/pages'
import denomination from '@modules/denomination'
import hteVersion from '@modules/hte-version'
import htmsPoints from '@modules/htms-points'
import links from '@modules/links'
import salary from '@modules/salary'
import skillBonus from '@modules/skill-bonus'
import transferSearchPresets from '@modules/transfer-search-presets'
import weekNumber from '@modules/week-number'

// Modules are executed in the order they appear in this array
const modules: Module[] = [
  links,
  skillBonus,
  htmsPoints,
  salary,
  transferSearchPresets,
  denomination,
  weekNumber,
  hteVersion,
]

logger.debug('Running HTE')
logger.debug(`Current pathname: ${getCurrentPathname()}`)

modules.forEach((module) => {
  if (!module.pages.some((page) => page === pages.all || isPage(page))) return

  logger.debug(`Running module: ${module.name}`)

  try {
    module.run()
  } catch (err) {
    logger.error(`Module ${module.name} failed`, err)
  }
})
