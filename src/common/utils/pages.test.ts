import { getCurrentPathname } from '@common/utils/location'
import { getCurrentPage, isPage, Page, pages } from '@common/utils/pages'
import { isOwnTeamPage } from '@common/utils/team/utils'

jest.mock('@common/utils/team/utils')

const mockGetCurrentPathname = getCurrentPathname as jest.Mock
const mockIsOwnTeamPage = isOwnTeamPage as jest.Mock

describe('isPage', () => {
  it.each([
    {
      desc: 'same path, different scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'ALL_TEAMS'),
      isOwnTeamPage: true,
      expected: false,
    },
    {
      desc: 'same path, same (all teams) scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'ALL_TEAMS'),
      isOwnTeamPage: false,
      expected: true,
    },
    {
      desc: 'same path, same (own team) scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OWN_TEAM'),
      isOwnTeamPage: true,
      expected: true,
    },
    {
      desc: 'different path, same scope',
      currentPathname: '/Foo',
      page: new Page('/Bar', 'ALL_TEAMS'),
      isOwnTeamPage: false,
      expected: false,
    },
  ])('$desc', ({ currentPathname, page, isOwnTeamPage, expected }) => {
    mockGetCurrentPathname.mockReturnValue(currentPathname)
    mockIsOwnTeamPage.mockReturnValue(isOwnTeamPage)

    const result = isPage(page)

    expect(result).toBe(expected)
  })
})

describe('getCurrentPage', () => {
  it('should return the current page', () => {
    mockGetCurrentPathname.mockReturnValue(pages.club.pathname)
    mockIsOwnTeamPage.mockReturnValue(false)

    const result = getCurrentPage()

    expect(result).toBe(pages.club)
  })

  it('should throw error when no page matches', () => {
    mockGetCurrentPathname.mockReturnValue('/Unsupported/Path/')
    mockIsOwnTeamPage.mockReturnValue(false)

    expect(() => getCurrentPage()).toThrow('The current page is not supported')
  })
})
