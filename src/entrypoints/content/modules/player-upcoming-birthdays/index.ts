import { el } from '@/common/utils/dom'
import { getIntSetting } from '@/common/utils/settings'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelector, querySelectorAll, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { PlayerAge } from '@/entrypoints/content/common/utils/player/constants'
import { parsePlayerAge } from '@/entrypoints/content/common/utils/player/utils'
import { createSidebarBox } from '@/entrypoints/content/common/utils/sidebar/box'
import metadata from '@/entrypoints/content/modules/player-upcoming-birthdays/metadata'

type Player = {
  name: string
  href: string
  age: string
  parsedAge: PlayerAge
}

const getPlayersWithUpcomingBirthdays = (threshold: number): Player[] => {
  const players: Player[] = []

  querySelectorAll('#mainBody > .playerList > .teamphoto-player').forEach((el) => {
    const nameLink = querySelectorIn<HTMLAnchorElement>(el, ':scope > h3 a')
    if (!nameLink) return

    const ageCell = querySelectorIn(el, '.transferPlayerInformation table tbody tr:first-child td:nth-child(2)')
    if (!ageCell) return

    const parsedAge = parsePlayerAge(ageCell)
    if (!parsedAge) return

    players.push({
      name: nameLink.textContent.trim(),
      href: nameLink.href,
      age: ageCell.textContent.trim(),
      parsedAge,
    })
  })

  return players
    .filter((player) => player.parsedAge.days > threshold)
    .sort((a, b) => b.parsedAge.days - a.parsedAge.days)
}

const renderSidebar = (sidebar: HTMLDivElement, players: Player[]): void => {
  const table = el('table')
  const tbody = el('tbody')
  table.append(tbody)

  players.forEach((player) => {
    const row = el('tr')

    const nameCell = el('td')
    nameCell.append(el('a', { href: player.href, textContent: player.name }))

    const ageCell = el('td', { textContent: player.age, className: 'right' })

    row.append(nameCell, ageCell)
    tbody.append(row)
  })

  const { box, boxBody } = createSidebarBox(i18n.t('player_upcoming_birthdays_title'))
  boxBody.append(table)
  sidebar.append(box)
}

const playerUpcomingBirthdays: Module = {
  metadata,
  pages: [pages.playerList.senior.own],
  run: async () => {
    const sidebar = querySelector<HTMLDivElement>('#sidebar')
    if (!sidebar) return

    const threshold = await getIntSetting(metadata.id, 'threshold')
    const players = getPlayersWithUpcomingBirthdays(threshold)
    if (players.length === 0) return

    renderSidebar(sidebar, players)
  },
}

export default playerUpcomingBirthdays
