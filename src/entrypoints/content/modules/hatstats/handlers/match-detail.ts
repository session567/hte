import { el } from '@/common/utils/dom'
import { querySelectorAllIn, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { getHtMatch, isLiveMatch, isPreMatch, isWalkoverMatch } from '@/entrypoints/content/common/utils/match/utils'
import { HatStats, TeamRatings } from '@/entrypoints/content/modules/hatstats/types'
import { calcHatStats } from '@/entrypoints/content/modules/hatstats/utils'
import { i18n } from '#i18n'

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

const createRow = (label: string, homeValue: number, awayValue: number): HTMLTableRowElement => {
  const row = el('tr')
  row.append(
    el('td', { textContent: label, className: 'nowrap' }),
    el('td'),
    el('td', { textContent: homeValue.toString(), className: 'right', colSpan: 2 }),
    el('td'),
    el('td', { textContent: awayValue.toString(), className: 'right', colSpan: 2 }),
  )

  return row
}

const appendHatStatsToTable = (table: HTMLTableElement, homeStats: HatStats, awayStats: HatStats): void => {
  const headerRow = el('tr')
  headerRow.append(el('th', { textContent: i18n.t('hatstats_title'), colSpan: 99 }))

  const tbody = el('tbody', { className: 'hte-hatstats' })
  tbody.append(
    headerRow,
    createRow(i18n.t('hatstats_midfield'), homeStats.midfield, awayStats.midfield),
    createRow(i18n.t('hatstats_defence'), homeStats.defence, awayStats.defence),
    createRow(i18n.t('hatstats_attack'), homeStats.attack, awayStats.attack),
    createRow(i18n.t('hatstats_total'), homeStats.total, awayStats.total),
  )

  table.append(tbody)
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

  appendHatStatsToTable(table, calcHatStats(ratingsHome), calcHatStats(ratingsAway))
}

export default runMatchDetail
