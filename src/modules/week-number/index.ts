import '@modules/week-number/index.css'

import { Module } from '@common/types/module'
import { paths } from '@common/utils/paths'
import { calcWeekNumber, parseDate } from '@modules/week-number/utils'

const weekNumber: Module = {
  name: 'Week Number',
  paths: [paths.all],
  run: () => {
    const nodes = document.querySelectorAll('#mainBody .date')

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
