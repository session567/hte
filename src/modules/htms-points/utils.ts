import { DAYS_PER_WEEK, DAYS_PER_YEAR, WEEKS_PER_YEAR } from '@common/utils/constants'
import { PlayerAge, PlayerSkills, Skill } from '@common/utils/player/constants'
import { HTMS_ABILITY_TABLE, HTMS_POINTS_PER_WEEK, HTMSPoints } from '@modules/htms-points/constants'

const TARGET_AGE_YEARS = 28

/**
 * Calculates HTMS points for a player.
 *
 * @see https://www.youtube.com/watch?v=vfVac6S861o
 * @see https://www87.hattrick.org/Forum/Read.aspx?t=17568840&v=0&a=1&n=43
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

  if (age.years < TARGET_AGE_YEARS) {
    potential += HTMS_POINTS_PER_WEEK[age.years] * ((DAYS_PER_YEAR - age.days) / DAYS_PER_WEEK)

    for (let i = age.years + 1; i < TARGET_AGE_YEARS; i++) {
      potential += HTMS_POINTS_PER_WEEK[i] * WEEKS_PER_YEAR
    }
  } else if (age.years in HTMS_POINTS_PER_WEEK) {
    potential -= HTMS_POINTS_PER_WEEK[age.years] * (age.days / DAYS_PER_WEEK)

    for (let i = age.years - 1; i >= TARGET_AGE_YEARS; i--) {
      potential -= HTMS_POINTS_PER_WEEK[i] * WEEKS_PER_YEAR
    }
  } else {
    potential -= ability
  }

  potential = Math.round(potential)

  return { ability, potential }
}
