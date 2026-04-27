import '@/entrypoints/content/modules/week-number/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { pages } from '@/entrypoints/content/common/utils/pages'
import runDefault from '@/entrypoints/content/modules/week-number/handlers/default'
import runPlayerDetail from '@/entrypoints/content/modules/week-number/handlers/player-detail'
import runStadiumUsage from '@/entrypoints/content/modules/week-number/handlers/stadium-usage'
import metadata from '@/entrypoints/content/modules/week-number/metadata'

const weekNumber: Module = {
  metadata,
  pages: new Map([
    [pages.fans, runDefault],
    [pages.matchArchive, runDefault],
    [pages.matchList.senior.own, runDefault],
    [pages.matchList.senior.other, runDefault],
    [pages.matchList.youth.own, runDefault],
    [pages.matchList.youth.other, runDefault],
    [pages.stadium, runDefault],
    [pages.playerDetail.senior.own, runPlayerDetail],
    [pages.playerDetail.senior.other, runPlayerDetail],
    [pages.playerDetail.youth.own, runPlayerDetail],
    [pages.playerDetail.youth.other, runPlayerDetail],
    [pages.stadiumUsage, runStadiumUsage],
  ]),
}

export default weekNumber
