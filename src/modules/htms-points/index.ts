import { Module } from '@common/types/module'
import { querySelector, querySelectorAll } from '@common/utils/dom'
import { t } from '@common/utils/i18n'
import { isPage, pages } from '@common/utils/pages'
import { parsePlayerAge, parsePlayerSkills } from '@common/utils/player/utils'
import { HTMSPoints } from '@modules/htms-points/constants'
import { calcHTMSPoints } from '@modules/htms-points/utils'

interface HTMSItem {
  targetNode: ParentNode
  htms: HTMSPoints
}

const processPlayerData = (targetNode: ParentNode | null, ageNode: ParentNode | null): HTMSItem | null => {
  if (!targetNode || !ageNode) return null

  const age = parsePlayerAge(ageNode)
  const skills = parsePlayerSkills(targetNode)
  if (!age || !skills) return null

  return { targetNode, htms: calcHTMSPoints(age, skills) }
}

const createHTMSRow = (htms: HTMSPoints): HTMLTableRowElement => {
  const htmsRow = document.createElement('tr')

  const labelCell = document.createElement('td')
  labelCell.className = 'right'
  labelCell.textContent = t('htms_points.label')

  const valueCell = document.createElement('td')
  valueCell.colSpan = 2

  const helpSpan = document.createElement('span')
  helpSpan.className = 'help hte-help'
  helpSpan.title = t('htms_points.help')
  helpSpan.textContent = `${htms.ability} / ${htms.potential}`

  valueCell.appendChild(helpSpan)
  htmsRow.appendChild(labelCell)
  htmsRow.appendChild(valueCell)

  return htmsRow
}

const htmsPoints: Module = {
  name: 'HTMS Points',
  pages: [pages.playerDetailOwnTeam, pages.playerListOwnTeam, pages.transfersSearchResult],
  run: () => {
    const htmsItems: HTMSItem[] = []

    if (isPage(pages.playerDetailOwnTeam)) {
      const targetNode = querySelector('#mainBody .playerInfo')
      const ageNode = querySelector('#mainBody > .byline')
      const htmsItem = processPlayerData(targetNode, ageNode)
      if (htmsItem) htmsItems.push(htmsItem)
    } else if (isPage(pages.playerListOwnTeam)) {
      const nodes = querySelectorAll('#mainBody > .playerList > .teamphoto-player .playerInfo')

      nodes.forEach((node) => {
        const ageNode = querySelector(node, '.transferPlayerInformation table tbody tr:first-child td:nth-child(2)')
        const htmsItem = processPlayerData(node, ageNode)
        if (htmsItem) htmsItems.push(htmsItem)
      })
    } else if (isPage(pages.transfersSearchResult)) {
      const nodes = querySelectorAll('#mainBody .playerListDetails')

      nodes.forEach((node) => {
        const ageNode = querySelector(node, '.transferPlayerInformation table tbody tr:nth-child(2) td:nth-child(2)')
        const htmsItem = processPlayerData(node, ageNode)
        if (htmsItem) htmsItems.push(htmsItem)
      })
    }

    htmsItems.forEach(({ targetNode, htms }) => {
      const htmsRow = createHTMSRow(htms)
      querySelector(targetNode, '.transferPlayerInformation table tbody')?.appendChild(htmsRow)
    })
  },
}

export default htmsPoints
