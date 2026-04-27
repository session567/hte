import { el } from '@/common/utils/dom'
import { querySelectorAllIn, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { pages } from '@/entrypoints/content/common/utils/pages'
import { i18n } from '#i18n'

const MAX_BAR_LENGTH = 20
const MAX_LOYALTY = 20

type SkillBonuses = {
  loyalty: number
  homegrown: number
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

/**
 * Calculate skill bonuses from loyalty and homegrown status.
 *
 * @param element - Element containing player information
 * @returns Object containing loyalty and homegrown bonus values
 */
export const calcBonuses = (element: Element): SkillBonuses => {
  return {
    loyalty: calcLoyaltyBonus(element),
    homegrown: calcHomegrownBonus(element),
  }
}

const createBonusBars = (skillBar: HTMLDivElement, bonuses: SkillBonuses): HTMLDivElement[] => {
  const level = parseInt(skillBar.getAttribute('level') ?? '0', 10)
  const denominationBar = querySelectorIn<HTMLSpanElement>(skillBar, '.bar-max > .bar-denomination')
  if (!level || !denominationBar) return []

  const bonusBars: HTMLDivElement[] = []
  let accumulatedBonus = 0

  ;(Object.entries(bonuses) as [keyof SkillBonuses, number][]).forEach(([bonusType, bonusValue]) => {
    if (bonusValue === 0) return

    accumulatedBonus += bonusValue

    const bonusBar = el('div', {
      className: `hte-skill-bonus-bar hte-skill-bonus-bar-${bonusType}`,
      title: i18n.t(`skill_bonus_${bonusType}`, [bonusValue.toFixed(2)]),
    })
    bonusBar.style.width = `${Math.round(((level + accumulatedBonus) / MAX_BAR_LENGTH) * 100)}%`
    bonusBar.appendChild(denominationBar.cloneNode(true))

    bonusBars.push(bonusBar)
  })

  return bonusBars
}

export const applySkillBonuses = (elements: Element[]): void => {
  elements.forEach((element) => {
    const bonuses = calcBonuses(element)
    const skillBars = querySelectorAllIn<HTMLDivElement>(element, '.transferPlayerSkills .ht-bar')

    skillBars.forEach((skillBar) => {
      const levelBar = querySelectorIn<HTMLDivElement>(skillBar, '.bar-level', false)
      if (!levelBar) return

      const bonusBars = createBonusBars(skillBar, bonuses)
      let insertionPoint = levelBar

      bonusBars.forEach((bonusBar) => {
        skillBar.insertBefore(bonusBar, insertionPoint)
        insertionPoint = bonusBar
      })
    })
  })
}
