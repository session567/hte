import { processPlayers } from '@/entrypoints/content/modules/htms-points/utils'

const runPlayerList = (): void => {
  const playerSelector = '#mainBody > .playerList > .teamphoto-player .playerInfo'
  const ageSelector = '.transferPlayerInformation table tbody tr:first-child td:nth-child(2)'
  processPlayers(playerSelector, ageSelector)
}

export default runPlayerList
