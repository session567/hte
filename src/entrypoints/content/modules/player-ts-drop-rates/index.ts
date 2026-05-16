import '@/entrypoints/content/common/styles/player.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { formatPercentage } from '@/entrypoints/content/common/utils/format'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { getPersonalityLevel } from '@/entrypoints/content/common/utils/player/utils'
import playerCardRates from '@/entrypoints/content/modules/player-card-rates'
import metadata from '@/entrypoints/content/modules/player-ts-drop-rates/metadata'
import { getTsDropRates } from '@/entrypoints/content/modules/player-ts-drop-rates/utils'

const makeTsStat = (rate: number, type: 'buy' | 'sell'): HTMLSpanElement => {
  const wrapper = el('span', { className: 'hte-stat' })
  wrapper.append(
    el('i', { className: `hte-icon-ts-${type}`, title: i18n.t(`player_ts_drop_rates_${type}_title`) }),
    el('span', { textContent: formatPercentage(rate) }),
  )
  return wrapper
}

const playerTsDropRates: Module = {
  metadata,
  runAfter: [playerCardRates],
  pages: [pages.playerDetail.senior.own, pages.playerDetail.senior.other],
  run: () => {
    const byline = querySelector('#mainBody > .byline')
    if (!byline) return

    const gentleness = getPersonalityLevel('gentleness')
    if (gentleness === null) return

    const rates = getTsDropRates(gentleness)
    if (!rates) return

    const { buy, sell } = rates

    byline.append(makeTsStat(sell, 'sell'), makeTsStat(buy, 'buy'))
  },
}

export default playerTsDropRates
