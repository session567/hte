import type { Module } from '@/entrypoints/content/common/types/module'
import { pages } from '@/entrypoints/content/common/utils/pages'
import runPlayerDetail from '@/entrypoints/content/modules/htms-points/handlers/player-detail'
import runPlayerList from '@/entrypoints/content/modules/htms-points/handlers/player-list'
import runTransferSearch from '@/entrypoints/content/modules/htms-points/handlers/transfer-search'
import metadata from '@/entrypoints/content/modules/htms-points/metadata'

const htmsPoints: Module = {
  metadata,
  pages: new Map([
    [pages.playerDetail.senior.own, runPlayerDetail],
    [pages.playerDetail.senior.other, runPlayerDetail],
    [pages.playerList.senior.own, runPlayerList],
    [pages.transferSearchResults, runTransferSearch],
  ]),
}

export default htmsPoints
