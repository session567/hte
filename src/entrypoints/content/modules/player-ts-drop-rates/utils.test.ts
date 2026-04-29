import { describe, expect, it } from 'vitest'

import { getTsDropRates } from '@/entrypoints/content/modules/player-ts-drop-rates/utils'

describe(getTsDropRates, () => {
  it.each([
    { level: 0, name: 'Nasty', expected: { buy: 69, sell: 0 } },
    { level: 1, name: 'Controversial', expected: { buy: 47, sell: 0 } },
    { level: 2, name: 'Pleasant', expected: { buy: 30, sell: 12 } },
    { level: 3, name: 'Sympathetic', expected: { buy: 0, sell: 22 } },
    { level: 4, name: 'Popular', expected: { buy: 0, sell: 27 } },
  ])('returns rates for $name ($level)', ({ level, expected }) => {
    expect(getTsDropRates(level)).toStrictEqual(expected)
  })

  it.each([-1, 5])('returns null for out-of-range level %i', (level) => {
    expect(getTsDropRates(level)).toBeNull()
  })
})
