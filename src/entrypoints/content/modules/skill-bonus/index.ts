import '@/entrypoints/content/modules/skill-bonus/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { pages } from '@/entrypoints/content/common/utils/pages'
import runPlayerDetail from '@/entrypoints/content/modules/skill-bonus/handlers/player-detail'
import runPlayerList from '@/entrypoints/content/modules/skill-bonus/handlers/player-list'
import metadata from '@/entrypoints/content/modules/skill-bonus/metadata'

const skillBonus: Module = {
  metadata,
  pages: new Map([
    [pages.playerDetail.senior.own, runPlayerDetail],
    [pages.playerList.senior.own, runPlayerList],
  ]),
}

export default skillBonus
