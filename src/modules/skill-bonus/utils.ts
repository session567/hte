import { querySelector, querySelectorAll } from '@common/utils/dom'
import { logger } from '@common/utils/logger'
import { pages } from '@common/utils/pages'

const MAX_LOYALTY = 20

export const calcBonus = (element: Element): number => {
  const loyaltyBonus = getLoyaltyBonus(element)
  const homegrownBonus = getHomegrownBonus(element)
  const totalBonus = loyaltyBonus + homegrownBonus

  logger.debug(`loyaltyBonus=${loyaltyBonus}, homegrownBonus=${homegrownBonus}, totalBonus=${totalBonus}`)

  return totalBonus
}

const getLoyaltyBonus = (element: Element): number => {
  // Extract loyalty level (last .skill link with lt=skill)
  const skillLinks = querySelectorAll<HTMLAnchorElement>(
    element,
    `p > a.skill[href*="${pages.appDenominations.pathname}"][href*="lt=skill"]`,
  )
  if (skillLinks.length === 0) return 0

  const loyaltyLink = skillLinks[skillLinks.length - 1]

  const url = new URL(loyaltyLink.href)
  const loyalty = parseInt(url.searchParams.get('ll') ?? '0', 10)

  return loyalty / MAX_LOYALTY
}

const getHomegrownBonus = (element: Element): number => {
  return querySelector(element, '.icon-mother-club', false) ? 0.5 : 0
}
