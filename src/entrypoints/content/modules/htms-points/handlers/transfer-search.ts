import { processPlayers } from '@/entrypoints/content/modules/htms-points/utils'

const runTransferSearch = (): void => {
  const playerSelector = '#mainBody .playerListDetails'
  const ageSelector = '.transferPlayerInformation table tbody tr:nth-child(2) td:nth-child(2)'
  processPlayers(playerSelector, ageSelector)
}

export default runTransferSearch
