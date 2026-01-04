import '@modules/week-number/index.css'

import { Module } from '@common/types/module'
import { querySelectorAll } from '@common/utils/dom'
import { pages } from '@common/utils/pages'
import { calcWeekNumber, parseDate } from '@modules/week-number/utils'

const weekNumber: Module = {
  name: 'Week Number',
  pages: [pages.all],
  run: () => {
    const nodes = querySelectorAll('#mainBody .date', false)

    nodes.forEach((node) => {
      const date = parseDate(node)
      if (!date) return

      const weekNumber = calcWeekNumber(date)

      const span = document.createElement('span')
      span.className = 'hte-week-number shy'
      span.textContent = ` (W${weekNumber})`

      node.appendChild(span)
    })
  },
}

export default weekNumber
