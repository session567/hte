import { querySelectorAll } from '@/entrypoints/content/common/utils/dom'
import { applySkillBonuses } from '@/entrypoints/content/modules/skill-bonus/utils'

const runPlayerList = (): void => {
  const elements = Array.from(querySelectorAll('#mainBody > .playerList > .teamphoto-player'))
  applySkillBonuses(elements)
}

export default runPlayerList
