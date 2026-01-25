import '@modules/week-number/index.css'

import type { Module } from '@common/types/module'
import { querySelectorAll } from '@common/utils/dom'
import { pages } from '@common/utils/pages'
import { calcWeekNumber, parseDate } from '@modules/week-number/utils'

/**
 * Display week numbers next to dates throughout Hattrick.
 */
const weekNumber: Module = {
  name: 'Week Number',
  pages: [pages.all],
  excludePages: [pages.forum],
  run: () => {
    const elements = querySelectorAll('#mainBody .date', false)

    elements.forEach((element) => {
      const date = parseDate(element)
      if (!date) return

      const weekNumber = calcWeekNumber(date)

      const span = document.createElement('span')
      span.className = 'hte-week-number shy'
      span.textContent = ` (W${weekNumber})`

      element.appendChild(span)
    })
  },
}

export default weekNumber
