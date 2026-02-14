import '@/entrypoints/content/modules/skill-bonus/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import {
  querySelector,
  querySelectorAll,
  querySelectorAllIn,
  querySelectorIn,
} from '@/entrypoints/content/common/utils/dom'
import { isPage, pages } from '@/entrypoints/content/common/utils/pages'
import { calcBonuses, SkillBonuses } from '@/entrypoints/content/modules/skill-bonus/utils'
import { i18n } from '#i18n'

const MAX_BAR_LENGTH = 20

/**
 * Create a skill bar element for the bonus.
 *
 * @param skillBar - The skill bar element
 * @param bonuses - The bonuses to display
 * @returns An array of div elements representing bonus skill bars
 */
const createBonusBars = (skillBar: HTMLDivElement, bonuses: SkillBonuses): HTMLDivElement[] => {
  const level = parseInt(skillBar.getAttribute('level') ?? '0', 10)
  const denominationBar = querySelectorIn<HTMLSpanElement>(skillBar, '.bar-max > .bar-denomination')
  if (!level || !denominationBar) return []

  const bonusBars: HTMLDivElement[] = []
  let accumulatedBonus = 0

  ;(Object.entries(bonuses) as [keyof SkillBonuses, number][]).forEach(([bonusType, bonusValue]) => {
    if (bonusValue === 0) return

    accumulatedBonus += bonusValue

    const bonusBar = document.createElement('div')
    bonusBar.className = `hte-skill-bonus-bar hte-skill-bonus-bar-${bonusType}`
    bonusBar.style.width = `${Math.round(((level + accumulatedBonus) / MAX_BAR_LENGTH) * 100)}%`
    bonusBar.title = i18n.t(`skill_bonus_${bonusType}`, [bonusValue.toFixed(2)])
    bonusBar.appendChild(denominationBar.cloneNode(true))

    bonusBars.push(bonusBar)
  })

  return bonusBars
}

/**
 * Extend player skill bars to include loyalty and homegrown bonuses.
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
      const bonuses = calcBonuses(element)
      const skillBars = querySelectorAllIn<HTMLDivElement>(element, '.transferPlayerSkills .ht-bar')

      skillBars.forEach((skillBar) => {
        const levelBar = querySelectorIn<HTMLDivElement>(skillBar, '.bar-level', false)
        if (!levelBar) return // non-existent skills won't have a .bar-level

        const bonusBars = createBonusBars(skillBar, bonuses)
        let insertionPoint = levelBar

        bonusBars.forEach((bonusBar) => {
          skillBar.insertBefore(bonusBar, insertionPoint)
          insertionPoint = bonusBar
        })
      })
    })
  },
}

export default skillBonus
