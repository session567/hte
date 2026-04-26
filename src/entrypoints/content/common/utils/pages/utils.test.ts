import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getCurrentPathname, getCurrentSearchParams } from '@/entrypoints/content/common/utils/location'
import { getCurrentPage, isCurrentPage, pages, resetCurrentPageCache } from '@/entrypoints/content/common/utils/pages'
import { isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

vi.mock(import('@/entrypoints/content/common/utils/location'))
vi.mock(import('@/entrypoints/content/common/utils/team/utils'))

describe(isCurrentPage, () => {
  beforeEach(() => {
    resetCurrentPageCache()
  })

  describe('pathname matching', () => {
    it('returns false when pathnames differ', () => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.series.pathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isCurrentPage(pages.club)).toBe(false)
    })

    it('returns true when pathnames match', () => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.club.pathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isCurrentPage(pages.club)).toBe(true)
    })

    it('returns true when pathnames match case-insensitively', () => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.club.pathname.toLowerCase())
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isCurrentPage(pages.club)).toBe(true)
    })
  })

  describe('teamContext', () => {
    it.each([
      {
        desc: 'OWN_TEAM, matches own team page',
        page: pages.playerList.senior.own,
        ownTeamPage: true,
        expected: true,
      },
      {
        desc: 'OWN_TEAM, does not match other team page',
        page: pages.playerList.senior.own,
        ownTeamPage: false,
        expected: false,
      },
      {
        desc: 'OTHER_TEAM, does not match own team page',
        page: pages.playerList.senior.other,
        ownTeamPage: true,
        expected: false,
      },
      {
        desc: 'OTHER_TEAM, matches other team page',
        page: pages.playerList.senior.other,
        ownTeamPage: false,
        expected: true,
      },
    ])('$desc', ({ page, ownTeamPage, expected }) => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.playerList.senior.own.pathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(ownTeamPage)

      expect(isCurrentPage(page)).toBe(expected)
    })
  })

  describe('multiple pages', () => {
    it('returns true when any of the given pages matches', () => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.club.pathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams())
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isCurrentPage(pages.series, pages.club)).toBe(true)
    })
  })

  describe('queryParams', () => {
    it.each([
      {
        desc: 'matches youth match when YouthTeamId param is present',
        page: pages.matchDetail.youth,
        search: '?YouthTeamId=123',
        expected: true,
      },
      {
        desc: 'does not match youth match when YouthTeamId param is absent',
        page: pages.matchDetail.youth,
        search: '',
        expected: false,
      },
      {
        desc: 'matches senior match when YouthTeamId param is absent',
        page: pages.matchDetail.senior,
        search: '',
        expected: true,
      },
      {
        desc: 'does not match senior match when YouthTeamId param is present',
        page: pages.matchDetail.senior,
        search: '?YouthTeamId=123',
        expected: false,
      },
    ])('$desc', ({ page, search, expected }) => {
      vi.mocked(getCurrentPathname).mockReturnValue(pages.matchDetail.senior.pathname)
      vi.mocked(getCurrentSearchParams).mockReturnValue(new URLSearchParams(search))
      vi.mocked(isOwnTeamPage).mockReturnValue(false)

      expect(isCurrentPage(page)).toBe(expected)
    })
  })
})

describe(getCurrentPage, () => {
  beforeEach(() => {
    resetCurrentPageCache()
  })

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

    expect(() => getCurrentPage()).toThrow('The current page is not supported')
  })
})
