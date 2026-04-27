import type { Module } from '@/entrypoints/content/common/types/module'
import { isCurrentPage, pages } from '@/entrypoints/content/common/utils/pages'
import runPlayerDetail from '@/entrypoints/content/modules/htms-points/handlers/player-detail'
import runPlayerList from '@/entrypoints/content/modules/htms-points/handlers/player-list'
import runTransferSearch from '@/entrypoints/content/modules/htms-points/handlers/transfer-search'
import metadata from '@/entrypoints/content/modules/htms-points/metadata'

const htmsPoints: Module = {
  metadata,
  pages: [
    pages.playerDetail.senior.own,
    pages.playerDetail.senior.other,
    pages.playerList.senior.own,
    pages.transferSearchResults,
  ],
  run: () => {
    if (isCurrentPage(pages.playerDetail.senior.own, pages.playerDetail.senior.other)) runPlayerDetail()
    else if (isCurrentPage(pages.playerList.senior.own)) runPlayerList()
    else if (isCurrentPage(pages.transferSearchResults)) runTransferSearch()
  },
}

export default htmsPoints
