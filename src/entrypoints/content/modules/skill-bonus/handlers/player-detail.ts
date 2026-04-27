import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { applySkillBonuses } from '@/entrypoints/content/modules/skill-bonus/utils'

const runPlayerDetail = (): void => {
  const element = querySelector('#mainBody .playerInfo')
  if (element) applySkillBonuses([element])
}

export default runPlayerDetail
