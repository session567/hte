import { getCurrentPage, pages } from '@common/utils/pages'
import { getOwnTeamData } from '@common/utils/team/utils'
import links from '@modules/links'
import { describe, expect, it, vi } from 'vitest'

vi.mock(import('@common/utils/pages'), async () => {
  const originalModule = await vi.importActual('@common/utils/pages')

  return {
    ...originalModule,
    getCurrentPage: vi.fn<typeof getCurrentPage>(),
  }
})

vi.mock(import('@common/utils/team/utils'), async () => {
  const originalModule = await vi.importActual('@common/utils/team/utils')

  return {
    ...originalModule,
    getOwnTeamData: vi.fn<typeof getOwnTeamData>(),
  }
})

describe('links module', () => {
  it('renders links box in sidebar', () => {
    vi.mocked(getCurrentPage).mockReturnValue(pages.playerDetailOwnTeam)
    document.body.innerHTML = '<div id="sidebar"></div>'

    links.run()

    const anchors = document.querySelectorAll<HTMLAnchorElement>('.boxBody a')

    expect(anchors).toHaveLength(2)

    expect(anchors[0].textContent).toBe('Hattrick Portal - Tracker')
    expect(anchors[0].href).toBe('https://hattrickportal.online/Tracker')
    expect(anchors[0].target).toBe('_blank')

    expect(anchors[1].textContent).toBe('Hattrick Cycle Planner')
    expect(anchors[1].href).toBe('https://ht-cycle-planner.vercel.app/')
    expect(anchors[1].target).toBe('_blank')
  })

  it('inserts box at the beginning of sidebar', () => {
    vi.mocked(getCurrentPage).mockReturnValue(pages.matches)
    document.body.innerHTML = `
      <div id="sidebar">
        <div class="existing-box">Existing content</div>
      </div>
    `

    links.run()

    const sidebar = document.querySelector('#sidebar')
    const firstChild = sidebar?.firstChild

    expect((firstChild as HTMLElement).className).toBe('box sidebarBox')
  })
})
