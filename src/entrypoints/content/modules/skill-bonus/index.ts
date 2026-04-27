import '@/entrypoints/content/modules/skill-bonus/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import {
  querySelector,
  querySelectorAll,
  querySelectorAllIn,
  querySelectorIn,
} from '@/entrypoints/content/common/utils/dom'
import { isCurrentPage, pages } from '@/entrypoints/content/common/utils/pages'
import metadata from '@/entrypoints/content/modules/skill-bonus/metadata'
import { calcBonuses, createBonusBars } from '@/entrypoints/content/modules/skill-bonus/utils'

const skillBonus: Module = {
  metadata,
  pages: [pages.playerDetail.senior.own, pages.playerList.senior.own],
  run: () => {
    const elements: Element[] = []

    if (isCurrentPage(pages.playerDetail.senior.own)) {
      const element = querySelector('#mainBody .playerInfo')
      if (element) elements.push(element)
    } else if (isCurrentPage(pages.playerList.senior.own)) {
      elements.push(...Array.from(querySelectorAll('#mainBody > .playerList > .teamphoto-player')))
    }

    if (!elements.length) return

    elements.forEach((element) => {
      const bonuses = calcBonuses(element)
      const skillBars = querySelectorAllIn<HTMLDivElement>(element, '.transferPlayerSkills .ht-bar')

      skillBars.forEach((skillBar) => {
        const levelBar = querySelectorIn<HTMLDivElement>(skillBar, '.bar-level', false)
        if (!levelBar) return

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
