import { querySelector, querySelectorAll } from '@common/utils/dom'
import { logger } from '@common/utils/logger'
import { NUM_OF_SKILLS, PlayerAge, PlayerSkills, Skill } from '@common/utils/player/constants'

// [N] years [M] days, optionally followed by: <text> DD.MM.YYYY
const PLAYER_AGE_REGEX = /(\d+)\D+(\d+)(?:\D*\d{2}\.\d{2}\.\d{4})?/

const ROW_ID_TO_SKILL: Record<string, Skill> = {
  trKeeper: 'keeper',
  trDefender: 'defending',
  trPlaymaker: 'playmaking',
  trWinger: 'winger',
  trPasser: 'passing',
  trScorer: 'scoring',
  trKicker: 'setPieces',
}

export const parsePlayerAge = (node: ParentNode): PlayerAge | null => {
  const value = node.textContent?.trim()
  if (!value) return null

  const match = PLAYER_AGE_REGEX.exec(value)
  if (!match) return null

  return {
    years: parseInt(match[1], 10),
    days: parseInt(match[2], 10),
  }
}

export const parsePlayerSkills = (node: ParentNode): PlayerSkills | null => {
  const skills: Partial<Record<Skill, number>> = {}
  const skillRows = querySelectorAll<HTMLTableRowElement>(
    node,
    '.transferPlayerSkills table tr[id*="ucPlayerSkills_tr"], .transferPlayerSkills table tr[id*="TransferPlayer_tr"]',
  )

  skillRows.forEach((row) => {
    const rowId = row.id.split('_').pop()
    const skill = rowId ? ROW_ID_TO_SKILL[rowId] : undefined
    const level = querySelector<HTMLDivElement>(row, '.ht-bar')?.getAttribute('level')

    if (!skill || !level) return

    skills[skill] = parseInt(level, 10)
  })

  if (Object.keys(skills).length !== NUM_OF_SKILLS) {
    logger.warn(`Cannot parse skills. Expected ${NUM_OF_SKILLS} skill, found ${Object.keys(skills).length}.`, skills)
    return null
  }

  return skills as PlayerSkills
}
