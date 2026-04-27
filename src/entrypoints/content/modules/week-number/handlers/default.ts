import { getElementById } from '@/entrypoints/content/common/utils/dom'
import { addWeekNumbers } from '@/entrypoints/content/modules/week-number/handlers/common'

const runDefault = () => {
  const mainBody = getElementById('mainBody')
  if (!mainBody) return
  addWeekNumbers(mainBody)
}

export default runDefault
