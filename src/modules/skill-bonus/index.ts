import '@modules/skill-bonus/index.css'

import type { Module } from '@common/types/module'
import { querySelector, querySelectorAll } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { isPage, pages } from '@common/utils/pages'
import { calcBonus } from '@modules/skill-bonus/utils'

const MAX_BAR_LENGTH = 20

/**
 * Create a skill bar element for the bonus.
 *
 * @param skillBar - The skill bar element
 * @param bonus - The bonus value to display
 * @returns A div element representing the bonus skill bar, or null if creation fails
 */
const createBonusBar = (skillBar: HTMLDivElement, bonus: number): HTMLDivElement | null => {
  const level = parseInt(skillBar.getAttribute('level') ?? '0', 10)
  if (!level) return null

  const denominationBar = querySelector<HTMLSpanElement>(skillBar, '.bar-max > .bar-denomination')
  if (!denominationBar) return null

  const bonusBar = document.createElement('div')
  bonusBar.className = 'hte-skill-bonus-bar'
  bonusBar.style.width = `${Math.round(((level + bonus) / MAX_BAR_LENGTH) * 100)}%`
  bonusBar.title = t('skill_bonus_title', [bonus.toFixed(2)])
  bonusBar.appendChild(denominationBar.cloneNode(true))

  return bonusBar
}

/**
 * Extend player skill bars to include loyalty and homegrown bonus.
 */
const skillBonus: Module = {
  name: 'Skill Bonus',
  pages: [pages.playerDetailOwnTeam, pages.playerListOwnTeam],
  run: () => {
    const elements: Element[] = []

    if (isPage(pages.playerDetailOwnTeam)) {
      const element = querySelector('#mainBody .playerInfo')

      if (element) elements.push(element)
    } else if (isPage(pages.playerListOwnTeam)) {
      elements.push(...Array.from(querySelectorAll('#mainBody > .playerList > .teamphoto-player')))
    }

    if (!elements.length) return

    elements.forEach((element) => {
      const bonus = calcBonus(element)
      if (bonus === 0) return

      const skillBars = querySelectorAll<HTMLDivElement>(element, '.transferPlayerSkills .ht-bar')
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
