import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import metadata from '@/entrypoints/content/modules/htms-points/metadata'
import { processPlayer, processPlayers } from '@/entrypoints/content/modules/htms-points/utils'

const runPlayerDetail = (): void => {
  const playerElement = querySelector('#mainBody .playerInfo')
  const ageElement = querySelector('#mainBody > .byline')
  if (playerElement && ageElement) processPlayer(playerElement, ageElement)
}

const runPlayerList = (): void => {
  const playerSelector = '#mainBody > .playerList > .teamphoto-player .playerInfo'
  const ageSelector = '.transferPlayerInformation table tbody tr:first-child td:nth-child(2)'
  processPlayers(playerSelector, ageSelector)
}

const runTransferSearch = (): void => {
  const playerSelector = '#mainBody .playerListDetails'
  const ageSelector = '.transferPlayerInformation table tbody tr:nth-child(2) td:nth-child(2)'
  processPlayers(playerSelector, ageSelector)
}

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
