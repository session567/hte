import { DAYS_PER_SEASON, DAYS_PER_WEEK, WEEKS_PER_SEASON } from '@/entrypoints/content/common/utils/constants'
import { querySelectorAll, querySelectorIn } from '@/entrypoints/content/common/utils/dom'
import { PlayerAge, PlayerSkills, Skill } from '@/entrypoints/content/common/utils/player/constants'
import { parsePlayerAge, parsePlayerSkills } from '@/entrypoints/content/common/utils/player/utils'
import {
  HTMS_ABILITY_TABLE,
  HTMS_POINTS_PER_WEEK,
  HTMS_TARGET_AGE_YEARS,
  HTMSPoints,
} from '@/entrypoints/content/modules/htms-points/constants'
import { i18n } from '#i18n'

/**
 * Calculates HTMS points for a player.
 *
 * @see {@link https://www.youtube.com/watch?v=vfVac6S861o}
 * @see {@link https://www87.hattrick.org/Forum/Read.aspx?t=17568840&v=0&a=1&n=43}
 *
 * @param age - The player's age
 * @param skills - The player's skills
 * @returns An object containing:
 *   - `ability`: Current player value based on today's skill levels
 *   - `potential`: Projected value at age 28y0d
 */
export const calcHTMSPoints = (age: PlayerAge, skills: PlayerSkills): HTMSPoints => {
  const ability = Object.entries(skills).reduce(
    (sum, [skill, level]) => sum + HTMS_ABILITY_TABLE[skill as Skill][level],
    0,
  )

  let potential = ability

  if (age.years < HTMS_TARGET_AGE_YEARS) {
    potential += HTMS_POINTS_PER_WEEK[age.years] * ((DAYS_PER_SEASON - age.days) / DAYS_PER_WEEK)

    for (let i = age.years + 1; i < HTMS_TARGET_AGE_YEARS; i++) {
      potential += HTMS_POINTS_PER_WEEK[i] * WEEKS_PER_SEASON
    }
  } else if (age.years in HTMS_POINTS_PER_WEEK) {
    potential -= HTMS_POINTS_PER_WEEK[age.years] * (age.days / DAYS_PER_WEEK)

    for (let i = age.years - 1; i >= HTMS_TARGET_AGE_YEARS; i--) {
      potential -= HTMS_POINTS_PER_WEEK[i] * WEEKS_PER_SEASON
    }
  } else {
    potential -= ability
  }

  potential = Math.round(potential)

  return { ability, potential }
}

const createHTMSRow = (htms: HTMSPoints): HTMLTableRowElement => {
  const htmsRow = document.createElement('tr')

  const labelCell = document.createElement('td')
  labelCell.className = 'right'
  labelCell.textContent = i18n.t('htms_points_label')

  const valueCell = document.createElement('td')
  valueCell.colSpan = 2

  const helpSpan = document.createElement('span')
  helpSpan.className = 'help hte-help'
  helpSpan.title = i18n.t('htms_points_help')
  helpSpan.textContent = `${htms.ability} / ${htms.potential}`

  valueCell.appendChild(helpSpan)
  htmsRow.appendChild(labelCell)
  htmsRow.appendChild(valueCell)

  return htmsRow
}

export const processPlayer = (playerElement: Element, ageElement: Element): void => {
  const playerSkillsElement = querySelectorIn(playerElement, '.transferPlayerSkills', false)
  if (!playerSkillsElement) return

  const age = parsePlayerAge(ageElement)
  const skills = parsePlayerSkills(playerSkillsElement)
  if (!age || !skills) return

  const htms = calcHTMSPoints(age, skills)
  const tbody = querySelectorIn(playerElement, '.transferPlayerInformation table tbody')
  if (!tbody) return

  tbody.appendChild(createHTMSRow(htms))
}

export const processPlayers = (playerSelector: string, ageSelector: string): void => {
  querySelectorAll(playerSelector).forEach((playerElement) => {
    const ageElement = querySelectorIn(playerElement, ageSelector)
    if (ageElement) processPlayer(playerElement, ageElement)
  })
}
