import '@modules/skill-bonus/index.css'

import { Module } from '@common/types/module'
import { t } from '@common/utils/i18n'
import { isPath, paths } from '@common/utils/paths'
import { calcBonus } from '@modules/skill-bonus/utils'

const MAX_BAR_LENGTH = 20

const createBonusBar = (skillBar: HTMLDivElement, bonus: number): HTMLDivElement | null => {
  const level = parseInt(skillBar.getAttribute('level') || '0', 10)
  if (!level) return null

  const denominationBar = skillBar.querySelector<HTMLSpanElement>('.bar-max > .bar-denomination')
  if (!denominationBar) return null

  const bonusBar = document.createElement('div')
  bonusBar.className = 'hte-skill-bonus-bar'
  bonusBar.style.width = `${Math.round(((level + bonus) / MAX_BAR_LENGTH) * 100)}%`
  bonusBar.title = t('skillBonusTitle', [bonus.toFixed(2)])
  bonusBar.appendChild(denominationBar.cloneNode(true))

  return bonusBar
}

const skillBonus: Module = {
  name: 'Skill Bonus',
  paths: [paths.player, paths.players],
  run: () => {
    const nodes: ParentNode[] = []

    if (isPath(paths.player)) {
      const node = document.querySelector('#mainBody .playerInfo')

      if (node) nodes.push(node)
    } else if (isPath(paths.players)) {
      nodes.push(...Array.from(document.querySelectorAll('#mainBody > .playerList > .teamphoto-player')))
    }

    if (nodes.length === 0) return

    nodes.forEach((node) => {
      const bonus = calcBonus(node)
      if (bonus === 0) return

      const skillBars = node.querySelectorAll<HTMLDivElement>('.transferPlayerSkills .ht-bar')
      skillBars.forEach((skillBar) => {
        const levelBar = skillBar.querySelector<HTMLDivElement>('.bar-level')
        if (!levelBar) return

        const bonusBar = createBonusBar(skillBar, bonus)
        if (bonusBar) skillBar.insertBefore(bonusBar, levelBar)
      })
    })
  },
}

export default skillBonus
