import '@common/styles/global.css'

import type { Module } from '@common/types/module'
import { createLogger, ROOT } from '@common/utils/logger'
import { routes } from '@common/utils/routes'
import denomination from '@modules/denomination'
import weekNumber from '@modules/week-number'

const currentPath = window.location.pathname
const logger = createLogger(ROOT)

// Modules are executed in the order they appear in this array
const modules: Module[] = [denomination, weekNumber]

logger.debug('Running HTE')
logger.debug('PATH', currentPath)

modules.forEach((module) => {
  if (!module.routes.some((route) => route === currentPath || route === routes.all)) return

  logger.debug(`Running module: ${module.name}`)
  module.run()
})
