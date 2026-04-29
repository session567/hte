import '@/entrypoints/content/modules/player-ts-drop-rates/index.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { formatPercentage } from '@/entrypoints/content/common/utils/format'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { getPersonalityLevel } from '@/entrypoints/content/common/utils/player/utils'
import playerCardRates from '@/entrypoints/content/modules/player-card-rates'
import metadata from '@/entrypoints/content/modules/player-ts-drop-rates/metadata'
import { getTsDropRates } from '@/entrypoints/content/modules/player-ts-drop-rates/utils'

const makeTsIcon = (rate: number, type: 'buy' | 'sell'): HTMLSpanElement =>
  el('span', {
    className: `hte-ts-drop-icon hte-ts-drop-icon-${type}`,
    textContent: formatPercentage(rate),
    title: i18n.t(`player_ts_drop_rates_${type}_title`),
  })

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

    const wrapper = el('span', { className: 'hte-ts-drop-icons' })
    wrapper.append(makeTsIcon(buy, 'buy'), makeTsIcon(sell, 'sell'))
    byline.append(wrapper)
  },
}

export default playerTsDropRates
