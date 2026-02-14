import { DAYS_PER_SEASON, DAYS_PER_WEEK, WEEKS_PER_SEASON } from '@/entrypoints/content/common/utils/constants'
import { PlayerAge, PlayerSkills, Skill } from '@/entrypoints/content/common/utils/player/constants'
import {
  HTMS_ABILITY_TABLE,
  HTMS_POINTS_PER_WEEK,
  HTMS_TARGET_AGE_YEARS,
  HTMSPoints,
} from '@/entrypoints/content/modules/htms-points/constants'

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
