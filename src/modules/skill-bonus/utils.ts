import { querySelectorAllIn, querySelectorIn } from '@common/utils/dom'
import { pages } from '@common/utils/pages'

const MAX_LOYALTY = 20

/**
 * Calculate skill bonus from loyalty and homegrown status.
 *
 * @param element - Element containing player information
 * @returns Total skill bonus value
 */
export const calcBonus = (element: Element): number => {
  const loyaltyBonus = calcLoyaltyBonus(element)
  const homegrownBonus = calcHomegrownBonus(element)

  return loyaltyBonus + homegrownBonus
}

/**
 * Calculate skill bonus from player loyalty.
 *
 * @param element - Element containing player information
 * @returns Loyalty bonus value (from 0 to 1)
 */
const calcLoyaltyBonus = (element: Element): number => {
  // Extract loyalty level (last .skill link with lt=skill)
  const skillLinks = querySelectorAllIn<HTMLAnchorElement>(
    element,
    `p > a.skill[href*="${pages.appDenominations.pathname}"][href*="lt=skill"]`,
  )
  if (skillLinks.length === 0) return 0

  const loyaltyLink = skillLinks[skillLinks.length - 1]

  const url = new URL(loyaltyLink.href)
  const loyalty = parseInt(url.searchParams.get('ll') ?? '0', 10)

  return loyalty / MAX_LOYALTY
}

/**
 * Calculate skill bonus from homegrown status.
 *
 * @param element - Element containing player information
 * @returns Homegrown bonus (0.5 if homegrown, 0 otherwise)
 */
const calcHomegrownBonus = (element: Element): number => {
  return querySelectorIn(element, '.icon-mother-club', false) ? 0.5 : 0
}
