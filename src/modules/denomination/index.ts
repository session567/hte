import '@modules/denomination/index.css'

import type { Module } from '@common/types/module'
import { routes } from '@common/utils/routes'

const PERSONALITY_TYPES = new Set(['gentleness', 'honesty', 'aggressiveness'])

const denomination: Module = {
  name: 'Denomination',
  routes: [routes.all],
  run: () => {
    const links = document.querySelectorAll<HTMLAnchorElement>(`a.skill[href*="${routes.appDenominations}"]`)

    links.forEach((link) => {
      // Check if a denomination number already exists right after the link
      if (link.nextElementSibling?.classList.contains('denominationNumber')) return

      const url = new URL(link.href)
      const lt = url.searchParams.get('lt')
      const ll = url.searchParams.get('ll')

      if (!lt || !ll) return

      const span = document.createElement('span')

      if (PERSONALITY_TYPES.has(lt)) {
        span.className = `he-skill he-${lt}-${ll}`
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
