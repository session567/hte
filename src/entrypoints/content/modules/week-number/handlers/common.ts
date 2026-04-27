import { querySelectorAllIn, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { calcWeekNumber, parseDate } from '@/entrypoints/content/modules/week-number/utils'

export const addWeekNumbers = (root: Element, selector = '.date') => {
  const elements = querySelectorAllIn(root, selector, false)

  elements.forEach((element) => {
    if (querySelectorIn(element, '.hte-week-number', false)) return

    const date = parseDate(element)
    if (!date) return

    const weekNumber = calcWeekNumber(date)

    const span = document.createElement('span')
    span.className = 'hte-week-number'
    span.textContent = ` | ${weekNumber}`

    element.appendChild(span)
  })
}
