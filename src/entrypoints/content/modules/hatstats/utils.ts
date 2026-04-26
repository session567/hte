import { HatStats, TeamRatings } from '@/entrypoints/content/modules/hatstats/types'

export const calcHatStats = (ratings: TeamRatings): HatStats => {
  const defenceSum = ratings.rightDefence + ratings.centralDefence + ratings.leftDefence
  const attackSum = ratings.rightAttack + ratings.centralAttack + ratings.leftAttack

  const midfield = 3 + 12 * (ratings.midfield - 1)
  const defence = 3 + 4 * (defenceSum - 3)
  const attack = 3 + 4 * (attackSum - 3)
  const total = midfield + defence + attack

  return { midfield, defence, attack, total }
}
