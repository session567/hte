import '@/entrypoints/content/modules/player-skill-bonus/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector, querySelectorAll } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import metadata from '@/entrypoints/content/modules/player-skill-bonus/metadata'
import { applySkillBonuses } from '@/entrypoints/content/modules/player-skill-bonus/utils'

const runPlayerDetail = (): void => {
  const element = querySelector('#mainBody .playerInfo')
  if (element) applySkillBonuses([element])
}

const runPlayerList = (): void => {
  const elements = Array.from(querySelectorAll('#mainBody > .playerList > .teamphoto-player'))
  applySkillBonuses(elements)
}

const skillBonus: Module = {
  metadata,
  pages: new Map([
    [pages.playerDetail.senior.own, runPlayerDetail],
    [pages.playerList.senior.own, runPlayerList],
  ]),
}

export default skillBonus
