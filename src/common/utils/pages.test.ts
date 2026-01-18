import { getCurrentPathname } from '@common/utils/location'
import { getCurrentPage, isPage, Page, pages } from '@common/utils/pages'
import { isOwnTeamPage } from '@common/utils/team/utils'
import { describe, expect, it, vi } from 'vitest'

vi.mock(import('@common/utils/location'))
vi.mock(import('@common/utils/team/utils'))

describe(isPage, () => {
  it.each([
    {
      desc: 'different path',
      currentPathname: '/Foo',
      page: new Page('/Bar'),
      ownTeamPage: false,
      expected: false,
    },
    {
      desc: 'no teamContext, own team page',
      currentPathname: '/Foo',
      page: new Page('/Foo'),
      ownTeamPage: true,
      expected: true,
    },
    {
      desc: 'no teamContext, not own team page',
      currentPathname: '/Foo',
      page: new Page('/Foo'),
      ownTeamPage: false,
      expected: true,
    },
    {
      desc: 'OWN_TEAM, own team page',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OWN_TEAM'),
      ownTeamPage: true,
      expected: true,
    },
    {
      desc: 'OWN_TEAM, other team page',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OWN_TEAM'),
      ownTeamPage: false,
      expected: false,
    },
    {
      desc: 'OTHER_TEAM, own team page',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OTHER_TEAM'),
      ownTeamPage: true,
      expected: false,
    },
    {
      desc: 'OTHER_TEAM, other team page',
      currentPathname: '/Foo',
      page: new Page('/Foo', 'OTHER_TEAM'),
      ownTeamPage: false,
      expected: true,
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
