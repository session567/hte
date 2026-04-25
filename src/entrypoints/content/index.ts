import '@/common/styles/common.css'

import { defineContentScript } from 'wxt/utils/define-content-script'

import { getSetting } from '@/common/utils/settings'
import type { Module } from '@/entrypoints/content/common/types/module'
import { getCurrentPathname } from '@/entrypoints/content/common/utils/location'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { isCurrentPage } from '@/entrypoints/content/common/utils/pages'
import { isLoggedIn } from '@/entrypoints/content/common/utils/team/utils'
import denomination from '@/entrypoints/content/modules/denomination'
import hatstats from '@/entrypoints/content/modules/hatstats'
import hteVersion from '@/entrypoints/content/modules/hte-version'
import htmsPoints from '@/entrypoints/content/modules/htms-points'
import links from '@/entrypoints/content/modules/links'
import salary from '@/entrypoints/content/modules/salary'
import skillBonus from '@/entrypoints/content/modules/skill-bonus'
import weekNumber from '@/entrypoints/content/modules/week-number'

const modules: Module[] = [links, skillBonus, htmsPoints, salary, hatstats, denomination, weekNumber, hteVersion]

const runModule = async (module: Module): Promise<void> => {
  const enabled = await getSetting(module.metadata.id, 'enabled')
  if (!enabled) {
    logger.debug(`Skipping disabled module: ${module.metadata.name}`)
    return
  }
  if (!isCurrentPage(...module.pages)) return

  logger.debug(`Running module: ${module.metadata.name}`)

  try {
    await module.run()
  } catch (err) {
    logger.error(`Module ${module.metadata.name} failed`, err)
  }
}

export default defineContentScript({
  matches: ['https://*.hattrick.org/*'],
  async main() {
    if (!isLoggedIn()) {
      logger.debug('Not logged in, skipping all modules')
      return
    }

    logger.debug('Running HTE')
    logger.debug(`Current pathname: ${getCurrentPathname()}`)

    await Promise.all(modules.map(runModule))
  },
})
