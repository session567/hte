import { describe, expect, it } from 'vitest'

import { adjustDenominationValue, isDenominationType } from '@/entrypoints/content/modules/denomination/utils'

describe(adjustDenominationValue, () => {
  it.each([
    { lt: 'skill', ll: 6, expected: 6 },
    { lt: 'leadership', ll: 5, expected: 5 },
    { lt: 'gentleness', ll: 3, expected: 3 },
    { lt: 'morale', ll: 12, expected: 0 },
    { lt: 'morale', ll: 15, expected: 3 },
    { lt: 'morale', ll: 21, expected: 9 },
    { lt: 'morale', ll: 11, expected: 10 },
    { lt: 'confidence', ll: 23, expected: 0 },
    { lt: 'confidence', ll: 26, expected: 3 },
    { lt: 'confidence', ll: 31, expected: 8 },
    { lt: 'confidence', ll: 22, expected: 9 },
  ] as const)('adjusts $lt with ll=$ll to $expected', ({ lt, ll, expected }) => {
    expect(adjustDenominationValue(lt, ll)).toBe(expected)
  })
})

describe(isDenominationType, () => {
  it('returns true for valid denomination types', () => {
    expect(isDenominationType('skill')).toBe(true)
    expect(isDenominationType('FanMood')).toBe(true)
  })

  it('returns false for invalid denomination types', () => {
    expect(isDenominationType('invalid')).toBe(false)
    expect(isDenominationType('SKILL')).toBe(false)
  })
})
