import { getElementById } from '@/entrypoints/content/common/utils/dom'
import { addWeekNumbers } from '@/entrypoints/content/modules/week-number/handlers/common'

const runStadiumUsage = () => {
  const mainBody = getElementById('mainBody')
  if (!mainBody) return
  addWeekNumbers(mainBody, ':scope > table tbody td:first-child')
}

export default runStadiumUsage
