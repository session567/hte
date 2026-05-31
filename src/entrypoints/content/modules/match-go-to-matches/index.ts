import { el } from '@/common/utils/dom'
import type { Module } from '@/entrypoints/content/common/types/module'
import { querySelectorIn, waitForElement } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import metadata from '@/entrypoints/content/modules/match-go-to-matches/metadata'

const matchGoToMatches: Module = {
  metadata,
  pages: [pages.matchOrder],
  run: async () => {
    const headerRight = await waitForElement('ht-matchorder .mo-topbar .header-right')
    if (!headerRight) return

    const analyzeLink = querySelectorIn<HTMLAnchorElement>(headerRight, 'a[href*="analyzeTeamId"]')
    if (!analyzeLink) return

    const teamId = new URL(analyzeLink.href).searchParams.get('analyzeTeamId')
    if (!teamId) return

    const link = el('a', { target: '_blank', href: `/Club/Matches/?TeamID=${teamId}` })
    link.append(el('i', { className: 'hte-icon-football' }))

    headerRight.insertBefore(link, analyzeLink.nextSibling)
  },
}

export default matchGoToMatches
