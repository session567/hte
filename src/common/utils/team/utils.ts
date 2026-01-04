import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

export const getOwnTeamData = (): Record<string, string | null> => {
  const seriesLink = querySelector<HTMLAnchorElement>(`#teamLinks > a[href*="${pages.series.pathname}"]`)
  const params = new URLSearchParams(seriesLink?.search)

  return {
    teamId: params.get('TeamID'),
    seriesId: params.get('LeagueLevelUnitID'),
  }
}

export const getPageTeamId = (): string | null => {
  const breadcrumbLink = querySelector<HTMLAnchorElement>(
    `#ctl00_ctl00_CPContent_divStartMain > .boxHead a[href*="${pages.club.pathname}"]`,
  )
  if (!breadcrumbLink) return null

  const url = new URL(breadcrumbLink.href)

  return url.searchParams.get('TeamID')
}

export const isOwnTeamPage = (): boolean => {
  const ownTeamId = getOwnTeamData().teamId
  const pageTeamId = getPageTeamId()

  return pageTeamId !== null && ownTeamId !== null && pageTeamId === ownTeamId
}
