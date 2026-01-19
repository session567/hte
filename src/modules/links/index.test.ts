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
    vi.mocked(getCurrentPage).mockReturnValue(pages.club)
    vi.mocked(getOwnTeamData).mockReturnValue({ teamId: '123', seriesId: '456' })
    document.body.innerHTML = '<div id="sidebar"></div>'

    links.run()

    const anchors = document.querySelectorAll<HTMLAnchorElement>('.boxBody a')

    expect(anchors).toHaveLength(1)
    expect(anchors[0].textContent).toBe('Hattid')
    expect(anchors[0].href).toBe('https://hattid.com/team/123')
    expect(anchors[0].target).toBe('_blank')
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
