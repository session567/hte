import { describe, expect, it } from 'vitest'

import { getCardRates } from '@/entrypoints/content/modules/player-card-rates/utils'

describe(getCardRates, () => {
  it.each([
    { desc: 'Infamous + Tranquil', aggressiveness: 0, honesty: 0, expected: { yellow: 2.7, red: 0.08 } },
    { desc: 'Balanced + Dishonest', aggressiveness: 2, honesty: 1, expected: { yellow: 7.6, red: 0.43 } },
    { desc: 'Righteous + Fiery', aggressiveness: 4, honesty: 4, expected: { yellow: 11.4, red: 1.04 } },
  ])('returns rates for $desc', ({ aggressiveness, honesty, expected }) => {
    expect(getCardRates(aggressiveness, honesty)).toStrictEqual(expected)
  })

  it('returns null for unstable aggressiveness (level 5, no data)', () => {
    expect(getCardRates(5, 2)).toBeNull()
  })

  it('returns null for saint-like honesty (level 5, no data)', () => {
    expect(getCardRates(2, 5)).toBeNull()
  })
})
