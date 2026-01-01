import '@modules/skill-bonus/index.css'

import { Module } from '@common/types/module'
import { t } from '@common/utils/i18n'
import { isPath, paths } from '@common/utils/paths'
import { MODULE_NAME } from '@modules/skill-bonus/constants'
import { calcBonus } from '@modules/skill-bonus/utils'

const MAX_BAR_LENGTH = 20

const skillBonus: Module = {
  name: MODULE_NAME,
  paths: [paths.player, paths.players],
  run: () => {
    let nodes

    if (isPath(paths.player)) {
      const node = document.querySelector<HTMLDivElement>('#mainBody .playerInfo')

      if (node) {
        nodes = [node]
      }
    } else if (isPath(paths.players)) {
      nodes = document.querySelectorAll<HTMLDivElement>('#mainBody > .playerList > .teamphoto-player')
    }

    if (!nodes || nodes.length === 0) return

    nodes.forEach((node) => {
      const bonus = calcBonus(node)
      if (bonus === 0) return

      const skillBars = node.querySelectorAll<HTMLDivElement>('.transferPlayerSkills .ht-bar')
      skillBars.forEach((skillBar) => {
        const level = parseInt(skillBar.getAttribute('level') || '0', 10)
        const levelBar = skillBar.querySelector<HTMLDivElement>('.bar-level')
        if (!level || !levelBar) return

        const bonusBar = document.createElement('div')
        bonusBar.className = 'hte-skill-bonus-bar'
        bonusBar.style.width = `${Math.round(((level + bonus) / MAX_BAR_LENGTH) * 100)}%`
        bonusBar.title = t('skillBonusTitle', [bonus.toFixed(2)])

        const denominationBar = skillBar.querySelector<HTMLSpanElement>('.bar-max > .bar-denomination')
        if (!denominationBar) return

        bonusBar.appendChild(denominationBar.cloneNode(true))
        skillBar.insertBefore(bonusBar, levelBar)
      })
    })
  },
}

export default skillBonus
