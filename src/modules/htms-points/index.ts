import { Module } from '@common/types/module'
import { t } from '@common/utils/i18n'
import { isPath, paths } from '@common/utils/paths'
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
  labelCell.textContent = t('htmsLabel')

  const valueCell = document.createElement('td')
  valueCell.colSpan = 2

  const helpSpan = document.createElement('span')
  helpSpan.className = 'help hte-help'
  helpSpan.title = t('htmsHelp')
  helpSpan.textContent = `${htms.ability} / ${htms.potential}`

  valueCell.appendChild(helpSpan)
  htmsRow.appendChild(labelCell)
  htmsRow.appendChild(valueCell)

  return htmsRow
}

const htmsPoints: Module = {
  name: 'HTMS Points',
  paths: [paths.player, paths.players, paths.transfersSearchResult],
  run: () => {
    const htmsItems: HTMSItem[] = []

    if (isPath(paths.player)) {
      const targetNode = document.querySelector('#mainBody .playerInfo')
      const ageNode = document.querySelector('#mainBody > .byline')
      const htmsItem = processPlayerData(targetNode, ageNode)
      if (htmsItem) htmsItems.push(htmsItem)
    } else if (isPath(paths.players)) {
      const nodes = document.querySelectorAll('#mainBody > .playerList > .teamphoto-player .playerInfo')

      nodes.forEach((node) => {
        const ageNode = node.querySelector('.transferPlayerInformation table tbody tr:first-child td:nth-child(2)')
        const htmsItem = processPlayerData(node, ageNode)
        if (htmsItem) htmsItems.push(htmsItem)
      })
    } else if (isPath(paths.transfersSearchResult)) {
      const nodes = document.querySelectorAll('#mainBody .playerListDetails')

      nodes.forEach((node) => {
        const ageNode = node.querySelector('.transferPlayerInformation table tbody tr:nth-child(2) td:nth-child(2)')
        const htmsItem = processPlayerData(node, ageNode)
        if (htmsItem) htmsItems.push(htmsItem)
      })
    }

    htmsItems.forEach(({ targetNode, htms }) => {
      const htmsRow = createHTMSRow(htms)
      targetNode.querySelector('.transferPlayerInformation table tbody')?.appendChild(htmsRow)
    })
  },
}

export default htmsPoints
