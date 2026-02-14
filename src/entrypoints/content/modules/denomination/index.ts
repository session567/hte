import '@/entrypoints/content/modules/denomination/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelectorAll } from '@/entrypoints/content/common/utils/dom'
import { logger } from '@/entrypoints/content/common/utils/logger'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { MAX_VALUES, PERSONALITY_TYPES } from '@/entrypoints/content/modules/denomination/constants'
import { adjustDenominationValue, isDenominationType } from '@/entrypoints/content/modules/denomination/utils'

/**
 * Display numeric values next to all team and player abilities.
 */
const denomination: Module = {
  name: 'Denomination',
  pages: [pages.all],
  run: () => {
    const links = querySelectorAll<HTMLAnchorElement>(`a.skill[href*="${pages.appDenominations.pathname}"]`, false)

    links.forEach((link) => {
      const url = new URL(link.href)
      const lt = url.searchParams.get('lt')
      const ll = url.searchParams.get('ll')
      if (!lt || !ll) return

      if (!isDenominationType(lt)) {
        logger.error(`Denomination type ${lt} not supported`)
        return
      }

      // Remove existing denomination number if present to prevent duplicates
      if (link.nextElementSibling?.classList.contains('denominationNumber')) {
        link.nextElementSibling.remove()
      }

      const span = document.createElement('span')
      const value = adjustDenominationValue(lt, Number(ll))
      const maxValue = MAX_VALUES[lt]
      const displayValue = maxValue ? `${value}/${maxValue}` : `${value}`

      if (PERSONALITY_TYPES.has(lt)) {
        span.className = `hte-skill hte-${lt}-${ll}`
        span.textContent = displayValue
      } else {
        span.className = 'shy denominationNumber'
        span.textContent = `(${displayValue})`
      }

      link.after(span)
    })
  },
}

export default denomination
