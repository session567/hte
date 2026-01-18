import type { Module } from '@common/types/module'
import { querySelector, querySelectorAll, querySelectorIn } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { isPage, pages } from '@common/utils/pages'
import { parsePlayerAge, parsePlayerSkills } from '@common/utils/player/utils'
import { HTMSPoints } from '@modules/htms-points/constants'
import { calcHTMSPoints } from '@modules/htms-points/utils'

/**
 * Display the player's HTMS points.
 *
 * @param htms - The HTMS points to display
 * @returns A table row element
 */
const createHTMSRow = (htms: HTMSPoints): HTMLTableRowElement => {
  const htmsRow = document.createElement('tr')

  const labelCell = document.createElement('td')
  labelCell.className = 'right'
  labelCell.textContent = t('htms_points_label')

  const valueCell = document.createElement('td')
  valueCell.colSpan = 2

  const helpSpan = document.createElement('span')
  helpSpan.className = 'help hte-help'
  helpSpan.title = t('htms_points_help')
  helpSpan.textContent = `${htms.ability} / ${htms.potential}`

  valueCell.appendChild(helpSpan)
  htmsRow.appendChild(labelCell)
  htmsRow.appendChild(valueCell)

  return htmsRow
}

/**
 * Calculate and display HTMS points for a single player.
 *
 * @param playerElement - Element containing player skills
 * @param ageElement - Element containing player age
 */
const processPlayer = (playerElement: Element, ageElement: Element): void => {
  // Skills are only visible for your players and transfer-listed players
  const playerSkillsElement = querySelectorIn(playerElement, '.transferPlayerSkills', false)
  if (!playerSkillsElement) return

  const age = parsePlayerAge(ageElement)
  const skills = parsePlayerSkills(playerSkillsElement)
  if (!age || !skills) return

  const htms = calcHTMSPoints(age, skills)
  const tbody = querySelectorIn(playerElement, '.transferPlayerInformation table tbody')
  if (!tbody) return

  const htmsRow = createHTMSRow(htms)
  tbody.appendChild(htmsRow)
}

/**
 * Calculate and display HTMS points for multiple players.
 *
 * @param playerSelector - CSS selector for player elements
 * @param ageSelector - CSS selector for player age elements
 */
const processPlayers = (playerSelector: string, ageSelector: string): void => {
  const playerElements = querySelectorAll(playerSelector)

  playerElements.forEach((playerElement) => {
    const ageElement = querySelectorIn(playerElement, ageSelector)
    if (ageElement) processPlayer(playerElement, ageElement)
  })
}

/**
 * Display HTMS points (ability and potential) for players.
 */
const htmsPoints: Module = {
  name: 'HTMS Points',
  pages: [pages.playerDetailOwnTeam, pages.playerDetailOtherTeam, pages.playerListOwnTeam, pages.transfersSearchResult],
  run: () => {
    if (isPage(pages.playerDetailOwnTeam) || isPage(pages.playerDetailOtherTeam)) {
      const playerElement = querySelector('#mainBody .playerInfo')
      const ageElement = querySelector('#mainBody > .byline')
      if (playerElement && ageElement) processPlayer(playerElement, ageElement)
    } else if (isPage(pages.playerListOwnTeam)) {
      const playerSelector = '#mainBody > .playerList > .teamphoto-player .playerInfo'
      const ageSelector = '.transferPlayerInformation table tbody tr:first-child td:nth-child(2)'
      processPlayers(playerSelector, ageSelector)
    } else if (isPage(pages.transfersSearchResult)) {
      const playerSelector = '#mainBody .playerListDetails'
      const ageSelector = '.transferPlayerInformation table tbody tr:nth-child(2) td:nth-child(2)'
      processPlayers(playerSelector, ageSelector)
    }
  },
}

export default htmsPoints
