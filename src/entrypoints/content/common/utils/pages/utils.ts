import { getCurrentPathname, getCurrentSearchParams } from '@/entrypoints/content/common/utils/location'
import { Page, PageTree } from '@/entrypoints/content/common/utils/pages/page'
import { isOwnTeamPage } from '@/entrypoints/content/common/utils/team/utils'

export { Page } from '@/entrypoints/content/common/utils/pages/page'

import { pages } from '@/entrypoints/content/common/utils/pages/pages'

class PageNotSupportedError extends Error {}

const flattenPages = (tree: PageTree): Page[] => {
  if (tree instanceof Page) return [tree]
  return Object.values(tree).flatMap(flattenPages)
}

/**
 * Returns true if the given page matches the current browser location.
 */
const matchesCurrentLocation = (page: Page): boolean => {
  if (page.pathname.toLowerCase() !== getCurrentPathname().toLowerCase()) return false

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
      const isPresent = value === undefined ? searchParams.has(name) : searchParams.has(name, value)
      if (!isPresent) return false
    }
  }

  return true
}

/**
 * Returns the most specific page from a list of candidates.
 *
 * Multiple pages can match the same URL when one is a more specific variant of another (e.g. senior vs youth match
 * list share the same pathname, but the youth variant requires an additional query param). More query params = higher
 * specificity score.
 *
 * @throws If multiple candidates tie on specificity score.
 */
const mostSpecificPage = (candidates: Page[]): Page => {
  const score = (page: Page) => page.options?.queryParams?.length ?? 0
  const topScore = Math.max(...candidates.map(score))
  const topPages = candidates.filter((page) => score(page) === topScore)

  if (topPages.length > 1) {
    throw new Error(
      `Multiple pages matched with the same specificity score (${topScore}): ${topPages}. ` +
        'Add more specific options to disambiguate.',
    )
  }

  return topPages[0]
}

let _currentPage: Page | undefined

export const resetCurrentPageCache = () => {
  _currentPage = undefined
}

/**
 * Returns the current page based on the browser's location.
 */
export const getCurrentPage = (): Page => {
  if (_currentPage) return _currentPage

  const candidates = flattenPages(pages).filter(matchesCurrentLocation)
  if (candidates.length === 0) throw new PageNotSupportedError('The current page is not supported')

  _currentPage = candidates.length === 1 ? candidates[0] : mostSpecificPage(candidates)

  return _currentPage
}

export const tryGetCurrentPage = (): Page | null => {
  try {
    return getCurrentPage()
  } catch (err) {
    if (err instanceof PageNotSupportedError) return null
    throw err
  }
}

/**
 * Checks if any of the given pages match the current browser location.
 */
export const isCurrentPage = (...pagesToCheck: Page[]): boolean => {
  if (pagesToCheck.includes(pages.all)) return true
  const page = tryGetCurrentPage()
  return page !== null && pagesToCheck.includes(page)
}
