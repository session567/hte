import { el } from '@/common/utils/dom'
import {
  observeElement,
  querySelector,
  querySelectorAllIn,
  querySelectorIn,
  waitForElement,
} from '@/entrypoints/content/common/utils/dom'
import { HatStats, TeamRatings } from '@/entrypoints/content/modules/hatstats/types'
import { calcHatStats } from '@/entrypoints/content/modules/hatstats/utils'

const extractRatings = (ratingPredictions: Element): TeamRatings | null => {
  const getRating = (span: Element | undefined): number | null => {
    if (!span) return null

    const value = parseFloat(span.textContent)
    return isNaN(value) ? null : value
  }

  const spans = querySelectorAllIn(ratingPredictions, 'span:not(.mo-field-rating-predicitons-diff)')
  const ratings = {
    rightDefence: getRating(spans[0]),
    centralDefence: getRating(spans[1]),
    leftDefence: getRating(spans[2]),
    midfield: getRating(spans[3]),
    rightAttack: getRating(spans[4]),
    centralAttack: getRating(spans[5]),
    leftAttack: getRating(spans[6]),
  }

  if (Object.values(ratings).includes(null)) return null

  return ratings as TeamRatings
}

const createColumn = (label: string, value: number): HTMLDivElement => {
  const item = el('div', { className: 'hte-hatstats-mo-item hte-px-3' })
  item.append(
    el('span', { className: 'hte-hatstats-mo-label', textContent: label }),
    el('span', { className: 'hte-hatstats-mo-value hte-font-bold', textContent: value.toString() }),
  )
  return item
}

const createContainer = (stats: HatStats): HTMLDivElement => {
  const container = el('div', { className: 'hte-hatstats-mo-inner hte-py-2' })
  container.append(
    el('span', { className: 'hte-hatstats-mo-title hte-font-bold hte-px-4', textContent: i18n.t('hatstats_title') }),
    createColumn(i18n.t('hatstats_midfield'), stats.midfield),
    createColumn(i18n.t('hatstats_defence'), stats.defence),
    createColumn(i18n.t('hatstats_attack'), stats.attack),
    createColumn(i18n.t('hatstats_total'), stats.total),
  )
  return container
}

const renderHatStats = (): void => {
  const lineup = querySelector('ng-app[app="matchorder"] .mo-field-view-lineup')
  if (!lineup) return

  const predictions = querySelectorIn(lineup, '.mo-field-rating-predicitons', false)
  if (!predictions) return

  querySelector('.hte-hatstats-mo', false)?.remove()

  const ratings = extractRatings(predictions)
  if (!ratings) return

  const wrapper = el('div', { className: 'hte-hatstats-mo hte-mb-1' })
  wrapper.append(createContainer(calcHatStats(ratings)))
  lineup.append(wrapper)
}

const runMatchOrder = async (): Promise<void> => {
  const tabs = await waitForElement('.ht-tabs-wizard')
  if (!tabs) return

  let disconnectObserver: (() => void) | undefined

  const isLineupTabSelected = () =>
    querySelectorIn(tabs, 'li:nth-child(2)')?.classList.contains('ht-tabs-item-selected') ?? false

  const tabsOnClickListener = () => {
    if (!isLineupTabSelected()) {
      querySelector('.hte-hatstats-mo', false)?.remove()
      return
    }

    const predictionsHolder = querySelector('.mo-field-rating-predicitons-holder')
    if (!predictionsHolder) return

    disconnectObserver?.()
    disconnectObserver = observeElement(predictionsHolder, renderHatStats, { characterData: true, subtree: true })
    renderHatStats()
  }

  tabs.addEventListener('click', tabsOnClickListener)
  tabsOnClickListener()
}

export default runMatchOrder
