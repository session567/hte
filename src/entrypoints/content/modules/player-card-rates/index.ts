import '@/entrypoints/content/common/styles/player.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { formatPercentage } from '@/entrypoints/content/common/utils/format'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { getPersonalityLevel } from '@/entrypoints/content/common/utils/player/utils'
import metadata from '@/entrypoints/content/modules/player-card-rates/metadata'
import { getCardRates } from '@/entrypoints/content/modules/player-card-rates/utils'

const makeCardStat = (rate: number, type: 'yellow' | 'red'): HTMLSpanElement => {
  const wrapper = el('span', { className: 'hte-stat' })
  wrapper.append(
    el('i', { className: `hte-icon-card-${type}`, title: i18n.t(`player_card_rates_${type}_title`) }),
    el('span', { textContent: formatPercentage(rate) }),
  )
  return wrapper
}

const playerCardRates: Module = {
  metadata,
  pages: [pages.playerDetail.senior.own, pages.playerDetail.senior.other],
  run: () => {
    const byline = querySelector('#mainBody > .byline')
    if (!byline) return

    const aggressiveness = getPersonalityLevel('aggressiveness')
    const honesty = getPersonalityLevel('honesty')
    if (honesty === null || aggressiveness === null) return

    const rates = getCardRates(aggressiveness, honesty)
    if (!rates) return

    const { yellow, red } = rates

    byline.append(makeCardStat(red, 'red'), makeCardStat(yellow, 'yellow'))
  },
}

export default playerCardRates
