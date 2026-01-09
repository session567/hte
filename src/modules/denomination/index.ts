import '@modules/denomination/index.css'

import type { Module } from '@common/types/module'
import { querySelectorAll } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

const PERSONALITY_TYPES = new Set(['gentleness', 'honesty', 'aggressiveness'])

/**
 * Display numeric values near all team and player abilities.
 */
const denomination: Module = {
  name: 'Denomination',
  pages: [pages.all],
  run: () => {
    const links = querySelectorAll<HTMLAnchorElement>(`a.skill[href*="${pages.appDenominations.pathname}"]`, false)

    links.forEach((link) => {
      // Check if a denomination number already exists right after the link
      if (link.nextElementSibling?.classList.contains('denominationNumber')) return

      const url = new URL(link.href)
      const lt = url.searchParams.get('lt')
      const ll = url.searchParams.get('ll')
      if (!lt || !ll) return

      const span = document.createElement('span')

      if (PERSONALITY_TYPES.has(lt)) {
        span.className = `hte-skill hte-${lt}-${ll}`
        span.textContent = ll
      } else {
        span.className = 'shy denominationNumber'
        span.textContent = `(${ll})`
      }

      link.after(span)
    })
  },
}

export default denomination
