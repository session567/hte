import { waitForElement } from '@/entrypoints/content/common/utils/dom'
import { addWeekNumbers } from '@/entrypoints/content/modules/week-number/utils'

const runOffice = async () => {
  const htMatchList = await waitForElement('ht-office ht-match-list')
  if (!htMatchList) return
  addWeekNumbers(htMatchList, '.match-date span')
}

export default runOffice
