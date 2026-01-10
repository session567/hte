import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

/**
 * Get the logged-in user's team ID and series ID.
 *
 * @returns Object containing teamId and seriesId, or null values if not found
 */
export const getOwnTeamData = (): Record<string, string | null> => {
  const seriesLink = querySelector<HTMLAnchorElement>(`#teamLinks > a[href*="${pages.series.pathname}"]`)
  const params = new URLSearchParams(seriesLink?.search)

  return {
    teamId: params.get('TeamID'),
    seriesId: params.get('LeagueLevelUnitID'),
  }
}

/**
 * Get the team ID that the current page is displaying.
 *
 * @returns The team ID for the page being viewed, or null if not found
 */
export const getPageTeamId = (): string | null => {
  const breadcrumbLink = querySelector<HTMLAnchorElement>(
    `#ctl00_ctl00_CPContent_divStartMain > .boxHead a[href*="${pages.club.pathname}"]`,
    false,
  )
  if (!breadcrumbLink) return null

  const url = new URL(breadcrumbLink.href)

  return url.searchParams.get('TeamID')
}

/**
 * Check if the current page is about the user's own team.
 *
 * @returns True if the current page is about the user's own team, false otherwise
 */
export const isOwnTeamPage = (): boolean => {
  const ownTeamId = getOwnTeamData().teamId
  const pageTeamId = getPageTeamId()

  return pageTeamId !== null && ownTeamId !== null && pageTeamId === ownTeamId
}
