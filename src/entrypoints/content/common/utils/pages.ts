import { getCurrentPathname, getCurrentSearchParams } from '@/entrypoints/content/common/utils/location'
import { isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

type TeamContext = 'OWN_TEAM' | 'OTHER_TEAM'

type QueryParam = {
  name: string
  value?: string
}

type PageOptions = {
  teamContext?: TeamContext
  queryParams?: QueryParam[]
}

type PageTree = Page | Page[] | { [key: string]: PageTree }

/**
 * Represents a specific page on Hattrick.
 *
 * Used to determine which modules should run on the current page.
 */
export class Page {
  /**
   * Special pathname value indicating a module should run on all pages.
   */
  static readonly __ALL__ = '__ALL__'

  /**
   * @param pathname - The URL pathname of the Hattrick page (e.g., '/Club/Players/')
   * @param options - Optional settings to distinguish pages with the same pathname
   */
  constructor(
    public readonly pathname: string,
    public readonly options?: PageOptions,
  ) {}

  toString() {
    return this.options ? `Page("${this.pathname}", ${JSON.stringify(this.options)})` : `Page("${this.pathname}")`
  }
}

/**
 * Create a pair of {@link Page} instances for a pathname available for both own and other teams.
 */
const teamPages = (pathname: string, options?: Omit<PageOptions, 'teamContext'>) => {
  const own = new Page(pathname, { ...options, teamContext: 'OWN_TEAM' })
  const other = new Page(pathname, { ...options, teamContext: 'OTHER_TEAM' })
  return { own, other, both: [own, other] }
}

/**
 * Dictionary of all supported Hattrick pages.
 *
 * IMPORTANT: For any given pathname, either all {@link Page} instances must have `teamContext`, or none should.
 */
export const pages = {
  // Special case
  all: new Page(Page.__ALL__),

  // Pages not related to the user's team
  appDenominations: new Page('/Help/Rules/AppDenominations.aspx'),
  forum: new Page('/Forum/'),
  series: new Page('/World/Series/'),
  transfers: {
    search: new Page('/World/Transfers/'),
    searchResults: new Page('/World/Transfers/TransfersSearchResult.aspx'),
  },

  // Pages accessible only to the user's own team
  club: new Page('/Club/'),
  matches: {
    senior: teamPages('/Club/Matches/'),
    youth: teamPages('/Club/Matches/', { queryParams: [{ name: 'YouthTeamId' }] }),
  },
  specialists: new Page('/Club/Specialists/'),

  // Pages accessible to both the user's own team and other teams
  player: {
    senior: {
      detail: teamPages('/Club/Players/Player.aspx'),
      list: teamPages('/Club/Players/'),
    },
    youth: {
      detail: new Page('/Club/Players/YouthPlayer.aspx'),
      list: new Page('/Club/Players/YouthPlayers.aspx'),
    },
  },
  stadium: new Page('/Club/Stadium/'),
} as const satisfies Record<string, PageTree>

/**
 * Checks if any of the given pages match the current browser location.
 */
export const isPage = (...pages: Page[]): boolean => {
  return pages.some((page) => {
    if (page.pathname !== getCurrentPathname()) return false

    const { options } = page
    if (!options) return true

    const { teamContext, queryParams } = options

    if (teamContext) {
      const ownTeam = isOwnTeamPage()
      if (teamContext === 'OWN_TEAM' && !ownTeam) return false
      if (teamContext === 'OTHER_TEAM' && ownTeam) return false
    }

    if (queryParams) {
      const searchParams = getCurrentSearchParams()

      for (const { name, value } of queryParams) {
        if (value === undefined ? !searchParams.has(name) : !searchParams.has(name, value)) return false
      }
    }

    return true
  })
}

/**
 * Recursively flattens a {@link PageTree} into a flat array of {@link Page} instances.
 */
const flattenPages = (tree: PageTree): Page[] => {
  if (tree instanceof Page) return [tree]
  if (Array.isArray(tree)) return tree.flatMap(flattenPages)
  return Object.values(tree).flatMap(flattenPages)
}

/**
 * Returns the current page based on the browser's location.
 */
export const getCurrentPage = (): Page => {
  const allPages = [...new Set(flattenPages(pages))]
  const matchingPages = allPages.filter((page) => isPage(page))

  if (matchingPages.length === 0) throw new Error('The current page is not supported')
  if (matchingPages.length === 1) return matchingPages[0]

  // Multiple pages can match the same URL when one page is a more specific variant of another. For example,
  // `pages.matches.senior` and `pages.matches.youth` share the same pathname, but `pages.matches.youth` requires an
  // additional query param 'YouthTeamId'. Both pass `isPage()`, so we score the pages to pick the most specific match;
  // more query params = higher score.
  let topPages: Page[] = []
  let topScore = -Infinity

  for (const page of matchingPages) {
    const score = page.options?.queryParams?.length ?? 0

    if (score > topScore) {
      topScore = score
      topPages = [page]
    } else if (score === topScore) {
      topPages.push(page)
    }
  }

  if (topPages.length > 1) {
    throw new Error(
      `Multiple pages matched with the same specificity score (${topScore}): ${topPages}. ` +
        'Add more specific options to disambiguate.',
    )
  }

  return topPages[0]
}
