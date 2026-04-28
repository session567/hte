import { el } from '@/common/utils/dom'
import { querySelectorAllIn, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { getHtMatch, isLiveMatch, isPreMatch, isWalkoverMatch } from '@/entrypoints/content/common/utils/match/utils'
import { createSidebarBox } from '@/entrypoints/content/common/utils/sidebar/box'
import { HatStats, TeamRatings } from '@/entrypoints/content/modules/hatstats/types'
import { calcHatStats } from '@/entrypoints/content/modules/hatstats/utils'

const extractRatings = (tbody: HTMLTableSectionElement, column: number): TeamRatings | null => {
  const getRating = (htBar: Element): number | null => {
    const level = htBar.getAttribute('level')
    if (!level) return null

    const value = parseFloat(level)
    return isNaN(value) ? null : value
  }

  const htBars = querySelectorAllIn(tbody, `tr td:nth-child(${column}) ht-match-rating ht-bar`)
  const ratings = {
    midfield: getRating(htBars[0]),
    rightDefence: getRating(htBars[1]),
    centralDefence: getRating(htBars[2]),
    leftDefence: getRating(htBars[3]),
    rightAttack: getRating(htBars[4]),
    centralAttack: getRating(htBars[5]),
    leftAttack: getRating(htBars[6]),
  }

  if (Object.values(ratings).includes(null)) return null

  return ratings as TeamRatings
}

const makeRow = (label: string, home: number, away: number, isTotal = false) => {
  const homeCell = el('td', { textContent: home.toString(), className: 'right' })
  const awayCell = el('td', { textContent: away.toString(), className: 'right' })

  if (home > away) {
    homeCell.classList.add('hte-hatstats-winner')
  } else if (home < away) {
    awayCell.classList.add('hte-hatstats-winner')
  }

  const row = el('tr')
  row.append(el('td', { textContent: label, className: 'nowrap' }), homeCell, awayCell)
  if (isTotal) row.classList.add('hte-hatstats-total', 'hte-font-bold')

  return row
}

const createHatStatsSidebar = (htMatch: Element, homeStats: HatStats, awayStats: HatStats): void => {
  const container = querySelectorIn<HTMLDivElement>(htMatch, '.htbox-right.live-right-container')
  if (!container) return

  const { box, boxBody } = createSidebarBox(i18n.t('hatstats_title'))
  box.classList.add('hte-hatstats-sidebar')

  const table = el('table')

  const thead = el('thead')
  const headerRow = el('tr')
  headerRow.append(
    el('th'),
    el('th', { textContent: i18n.t('hatstats_home'), className: 'right' }),
    el('th', { textContent: i18n.t('hatstats_away'), className: 'right' }),
  )
  thead.append(headerRow)

  const tbody = el('tbody')
  tbody.append(
    makeRow(i18n.t('hatstats_midfield'), homeStats.midfield, awayStats.midfield),
    makeRow(i18n.t('hatstats_defence'), homeStats.defence, awayStats.defence),
    makeRow(i18n.t('hatstats_attack'), homeStats.attack, awayStats.attack),
    makeRow(i18n.t('hatstats_total'), homeStats.total, awayStats.total, true),
  )

  table.append(thead, tbody)
  boxBody.append(table)
  container.insertBefore(box, container.firstChild)
}

const runMatchDetail = async (): Promise<void> => {
  const htMatch = await getHtMatch()
  if (!htMatch) return

  if (isPreMatch(htMatch)) {
    logger.debug('Skipping HatStats for a prematch')
    return
  }

  if (isWalkoverMatch(htMatch)) {
    logger.debug('Skipping HatStats for a walkover')
    return
  }

  if (isLiveMatch(htMatch)) {
    logger.debug('Skipping HatStats for a live match')
    return
  }

  const table = querySelectorIn<HTMLTableElement>(htMatch, '.box.postmatch-ratings table')
  if (!table) return

  const firstTbody = querySelectorIn<HTMLTableSectionElement>(table, 'tbody')
  if (!firstTbody) return

  const ratingsHome = extractRatings(firstTbody, 3)
  const ratingsAway = extractRatings(firstTbody, 6)
  if (!ratingsHome || !ratingsAway) return

  createHatStatsSidebar(htMatch, calcHatStats(ratingsHome), calcHatStats(ratingsAway))
}

export default runMatchDetail
