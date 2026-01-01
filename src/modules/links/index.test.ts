import { getCurrentPath, paths } from '@common/utils/paths'
import links from '@modules/links'

const mockGetCurrentPath = getCurrentPath as jest.Mock

describe('links module', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should render links box in sidebar', () => {
    mockGetCurrentPath.mockReturnValue(paths.player)

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

  it('should insert box at the beginning of sidebar', () => {
    mockGetCurrentPath.mockReturnValue(paths.matches)

    document.body.innerHTML = `
      <div id="sidebar">
        <div class="existing-box">Existing content</div>
      </div>
    `

    links.run()

    const sidebar = document.querySelector('#sidebar')
    const firstChild = sidebar?.firstChild

    expect(firstChild?.nodeName).toBe('DIV')
    expect((firstChild as HTMLElement)?.className).toBe('box sidebarBox')
  })

  it('should not render box if there is no sidebar', () => {
    document.body.innerHTML = '<div>No sidebar</div>'

    links.run()

    const box = document.querySelector('.sidebarBox')
    expect(box).toBeNull()
  })
})
