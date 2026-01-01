import { createLogger } from '@common/utils/logger'
import { paths } from '@common/utils/paths'
import { MODULE_NAME } from '@modules/skill-bonus/constants'

const MAX_LOYALTY = 20

const logger = createLogger(MODULE_NAME)

export const calcBonus = (node: ParentNode): number => {
  const loyaltyBonus = getLoyaltyBonus(node)
  const homegrownBonus = getHomegrownBonus(node)
  const totalBonus = loyaltyBonus + homegrownBonus

  logger.debug(`loyaltyBonus=${loyaltyBonus}, homegrownBonus=${homegrownBonus}, totalBonus=${totalBonus}`)

  return totalBonus
}

const getLoyaltyBonus = (node: ParentNode): number => {
  // Extract loyalty level (last .skill link with lt=skill)
  const skillLinks = node.querySelectorAll<HTMLAnchorElement>(
    `p > a.skill[href*="${paths.appDenominations}"][href*="lt=skill"]`,
  )

  const loyaltyLink = skillLinks[skillLinks.length - 1]
  if (!loyaltyLink) return 0

  const url = new URL(loyaltyLink.href)
  const loyalty = parseInt(url.searchParams.get('ll') || '0', 10)

  return loyalty / MAX_LOYALTY
}

const getHomegrownBonus = (node: ParentNode): number => {
  return node.querySelector('.icon-mother-club') ? 0.5 : 0
}
