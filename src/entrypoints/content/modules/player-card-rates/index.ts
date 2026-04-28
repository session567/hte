import '@/entrypoints/content/modules/player-card-rates/index.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { getElementById, querySelector } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import metadata from '@/entrypoints/content/modules/player-card-rates/metadata'
import { formatRate, getCardRates, getPersonalityLevel } from '@/entrypoints/content/modules/player-card-rates/utils'

const makeCardIcon = (rate: number, type: 'yellow' | 'red'): HTMLSpanElement =>
  el('span', {
    className: `hte-card-icon hte-card-icon-${type}`,
    textContent: formatRate(rate),
    title: i18n.t(`player_card_rates_${type}_title`),
  })

const playerCardRates: Module = {
  metadata,
  pages: [pages.playerDetail.senior.own, pages.playerDetail.senior.other],
  run: () => {
    const playerInfo = getElementById<HTMLDivElement>('ctl00_ctl00_CPContent_CPMain_pnlplayerInfo')
    const byline = querySelector('#mainBody > .byline')
    if (!playerInfo || !byline) return

    const aggressiveness = getPersonalityLevel(playerInfo, 'aggressiveness')
    const honesty = getPersonalityLevel(playerInfo, 'honesty')
    if (honesty === null || aggressiveness === null) return

    const rates = getCardRates(aggressiveness, honesty)
    if (!rates) return

    const { yellow, red } = rates

    const wrapper = el('span', { className: 'hte-card-icons' })
    wrapper.append(makeCardIcon(yellow, 'yellow'), makeCardIcon(red, 'red'))
    byline.append(wrapper)
  },
}

export default playerCardRates
