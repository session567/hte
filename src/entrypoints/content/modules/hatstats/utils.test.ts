import { describe, expect, it } from 'vitest'

import { calcHatStats } from '@/entrypoints/content/modules/hatstats/utils'

describe(calcHatStats, () => {
  it('calculates correct HatStats for given ratings', () => {
    const ratings = {
      midfield: 11.75,
      rightDefence: 13.5,
      centralDefence: 12.75,
      leftDefence: 13.25,
      rightAttack: 13.25,
      centralAttack: 15.25,
      leftAttack: 12.5,
    }

    const result = calcHatStats(ratings)

    expect(result.midfield).toBe(132)
    expect(result.defence).toBe(149)
    expect(result.attack).toBe(155)
    expect(result.total).toBe(436)
  })
})
