import '@modules/skill-bonus/index.css'

import { Module } from '@common/types/module'
import { querySelector, querySelectorAll } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { isPage, pages } from '@common/utils/pages'
import { calcBonus } from '@modules/skill-bonus/utils'

const MAX_BAR_LENGTH = 20

const createBonusBar = (skillBar: HTMLDivElement, bonus: number): HTMLDivElement | null => {
  const level = parseInt(skillBar.getAttribute('level') ?? '0', 10)
  if (!level) return null

  const denominationBar = querySelector<HTMLSpanElement>(skillBar, '.bar-max > .bar-denomination')
  if (!denominationBar) return null

  const bonusBar = document.createElement('div')
  bonusBar.className = 'hte-skill-bonus-bar'
  bonusBar.style.width = `${Math.round(((level + bonus) / MAX_BAR_LENGTH) * 100)}%`
  bonusBar.title = t('skill_bonus.title', [bonus.toFixed(2)])
  bonusBar.appendChild(denominationBar.cloneNode(true))

  return bonusBar
}

const skillBonus: Module = {
  name: 'Skill Bonus',
  pages: [pages.playerDetailOwnTeam, pages.playerListOwnTeam],
  run: () => {
    const nodes: ParentNode[] = []

    if (isPage(pages.playerDetailOwnTeam)) {
      const node = querySelector('#mainBody .playerInfo')

      if (node) nodes.push(node)
    } else if (isPage(pages.playerListOwnTeam)) {
      nodes.push(...Array.from(querySelectorAll('#mainBody > .playerList > .teamphoto-player')))
    }

    if (!nodes.length) return

    nodes.forEach((node) => {
      const bonus = calcBonus(node)
      if (bonus === 0) return

      const skillBars = querySelectorAll<HTMLDivElement>(node, '.transferPlayerSkills .ht-bar')
      skillBars.forEach((skillBar) => {
        const levelBar = querySelector<HTMLDivElement>(skillBar, '.bar-level', false)
        if (!levelBar) return // non-existent skills won't have a .bar-level

        const bonusBar = createBonusBar(skillBar, bonus)
        if (bonusBar) skillBar.insertBefore(bonusBar, levelBar)
      })
    })
  },
}

export default skillBonus
