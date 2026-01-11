import '@modules/links/index.css'

import { Module } from '@common/types/module'
import { querySelector } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { logger } from '@common/utils/logger'
import { getCurrentPage, Page, pages } from '@common/utils/pages'
import { createSidebarBox } from '@common/utils/sidebar/box'
import { getOwnTeamData } from '@common/utils/team/utils'
import {
  ARENA_CALCULATOR,
  DHTH,
  HATTID_LEAGUE,
  HATTID_TEAM,
  HATTRICK_CYCLE_PLANNER,
  HATTRICK_PORTAL_TRACKER,
  HATTRICK_YOUTHCLUB,
  Link,
  NICKARANA_LEAGUE_SIMULATOR,
  PLAYER_INTO_COACH_CONVERSION_COST,
  SCOUTRICK,
  TS_ORGANIZER,
} from '@modules/links/constants'
import { replacePlaceholders } from '@modules/links/utils'

const linkMap = new Map<Page, Link[]>([
  [pages.club, [HATTID_TEAM]],
  [pages.matches, [DHTH, TS_ORGANIZER]],
  [pages.playerDetailOwnTeam, [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER]],
  [pages.playerListOwnTeam, [HATTRICK_PORTAL_TRACKER, HATTRICK_CYCLE_PLANNER]],
  [pages.series, [HATTID_LEAGUE, NICKARANA_LEAGUE_SIMULATOR]],
  [pages.specialists, [PLAYER_INTO_COACH_CONVERSION_COST]],
  [pages.stadium, [ARENA_CALCULATOR]],
  [pages.youthPlayer, [HATTRICK_YOUTHCLUB, SCOUTRICK]],
  [pages.youthPlayers, [HATTRICK_YOUTHCLUB, SCOUTRICK]],
])

/**
 * Display relevant links to external tools in the sidebar.
 */
const links: Module = {
  name: 'Links',
  pages: [...linkMap.keys()],
  run: () => {
    const sidebar = querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const currentPage = getCurrentPage()
    const links = linkMap.get(currentPage)

    if (!links) {
      logger.warn(`${currentPage} does not have any links.`)
      return
    }

    const placeholderReplacements = getOwnTeamData()
    const { box, boxBody } = createSidebarBox(t('links_title'))

    links.forEach((link) => {
      const anchor = document.createElement('a')

      try {
        anchor.href = replacePlaceholders(link.url, placeholderReplacements)
      } catch (err) {
        logger.error(err)
        return
      }

      anchor.textContent = link.name
      anchor.target = '_blank'

      boxBody.appendChild(anchor)
    })

    sidebar.insertBefore(box, sidebar.firstChild)
  },
}

export default links
