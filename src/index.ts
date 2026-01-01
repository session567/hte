import '@common/styles/global.css'

import type { Module } from '@common/types/module'
import { createLogger, ROOT } from '@common/utils/logger'
import { getCurrentPath, paths } from '@common/utils/paths'
import denomination from '@modules/denomination'
import hteVersion from '@modules/hte-version'
import links from '@modules/links'
import skillBonus from '@modules/skill-bonus'
import weekNumber from '@modules/week-number'

const currentPath = getCurrentPath()
const logger = createLogger(ROOT)

// Modules are executed in the order they appear in this array
const modules: Module[] = [denomination, weekNumber, links, skillBonus, hteVersion]

logger.debug('Running HTE')
logger.debug('PATH', currentPath)

modules.forEach((module) => {
  if (!module.paths.some((route) => route === currentPath || route === paths.all)) return

  logger.debug(`Running module: ${module.name}`)
  module.run()
})
