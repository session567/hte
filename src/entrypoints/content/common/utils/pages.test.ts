import { describe, expect, it, vi } from 'vitest'

import { getCurrentPathname, getCurrentSearchParams } from '@/entrypoints/content/common/utils/location'
import { getCurrentPage, isPage, Page, pages } from '@/entrypoints/content/common/utils/pages'
import { isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

vi.mock(import('@/entrypoints/content/common/utils/location'))
vi.mock(import('@/entrypoints/content/common/utils/team/utils'))

describe(isPage, () => {
  describe('pathname matching', () => {
    it.each([
      {
        desc: 'returns false when pathnames differ',
        currentPathname: '/Foo',
        page: new Page('/Bar'),
        expected: false,
      },
      {
        desc: 'returns true when pathnames match and there are no options',
        currentPathname: '/Foo',
        page: new Page('/Foo'),
        expected: true,
      },
    ])('$desc', ({ currentPathname, page, expected }) => {
      vi.mocked(getCurrentPathname).mockReturnValue(currentPathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())

      expect(isPage(page)).toBe(expected)
    })
  })

  describe('teamContext', () => {
    it.each([
      {
        desc: 'no teamContext, matches own team page',
        page: new Page('/Foo'),
        ownTeamPage: true,
        expected: true,
      },
      {
        desc: 'no teamContext, matches other team page',
        page: new Page('/Foo'),
        ownTeamPage: false,
        expected: true,
      },
      {
        desc: 'OWN_TEAM, matches own team page',
        page: new Page('/Foo', { teamContext: 'OWN_TEAM' }),
        ownTeamPage: true,
        expected: true,
      },
      {
        desc: 'OWN_TEAM, does not match own team page',
        page: new Page('/Foo', { teamContext: 'OWN_TEAM' }),
        ownTeamPage: false,
        expected: false,
      },
      {
        desc: 'OTHER_TEAM, does not match own team page',
        page: new Page('/Foo', { teamContext: 'OTHER_TEAM' }),
        ownTeamPage: true,
        expected: false,
      },
      {
        desc: 'OTHER_TEAM, matches other team page',
        page: new Page('/Foo', { teamContext: 'OTHER_TEAM' }),
        ownTeamPage: false,
        expected: true,
      },
    ])('$desc', ({ page, ownTeamPage, expected }) => {
      vi.mocked(getCurrentPathname).mockReturnValue('/Foo')
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(ownTeamPage)

      expect(isPage(page)).toBe(expected)
    })
  })

  describe('queryParams', () => {
    it.each([
      {
        desc: 'matches when required param is present (no value constraint)',
        page: new Page('/Foo', { queryParams: [{ name: 'BarId' }] }),
        search: '?BarId=123',
        expected: true,
      },
      {
        desc: 'does not match when required param is absent',
        page: new Page('/Foo', { queryParams: [{ name: 'BarId' }] }),
        search: '',
        expected: false,
      },
      {
        desc: 'matches when param has the required value',
        page: new Page('/Foo', { queryParams: [{ name: 'BarId', value: '123' }] }),
        search: '?BarId=123',
        expected: true,
      },
      {
        desc: 'does not match when param has a different value',
        page: new Page('/Foo', { queryParams: [{ name: 'BarId', value: '123' }] }),
        search: '?BarId=456',
        expected: false,
      },
      {
        desc: 'does not match when param with required value is absent',
        page: new Page('/Foo', { queryParams: [{ name: 'BarId', value: '123' }] }),
        search: '',
        expected: false,
      },
      {
        desc: 'matches when all required params are present',
        page: new Page('/Foo', { queryParams: [{ name: 'foo' }, { name: 'bar' }] }),
        search: '?foo=1&bar=2',
        expected: true,
      },
      {
        desc: 'does not match when only some required params are present',
        page: new Page('/Foo', { queryParams: [{ name: 'foo' }, { name: 'bar' }] }),
        search: '?foo=1',
        expected: false,
      },
    ])('$desc', ({ page, search, expected }) => {
      vi.mocked(getCurrentPathname).mockReturnValue('/Foo')
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams(search))
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isPage(page)).toBe(expected)
    })
  })
})

describe(getCurrentPage, () => {
  it('returns the correct page for a simple pathname', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.club.pathname)
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
    vi.mocked(isOwnTeamPage).mockReturnValue(false)

    expect(getCurrentPage()).toBe(pages.club)
  })

  it('distinguishes own team player list from other team player list', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.playerList.senior.own.pathname)
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
    vi.mocked(isOwnTeamPage).mockReturnValue(true)

    expect(getCurrentPage()).toBe(pages.playerList.senior.own)
  })

  it('distinguishes other team player list from own team player list', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.playerList.senior.other.pathname)
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
    vi.mocked(isOwnTeamPage).mockReturnValue(false)

    expect(getCurrentPage()).toBe(pages.playerList.senior.other)
  })

  it('distinguishes youth matches from senior matches by query param', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.matchList.youth.own.pathname)
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams('?YouthTeamId=123'))
    vi.mocked(isOwnTeamPage).mockReturnValue(true)

    expect(getCurrentPage()).toBe(pages.matchList.youth.own)
  })

  it('returns senior matches when YouthTeamId param is absent', () => {
    vi.mocked(getCurrentPathname).mockReturnValue(pages.matchList.senior.own.pathname)
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
    vi.mocked(isOwnTeamPage).mockReturnValue(true)

    expect(getCurrentPage()).toBe(pages.matchList.senior.own)
  })

  it('throws error when no page matches', () => {
    vi.mocked(getCurrentPathname).mockReturnValue('/Unsupported/Path/')
    vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
    vi.mocked(isOwnTeamPage).mockReturnValue(false)

    expect(() => getCurrentPage()).toThrowError('The current page is not supported')
  })
})
