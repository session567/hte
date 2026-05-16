import '@/entrypoints/content/common/styles/common.css'

import { defineContentScript } from 'wxt/utils/define-content-script'

import { getSetting } from '@/common/utils/settings'
import type { Handler, Module } from '@/entrypoints/content/common/types/module'
import { getCurrentPathname } from '@/entrypoints/content/common/utils/location'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { isCurrentPage, tryGetCurrentPage } from '@/entrypoints/content/common/utils/pages'
import { isLoggedIn } from '@/entrypoints/content/common/utils/team/utils'
import denomination from '@/entrypoints/content/modules/denomination'
import hteVersion from '@/entrypoints/content/modules/hte-version'
import links from '@/entrypoints/content/modules/links'
import matchGoToMatches from '@/entrypoints/content/modules/match-go-to-matches'
import matchHatstats from '@/entrypoints/content/modules/match-hatstats'
import playerCardRates from '@/entrypoints/content/modules/player-card-rates'
import playerHtmsPoints from '@/entrypoints/content/modules/player-htms-points'
import playerSalary from '@/entrypoints/content/modules/player-salary'
import playerSkillBonus from '@/entrypoints/content/modules/player-skill-bonus'
import playerTsDropRates from '@/entrypoints/content/modules/player-ts-drop-rates'
import transferAge from '@/entrypoints/content/modules/transfer-age'
import weekNumber from '@/entrypoints/content/modules/week-number'

const modules: Module[] = [
  links,
  weekNumber,
  denomination,
  playerSkillBonus,
  playerHtmsPoints,
  playerSalary,
  playerCardRates,
  playerTsDropRates,
  transferAge,
  hteVersion,
  matchHatstats,
  matchGoToMatches,
]

const getHandler = (module: Module): Handler | undefined => {
  if (module.pages instanceof Map) {
    const page = tryGetCurrentPage()
    return page ? module.pages.get(page) : undefined
  }

  if (isCurrentPage(...module.pages)) return module.run
}

const runModule = async (module: Module): Promise<void> => {
  const enabled = await getSetting(module.metadata.id, 'enabled')
  if (!enabled) {
    logger.debug(`Skipping disabled module: ${module.metadata.name}`)
    return
  }

  const run = getHandler(module)
  if (!run) return

  logger.debug(`Running module: ${module.metadata.name}`)

  try {
    await run()
  } catch (err) {
    logger.error(`Module ${module.metadata.name} failed`, err)
  }
}

const runModules = async (modules: Module[]): Promise<void> => {
  const promises = new Map<string, Promise<void>>()

  const getPromise = (module: Module): Promise<void> => {
    const cached = promises.get(module.metadata.id)
    if (cached) return cached

    const deps = (module.runAfter ?? []).map(getPromise)
    const promise = Promise.all(deps).then(() => runModule(module))
    promises.set(module.metadata.id, promise)
    return promise
  }

  await Promise.all(modules.map(getPromise))
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

    await runModules(modules)
  },
})
