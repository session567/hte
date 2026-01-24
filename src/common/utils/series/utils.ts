import { querySelector } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

/**
 * Get the series ID from the breadcrumb link on the current page.
 *
 * Note: This only works on the series page.
 *
 * @returns The series ID, or null if not found
 */
export const getPageSeriesId = (): string | null => {
  const breadcrumbLink = querySelector<HTMLAnchorElement>(
    `#ctl00_ctl00_CPContent_divStartMain > .boxHead a[href*="${pages.series.pathname}"]`,
  )
  if (!breadcrumbLink) return null

  const url = new URL(breadcrumbLink.href)

  return url.searchParams.get('LeagueLevelUnitID')
}
