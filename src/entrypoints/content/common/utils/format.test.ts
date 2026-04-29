import { describe, expect, it } from 'vitest'

import { formatPercentage } from '@/entrypoints/content/common/utils/format'

describe(formatPercentage, () => {
  it.each([
    { value: 0.43, expected: '0,43%' },
    { value: 3.0, expected: '3%' },
    { value: 69, expected: '69%' },
    { value: 0, expected: '0%' },
  ])('formats $value as $expected', ({ value, expected }) => {
    expect(formatPercentage(value)).toBe(expected)
  })
})
