import '@/entrypoints/content/modules/denomination/index.css'

import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelectorAll } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { MAX_VALUES, PERSONALITY_TYPES } from '@/entrypoints/content/modules/denomination/constants'
import metadata from '@/entrypoints/content/modules/denomination/metadata'
import { adjustDenominationValue, isDenominationType } from '@/entrypoints/content/modules/denomination/utils'

/**
 * Display numeric values next to all team and player abilities.
 */
const denomination: Module = {
  metadata,
  pages: [pages.all],
  run: async () => {
    const links = querySelectorAll<HTMLAnchorElement>(`a.skill[href*="${pages.appDenominations.pathname}"]`, false)

    for (const link of links) {
      const url = new URL(link.href)
      const lt = url.searchParams.get('lt')
      const ll = url.searchParams.get('ll')
      if (!lt || !ll) continue

      if (!isDenominationType(lt)) {
        logger.error(`Denomination type ${lt} not supported`)
        continue
      }

      // Remove existing denomination number if present to prevent duplicates
      if (link.nextElementSibling?.classList.contains('denominationNumber')) {
        link.nextElementSibling.remove()
      }

      const value = await adjustDenominationValue(lt, Number(ll))
      const maxValue = MAX_VALUES[lt]
      const displayValue = maxValue ? `${value}/${maxValue}` : `${value}`

      const span = PERSONALITY_TYPES.has(lt)
        ? el('span', { className: `hte-skill hte-${lt}-${ll}`, textContent: displayValue })
        : el('span', { className: 'shy denominationNumber', textContent: `(${displayValue})` })

      link.after(span)
    }
  },
}

export default denomination
