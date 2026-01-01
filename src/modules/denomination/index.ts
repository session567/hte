import '@modules/denomination/index.css'

import type { Module } from '@common/types/module'
import { paths } from '@common/utils/paths'
import { MODULE_NAME } from '@modules/denomination/constants'

const PERSONALITY_TYPES = new Set(['gentleness', 'honesty', 'aggressiveness'])

const denomination: Module = {
  name: MODULE_NAME,
  routes: [paths.all],
  run: () => {
    const links = document.querySelectorAll<HTMLAnchorElement>(`a.skill[href*="${paths.appDenominations}"]`)

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
