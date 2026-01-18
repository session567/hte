import { querySelectorAllIn, querySelectorIn } from '@common/utils/dom'
import { logger } from '@common/utils/logger'
import { NUM_OF_SKILLS, PlayerAge, PlayerSkills, Skill } from '@common/utils/player/constants'

// Matches: [N] years [M] days, optionally followed by: <text> DD.MM.YYYY
const REGEX_PLAYER_AGE = /^(\d+)\D+(\d+)(?:\D*\d{2}\.\d{2}\.\d{4})?/

const ROW_ID_TO_SKILL: Record<string, Skill> = {
  trKeeper: 'keeper',
  trDefender: 'defending',
  trPlaymaker: 'playmaking',
  trWinger: 'winger',
  trPasser: 'passing',
  trScorer: 'scoring',
  trKicker: 'setPieces',
}

/**
 * Parse a player's age from a DOM element.
 *
 * @param element - The DOM element containing the age text (e.g., "17 years 42 days")
 * @returns The parsed age, or null if parsing fails
 */
export const parsePlayerAge = (element: Element): PlayerAge | null => {
  const value = element.textContent.trim()
  if (!value) return null

  const match = REGEX_PLAYER_AGE.exec(value)
  if (!match) return null

  return {
    years: parseInt(match[1], 10),
    days: parseInt(match[2], 10),
  }
}

/**
 * Parse all player skills from a DOM element.
 *
 * Player skills are expected to be contained within a `.transferPlayerSkills` element.
 *
 * @param element - The DOM element containing the player's skills
 * @returns Object with all skill levels, or null if parsing fails or skills are incomplete
 */
export const parsePlayerSkills = (element: Element): PlayerSkills | null => {
  const skills: Partial<Record<Skill, number>> = {}
  const skillRows = querySelectorAllIn<HTMLTableRowElement>(
    element,
    'tr[id*="ucPlayerSkills_tr"], tr[id*="TransferPlayer_tr"]',
  )

  skillRows.forEach((row) => {
    const rowId = row.id.split('_').pop()
    const skill = rowId ? ROW_ID_TO_SKILL[rowId] : undefined
    const level = querySelectorIn<HTMLDivElement>(row, '.ht-bar')?.getAttribute('level')
    if (!skill || !level) return

    skills[skill] = parseInt(level, 10)
  })

  if (Object.keys(skills).length !== NUM_OF_SKILLS) {
    logger.warn(`Cannot parse skills. Expected ${NUM_OF_SKILLS} skills, found ${Object.keys(skills).length}.`, skills)
    return null
  }

  return skills as PlayerSkills
}
