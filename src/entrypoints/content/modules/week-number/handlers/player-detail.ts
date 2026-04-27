import { getElementById, observeElement, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { addWeekNumbers } from '@/entrypoints/content/modules/week-number/handlers/common'

const isMatchHistoryTabActive = (playerTabs: Element): boolean => {
  const tab = querySelectorIn(playerTabs, '#ctl00_ctl00_CPContent_CPMain_btnViewMatchHistory', false)
  return tab?.classList.contains('active') ?? false
}

const runPlayerDetail = () => {
  const playerTabs = getElementById('ctl00_ctl00_CPContent_CPMain_updPlayerTabs')
  if (!playerTabs) return

  if (isMatchHistoryTabActive(playerTabs)) addWeekNumbers(playerTabs)

  // Tab content is loaded asynchronously when clicked, so we need to re-apply week numbers after each update
  observeElement(
    playerTabs,
    () => {
      if (isMatchHistoryTabActive(playerTabs)) addWeekNumbers(playerTabs)
    },
    { childList: true, subtree: true },
  )
}

export default runPlayerDetail
