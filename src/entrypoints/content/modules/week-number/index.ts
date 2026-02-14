import '@/entrypoints/content/modules/week-number/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { getElementById, observeElement, querySelectorAllIn } from '@/entrypoints/content/common/utils/dom'
import { isPage, pages } from '@/entrypoints/content/common/utils/pages'
import { calcWeekNumber, parseDate } from '@/entrypoints/content/modules/week-number/utils'

/**
 * Add week numbers to all date elements within the given root element.
 *
 * @param root - The parent element to search for date elements within
 */
const addWeekNumbers = (root: Element) => {
  const elements = querySelectorAllIn(root, '.date', false)

  elements.forEach((element) => {
    const date = parseDate(element)
    if (!date) return

    const weekNumber = calcWeekNumber(date)

    const span = document.createElement('span')
    span.className = 'hte-week-number shy'
    span.textContent = ` (W${weekNumber})`

    element.appendChild(span)
  })
}

/**
 * Display week numbers next to dates throughout Hattrick.
 */
const weekNumber: Module = {
  name: 'Week Number',
  pages: [pages.all],
  excludePages: [pages.forum],
  run: () => {
    const mainBody = getElementById('mainBody')
    if (!mainBody) return

    addWeekNumbers(mainBody)

    // Watch for tab changes on the player detail page. Tab content is loaded asynchronously when clicked, so we need to
    // re-apply week numbers after each update.
    if (isPage(pages.playerDetailOwnTeam) || isPage(pages.playerDetailOtherTeam)) {
      const playerTabs = getElementById('ctl00_ctl00_CPContent_CPMain_updPlayerTabs')
      if (!playerTabs) return

      observeElement(playerTabs, () => {
        addWeekNumbers(playerTabs)
      })
    }
  },
}

export default weekNumber
