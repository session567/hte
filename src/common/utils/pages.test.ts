import { getCurrentPathname } from '@common/utils/location'
import { getCurrentPage, isPage, Page, pages } from '@common/utils/pages'
import { isOwnTeamPage } from '@common/utils/team/utils'
import { describe, expect, it, vi } from 'vitest'

vi.mock(import('@common/utils/location'))
vi.mock(import('@common/utils/team/utils'))

describe(isPage, () => {
  it.each([
    {
      desc: 'same path, different scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'ALL_TEAMS'),
      ownTeamPage: true,
      expected: false,
    },
    {
      desc: 'same path, same (all teams) scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'ALL_TEAMS'),
      ownTeamPage: false,
      expected: true,
    },
    {
      desc: 'same path, same (own team) scope',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OWN_TEAM'),
      ownTeamPage: true,
      expected: true,
    },
    {
      desc: 'different path, same scope',
      currentPathname: '/Foo',
      page: new Page('/Bar', 'ALL_TEAMS'),
      ownTeamPage: false,
      expected: false,
    },
  ])('$desc', ({ currentPathname, page, ownTeamPage, expected }) => {
    vi.mocked(getCurrentPathname).mockReturnValue(currentPathname)
    vi.mocked(isOwnTeamPage).mockReturnValue(ownTeamPage)

    expect(isPage(page)).toBe(expected)
  })
})

describe(getCurrentPage, () => {
  it('returns the current page', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.club.pathname)
    vi.mocked(isOwnTeamPage).mockReturnValue(false)

    expect(getCurrentPage()).toBe(pages.club)
  })

  it('throws an error when no page matches', () => {
    vi.mocked(getCurrentPathname).mockReturnValue('/Unsupported/Path/')
    vi.mocked(isOwnTeamPage).mockReturnValue(false)

    expect(() => getCurrentPage()).toThrowError('The current page is not supported')
  })
})
