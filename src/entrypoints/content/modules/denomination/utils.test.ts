import { describe, expect, it, vi } from 'vitest'

import { getBoolSetting } from '@/common/utils/settings'
import { adjustDenominationValue, isDenominationType } from '@/entrypoints/content/modules/denomination/utils'

vi.mock(import('@/common/utils/settings'), async (importOriginal) => {
  return {
    ...(await importOriginal()),
    getBoolSetting: vi.fn<typeof getBoolSetting>().mockResolvedValue(true),
  }
})

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
    { lt: 'aggressiveness', ll: 0, expected: 5 },
    { lt: 'aggressiveness', ll: 2, expected: 3 },
  ] as const)('adjusts $lt with ll=$ll to $expected (reverseAggressiveness=true)', async ({ lt, ll, expected }) => {
    await expect(adjustDenominationValue(lt, ll)).resolves.toBe(expected)
  })

  it('returns raw aggressiveness value when reverseAggressiveness is false', async () => {
    vi.mocked(getBoolSetting).mockResolvedValueOnce(false)

    await expect(adjustDenominationValue('aggressiveness', 3)).resolves.toBe(3)
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
