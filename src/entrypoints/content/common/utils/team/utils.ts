import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'

/**
 * Get the logged-in user's team ID, series ID, and youth team ID.
 */
export const getOwnTeamData = (): Record<string, string | null> => {
  const seriesLink = querySelector<HTMLAnchorElement>(`#teamLinks > a[href*="${pages.series.pathname}"]`, false)
  const seriesParams = new URLSearchParams(seriesLink?.search)

  const youthLink = querySelector<HTMLAnchorElement>(
    `#ctl00_ctl00_CPHeader_ucNewMenu_repMenu_ctl00_pnlSubMenu a[href*="${pages.clubYouth.pathname}"]`,
  )
  const youthParams = new URLSearchParams(youthLink?.search)

  return {
    teamId: seriesParams.get('TeamID'),
    seriesId: seriesParams.get('LeagueLevelUnitID'),
    youthTeamId: youthParams.get('YouthTeamID'),
  }
}

/**
 * Get the team ID (or youth team ID) that the current page is displaying.
 */
export const getPageTeamId = (): string | null => {
  const breadcrumbLink = querySelector<HTMLAnchorElement>(
    `#ctl00_ctl00_CPContent_divStartMain > .boxHead a[href*="${pages.club.pathname}"],` +
      `#ctl00_ctl00_CPContent_divStartMain > .boxHead a[href*="${pages.clubYouth.pathname}"]`,
    false,
  )
  if (!breadcrumbLink) return null

  const url = new URL(breadcrumbLink.href)

  return url.searchParams.get('TeamID') ?? url.searchParams.get('YouthTeamID')
}

/**
 * Check if the current page is about the user's own team or youth team.
 */
export const isOwnTeamPage = (): boolean => {
  const { teamId, youthTeamId } = getOwnTeamData()
  const pageTeamId = getPageTeamId()

  return pageTeamId !== null && (pageTeamId === teamId || pageTeamId === youthTeamId)
}

/**
 * Check if the user is logged in.
 *
 * @returns True if the user is logged in, false otherwise
 */
export const isLoggedIn = (): boolean => getOwnTeamData().teamId !== null
