import '@/entrypoints/content/modules/week-number/index.css'

import type { Module } from '@/entrypoints/content/common/types/module'
import { isCurrentPage, pages } from '@/entrypoints/content/common/utils/pages'
import runDefault from '@/entrypoints/content/modules/week-number/handlers/default'
import runPlayerDetail from '@/entrypoints/content/modules/week-number/handlers/player-detail'
import runStadiumUsage from '@/entrypoints/content/modules/week-number/handlers/stadium-usage'
import metadata from '@/entrypoints/content/modules/week-number/metadata'

const weekNumber: Module = {
  metadata,
  pages: [
    pages.fans,
    pages.matchArchive,
    pages.matchList.senior.own,
    pages.matchList.senior.other,
    pages.matchList.youth.own,
    pages.matchList.youth.other,
    pages.playerDetail.senior.own,
    pages.playerDetail.senior.other,
    pages.playerDetail.youth.own,
    pages.playerDetail.youth.other,
    pages.stadium,
    pages.stadiumUsage,
  ],
  run: () => {
    if (isCurrentPage(pages.playerDetail.senior.own, pages.playerDetail.senior.other)) {
      runPlayerDetail()
      return
    }
    if (isCurrentPage(pages.stadiumUsage)) {
      runStadiumUsage()
      return
    }
    runDefault()
  },
}

export default weekNumber
